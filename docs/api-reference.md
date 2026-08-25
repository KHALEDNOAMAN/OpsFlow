# API Reference

The OpsFlow API is RESTful and uses JSON for serialization.

## Base URL
`/api`

## Endpoints

### Servers
- `GET /servers/` - List all registered servers.
- `POST /servers/` - Register a new server.
- `GET /servers/{id}` - Get specific server details.
- `POST /servers/{id}/check` - Force an immediate health check.

### Incidents
- `GET /incidents/` - List incidents (supports ?status= filter).
- `POST /incidents/` - Create a new incident.
- `PATCH /incidents/{id}` - Update incident status (e.g., to RESOLVED).

### CVE
- `GET /cve/` - List known vulnerabilities.
- `POST /cve/scan` - Trigger a sync from the NVD database.
- `POST /cve/match-assets` - Correlate CVEs with registered servers based on OS/Product.

### Backups
- `GET /backups/` - List recent backup jobs.
- `POST /backups/` - Trigger a new backup for a server.
- `POST /backups/{id}/verify` - Trigger integrity verification.

## Authentication
Currently uses basic API key authentication via the `X-API-Key` header.
