from collections import defaultdict
from sqlalchemy.orm import Session
from app.db.models import Incident, LostReport
from app.models.zone_summary import zoneSummary, Risklevel, summaryResponse

def generate_zone_summary(db: Session) -> summaryResponse:
    incidents = db.query(Incident).all()
    lost_reports = db.query(LostReport).filter_by(is_found=False).all()

    zone_map = defaultdict(list)
    lost_map = defaultdict(int) 

    for incident in incidents:
        zone_map[incident.zone].append(incident)

    for lost in lost_reports:
        lost_map[lost.zone] += 1


    summaries = []

    for zone, inc_list in zone_map.items():
        types = list({i.type for i in inc_list})
        total = len(inc_list)

        if total >= 5:
            risk = Risklevel.high
        elif total >= 2:
            risk = Risklevel.moderate
        else:
            risk = Risklevel.low

        summaries.append(
            zoneSummary(
                zone=zone,
                total_incidents=total,
                total_lost=lost_map.get(zone, 0),
                types=types,
                risk_level=risk
            )
        )
        
    for zone, lost_count in lost_map.items():
        if zone not in zone_map:
            summaries.append(
                zoneSummary(
                    zone=zone,
                    total_incidents=0,
                    total_lost=lost_count,
                    types=[],
                    risk_level=Risklevel.low
                )
            )

    return summaryResponse(summaries=summaries)