<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=timeGradient&height=250&section=header&text=OpsFlow&fontSize=90&animation=fadeIn&fontAlignY=38&desc=Unified%20IT%20Operations%20%26%20Monitoring%20Platform&descAlignY=51&descAlign=62"/>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/n8n-FF6D5A?style=for-the-badge&logo=n8n&logoColor=white"/>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
</div>

## Overview

OpsFlow is a unified IT operations and monitoring platform designed for modern infrastructure teams. It provides a centralized dashboard for tracking server health, managing incidents, monitoring security vulnerabilities (CVEs), and automating backup workflows. Built with automation in mind, OpsFlow leverages n8n workflows to automate repetitive administrative tasks and incident responses.

The platform bridges the gap between different operational domains by correlating server health with vulnerability metrics and backup statuses. It enables IT administrators to shift from reactive firefighting to proactive management, identifying potential risks before they cause downtime. By integrating with existing IT ecosystems, OpsFlow acts as the nervous system for your infrastructure operations.

Designed to be deployed anywhere, OpsFlow is fully containerized and cloud-agnostic. Whether you manage a small fleet of on-premise servers or a sprawling multi-cloud architecture, OpsFlow's modular design ensures that you only deploy the components you need, while its API-first backend allows for seamless extensibility and custom integrations.

## Architecture

```text
+-------------------+       +-------------------+       +-------------------+
|                   |       |                   |       |                   |
|   React Frontend  |<----->|   FastAPI Backend |<----->|   PostgreSQL DB   |
|   (Vite, Tailwind)|       |   (Python 3.11)   |       |   (Relational)    |
|                   |       |                   |       |                   |
+-------------------+       +-------------------+       +-------------------+
                                ^   ^   ^
                                |   |   |
                                |   |   |
+-------------------+           |   |   |           +-------------------+
|                   |           |   |   |           |                   |
|   n8n Workflows   |<----------+   |   +---------->|   Redis Cache     |
|   (Automation)    |               |               |   (Task Queue)    |
|                   |               |               |                   |
+-------------------+               |               +-------------------+
                                    |
+-------------------+               |               +-------------------+
|                   |               |               |                   |
|  Prometheus &     |<--------------+               |  External APIs    |
|  Grafana (Mon)    |                               |  (NVD, Webhooks)  |
|                   |                               |                   |
+-------------------+                               +-------------------+
```

## Module Overview

| Module | Description | Key Components |
|--------|-------------|----------------|
| **Core Monitoring** | Real-time server health tracking | Ping, SSH, Resource usage |
| **Incident Mgmt** | Tracking and resolving operational issues | Alerting, Timeline, RCA |
| **CVE Intel** | Vulnerability tracking and asset mapping | NVD Sync, Risk scoring |
| **Backup Automation** | Coordinating and verifying backups | Schedules, Integrity checks |

## Key Features

1. Real-time server health and uptime tracking
2. Agentless monitoring via SSH and HTTP checks
3. Automated incident creation for failed health checks
4. Incident lifecycle management and resolution tracking
5. Automated CVE database synchronization from NVD
6. Asset mapping to match vulnerabilities to affected systems
7. CVSS risk scoring and prioritized patching workflows
8. Centralized backup scheduling and coordination
9. Automated backup integrity verification
10. API health and SSL certificate monitoring
11. Extensible automation via n8n workflows
12. Role-based access control and audit logging
13. Dark-mode native, responsive React dashboard
14. RESTful API for external integrations
15. Prometheus metrics export for advanced observability

## Tech Stack

| Component | Technology | Description |
|-----------|------------|-------------|
| **Frontend** | React, Vite, Tailwind CSS, Lucide | Fast, modern, responsive UI |
| **Backend** | Python, FastAPI, SQLAlchemy, Pydantic | High-performance async API |
| **Database** | PostgreSQL | Relational data storage |
| **Cache/Queue**| Redis | Task queue and ephemeral state |
| **Automation** | n8n | Node-based workflow automation |
| **Monitoring** | Prometheus, Grafana | Metrics collection and visualization |
| **Deployment** | Docker, Docker Compose | Containerized full-stack deployment |

## Screenshots

```text
+-------------------------------------------------------------+
| OpsFlow [Dashboard] Servers | Incidents | CVE | Backups     |
+-------------------------------------------------------------+
| Servers Online      Open Incidents     Critical CVEs        |
| [ 42 / 45 ] ^98%    [ 3 ] -2 from yst  [ 12 ] +1 from yst   |
+-------------------------------------------------------------+
| Server Status                      Recent Incidents         |
| [UP] db-prod-01 (99.9%)            [#104] API latency high  |
| [UP] web-front-01 (99.9%)          [#103] Redis memory limit|
| [DOWN] worker-03 (0.0%)            [#102] SSL expiry warning|
+-------------------------------------------------------------+
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/KHALEDNOAMAN/OpsFlow.git
   cd OpsFlow
   ```

2. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your specific configuration
   ```

3. Start the stack with Docker Compose:
   ```bash
   docker-compose up -d
   ```

4. Access the services:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8000`
   - n8n Workflows: `http://localhost:5678`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/servers/` | List all servers |
| POST | `/api/servers/{id}/check` | Trigger manual health check |
| GET | `/api/incidents/` | List all incidents |
| POST | `/api/cve/scan` | Trigger vulnerability scan |
| GET | `/api/backups/` | List backup jobs |

## n8n Workflows

OpsFlow includes several pre-configured n8n workflows located in the `workflows/` directory:
- `server_monitor.json`: Periodically checks server health and creates incidents
- `cve_monitor.json`: Daily sync of vulnerability databases and asset matching
- `backup_automation.json`: Coordinates backup tasks and verifies integrity
- `incident_recovery.json`: Automates resolution when systems recover

## Environment Variables

Key variables required in `.env`:
- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
- `REDIS_URL`
- `N8N_BASIC_AUTH_USER`, `N8N_BASIC_AUTH_PASSWORD`
- `API_SECRET_KEY`

## Roadmap

- [x] Initial full-stack scaffolding
- [x] Server monitoring dashboard
- [x] Incident management module
- [ ] Active Directory integration
- [ ] Custom reporting engine
- [ ] Slack/Teams bot integration

## Contributing
Please read `CONTRIBUTING.md` for details on our code of conduct, and the process for submitting pull requests to us.

## License
This project is licensed under the MIT License - see the `LICENSE` file for details.
