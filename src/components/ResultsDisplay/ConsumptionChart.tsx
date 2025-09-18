import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface ConsumptionChartProps {
  title: string;
  chartData: { name: string; kwh: number }[];
}

export const ConsumptionChart = ({
  title,
  chartData,
}: ConsumptionChartProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="kwh" fill="#16a34a" radius={[8, 8, 0, 0]} name="kWh" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
