from ..models import Backup, BackupTypeEnum, BackupStatusEnum, Server
import datetime

def run_backup(server: Server, backup_type: BackupTypeEnum):
    # SSH and run backup commands
    pass

def verify_backup(backup: Backup):
    pass

def retry_failed_backup(backup: Backup, max_retries=3):
    if backup.retry_count < max_retries:
        backup.retry_count += 1
        # retry
        pass

def cleanup_old_backups(server: Server, keep_days=30):
    pass
