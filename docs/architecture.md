# OpsFlow Architecture

OpsFlow is built on a modern, decoupled architecture designed for high availability and extensibility.

## Core Components

1. **Frontend (React / Vite)**
   - Single Page Application built with React 18.
   - Styling provided by Tailwind CSS.
   - Communicates exclusively via REST API.

2. **Backend API (FastAPI)**
   - High-performance asynchronous API in Python 3.11.
   - SQLAlchemy ORM for database interactions.
   - Pydantic for strict schema validation.

3. **Data Layer (PostgreSQL & Redis)**
   - PostgreSQL for relational, persistent data (servers, incidents, CVEs).
   - Redis for ephemeral state, caching, and task queues.

4. **Automation Engine (n8n)**
   - Handles long-running workflows, scheduling, and external integrations.
   - Triggers API endpoints inside the Backend.

5. **Monitoring (Prometheus & Grafana)**
   - Collects system metrics from the backend.
   - Grafana provides deep-dive analytical dashboards.

## Network Flow

- All external traffic goes through the React frontend or directly to the API Gateway.
- n8n exists within the private Docker network, interacting safely with the backend without exposing automation logic to the public web.
