import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { demandForecastData, forecastSummary } from '../../data/federationMockData';

export default function DemandForecast() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Categories', color: '#4F46E5' },
    { id: 'cleaning', label: 'Cleaning', color: '#10B981' },
    { id: 'plumbing', label: 'Plumbing', color: '#0EA5E9' },
    { id: 'electrical', label: 'Electrical', color: '#F59E0B' },
    { id: 'carpentry', label: 'Carpentry', color: '#8B5CF6' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
              AI Analytics Module
            </span>

            {/* MANDATORY SIMULATED FORECAST BADGE */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full bg-amber-100 text-amber-900 border border-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping inline-block"></span>
              Simulated Forecast
            </span>

            <span className="text-xs text-gray-500">Synthetic 90-Day Time-Series Pattern</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">Predictive Demand Forecast</h1>
          <p className="text-sm text-gray-600">
            Simulated service demand predictions to enable proactive workforce staging and cooperative load balancing.
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-500 font-medium">Horizon: {forecastSummary.forecastHorizon}</p>
          <span className="text-xs font-mono text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
            {forecastSummary.modelName}
          </span>
        </div>
      </div>

      {/* Simulated Forecast Alert Box */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="p-2 bg-amber-200 text-amber-800 rounded-lg shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Spike Alert (Simulated)
              </span>
            </div>
            <p className="text-sm font-semibold text-gray-900 mt-0.5">{forecastSummary.spikeAlert}</p>
            <p className="text-xs text-gray-700 mt-1">
              <strong>Federation Recommended Action:</strong> {forecastSummary.recommendedAction}
            </p>
          </div>
        </div>
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs font-medium text-gray-500 uppercase">Peak Demand Day</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">Saturday</p>
          <span className="text-xs text-rose-600 font-semibold mt-1 inline-block">+119% over weekday avg</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs font-medium text-gray-500 uppercase">Top Surge Category</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">Cleaning</p>
          <span className="text-xs text-gray-500 mt-1 inline-block">124 peak weekend requests</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs font-medium text-gray-500 uppercase">Avg Model Confidence</p>
          <p className="text-2xl font-bold text-indigo-600 mt-1">95.0%</p>
          <span className="text-xs text-emerald-600 font-semibold mt-1 inline-block">High confidence tier</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs font-medium text-gray-500 uppercase">Recommended Staging</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">+15 Reserve</p>
          <span className="text-xs text-gray-500 mt-1 inline-block">Deploy to North/South zones</span>
        </div>
      </div>

      {/* Line Chart Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-gray-900">Predicted Demand Trajectory (Next 7 Days)</h2>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-amber-100 text-amber-800 rounded">
                SIMULATED
              </span>
            </div>
            <p className="text-xs text-gray-500">Service requests volume forecasted per category and daily aggregate</p>
          </div>

          {/* Category Selector Tabs */}
          <div className="flex flex-wrap gap-1 bg-gray-100 p-1 rounded-lg border border-gray-200 text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-white text-gray-900 shadow-sm font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={demandForecastData} margin={{ top: 15, right: 25, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis dataKey="timeSlot" tick={{ fontSize: 11, fill: '#4B5563' }} />
              <YAxis tick={{ fontSize: 11, fill: '#4B5563' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend wrapperStyle={{ paddingTop: 12, fontSize: 12 }} />

              {(activeCategory === 'all' || activeCategory === 'all-total') && (
                <Line
                  type="monotone"
                  dataKey="predictedTotal"
                  name="Total Predicted Demand"
                  stroke="#4F46E5"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 7 }}
                />
              )}

              {(activeCategory === 'all' || activeCategory === 'cleaning') && (
                <Line
                  type="monotone"
                  dataKey="cleaning"
                  name="Cleaning"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              )}

              {(activeCategory === 'all' || activeCategory === 'plumbing') && (
                <Line
                  type="monotone"
                  dataKey="plumbing"
                  name="Plumbing"
                  stroke="#0EA5E9"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              )}

              {(activeCategory === 'all' || activeCategory === 'electrical') && (
                <Line
                  type="monotone"
                  dataKey="electrical"
                  name="Electrical"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              )}

              {(activeCategory === 'all' || activeCategory === 'carpentry') && (
                <Line
                  type="monotone"
                  dataKey="carpentry"
                  name="Carpentry"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Forecast Data Breakdown Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-gray-900">Forecast Schedule & Confidence Matrix</h2>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-100 text-amber-800">
              SIMULATED
            </span>
          </div>
          <span className="text-xs text-gray-500">7 Day Window</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-6 py-3.5">Day / Window</th>
                <th className="px-6 py-3.5 text-center">Plumbing</th>
                <th className="px-6 py-3.5 text-center">Electrical</th>
                <th className="px-6 py-3.5 text-center">Cleaning</th>
                <th className="px-6 py-3.5 text-center">Carpentry</th>
                <th className="px-6 py-3.5 text-center">Total Demand</th>
                <th className="px-6 py-3.5 text-center">Model Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {demandForecastData.map((row) => (
                <tr
                  key={row.timeSlot}
                  className={`hover:bg-gray-50 transition-colors ${
                    row.timeSlot.includes('Peak') ? 'bg-amber-50/40 font-medium' : ''
                  }`}
                >
                  <td className="px-6 py-3.5 text-gray-900 flex items-center gap-2">
                    {row.timeSlot}
                    {row.timeSlot.includes('Peak') && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                        Peak Spike
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-3.5 text-center text-gray-700">{row.plumbing}</td>
                  <td className="px-6 py-3.5 text-center text-gray-700">{row.electrical}</td>
                  <td className="px-6 py-3.5 text-center text-gray-700">{row.cleaning}</td>
                  <td className="px-6 py-3.5 text-center text-gray-700">{row.carpentry}</td>
                  <td className="px-6 py-3.5 text-center font-bold text-indigo-700">
                    {row.predictedTotal}
                  </td>
                  <td className="px-6 py-3.5 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                      {row.confidence}
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

