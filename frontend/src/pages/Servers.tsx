import React, { useState } from 'react';
import StatusBadge from '../components/StatusBadge';
import { Search, Plus, RefreshCw, Terminal } from 'lucide-react';

export default function Servers() {
  const [servers] = useState([
    { id: 1, hostname: 'db-prod-01', ip: '10.0.1.15', os: 'Ubuntu 22.04', status: 'UP', cpu: 45, ram: 82, uptime: '99.99%', lastCheck: '2m ago' },
    { id: 2, hostname: 'web-front-01', ip: '10.0.2.10', os: 'Debian 11', status: 'UP', cpu: 23, ram: 45, uptime: '99.95%', lastCheck: '2m ago' },
    { id: 3, hostname: 'worker-03', ip: '10.0.3.55', os: 'Ubuntu 20.04', status: 'DOWN', cpu: 0, ram: 0, uptime: '85.40%', lastCheck: '5m ago' },
    { id: 4, hostname: 'auth-service', ip: '10.0.1.20', os: 'Alpine 3.18', status: 'UP', cpu: 12, ram: 30, uptime: '100%', lastCheck: '1m ago' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Server Fleet</h2>
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Server</span>
        </button>
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input type="text" placeholder="Search servers..." className="input-field pl-10" />
          </div>
          <button className="p-2 hover:bg-dark-700 rounded-md text-gray-400 transition-colors">
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-dark-700 text-sm text-gray-400 uppercase tracking-wider">
                <th className="pb-3 px-4">Hostname</th>
                <th className="pb-3 px-4">IP / OS</th>
                <th className="pb-3 px-4">Status</th>
                <th className="pb-3 px-4">Resources (CPU/RAM)</th>
                <th className="pb-3 px-4">Uptime</th>
                <th className="pb-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {servers.map((server) => (
                <tr key={server.id} className="hover:bg-dark-900/50 transition-colors">
                  <td className="py-4 px-4 font-medium flex items-center space-x-3">
                    <Terminal className="h-5 w-5 text-gray-500" />
                    <span>{server.hostname}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm">{server.ip}</div>
                    <div className="text-xs text-gray-500">{server.os}</div>
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={server.status} />
                    <div className="text-xs text-gray-500 mt-1">Checked {server.lastCheck}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-2 w-48">
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="w-8 text-gray-400">CPU</span>
                        <div className="flex-1 bg-dark-900 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full ${server.cpu > 80 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${server.cpu}%` }}></div>
                        </div>
                        <span className="w-8 text-right">{server.cpu}%</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="w-8 text-gray-400">RAM</span>
                        <div className="flex-1 bg-dark-900 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full ${server.ram > 80 ? 'bg-red-500' : 'bg-purple-500'}`} style={{ width: `${server.ram}%` }}></div>
                        </div>
                        <span className="w-8 text-right">{server.ram}%</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-mono text-sm">{server.uptime}</td>
                  <td className="py-4 px-4 text-right">
                    <button className="text-blue-400 hover:text-blue-300 text-sm font-medium mr-3">Check</button>
                    <button className="text-gray-400 hover:text-white text-sm font-medium">Edit</button>
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
