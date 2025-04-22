'use client';
import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  LineChart, Line,
  PieChart, Pie, Cell,
  ResponsiveContainer
} from 'recharts';

import './kpis.css';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00c49f', '#ffbb28'];

export default function KPIPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('simulationResults');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setData(parsed);
      } catch (err) {
        console.error('Failed to parse simulationResults:', err);
      }
    }
  }, []);

  const isValid =
    data &&
    Array.isArray(data.waitingTime) &&
    Array.isArray(data.servingTime) &&
    Array.isArray(data.turnaroundTime) &&
    Array.isArray(data.completionTime);

  if (!isValid) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No simulation data available or data is incomplete.
      </p>
    );
  }

  const waiting = data.waitingTime ?? [];
  const service = data.servingTime ?? [];
  const turnaround = data.turnaroundTime ?? [];
  const completion = data.completionTime ?? [];

  const chartData = waiting.map((_, i) => ({
    name: `Customer ${i + 1}`,
    waitingTime: waiting[i],
    turnaroundTime: turnaround[i],
    serviceTime: service[i],
    completionTime: completion[i],
    responseTime: waiting[i],
    delay: Math.max(turnaround[i] - service[i], 0),
  }));

  return (
    <div className="kpi-container">
      <div className="kpi-wrapper">
        <h1 className="kpi-header">KPI Dashboard</h1>

        <div className="kpi-section">
          <h2 className="kpi-title">Customer Performance Overview</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="waitingTime" fill="#8884d8" />
              <Bar dataKey="serviceTime" fill="#82ca9d" />
              <Bar dataKey="turnaroundTime" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="kpi-section">
          <h2 className="kpi-title">Completion Time Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="completionTime" stroke="#ff7f50" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="kpi-section">
          <h2 className="kpi-title">Service Time Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="serviceTime"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="kpi-section">
          <h2 className="kpi-title">Response Time Per Customer</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="responseTime" stroke="#00c49f" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="kpi-section">
          <h2 className="kpi-title">Delay Per Customer</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="delay" fill="#ff4d4f" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
