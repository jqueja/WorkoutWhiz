from fastapi import APIRouter, Request
from pydantic import BaseModel
import sqlalchemy
from src import database as db

router = APIRouter(
    prefix="/settings",
    tags=["settings"],
)

class UserSettings(BaseModel):
    first_name: str
    last_name: str
    dob: str
    age: str
    gender: str
    weight: str
    height_ft: str

@router.get("/")
def settings_info():
    with db.engine.begin() as connection:
        result = connection.execute(sqlalchemy.text(
            """
            SELECT user_id, first_name, last_name, weight, age, gender, dob, height
            FROM users
            """
        )).first()
    
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