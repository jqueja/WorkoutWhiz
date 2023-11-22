from fastapi import APIRouter, HTTPException
from src import database as db
from src.models import UserProfile
from pydantic import BaseModel


router = APIRouter(
    prefix="/signup",
    tags=["signup"],
)


class UserSettings(BaseModel):
    first_name: str
    last_name: str
    dob: str
    age: str
    gender: str
    weight: str
    height_ft: str


@router.post("/")
def insert_signup_info(user_settings: UserSettings):
    try:
        with db.engine.begin() as connection:
            # Assuming `UserProfile` is your SQLAlchemy model for the 'users' table
            new_user_profile = UserProfile(**user_settings.dict())
            connection.execute(new_user_profile)
    except Exception as e:
        # Handle exceptions, log the error, or return a specific HTTP response
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

    return {"message": "User data inserted successfully"}
