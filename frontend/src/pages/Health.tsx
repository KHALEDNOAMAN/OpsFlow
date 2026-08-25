import React, { useState } from 'react';
import { Activity, Globe, Lock } from 'lucide-react';

export default function Health() {
  const [endpoints] = useState([
    { id: 1, name: 'Main API Gateway', url: 'https://api.opsflow.local/health', status: 'UP', latency: '45ms', type: 'API', ssl: 'Valid (245 days)' },
    { id: 2, name: 'Payment Webhook', url: 'https://pay.opsflow.local/ping', status: 'UP', latency: '120ms', type: 'Webhook', ssl: 'Valid (12 days)' },
    { id: 3, name: 'Legacy Auth Service', url: 'http://auth-legacy.internal:8080/status', status: 'DOWN', latency: '-', type: 'Internal', ssl: 'N/A' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">External Health Checks</h2>
        <button className="btn-primary">Add Endpoint</button>
      </div>

      <div className="grid gap-4">
        {endpoints.map((ep) => (
          <div key={ep.id} className="card flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`h-3 w-3 rounded-full ${ep.status === 'UP' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500 animate-pulse'}`}></div>
              <div>
                <h3 className="text-lg font-medium text-white">{ep.name}</h3>
                <div className="flex items-center text-sm text-gray-400 mt-1 space-x-3">
                  <span className="flex items-center"><Globe className="h-3 w-3 mr-1" /> {ep.url}</span>
                  <span className="px-1.5 py-0.5 bg-dark-700 rounded text-xs">{ep.type}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-8 text-sm">
              <div className="text-center">
                <div className="text-gray-500 mb-1">Latency</div>
                <div className={`font-mono ${ep.status === 'UP' ? 'text-white' : 'text-red-400'}`}>{ep.latency}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-500 mb-1 flex justify-center"><Lock className="h-4 w-4" /></div>
                <div className={ep.ssl.includes('days)') && parseInt(ep.ssl.match(/\d+/)![0]) < 30 ? 'text-yellow-400' : 'text-gray-300'}>{ep.ssl}</div>
              </div>
              <button className="px-3 py-1.5 border border-dark-600 rounded-md hover:bg-dark-700 text-gray-300">Check Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
