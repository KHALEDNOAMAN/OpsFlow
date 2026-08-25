from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from .. import models, schemas
import datetime

router = APIRouter()

@router.get("/", response_model=List[schemas.ServerOut])
def list_servers(db: Session = Depends(get_db)):
    return db.query(models.Server).all()

@router.post("/", response_model=schemas.ServerOut)
def add_server(server: schemas.ServerCreate, db: Session = Depends(get_db)):
    db_server = models.Server(**server.dict())
    db.add(db_server)
    db.commit()
    db.refresh(db_server)
    return db_server

@router.get("/{server_id}", response_model=schemas.ServerOut)
def get_server(server_id: int, db: Session = Depends(get_db)):
    db_server = db.query(models.Server).filter(models.Server.id == server_id).first()
    if not db_server:
        raise HTTPException(status_code=404, detail="Server not found")
    return db_server

@router.delete("/{server_id}")
def delete_server(server_id: int, db: Session = Depends(get_db)):
    db_server = db.query(models.Server).filter(models.Server.id == server_id).first()
    if not db_server:
        raise HTTPException(status_code=404, detail="Server not found")
    db.delete(db_server)
    db.commit()
    return {"detail": "Server deleted"}

@router.post("/{server_id}/check")
def manual_check(server_id: int, db: Session = Depends(get_db)):
    # Trigger manual check logic
    return {"detail": "Check initiated"}

@router.get("/{server_id}/metrics")
def get_server_metrics(server_id: int, db: Session = Depends(get_db)):
    # Return metrics history (mocked)
    return {"cpu": [10, 20, 15], "ram": [50, 55, 52], "disk": [80, 80, 80]}
