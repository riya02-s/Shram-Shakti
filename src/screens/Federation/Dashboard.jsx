import React from 'react';
import { federationMetrics, forecastSummary } from '../../data/federationMockData';

export default function Dashboard({ onNavigate }) {
  const {
    totalWorkers,
    totalBookings,
    emergencyRequests,
    averageRating,
    activeSocieties,
    pendingDisputes,
    growthStats
  } = federationMetrics;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
              Federation Level
            </span>
            <span className="text-xs text-gray-500">Apex Cooperative Governance</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">Federation Overview & Metrics</h1>
          <p className="text-sm text-gray-600">
            Cross-society monitoring, resource allocation, and key performance indicators.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-gray-500">System Status</p>
            <p className="text-xs font-semibold text-emerald-600 flex items-center justify-end gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              All 12 Cooperatives Online
            </p>
          </div>
        </div>
      </div>

      {/* Main Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Workers */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-gray-500">Total Workers</span>
            <span className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </span>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-bold text-gray-900">{totalWorkers}</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              {growthStats.workersMoM} MoM
            </span>
          </div>
          <p className="mt-2 text-xs text-gray-500">Registered across 12 member cooperatives</p>
        </div>

        {/* Total Bookings */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-gray-500">Total Bookings</span>
            <span className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </span>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-bold text-gray-900">{totalBookings.toLocaleString()}</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              {growthStats.bookingsMoM} MoM
            </span>
          </div>
          <p className="mt-2 text-xs text-gray-500">Cumulative platform service requests</p>
        </div>

        {/* Emergency Requests */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-gray-500">Emergency Requests</span>
            <span className="p-2.5 bg-amber-50 text-amber-600 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </span>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-bold text-amber-600">{emergencyRequests}</span>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              {growthStats.emergencyChange} this wk
            </span>
          </div>
          <p className="mt-2 text-xs text-gray-500">Radius-widened priority dispatches</p>
        </div>

        {/* Average Rating */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-gray-500">Average Rating</span>
            <span className="p-2.5 bg-yellow-50 text-yellow-600 rounded-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-bold text-gray-900">{averageRating} <span className="text-sm font-normal text-gray-500">/ 5.0</span></span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              {growthStats.ratingTrend}
            </span>
          </div>
          <p className="mt-2 text-xs text-gray-500">Calculated across verified completed jobs</p>
        </div>
      </div>

      {/* Secondary Quick-Status Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-blue-700 font-semibold uppercase">Affiliated Societies</p>
            <p className="text-xl font-bold text-gray-900 mt-0.5">{activeSocieties} Active</p>
          </div>
          <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-md font-medium">100% Compliant</span>
        </div>

        <div className="bg-gradient-to-r from-rose-50 to-orange-50 rounded-xl p-4 border border-rose-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-rose-700 font-semibold uppercase">Open Escalations</p>
            <p className="text-xl font-bold text-rose-900 mt-0.5">{pendingDisputes} Pending</p>
          </div>
          <span className="text-xs bg-rose-200 text-rose-800 px-2 py-1 rounded-md font-medium">Action Required</span>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4 border border-amber-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-amber-800 font-semibold uppercase">Forecast Alert</p>
            <p className="text-xs text-amber-900 mt-0.5 font-medium line-clamp-1">Weekend demand surge expected</p>
          </div>
          <span className="text-xs bg-amber-200 text-amber-900 px-2 py-1 rounded-md font-semibold">Simulated</span>
        </div>
      </div>

      {/* Federation Operational Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Fair Allocation Protocol
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white">
              Deterministic 5-Factor Scoring Active Across All Zones
            </h3>
            <p className="text-sm text-slate-300 max-w-2xl">
              Workload Fairness factor (10% weight) prevents worker exhaustion by distributing jobs away from heavily loaded workers.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg text-slate-300">
              Avg Fairness: <strong className="text-white">0.95 / 1.0</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

