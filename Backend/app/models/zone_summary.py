from pydantic import BaseModel
from typing import List
from enum import Enum

class Risklevel(str, Enum):
    low = "low"
    moderate = "moderate"
    high = "high"

class zoneSummary(BaseModel):
    zone: str
    total_incidents: int
    total_lost: int
    types: List[str]
    risk_level: Risklevel

class summaryResponse(BaseModel):
    summaries: List[zoneSummary]
    

