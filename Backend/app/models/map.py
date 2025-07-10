from pydantic import BaseModel
from typing import List

class zoneData(BaseModel):
    zone: str
    latitude: float
    longitude: float
    density: float
    risk_level: str
    