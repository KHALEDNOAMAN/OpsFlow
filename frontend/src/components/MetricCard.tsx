import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Props {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

const MetricCard: React.FC<Props> = ({ title, value, icon: Icon, trend, trendUp }) => {
  return (
    <div className="card flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
        </div>
        <div className="p-2 bg-dark-700 rounded-lg">
          <Icon className="h-5 w-5 text-blue-400" />
        </div>
      </div>
      {trend && (
        <div className="mt-auto">
          <span className={`text-sm ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
            {trend}
          </span>
          <span className="text-gray-500 text-sm ml-2">vs last week</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
