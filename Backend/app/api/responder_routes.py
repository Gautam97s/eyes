from app.services.responder import get_all_responders
from fastapi import APIRouter

router = APIRouter()

@router.get("/responder")
def list_responders():
    return get_all_responders()
