from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import sqlalchemy
from src import database as db
from datetime import date

router = APIRouter(
    prefix="/workouts",
    tags=["workouts"],
)

class UserSettings(BaseModel):
    first_name: str = None
    last_name: str = None
    dob: str = None
    age: str = None
    gender: str = None
    weight: str = None
    height_ft: str = None

@router.get("/{user_id}")
def settings_info(user_id: int):
    with db.engine.begin() as connection:
        result = connection.execute(sqlalchemy.text(
            """
            SELECT user_id, first_name, last_name, weight, age, gender, dob, height
            FROM users
            WHERE user_id = :user_id
            """
        ), {"user_id": user_id}).first()

    if result is None:
        # Raise an HTTPException with a 404 status code and an error message
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    return {
        "user_id": result.user_id, 
        "first_name": result.first_name,
        "last_name": result.last_name,
        "weight": result.weight,
        "age": result.age,
        "gender": result.gender,
        "dob": result.dob,
        "height": result.height
    }