from sqlalchemy.orm import Session
from app.db.models import Incident, LostReport
from app.services.crowd import get_mock_zone_data


def generate_summary_from_prompt(prompt: str, db: Session) -> str:

    zone = None

    for z in ["Zone A", "Zone B", "Zone C"]:
        if z.lower() in prompt.lower():
            zone = z
            break

    if not zone:
        return "Please specify valid zone (eg., zone A, zone B)"
    

    

    incidents = db.query(Incident).filter(Incident.zone == zone).all()
    lost_reports = db.query(LostReport).filter(LostReport.zone == zone).all()
    crowd_data = next((z for z in get_mock_zone_data() if z.zone == zone), None)

    incident_summary = f"{len(incidents)} incident(s)" if incidents else "no incident"
    lost_summary = f"{len(lost_reports)} lost person report(s)" if lost_reports else "no lost reports"
    density = f"{int(crowd_data.density * 100)}%" if crowd_data else "unknown"

    return(
        f"In {zone}, there are {incident_summary},"
        f"{lost_summary}, and crowd density is aprox {density}."
    )
