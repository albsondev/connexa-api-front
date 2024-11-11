import React from 'react';

interface StatsCardProps {
  title: string;
  value: number;
  description: string;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, description, color }) => {
  return (
    <div className={`p-4 rounded-lg shadow-md bg-${color}-100`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default StatsCard;
