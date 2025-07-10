from app.models.anomaly import AnomalyInput
from app.services.anomaly import detect_anomaly_from_img
from fastapi import APIRouter

router = APIRouter()

@router.post('/anomaly')
def anomaly_check(data: AnomalyInput):
    return detect_anomaly_from_img(data.image_url)