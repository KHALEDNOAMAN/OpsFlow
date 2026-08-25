import React, { useState } from 'react';
import StatusBadge from '../components/StatusBadge';
import { Filter, Clock, CheckCircle2 } from 'lucide-react';

export default function Incidents() {
  const [incidents] = useState([
    { id: 'INC-104', title: 'API latency high in US-East', server: 'web-front-01', severity: 'HIGH', status: 'OPEN', created: '10 mins ago', duration: '-' },
    { id: 'INC-103', title: 'Redis memory limit reached', server: 'redis-cache-01', severity: 'MEDIUM', status: 'INVESTIGATING', created: '1 hour ago', duration: '-' },
    { id: 'INC-102', title: 'SSL expiry warning', server: 'auth-service', severity: 'LOW', status: 'OPEN', created: '3 hours ago', duration: '-' },
    { id: 'INC-101', title: 'Worker node crash loop', server: 'worker-03', severity: 'CRITICAL', status: 'RESOLVED', created: '1 day ago', duration: '45m' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Incident Response</h2>
        <button className="btn-primary">Declare Incident</button>
      </div>

      <div className="flex space-x-4 mb-4">
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-dark-800 border border-dark-700 rounded-md text-sm text-gray-300 hover:text-white">
          <Filter className="h-4 w-4" />
          <span>Status: All Active</span>
        </button>
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-dark-800 border border-dark-700 rounded-md text-sm text-gray-300 hover:text-white">
          <Filter className="h-4 w-4" />
          <span>Severity: All</span>
        </button>
      </div>

      <div className="grid gap-4">
        {incidents.map((inc) => (
          <div key={inc.id} className="card hover:border-dark-600 transition-colors">
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg mt-1 ${
                  inc.severity === 'CRITICAL' ? 'bg-red-900/50 text-red-400' :
                  inc.severity === 'HIGH' ? 'bg-orange-900/50 text-orange-400' :
                  inc.severity === 'MEDIUM' ? 'bg-yellow-900/50 text-yellow-400' : 'bg-blue-900/50 text-blue-400'
                }`}>
                  <AlertIcon severity={inc.severity} />
                </div>
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <span className="text-gray-400 text-sm font-mono">{inc.id}</span>
                    <StatusBadge status={inc.status} />
                  </div>
                  <h3 className="text-lg font-medium text-white">{inc.title}</h3>
                  <div className="text-sm text-gray-400 mt-2 flex items-center space-x-4">
                    <span>Affected: <strong className="text-gray-300">{inc.server}</strong></span>
                    <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {inc.created}</span>
                    {inc.status === 'RESOLVED' && <span className="flex items-center text-green-400"><CheckCircle2 className="h-3 w-3 mr-1" /> TTRes: {inc.duration}</span>}
                  </div>
                </div>
              </div>
              <button className="text-sm text-blue-400 hover:text-blue-300">View Details &rarr;</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AlertIcon({ severity }: { severity: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
      <path d="M12 9v4"/>
      <path d="M12 17h.01"/>
    </svg>
  );
}
