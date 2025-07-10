from pydantic import BaseModel, Field
from datetime import datetime
from enum import Enum as PyEnum

class IncidentType(str, PyEnum):
    fire = "fire"
    medical = "medical"
    disturbance = "disturbance"
    unknown = "unknown"

class IncidentReport(BaseModel):
    id: str
    type: IncidentType
    description: str
    zone: str
    latitude: float
    longitude: float
    reported_at: datetime

class IncidentResponse(IncidentReport):
    class Config:
        orm_mode = True