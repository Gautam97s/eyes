from pydantic import BaseModel


class DroneRequest(BaseModel):
    zone: str

class DroneResponse(BaseModel):
    drone_id: str
    eta_minutes: float
    video_feed_url: str

