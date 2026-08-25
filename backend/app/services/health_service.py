import httpx
import datetime
from ..models import HealthCheck
from ..database import SessionLocal

async def check_endpoint(endpoint: HealthCheck):
    async with httpx.AsyncClient() as client:
        try:
            # resp = await client.request(endpoint.method, endpoint.endpoint_url)
            # update endpoint
            pass
        except Exception:
            endpoint.is_healthy = False

def check_ssl_expiry(hostname: str):
    pass

async def check_all_endpoints():
    db = SessionLocal()
    endpoints = db.query(HealthCheck).all()
    for endpoint in endpoints:
        await check_endpoint(endpoint)
    db.commit()
    db.close()
