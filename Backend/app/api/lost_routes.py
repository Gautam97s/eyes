from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.db.database import sessionLocal
from app.models.lost import LostReportCreate
from app.db.models import LostReport
from app.services.lost_ai import find_lost_person
from app.services.lost_ai import list_lost_report


router = APIRouter()

def get_db():
    db = sessionLocal()
    try: 
        yield db
    finally:
        db.close()


@router.post('/lost')
def report_lost_person(data: LostReportCreate, db: Session = Depends(get_db)):
    report = LostReport(**data.dict())
    db.add(report)
    db.commit()
    return{"message": "Lost person report recieved", "id": data.id}


@router.get('/lost/find')
def scan_for_lost_person(photo_url: str = Query(...)):
    return find_lost_person(photo_url)

@router.get('/lost')
def list_all_lost_reports(db: Session = Depends(get_db)):
    return list_lost_report(db)
