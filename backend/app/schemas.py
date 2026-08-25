from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from .models import StatusEnum, SeverityEnum, IncidentStatusEnum, CVESeverityEnum, CVEStatusEnum, BackupTypeEnum, BackupStatusEnum

class ServerBase(BaseModel):
    name: str
    hostname: str
    ip_address: str
    os_type: str
    ssh_port: int = 22

class ServerCreate(ServerBase):
    pass

class ServerOut(ServerBase):
    id: int
    status: StatusEnum
    cpu_usage: float
    memory_usage: float
    disk_usage: float
    last_check: datetime
    uptime_percent: float
    created_at: datetime
    class Config:
        orm_mode = True

class IncidentBase(BaseModel):
    title: str
    description: str
    severity: SeverityEnum

class IncidentCreate(IncidentBase):
    server_id: int

class IncidentOut(IncidentBase):
    id: int
    server_id: int
    status: IncidentStatusEnum
    created_at: datetime
    resolved_at: Optional[datetime] = None
    downtime_seconds: int
    class Config:
        orm_mode = True

class CVEBase(BaseModel):
    cve_id: str
    product: str
    vendor: str
    severity: CVESeverityEnum
    cvss_score: float
    description: str
    affected_versions: str
    status: CVEStatusEnum
    published_date: datetime

class CVEOut(CVEBase):
    id: int
    created_at: datetime
    class Config:
        orm_mode = True

class BackupBase(BaseModel):
    server_id: int
    backup_type: BackupTypeEnum

class BackupCreate(BackupBase):
    pass

class BackupOut(BackupBase):
    id: int
    file_path: Optional[str] = None
    file_size_bytes: Optional[int] = None
    checksum: Optional[str] = None
    status: BackupStatusEnum
    started_at: datetime
    completed_at: Optional[datetime] = None
    retry_count: int
    class Config:
        orm_mode = True

class HealthCheckBase(BaseModel):
    endpoint_url: str
    method: str = "GET"
    expected_status: int = 200

class HealthCheckCreate(HealthCheckBase):
    pass

class HealthCheckOut(HealthCheckBase):
    id: int
    actual_status: Optional[int] = None
    response_time_ms: Optional[int] = None
    ssl_expiry_date: Optional[datetime] = None
    is_healthy: bool
    checked_at: datetime
    class Config:
        orm_mode = True
