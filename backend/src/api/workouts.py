from fastapi import APIRouter, Request, HTTPException, status
from pydantic import BaseModel
from datetime import date, datetime
import sqlalchemy
from src import database as db
from uuid import UUID


router = APIRouter(
    prefix="/workouts",
    tags=["workouts"],
)

@router.get("/{user_id}")
def display_workouts_info(user_id: UUID):
    with db.engine.begin() as connection:
        result = connection.execute(sqlalchemy.text(
            """
            SELECT date, lift_name, weight, sets, reps
            FROM workout_log
            JOIN weighlifting ON weighlifting.log_id = workout_log.log_id
            WHERE user_id = :user_id
            """
        ), {"user_id": user_id}).fetchall()


    if result == []:
        # Raise an HTTPException with a 404 status code and an error message
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    final_array = []
    for exercise in result:
        final_array.append(
            {
                "date": exercise.date,
                "lift_name": exercise.lift_name, 
                "weight": exercise.weight,
                "sets": exercise.sets,
                "reps": exercise.reps
            }
        )
    return final_array

class UserWorkouts(BaseModel):
    date: date
    lift_name: str
    weight: int
    sets: int
    reps: int

@router.post("/{user_id}/update")
def update_workouts_info(user_id: UUID, userWorkouts: UserWorkouts):
    with db.engine.begin() as connection:
        result_id = connection.execute(sqlalchemy.text(
            """
            INSERT INTO workout_log (user_id, date)
            VALUES (:user_id, :date)
            RETURNING log_id
            """
        ), {"user_id": user_id, "date": userWorkouts.date}).scalar()

        if result_id is None:
        # Raise an HTTPException with a 404 status code and an error message
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Workout not found")

        result_workout = connection.execute(sqlalchemy.text(
            """
            INSERT INTO weighlifting (log_id, lift_name, weight, sets, reps)
            VALUES (:result_id, :lift_name, :weight, :sets, :reps)
            RETURNING wl_id
            """
        ), {"result_id": result_id, "lift_name": userWorkouts.lift_name, "weight": userWorkouts.weight, "sets": userWorkouts.sets, "reps": userWorkouts.reps}).scalar()

        if result_workout is None:
        # Raise an HTTPException with a 404 status code and an error message
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Workout not found")
    
    return "OK"
