from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Enum, Boolean
from sqlalchemy.orm import relationship
import enum
import datetime
from .database import Base

class StatusEnum(enum.Enum):
    UP = "UP"
    DOWN = "DOWN"
    UNKNOWN = "UNKNOWN"

class SeverityEnum(enum.Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"

class IncidentStatusEnum(enum.Enum):
    OPEN = "OPEN"
    INVESTIGATING = "INVESTIGATING"
    RESOLVED = "RESOLVED"

class CVESeverityEnum(enum.Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"

class CVEStatusEnum(enum.Enum):
    NEW = "NEW"
    INVESTIGATING = "INVESTIGATING"
    PATCHED = "PATCHED"
    IGNORED = "IGNORED"

class BackupTypeEnum(enum.Enum):
    FULL = "FULL"
    INCREMENTAL = "INCREMENTAL"
    CONFIG = "CONFIG"

class BackupStatusEnum(enum.Enum):
    RUNNING = "RUNNING"
    SUCCESS = "SUCCESS"
    FAILED = "FAILED"
    VERIFIED = "VERIFIED"

class Server(Base):
    __tablename__ = "servers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    hostname = Column(String, unique=True, index=True)
    ip_address = Column(String)
    os_type = Column(String)
    ssh_port = Column(Integer, default=22)
    status = Column(Enum(StatusEnum), default=StatusEnum.UNKNOWN)
    cpu_usage = Column(Float, default=0.0)
    memory_usage = Column(Float, default=0.0)
    disk_usage = Column(Float, default=0.0)
    last_check = Column(DateTime, default=datetime.datetime.utcnow)
    uptime_percent = Column(Float, default=100.0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    incidents = relationship("Incident", back_populates="server")
    backups = relationship("Backup", back_populates="server")
    assets = relationship("Asset", back_populates="server")

class Incident(Base):
    __tablename__ = "incidents"
    id = Column(Integer, primary_key=True, index=True)
    server_id = Column(Integer, ForeignKey("servers.id"))
    title = Column(String)
    description = Column(String)
    severity = Column(Enum(SeverityEnum))
    status = Column(Enum(IncidentStatusEnum), default=IncidentStatusEnum.OPEN)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    resolved_at = Column(DateTime, nullable=True)
    downtime_seconds = Column(Integer, default=0)

    server = relationship("Server", back_populates="incidents")

class CVE(Base):
    __tablename__ = "cves"
    id = Column(Integer, primary_key=True, index=True)
    cve_id = Column(String, unique=True, index=True)
    product = Column(String)
    vendor = Column(String)
    severity = Column(Enum(CVESeverityEnum))
    cvss_score = Column(Float)
    description = Column(String)
    affected_versions = Column(String)
    status = Column(Enum(CVEStatusEnum), default=CVEStatusEnum.NEW)
    published_date = Column(DateTime)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    matches = relationship("CVEAssetMatch", back_populates="cve")

class Asset(Base):
    __tablename__ = "assets"
    id = Column(Integer, primary_key=True, index=True)
    server_id = Column(Integer, ForeignKey("servers.id"))
    product_name = Column(String)
    version = Column(String)
    category = Column(String)

    server = relationship("Server", back_populates="assets")
    matches = relationship("CVEAssetMatch", back_populates="asset")

class CVEAssetMatch(Base):
    __tablename__ = "cve_asset_matches"
    id = Column(Integer, primary_key=True, index=True)
    cve_id = Column(Integer, ForeignKey("cves.id"))
    asset_id = Column(Integer, ForeignKey("assets.id"))
    matched_at = Column(DateTime, default=datetime.datetime.utcnow)

    cve = relationship("CVE", back_populates="matches")
    asset = relationship("Asset", back_populates="matches")

class Backup(Base):
    __tablename__ = "backups"
    id = Column(Integer, primary_key=True, index=True)
    server_id = Column(Integer, ForeignKey("servers.id"))
    backup_type = Column(Enum(BackupTypeEnum))
    file_path = Column(String)
    file_size_bytes = Column(Integer)
    checksum = Column(String)
    status = Column(Enum(BackupStatusEnum), default=BackupStatusEnum.RUNNING)
    started_at = Column(DateTime, default=datetime.datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
    retry_count = Column(Integer, default=0)

    server = relationship("Server", back_populates="backups")

class HealthCheck(Base):
    __tablename__ = "health_checks"
    id = Column(Integer, primary_key=True, index=True)
    endpoint_url = Column(String)
    method = Column(String, default="GET")
    expected_status = Column(Integer, default=200)
    actual_status = Column(Integer, nullable=True)
    response_time_ms = Column(Integer, nullable=True)
    ssl_expiry_date = Column(DateTime, nullable=True)
    is_healthy = Column(Boolean, default=False)
    checked_at = Column(DateTime, default=datetime.datetime.utcnow)
