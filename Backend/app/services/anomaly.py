import random 
from app.models.anomaly import AnomalyResult

def detect_anomaly_from_img(url: str) -> AnomalyResult:
    types = ["fire", "smoke", "panic", "none"]
    detected_type = random.choice(types)
    return AnomalyResult(
        detected = detected_type != "none",
        anomaly_type = detected_type,
        confidence = round(random.uniform(0.75, 0.99), 2) if detected_type != "none" else 0.0
    )