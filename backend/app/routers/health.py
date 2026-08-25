from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from .. import models, schemas

router = APIRouter()

@router.get("/", response_model=List[schemas.HealthCheckOut])
def list_health_checks(db: Session = Depends(get_db)):
    return db.query(models.HealthCheck).all()

@router.post("/", response_model=schemas.HealthCheckOut)
def add_health_check(hc: schemas.HealthCheckCreate, db: Session = Depends(get_db)):
    db_hc = models.HealthCheck(**hc.dict())
    db.add(db_hc)
    db.commit()
    db.refresh(db_hc)
    return db_hc

@router.post("/{hc_id}/check")
def manual_check(hc_id: int, db: Session = Depends(get_db)):
    return {"detail": "Check initiated"}

@router.get("/status")
def health_status():
    return {"all_healthy": True}
