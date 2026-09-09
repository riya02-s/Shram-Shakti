import React, { useState, useMemo } from 'react';
import { societiesData } from '../../data/federationMockData';

export default function Societies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredSocieties = useMemo(() => {
    return societiesData.filter((soc) => {
      const matchesSearch =
        soc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        soc.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        soc.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'All' || soc.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const totalWorkers = useMemo(
    () => societiesData.reduce((sum, s) => sum + s.workers, 0),
    []
  );

  const totalBookings = useMemo(
    () => societiesData.reduce((sum, s) => sum + s.bookings, 0),
    []
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
              Federation Registry
            </span>
            <span className="text-xs text-gray-500">Cooperative Society Directory</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">Affiliated Primary Cooperatives</h1>
          <p className="text-sm text-gray-600">
            Federation-level oversight of registered worker societies, active workforce, and compliance status.
          </p>
        </div>

        {/* Action / Badges */}
        <div className="flex items-center gap-2">
          <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-lg font-medium">
            Active Societies: {societiesData.filter((s) => s.status === 'Active').length} / {societiesData.length}
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Affiliated Societies</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{societiesData.length}</p>
          </div>
          <span className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Total Cooperative Workforce</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{totalWorkers}</p>
          </div>
          <span className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Total Completed Bookings</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{totalBookings.toLocaleString()}</p>
          </div>
          <span className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search cooperative by name, location, or ID..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5 bg-gray-50 p-1 rounded-lg border border-gray-200 text-xs">
          {['All', 'Active', 'Under Review'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Societies Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Cooperative Societies Table</h2>
          <span className="text-xs text-gray-500">{filteredSocieties.length} societies listed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-6 py-3.5">Society Name</th>
                <th className="px-6 py-3.5">Location & Zone</th>
                <th className="px-6 py-3.5 text-center">Workers</th>
                <th className="px-6 py-3.5 text-center">Bookings</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Lead Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredSocieties.map((society) => (
                <tr key={society.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{society.name}</div>
                    <div className="text-xs text-gray-400 font-mono mt-0.5">{society.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900 font-medium">{society.location}</div>
                    <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[11px] font-medium bg-gray-100 text-gray-600">
                      {society.zone} Zone
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                      {society.workers}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center font-semibold text-gray-800">
                    {society.bookings.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        society.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          society.status === 'Active' ? 'bg-emerald-600' : 'bg-amber-600'
                        }`}
                      ></span>
                      {society.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-gray-600">
                    {society.leadContact}
                  </td>
                </tr>
              ))}
              {filteredSocieties.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500 text-sm">
                    No cooperative societies match your current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

