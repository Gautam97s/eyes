import random
from app.models.lost import LostMatchResult
from sqlalchemy.orm import Session
from app.db.models import LostReport
from app.models.lost import LostReportOut

def list_lost_report(db: Session):
    results = db.query(LostReport).all()
    return [LostReportOut.from_orm(r) for r in results]

def find_lost_person(photo_url: str) -> list[LostMatchResult]:
    zones = ["zone A", "zone B", "zone C"]
    
    zone_scores = []
    for zone in zones:
        confidence = round(random.uniform(0.5, 0.99), 2)
        zone_scores.append((zone, confidence))

    # Pick the best match
    best_zone, best_score = max(zone_scores, key=lambda x: x[1])

    # Threshold to accept match
    threshold = 0.75
    if best_score >= threshold:
        return [
            LostMatchResult(
                zone=best_zone,
                matched=True,
                confidence=best_score
            )
        ]
    else:
        return [] 