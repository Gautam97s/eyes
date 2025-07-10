from pydantic import BaseModel
from typing import List, Tuple

class Responder(BaseModel):
    id: str
    name: str
    latitude: float
    longitude: float

class DispatchRequest(BaseModel):
    incident_id: str

class DispatchResponse(BaseModel):
    responder_id: str
    responder_name: str
    responder_location: Tuple[float, float]
    incident_location: Tuple[float, float]
    distance_km: float