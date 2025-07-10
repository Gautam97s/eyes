import random
from app.models.drone import DroneResponse

def dispatch_drone(zone: str) -> DroneResponse:
    return DroneResponse(
        drone_id=f"drone-{random.randint(100,999)}",
        eta_minutes=round(random.uniform(1.5, 4.0), 2),
        video_feed_url=f"https://drishti.fakefeed.live/{zone.replace(' ', '').lower()}"
    )