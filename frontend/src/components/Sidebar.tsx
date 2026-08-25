import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Server, AlertTriangle, Shield, HardDrive, Activity } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Servers', path: '/servers', icon: Server },
    { name: 'Incidents', path: '/incidents', icon: AlertTriangle },
    { name: 'CVE Intelligence', path: '/cve', icon: Shield },
    { name: 'Backups', path: '/backups', icon: HardDrive },
    { name: 'Health Checks', path: '/health', icon: Activity },
  ];

  return (
    <div className="w-64 bg-dark-800 border-r border-dark-700 flex flex-col h-full">
      <div className="h-16 flex items-center px-6 border-b border-dark-700">
        <div className="flex items-center space-x-2 text-blue-500">
          <Activity className="h-6 w-6" />
          <span className="text-lg font-bold text-white tracking-wider">OpsFlow</span>
        </div>
      </div>
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-600/10 text-blue-500'
                    : 'text-gray-400 hover:bg-dark-700 hover:text-gray-200'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
      <div className="p-4 border-t border-dark-700 text-xs text-gray-500">
        v1.0.0 (Production)
      </div>
    </div>
  );
};

export default Sidebar;
