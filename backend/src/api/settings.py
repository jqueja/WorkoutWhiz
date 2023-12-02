from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import sqlalchemy
from src import database as db
from datetime import date
from uuid import UUID

router = APIRouter(
    prefix="/settings",
    tags=["settings"],
)

class UserSettings(BaseModel):
    first_name: str = None
    last_name: str = None
    dob: date = None
    age: int = None
    gender: str = None
    weight: int = None
    height: int = None

@router.get("/{id}")
def settings_info(id: UUID):
    with db.engine.begin() as connection:
        result = connection.execute(sqlalchemy.text(
            """
            SELECT id, first_name, last_name, weight, age, gender, dob, height
            FROM users
            WHERE id = :id
            """
        ), {"id": id}).first()

    if result is None:
        # Raise an HTTPException with a 404 status code and an error message
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    return {
        "id": result.id, 
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
    user_id: UUID, 
    settings: UserSettings
):
    with db.engine.begin() as connection:
        # Build the SET clause based on provided fields
        
        current_date = date.today()
        set_clause = ", ".join(
            f"{field} = :{field}" for field, value in settings.dict().items() 
            if value not in ["string", current_date, 0, None] and field != 'id'
        )
        print(set_clause)
        # Update the user settings
        result = connection.execute(sqlalchemy.text(
            f"""
            UPDATE users
            SET {set_clause}
            WHERE id = :user_id
            """
        ), {"user_id": user_id, **settings.dict()})

    # Optionally, you can return the updated user settings
    if result != None:
        return {"message": "User settings updated successfully"}
    else:
        error_message = "Invalid updating of settings"
        raise HTTPException(status_code=400, detail=error_message)