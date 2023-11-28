from fastapi import APIRouter, Request, HTTPException, status
from sqlalchemy import create_engine, text
import sqlalchemy
from src import database as db
from dotenv import load_dotenv
load_dotenv()

import os
from supabase import create_client

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase = create_client(url, key)

router = APIRouter(
    prefix="/signup",
    tags=["signup"],
)


@router.post("/create-user")
def create_user(user_email: str, user_password: str, first_name: str, last_name: str):

    new_user = supabase.auth.sign_up({ "email": user_email, "password": user_password })

    user_id = new_user.user.id

    with db.engine.begin() as connection:
        result = connection.execute(
            sqlalchemy.text(
            """
            INSERT INTO public_profile (id, first_name, last_name, email)
            VALUES (:user_id, :first_name, :last_name, :user_email)
            """),
            {"user_id": user_id, "first_name": first_name, "last_name": last_name, "user_email": user_email}
        )

    return "OK"