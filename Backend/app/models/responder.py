from pydantic import BaseModel
from typing import List

class Responder(BaseModel):
    id: str
    name: str
    location: List[float]