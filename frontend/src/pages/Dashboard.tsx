import React, { useState, useEffect } from 'react';
import MetricCard from '../components/MetricCard';
import StatusBadge from '../components/StatusBadge';
import { Server, AlertTriangle, Shield, HardDrive } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  const cveData = [
    { name: 'Critical', value: 12, color: '#ef4444' },
    { name: 'High', value: 34, color: '#f97316' },
    { name: 'Medium', value: 56, color: '#eab308' },
  ];

  const backupData = [
    { day: 'Mon', size: 120 }, { day: 'Tue', size: 132 },
    { day: 'Wed', size: 101 }, { day: 'Thu', size: 142 },
    { day: 'Fri', size: 190 }, { day: 'Sat', size: 210 },
    { day: 'Sun', size: 215 },
  ];

  if (loading) return <div className="animate-pulse">Loading dashboard...</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Servers Online" value="42/45" icon={Server} trend="↑ 98% Uptime" trendUp={true} />
        <MetricCard title="Open Incidents" value="3" icon={AlertTriangle} trend="↓ 2 from yst" trendUp={true} />
        <MetricCard title="Critical CVEs" value="12" icon={Shield} trend="↑ 1 from yst" trendUp={false} />
        <MetricCard title="Backup Success" value="99.2%" icon={HardDrive} trend="↑ 0.5%" trendUp={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Server Status List */}
        <div className="card">
          <h3 className="text-lg font-medium text-white mb-4">Critical Servers</h3>
          <div className="space-y-3">
            {['db-prod-01', 'web-front-01', 'worker-03', 'auth-service'].map((server, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-dark-900 rounded-md border border-dark-700">
                <span className="font-medium">{server}</span>
                <StatusBadge status={i === 2 ? 'DOWN' : 'UP'} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Incidents */}
        <div className="card">
          <h3 className="text-lg font-medium text-white mb-4">Recent Incidents</h3>
          <div className="space-y-3">
            {[
              { id: 104, title: 'API latency high in US-East', status: 'OPEN' },
              { id: 103, title: 'Redis memory limit reached', status: 'INVESTIGATING' },
              { id: 102, title: 'SSL expiry warning on payment GW', status: 'OPEN' },
              { id: 101, title: 'Worker node crash loop', status: 'RESOLVED' },
            ].map((inc) => (
              <div key={inc.id} className="flex justify-between items-center p-3 bg-dark-900 rounded-md border border-dark-700">
                <div>
                  <span className="text-gray-400 text-xs">#{inc.id}</span>
                  <p className="font-medium text-sm">{inc.title}</p>
                </div>
                <StatusBadge status={inc.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Charts */}
        <div className="card">
          <h3 className="text-lg font-medium text-white mb-4">CVE Severity Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={cveData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {cveData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-medium text-white mb-4">Backup Timeline (GB)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={backupData}>
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
                <Bar dataKey="size" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
