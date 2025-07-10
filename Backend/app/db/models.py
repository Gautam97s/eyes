from sqlalchemy import Column, String, Float, DateTime, Enum, Boolean
from app.db.database import Base
import enum
from datetime import datetime


class IncidentType(str, enum.Enum):
    fire = "fire"
    medical = "medical"
    disturbance = "disturbance"
    unknown = "unknown"

class Incident(Base):

    __tablename__ = "incidents"

    id = Column(String, primary_key=True, index=True)
    type = Column(Enum(IncidentType), nullable=False)
    description = Column(String, nullable=False)
    zone = Column(String, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    reported_at = Column(DateTime, nullable=False)


class LostReport(Base):
    __tablename__ = "lost_report"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    zone = Column(String, nullable=False)
    photo_url = Column(String, nullable=True)
    is_found = Column(Boolean, default=False)
    reported_at = Column(DateTime, nullable=False)

