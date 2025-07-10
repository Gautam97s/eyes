from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import sessionLocal
from app.models.dispatch import DispatchRequest, DispatchResponse
from app.services.dispatch import assign_responder_to_incident

router = APIRouter()

def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/dispatch", response_model=DispatchResponse)
def dispatch_unit(data: DispatchRequest, db: Session = Depends(get_db)):
    return assign_responder_to_incident(data.incident_id, db)