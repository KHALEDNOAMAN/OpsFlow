from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from .. import models, schemas
from pydantic import BaseModel

router = APIRouter()

@router.get("/", response_model=List[schemas.IncidentOut])
def list_incidents(status: str = None, severity: str = None, db: Session = Depends(get_db)):
    query = db.query(models.Incident)
    if status:
        query = query.filter(models.Incident.status == status)
    if severity:
        query = query.filter(models.Incident.severity == severity)
    return query.all()

@router.post("/", response_model=schemas.IncidentOut)
def create_incident(incident: schemas.IncidentCreate, db: Session = Depends(get_db)):
    db_incident = models.Incident(**incident.dict())
    db.add(db_incident)
    db.commit()
    db.refresh(db_incident)
    return db_incident

class StatusUpdate(BaseModel):
    status: models.IncidentStatusEnum

@router.patch("/{incident_id}/status", response_model=schemas.IncidentOut)
def update_status(incident_id: int, update: StatusUpdate, db: Session = Depends(get_db)):
    incident = db.query(models.Incident).filter(models.Incident.id == incident_id).first()
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    incident.status = update.status
    if update.status == models.IncidentStatusEnum.RESOLVED:
        import datetime
        incident.resolved_at = datetime.datetime.utcnow()
    db.commit()
    db.refresh(incident)
    return incident

@router.get("/{incident_id}", response_model=schemas.IncidentOut)
def get_incident(incident_id: int, db: Session = Depends(get_db)):
    incident = db.query(models.Incident).filter(models.Incident.id == incident_id).first()
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    return incident

@router.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    open_count = db.query(models.Incident).filter(models.Incident.status == "OPEN").count()
    return {"open_incidents": open_count, "avg_resolution_time": 0}
