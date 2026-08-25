import React, { useState } from 'react';
import StatusBadge from '../components/StatusBadge';
import { ShieldAlert, Scan, ExternalLink } from 'lucide-react';

export default function CVE() {
  const [cves] = useState([
    { id: 'CVE-2023-4863', title: 'WebP Heap Buffer Overflow', cvss: 8.8, product: 'Linux', affected: 3, status: 'INVESTIGATING', published: '2023-09-12' },
    { id: 'CVE-2024-21626', title: 'runc container breakout', cvss: 8.6, product: 'Docker', affected: 5, status: 'NEW', published: '2024-01-31' },
    { id: 'CVE-2023-38545', title: 'curl SOCKS5 heap buffer overflow', cvss: 9.8, product: 'Linux', affected: 1, status: 'PATCHED', published: '2023-10-11' },
    { id: 'CVE-2023-20887', title: 'VMware Aria Operations RCE', cvss: 9.8, product: 'VMware', affected: 0, status: 'NEW', published: '2023-06-07' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Vulnerability Intelligence</h2>
          <p className="text-sm text-gray-400 mt-1">Synced with NVD database • Last sync: 2 hours ago</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Scan className="h-4 w-4" />
          <span>Trigger Scan</span>
        </button>
      </div>

      <div className="card">
        <div className="flex space-x-2 mb-6">
          {['All Products', 'Linux', 'Docker', 'VMware', 'Cisco'].map(prod => (
            <button key={prod} className={`px-4 py-1.5 rounded-full text-sm font-medium border ${prod === 'All Products' ? 'bg-blue-600/20 text-blue-400 border-blue-500/50' : 'bg-dark-900 text-gray-400 border-dark-600 hover:text-white'}`}>
              {prod}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-dark-700 text-sm text-gray-400 uppercase">
                <th className="pb-3 px-4">CVE ID</th>
                <th className="pb-3 px-4">Vulnerability</th>
                <th className="pb-3 px-4">CVSS</th>
                <th className="pb-3 px-4">Product</th>
                <th className="pb-3 px-4">Affected Assets</th>
                <th className="pb-3 px-4">Workflow Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {cves.map((cve) => (
                <tr key={cve.id} className="hover:bg-dark-900/50">
                  <td className="py-4 px-4 font-mono text-sm">
                    <a href="#" className="text-blue-400 hover:underline flex items-center">
                      {cve.id} <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm font-medium">{cve.title}</div>
                    <div className="text-xs text-gray-500">Published: {cve.published}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${cve.cvss >= 9.0 ? 'bg-red-900/80 text-red-200' : 'bg-orange-900/80 text-orange-200'}`}>
                      {cve.cvss}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-300">{cve.product}</td>
                  <td className="py-4 px-4">
                    <span className={`text-sm font-medium ${cve.affected > 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {cve.affected} servers
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={cve.status} />
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
