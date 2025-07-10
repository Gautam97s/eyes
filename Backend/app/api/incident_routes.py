from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.models.incident import IncidentReport
from app.db import models
from app.db.database import sessionLocal
from app.db.models import Incident 
from typing import List
from app.models.incident import IncidentResponse

router = APIRouter()

def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post('/incidents', status_code=status.HTTP_201_CREATED )
def report_incident(data: IncidentReport, db: Session = Depends(get_db)):
    incident = models.Incident(
        id=data.id,
        type=data.type,
        description=data.description,
        zone=data.zone,
        latitude=data.latitude,
        longitude=data.longitude,
        reported_at=data.reported_at
    )
    db.add(incident)
    db.commit()
    db.refresh(incident)
    return {"message": "Incident recorded", "incident_id": incident.id}

@router.get("/incident", response_model=List[IncidentResponse])
def get_all_incidents(db: Session = Depends(get_db)):
    incidents = db.query(models.Incident).all()
    return incidents