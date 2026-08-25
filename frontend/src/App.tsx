import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Servers from './pages/Servers';
import Incidents from './pages/Incidents';
import CVE from './pages/CVE';
import Backups from './pages/Backups';
import Health from './pages/Health';

function App() {
  return (
    <div className="flex h-screen bg-dark-900 overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <header className="h-16 border-b border-dark-700 bg-dark-800 flex items-center px-6 shadow-sm sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-white">OpsFlow Control Center</h1>
          <div className="ml-auto flex items-center space-x-4">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold">
              KN
            </div>
          </div>
        </header>
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/servers" element={<Servers />} />
            <Route path="/incidents" element={<Incidents />} />
            <Route path="/cve" element={<CVE />} />
            <Route path="/backups" element={<Backups />} />
            <Route path="/health" element={<Health />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
