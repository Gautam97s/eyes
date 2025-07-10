from app.models.drone import DroneRequest
from app.services.drone import dispatch_drone
from fastapi import APIRouter

router = APIRouter()

@router.post('/dispatch_drone')
def drone_dispatch(data: DroneRequest):
    return dispatch_drone(data.zone)