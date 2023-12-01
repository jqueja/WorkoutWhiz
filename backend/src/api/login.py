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
    prefix="/login",
    tags=["login"],
)

class LogUserRequest(BaseModel):
    user_email: str
    user_password: str


@router.post("")
def login_user(request: LogUserRequest):

    try:
        response = supabase.auth.sign_in_with_password({ "email": request.user_email, "password": request.user_password })


        user_id = response.user.id

        # Return the user_id in the response
        return JSONResponse(content={"user_id": user_id}, status_code=200)
    
    except Exception as e:
        # Check if the error is due to invalid credentials
        if "Invalid login credentials" in str(e):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        else:
            # Handle other AuthApiError cases as needed
            raise HTTPException(status_code=500, detail="Internal server error")