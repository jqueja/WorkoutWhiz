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


    if not result:
        # Raise an HTTPException with a 404 status code and an error message
        #raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        return {"message": "No workouts found for the user", "user_id": str(user_id)}

    
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


@router.post("/{user_id}/delete")
def delete_workout(user_id: UUID, userWorkouts: UserWorkouts):
    with db.engine.begin() as connection:
        to_delete = connection.execute(sqlalchemy.text(
        """ 
        SELECT workout_log.log_id AS id_to_delete, wl_id
        FROM workout_log
        JOIN weighlifting ON weighlifting.log_id = workout_log.log_id
        WHERE user_id = :user_id AND date = :date AND lift_name = :lift_name AND weight = :weight AND sets = :sets AND reps = :reps
        """
        ), {"user_id": user_id, "date": userWorkouts.date, "lift_name": userWorkouts.lift_name,
            "weight": userWorkouts.weight, "sets": userWorkouts.sets, "reps": userWorkouts.reps}).fetchone()

        print("to_delete", to_delete)
        if to_delete is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Workout not found")
        # print(to_delete.id_to_delete)

        delete_id = connection.execute(sqlalchemy.text(
            """
            DELETE FROM workout_log
            WHERE log_id = :log_id
            RETURNING log_id
            """
        ), {"log_id": to_delete.id_to_delete}).scalar()
        
    if delete_id is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Workout not found")
    
    return "OK"