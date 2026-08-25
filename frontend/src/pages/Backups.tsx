import React, { useState } from 'react';
import StatusBadge from '../components/StatusBadge';
import { Database, Play, CheckCircle } from 'lucide-react';

export default function Backups() {
  const [jobs] = useState([
    { id: 'BKP-001', server: 'db-prod-01', type: 'Full PostgreSQL', size: '45.2 GB', duration: '45m', status: 'SUCCESS', date: 'Today, 02:00 AM' },
    { id: 'BKP-002', server: 'web-front-01', type: 'Config & App Data', size: '2.1 GB', duration: '5m', status: 'VERIFIED', date: 'Today, 03:00 AM' },
    { id: 'BKP-003', server: 'worker-03', type: 'Full System', size: '-', duration: '12m', status: 'FAILED', date: 'Yesterday, 02:00 AM' },
    { id: 'BKP-004', server: 'auth-service', type: 'Database Dump', size: '500 MB', duration: '2m', status: 'RUNNING', date: 'Now' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Backup & Recovery</h2>
          <p className="text-sm text-gray-400 mt-1">Coordinated via n8n automation workflows</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Play className="h-4 w-4" />
          <span>Run Backup Job</span>
        </button>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-dark-700 text-sm text-gray-400 uppercase">
                <th className="pb-3 px-4">Job ID</th>
                <th className="pb-3 px-4">Source Server</th>
                <th className="pb-3 px-4">Type</th>
                <th className="pb-3 px-4">Size</th>
                <th className="pb-3 px-4">Status</th>
                <th className="pb-3 px-4">Timestamp</th>
                <th className="pb-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-dark-900/50">
                  <td className="py-4 px-4 font-mono text-sm text-gray-400">{job.id}</td>
                  <td className="py-4 px-4 font-medium flex items-center">
                    <Database className="h-4 w-4 mr-2 text-gray-500" /> {job.server}
                  </td>
                  <td className="py-4 px-4 text-sm">{job.type}</td>
                  <td className="py-4 px-4 text-sm font-mono">{job.size}</td>
                  <td className="py-4 px-4">
                    <StatusBadge status={job.status} />
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-400">{job.date}</td>
                  <td className="py-4 px-4 text-right">
                    {job.status === 'SUCCESS' && (
                      <button className="text-purple-400 hover:text-purple-300 text-sm flex items-center ml-auto">
                        <CheckCircle className="h-4 w-4 mr-1" /> Verify Integrity
                      </button>
                    )}
                    {job.status === 'FAILED' && (
                      <button className="text-blue-400 hover:text-blue-300 text-sm">Retry</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
