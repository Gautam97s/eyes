from app.models.responder import Responder


def get_all_responders():
    return[
        Responder(id="responder-001", name="Aplha Team", location=[28.7041, 77.1025]),
        Responder(id="responder-002", name="Charlie Team", location=[30.7041, 80.1025]),
        Responder(id="responder-003", name="Bravo Team", location=[34.7041, 87.1025])
    ]