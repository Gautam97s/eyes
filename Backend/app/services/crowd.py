from typing import List
from app.models.map import zoneData
import random

def get_mock_zone_data() -> List[zoneData]:
    return [
        zoneData(zone="Zone A", latitude=12.9716, longitude=77.5946, density=0.72, risk_level="moderate"),
        zoneData(zone="Zone B", latitude=15.9716, longitude=79.5946, density=0.88, risk_level="high"),
        zoneData(zone="Zone C", latitude=18.5204, longitude=73.8567, density=0.34, risk_level="low"),
    ]