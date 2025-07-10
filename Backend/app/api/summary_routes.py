from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import sessionLocal
from app.services.summary_service import generate_zone_summary
from app.models.zone_summary import summaryResponse


router = APIRouter()

def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/summary", response_model=summaryResponse)
def get_summary(db: Session = Depends(get_db)):
    return generate_zone_summary(db)