from fastapi import APIRouter, Request, HTTPException, status
from sqlalchemy import create_engine, text
import sqlalchemy
from src import database as db
from dotenv import load_dotenv
from fastapi.responses import JSONResponse
from uuid import UUID

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

@router.post("/add-music")
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