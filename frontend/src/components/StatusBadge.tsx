import React from 'react';

interface Props {
  status: 'UP' | 'DOWN' | 'UNKNOWN' | 'CRITICAL' | 'SUCCESS' | 'FAILED' | 'RUNNING' | 'VERIFIED' | string;
}

const StatusBadge: React.FC<Props> = ({ status }) => {
  const getStyles = () => {
    switch (status.toUpperCase()) {
      case 'UP':
      case 'SUCCESS':
      case 'VERIFIED':
      case 'RESOLVED':
        return 'bg-green-900/50 text-green-400 border-green-800';
      case 'DOWN':
      case 'FAILED':
      case 'OPEN':
        return 'bg-red-900/50 text-red-400 border-red-800';
      case 'CRITICAL':
        return 'bg-red-900/50 text-red-400 border-red-800 animate-pulse font-bold';
      case 'UNKNOWN':
      case 'INVESTIGATING':
        return 'bg-yellow-900/50 text-yellow-400 border-yellow-800';
      case 'RUNNING':
        return 'bg-blue-900/50 text-blue-400 border-blue-800';
      default:
        return 'bg-gray-800 text-gray-400 border-gray-700';
    }
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs border ${getStyles()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
