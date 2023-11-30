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
    prefix="/signup",
    tags=["signup"],
)


class CreateUserRequest(BaseModel):
    user_email: str
    user_password: str
    first_name: str
    last_name: str

class UserInfo(BaseModel):
    id: UUID
    weight: int
    height: int
    age: int
    gender: str
    dob: str

@router.post("/create-user")
def create_user(request: CreateUserRequest):

    with db.engine.begin() as connection:
        existing_user_result = connection.execute(
            sqlalchemy.text(
            """
            SELECT id
            FROM users
            WHERE email = :user_email
            """),
            {"user_email": request.user_email}
        )

    existing_user = existing_user_result.fetchone()

    if existing_user:
        # If the email exists, raise an HTTPException with a 400 status code and error message
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = supabase.auth.sign_up({
        "email": request.user_email,
        "password": request.user_password
    })

    user_id = new_user.user.id

    with db.engine.begin() as connection:
        result = connection.execute(
            sqlalchemy.text(
            """
            INSERT INTO users (id, first_name, last_name, email)
            VALUES (:user_id, :first_name, :last_name, :user_email)
            """),
            {"user_id": user_id, "first_name": request.first_name, "last_name": request.last_name, "user_email": request.user_email}
        )

    # Return the user_id in the response
    return JSONResponse(content={"user_id": user_id}, status_code=200)


@router.post("/add-info")
def add_info(request: UserInfo):


    with db.engine.begin() as connection:
        result = connection.execute(
            sqlalchemy.text(
            """
            UPDATE users
            SET weight = :weight, height = :height, age = :age, gender = :gender, dob = :dob
            WHERE id = :user_id
            """),
            {"user_id": request.id, "weight": request.weight, "height": request.height, "age": request.age,
            "gender": request.gender, "dob": request.dob}
        )

    return "OK"