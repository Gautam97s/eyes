from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from app.db.models import IncidentType


class LostReportCreate(BaseModel):
    id: str
    name: str
    zone: str
    description: str
    photo_url: Optional[str]
    reported_at: datetime


class LostMatchResult(BaseModel):
    zone: str
    matched: bool
    confidence: float

class LostReportOut(BaseModel):
    id: str
    name: str
    zone: str
    description: str
    photo_url: Optional[str]
    reported_at: datetime


    class Config:
        orm_mode = True