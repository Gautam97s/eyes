from app.db.models import Incident
from app.models.dispatch import DispatchResponse
from app.db.responder import responders
from geopy.distance import geodesic
from sqlalchemy.orm import Session

def assign_responder_to_incident(incident_id: str, db: Session) -> DispatchResponse:
    incident = db.query(Incident).filter(Incident.id == incident_id).first()
    if not incident:
        raise Exception("Incident not found")
    
    if incident.latitude is None or incident.longitude is None:
        raise Exception("Incident location is incomplete")
    
    incident_loc: tuple[float, float]  = (float(incident.latitude), float(incident.longitude))
    best_responder = None
    shortest_distance = float("inf")

    for r in responders:
        r_loc = (r["latitude"], r["longitude"])
        distance = geodesic(r_loc, incident_loc).km
        if distance < shortest_distance:
            shortest_distance = distance
            best_responder = r

    if not best_responder:
        raise Exception("No responders available")

    return DispatchResponse(
        responder_id = best_responder["id"],
        responder_name = best_responder["name"],
        responder_location = (best_responder["latitude"], best_responder["longitude"]),
        incident_location = incident_loc,
        distance_km = round(shortest_distance, 2)
    )