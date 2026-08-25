# n8n Workflows

This directory contains the automation workflows for OpsFlow.

## How to Import
1. Open your n8n web interface (usually `http://localhost:5678`)
2. In the left sidebar, click on "Workflows" -> "Add workflow"
3. In the top right menu (...), select "Import from File"
4. Select the JSON files from this directory

## Included Workflows
- `server_monitor.json`: Checks server health every 5 minutes and triggers incidents.
- `cve_monitor.json`: Daily sync of CVEs and matches against known server assets.
- `backup_automation.json`: Nightly trigger to backup servers.
- `incident_recovery.json`: Webhook handler to auto-resolve incidents when health checks pass.
