from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from .database import engine, Base
from .routers import servers, incidents, cve, backups, health
import asyncio

Base.metadata.create_all(bind=engine)

app = FastAPI(title="OpsFlow API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(servers.router, prefix="/servers", tags=["servers"])
app.include_router(incidents.router, prefix="/incidents", tags=["incidents"])
app.include_router(cve.router, prefix="/cve", tags=["cve"])
app.include_router(backups.router, prefix="/backups", tags=["backups"])
app.include_router(health.router, prefix="/health-checks", tags=["health"])

scheduler = AsyncIOScheduler()

@app.on_event("startup")
async def startup_event():
    # Start scheduler for periodic checks
    scheduler.start()
    print("Scheduler started...")

    # TODO: Add scheduled jobs here
    # scheduler.add_job(monitor_service.check_all_servers, 'interval', minutes=5)
    # scheduler.add_job(health_service.check_all_endpoints, 'interval', minutes=1)

@app.get("/health")
async def root_health():
    return {"status": "OK"}
