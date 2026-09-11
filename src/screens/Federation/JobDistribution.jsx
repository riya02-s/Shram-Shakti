import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { jobDistributionData } from '../../data/federationMockData';

export default function JobDistribution() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Plumbing', 'Electrical', 'Cleaning', 'Carpentry', 'Gardening'];

  const filteredData = useMemo(() => {
    if (selectedCategory === 'All') return jobDistributionData;
    return jobDistributionData.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const totalAssigned = useMemo(
    () => filteredData.reduce((acc, curr) => acc + curr.jobsAssigned, 0),
    [filteredData]
  );

  const totalCompleted = useMemo(
    () => filteredData.reduce((acc, curr) => acc + curr.jobsCompleted, 0),
    [filteredData]
  );

  const avgFairness = useMemo(() => {
    if (filteredData.length === 0) return 0;
    const sum = filteredData.reduce((acc, curr) => acc + curr.fairnessScore, 0);
    return ((sum / filteredData.length) * 100).toFixed(1);
  }, [filteredData]);

  return (
    <div className="p-3 sm:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-4 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
              Fair Allocation Engine
            </span>
            <span className="text-xs text-gray-500">Cross-Worker Workload Balancer</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1 leading-tight">Job Distribution Analytics</h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Audit job assignment equity across cooperative workers to verify workload fairness.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 bg-gray-100 p-1.5 rounded-lg border border-gray-200">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedCategory === cat
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Jobs Assigned / Completed</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {totalAssigned} <span className="text-sm font-normal text-gray-400">/ {totalCompleted} completed</span>
            </p>
          </div>
          <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-semibold">
            {Math.round((totalCompleted / (totalAssigned || 1)) * 100)}% Fulfilled
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Fairness Index</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">{avgFairness}%</p>
          </div>
          <span className="p-2 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold">
            Optimal Balance
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Workers Monitored</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{filteredData.length}</p>
          </div>
          <span className="p-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold">
            Active Pool
          </span>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Workload Assignment Comparison</h2>
            <p className="text-xs text-gray-500">Visualizing assigned vs. completed volume per worker</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-600 mt-2 sm:mt-0">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-indigo-600 inline-block"></span>
              <span>Jobs Assigned</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block"></span>
              <span>Jobs Completed</span>
            </div>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData} margin={{ top: 10, right: 20, left: -10, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis
                dataKey="workerName"
                angle={-20}
                textAnchor="end"
                interval={0}
                tick={{ fontSize: 11, fill: '#4B5563' }}
              />
              <YAxis tick={{ fontSize: 11, fill: '#4B5563' }} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="jobsAssigned" name="Assigned" fill="#4F46E5" radius={[4, 4, 0, 0]} maxBarSize={36} />
              <Bar dataKey="jobsCompleted" name="Completed" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Fairness Formula Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-sm text-blue-900">
        <div>
          <span className="font-semibold text-blue-950">Fair Allocation Rule (Section 6.1):</span>{' '}
          <code className="text-xs bg-blue-100 px-2 py-0.5 rounded text-blue-800 font-mono">
            Score = 0.30(Skill) + 0.25(Avail) + 0.20(Dist) + 0.15(Rating) + 0.10(Workload Fairness)
          </code>
          <p className="text-xs text-blue-700 mt-1">
            Workers with fewer active assignments receive higher allocation priority to eliminate monopoly and ensure equitable earnings.
          </p>
        </div>
      </div>

      {/* Worker Detail Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-4 sm:px-6 py-3.5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Individual Worker Distribution</h2>
          <span className="text-xs text-gray-500">{filteredData.length} records shown</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-4 sm:px-5 py-3">Worker Name</th>
                <th className="px-4 sm:px-5 py-3">Category</th>
                <th className="px-4 sm:px-5 py-3 text-center">Assigned</th>
                <th className="px-4 sm:px-5 py-3 text-center">Completed</th>
                <th className="px-4 sm:px-5 py-3">Fairness Score</th>
                <th className="px-4 sm:px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((worker) => (
                <tr key={worker.workerName} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 sm:px-5 py-3 font-medium text-gray-900">{worker.workerName}</td>
                  <td className="px-4 sm:px-5 py-3 text-gray-600">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {worker.category}
                    </span>
                  </td>
                  <td className="px-4 sm:px-5 py-3 text-center font-semibold text-gray-800">{worker.jobsAssigned}</td>
                  <td className="px-4 sm:px-5 py-3 text-center text-emerald-600 font-semibold">{worker.jobsCompleted}</td>
                  <td className="px-4 sm:px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${worker.fairnessScore * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-gray-600">
                        {worker.fairnessScore.toFixed(2)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5">
                    <span
                      className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        worker.status === 'Optimal'
                          ? 'bg-emerald-100 text-emerald-800'
                          : worker.status === 'High Load'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {worker.status}
                    </span>
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

