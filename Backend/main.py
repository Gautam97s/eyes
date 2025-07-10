from fastapi import FastAPI
from app.db.database import Base, engine
from app.api import incident_routes, summary_routes, map_routes, dispatch_routes, lost_routes, nl_summary_routes, anomaly_routes, drone_routes, responder_routes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Project Eyes API")

Base.metadata.create_all(bind = engine)



def add_cors_middleware(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000","http://127.0.0.1:3000"],  # your frontend origin
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

add_cors_middleware(app)


app.include_router(incident_routes.router, prefix='/api')
app.include_router(summary_routes.router, prefix='/api' )
app.include_router(map_routes.router, prefix='/api' )
app.include_router(dispatch_routes.router, prefix='/api')
app.include_router(lost_routes.router, prefix='/api')
app.include_router(nl_summary_routes.router, prefix='/api')
app.include_router(anomaly_routes.router, prefix='/api')
app.include_router(drone_routes.router, prefix='/api')
app.include_router(responder_routes.router, prefix='/api')
