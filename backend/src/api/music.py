from fastapi import APIRouter, Request, HTTPException, status
from sqlalchemy import create_engine, text
import sqlalchemy
from src import database as db
from dotenv import load_dotenv
from fastapi.responses import JSONResponse
from uuid import UUID
import re
load_dotenv()

import os
from supabase import create_client
from pydantic import BaseModel


url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase = create_client(url, key)


router = APIRouter(
    prefix="/music",
    tags=["music"],
)

class MusicRequest(BaseModel):
    user_id: UUID
    link: str


uuid_pattern = re.compile(r'^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')

@router.get("/all-links/{user_id}")
def get_music_list(user_id):

    if not uuid_pattern.match(user_id):
        raise HTTPException(status_code=400, detail="Invalid UUID format")

    with db.engine.begin() as connection:
        result = connection.execute(
            sqlalchemy.text(
            """
            SELECT link
            FROM music_links
            WHERE "user" = :user_id
            """),
            {"user_id": user_id}
        )

    playlists = [row[0] for row in result.fetchall()]

    # If no links are found, raise a 404 Not Found exception
    if not playlists:
        raise HTTPException(status_code=404, detail="No music links found for the specified user")

    return {"playlist_links": playlists}


@router.post("/add-music/{user_id}/{link}")
def add_music(request: MusicRequest):

    # Checks for duplications in the database
    with db.engine.begin() as connection:
        record = connection.execute(
            sqlalchemy.text(
            """
            SELECT *
            FROM music_links
            WHERE "user" = :user_id AND "link" = :user_link
            """),
            {"user_id": request.user_id, "user_link": request.link}
        )

    existing_record = record.fetchone()

    if existing_record:
        raise HTTPException(status_code=409, detail="Song is already associated with user")

    # Add the song
    with db.engine.begin() as connection:
        result = connection.execute(
            sqlalchemy.text(
            """
            INSERT INTO music_links ("user", "link")
            VALUES (:user_id, :user_link)
            """),
            {"user_id": request.user_id, "user_link": request.link}
        )

    return "OK"

@router.post("/delete-music/{user_id}/{link}")
def delete_music(request: MusicRequest):

    # Checks if the record exists in the database
    with db.engine.begin() as connection:
        record = connection.execute(
            sqlalchemy.text(
            """
            SELECT *
            FROM music_links
            WHERE "user" = :user_id AND "link" = :user_link
            """),
            {"user_id": request.user_id, "user_link": request.link}
        )

    existing_record = record.fetchone()

    # If the record does not exist, raise a 404 Not Found exception
    if not existing_record:
        raise HTTPException(status_code=404, detail="Song not found for the specified user")

    # If the record exists, delete the song
    with db.engine.begin() as connection:
        result = connection.execute(
            sqlalchemy.text(
            """
            DELETE FROM music_links
            WHERE "user" = :user_id AND "link" = :user_link
            """),
            {"user_id": request.user_id, "user_link": request.link}
        )

    return "OK"
