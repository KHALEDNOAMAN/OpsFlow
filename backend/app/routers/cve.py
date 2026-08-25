from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from .. import models, schemas

router = APIRouter()

@router.get("/", response_model=List[schemas.CVEOut])
def list_cves(severity: str = None, db: Session = Depends(get_db)):
    query = db.query(models.CVE)
    if severity:
        query = query.filter(models.CVE.severity == severity)
    return query.all()

@router.post("/scan")
def trigger_cve_scan(db: Session = Depends(get_db)):
    # Trigger scan logic
    return {"detail": "Scan initiated"}

@router.get("/{cve_id}", response_model=schemas.CVEOut)
def get_cve(cve_id: int, db: Session = Depends(get_db)):
    cve = db.query(models.CVE).filter(models.CVE.id == cve_id).first()
    if not cve:
        raise HTTPException(status_code=404, detail="CVE not found")
    return cve

@router.patch("/{cve_id}/status")
def update_cve_status(cve_id: int, status: str, db: Session = Depends(get_db)):
    cve = db.query(models.CVE).filter(models.CVE.id == cve_id).first()
    if not cve:
        raise HTTPException(status_code=404, detail="CVE not found")
    cve.status = status
    db.commit()
    return cve

@router.get("/dashboard")
def cve_dashboard(db: Session = Depends(get_db)):
    return {"critical_count": 0, "trend": []}

@router.post("/match-assets")
def match_assets(db: Session = Depends(get_db)):
    return {"detail": "Assets matching initiated"}
