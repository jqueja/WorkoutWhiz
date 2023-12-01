from fastapi import FastAPI, exceptions
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import ValidationError
from src.api import settings, login, signup, info, workouts
import json
import logging
import sys

description = """
Workout Whiz
"""

app = FastAPI(
    title="Workout Whiz",
    description=description,
    version="0.0.1",
    terms_of_service="http://example.com/terms/",
    contact={
        "name": "Parshana Sekhon",
        "email": "pasekhon@calpoly.edu",
    },
)

# Enable CORS
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(settings.router)
app.include_router(login.router)
# app.include_router(login.router)
# app.include_router(login.router)
app.include_router(signup.router)
# app.include_router(info.router)
app.include_router(workouts.router)

@app.exception_handler(exceptions.RequestValidationError)
@app.exception_handler(ValidationError)
async def validation_exception_handler(request, exc):
    logging.error(f"The client sent invalid data!: {exc}")
    exc_json = json.loads(exc.json())
    response = {"message": [], "data": None}
    for error in exc_json:
        response['message'].append(f"{error['loc']}: {error['msg']}")

    return JSONResponse(response, status_code=422)

@app.get("/")
async def root():
    return {"message": "Welcome To Workout Whiz!"}