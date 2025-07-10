from pydantic import BaseModel

class AnomalyInput(BaseModel):
    image_url: str

class AnomalyResult(BaseModel):
    detected: bool
    anomaly_type: str
    confidence: float

