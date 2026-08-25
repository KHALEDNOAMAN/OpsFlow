from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from .. import models, schemas

router = APIRouter()

@router.get("/", response_model=List[schemas.BackupOut])
def list_backups(db: Session = Depends(get_db)):
    return db.query(models.Backup).all()

@router.post("/", response_model=schemas.BackupOut)
def trigger_backup(backup: schemas.BackupCreate, db: Session = Depends(get_db)):
    db_backup = models.Backup(**backup.dict())
    db.add(db_backup)
    db.commit()
    db.refresh(db_backup)
    return db_backup

@router.get("/{backup_id}", response_model=schemas.BackupOut)
def get_backup(backup_id: int, db: Session = Depends(get_db)):
    backup = db.query(models.Backup).filter(models.Backup.id == backup_id).first()
    if not backup:
        raise HTTPException(status_code=404, detail="Backup not found")
    return backup

@router.post("/{backup_id}/verify")
def verify_backup(backup_id: int, db: Session = Depends(get_db)):
    return {"detail": "Verification initiated"}

@router.get("/schedule")
def get_schedule():
    return []

@router.get("/stats")
def get_stats():
    return {"success_rate": 100.0, "total_size": 0}
