import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Servers
export const getServers = () => api.get('/servers/');
export const addServer = (data: any) => api.post('/servers/', data);
export const checkServer = (id: number) => api.post(`/servers/${id}/check`);

// Incidents
export const getIncidents = () => api.get('/incidents/');
export const createIncident = (data: any) => api.post('/incidents/', data);
export const resolveIncident = (id: number) => api.patch(`/incidents/${id}`, { status: 'RESOLVED' });

// CVEs
export const getCVEs = () => api.get('/cve/');
export const scanCVEs = (products: string[]) => api.post('/cve/scan', { products });

// Backups
export const getBackups = () => api.get('/backups/');
export const triggerBackup = (serverId: number) => api.post('/backups/', { server_id: serverId });
export const verifyBackup = (id: number) => api.post(`/backups/${id}/verify`);

// Health
export const getHealthChecks = () => api.get('/health/');

export default api;
