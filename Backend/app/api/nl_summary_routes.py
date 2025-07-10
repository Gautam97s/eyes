from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models.summary_nl import NLQuery, NLSummaryResponse
from app.db.database import sessionLocal
from app.services.summary_nl import generate_summary_from_prompt

router = APIRouter()

def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/nl_summary", response_model=NLSummaryResponse)
def get_nl_summary(data: NLQuery, db:Session = Depends(get_db)):
    summary = generate_summary_from_prompt(data.prompt, db)
    return {"summary": summary}