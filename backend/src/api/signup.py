from fastapi import APIRouter, Request, HTTPException, status
from pydantic import BaseModel
import sqlalchemy
from src import database as db

from supabase import create_client

