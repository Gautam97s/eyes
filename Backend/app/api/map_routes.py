from fastapi import APIRouter
from typing import List
from app.models.map import zoneData
from app.services.crowd import get_mock_zone_data

router = APIRouter()

@router.get("/map_data", response_model=List[zoneData])
def get_map_data():
    return get_mock_zone_data()

@router.get("/zones/heatmap", response_model=List[zoneData])
def get_heatmap():
    return get_mock_zone_data()

