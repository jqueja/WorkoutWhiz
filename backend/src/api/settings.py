from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import sqlalchemy
from src import database as db
from datetime import date

router = APIRouter(
    prefix="/settings",
    tags=["settings"],
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

@router.post("/update/{user_id}")
def update_user_settings(
    user_id: int, 
    settings: UserSettings
):
    with db.engine.begin() as connection:
        # Build the SET clause based on provided fields
        set_clause = ", ".join(
            f"{field} = :{field}" for field, value in settings.dict().items() if value is not None
        )

        # Update the user settings
        connection.execute(sqlalchemy.text(
            f"""
            UPDATE users
            SET {set_clause}
            WHERE user_id = :user_id
            """
        ), {"user_id": user_id, **settings.dict()})

    # Optionally, you can return the updated user settings
    return {"message": "User settings updated successfully"}