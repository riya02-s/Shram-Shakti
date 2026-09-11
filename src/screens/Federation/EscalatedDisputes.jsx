import React, { useState, useMemo } from 'react';
import { escalatedDisputesData } from '../../data/federationMockData';

export default function EscalatedDisputes() {
  const [disputes, setDisputes] = useState(escalatedDisputesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedDispute, setSelectedDispute] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
    );
    if (selectedDispute && selectedDispute.id === id) {
      setSelectedDispute((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const filteredDisputes = useMemo(() => {
    return disputes.filter((d) => {
      const matchesSearch =
        d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.society.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.worker.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'All' || d.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [disputes, searchTerm, statusFilter]);

  const escalatedCount = useMemo(
    () => disputes.filter((d) => d.status === 'Escalated').length,
    [disputes]
  );
  const underReviewCount = useMemo(
    () => disputes.filter((d) => d.status === 'Under Review').length,
    [disputes]
  );
  const resolvedCount = useMemo(
    () => disputes.filter((d) => d.status === 'Resolved').length,
    [disputes]
  );

  return (
    <div className="p-3 sm:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-4 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-rose-100 text-rose-800">
              Dispute Resolution Bureau
            </span>
            <span className="text-xs text-gray-500">Tier-2 Federation Grievance Redressal</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1 leading-tight">Escalated Society Disputes</h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Unresolved grievances escalated from primary societies for federation arbitration.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200 px-3 py-1.5 rounded-lg">
            {escalatedCount} Active Escalations
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Immediate Escalations</p>
            <p className="text-2xl font-bold text-rose-600 mt-1">{escalatedCount}</p>
          </div>
          <span className="p-2.5 bg-rose-50 text-rose-600 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Under Federation Review</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">{underReviewCount}</p>
          </div>
          <span className="p-2.5 bg-amber-50 text-amber-600 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Resolved Cases</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">{resolvedCount}</p>
          </div>
          <span className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-gray-100 shadow-sm">
        {/* Search */}
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
            placeholder="Search by Dispute ID, Society, Issue, or names..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 bg-gray-50 p-1 rounded-lg border border-gray-200 text-xs">
          {['All', 'Escalated', 'Under Review', 'Resolved'].map((status) => (
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

      {/* Disputes Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-4 sm:px-6 py-3.5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Disputes Queue</h2>
          <span className="text-xs text-gray-500">{filteredDisputes.length} cases in view</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-4 sm:px-5 py-3">Dispute ID</th>
                <th className="px-4 sm:px-5 py-3">Society</th>
                <th className="px-4 sm:px-5 py-3">Issue Description</th>
                <th className="px-4 sm:px-5 py-3 hidden md:table-cell">Parties Involved</th>
                <th className="px-4 sm:px-5 py-3 hidden sm:table-cell">Escalated Date</th>
                <th className="px-4 sm:px-5 py-3">Status</th>
                <th className="px-4 sm:px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredDisputes.map((dispute) => (
                <tr key={dispute.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 sm:px-5 py-3 font-mono font-semibold text-gray-900 text-xs">
                    {dispute.id}
                  </td>
                  <td className="px-4 sm:px-5 py-3">
                    <div className="font-medium text-gray-900">{dispute.society}</div>
                    <span className="text-xs text-gray-500">{dispute.category}</span>
                  </td>
                  <td className="px-4 sm:px-5 py-3 max-w-[200px]">
                    <p className="text-gray-800 text-xs line-clamp-2 leading-relaxed font-medium">
                      {dispute.issue}
                    </p>
                    <span className="text-xs font-semibold text-gray-600">Disputed Amount: {dispute.amount}</span>
                  </td>
                  <td className="px-4 sm:px-5 py-3 text-xs text-gray-600 hidden md:table-cell">
                    <div><strong>Customer:</strong> {dispute.customer}</div>
                    <div><strong>Worker:</strong> {dispute.worker}</div>
                  </td>
                  <td className="px-4 sm:px-5 py-3 text-xs text-gray-500 font-mono hidden sm:table-cell">
                    {dispute.escalatedDate}
                  </td>
                  <td className="px-4 sm:px-5 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        dispute.status === 'Escalated'
                          ? 'bg-rose-100 text-rose-800'
                          : dispute.status === 'Under Review'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          dispute.status === 'Escalated'
                            ? 'bg-rose-600'
                            : dispute.status === 'Under Review'
                            ? 'bg-amber-600'
                            : 'bg-emerald-600'
                        }`}
                      ></span>
                      {dispute.status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-5 py-3 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      {dispute.status !== 'Under Review' && dispute.status !== 'Resolved' && (
                        <button
                          onClick={() => handleStatusChange(dispute.id, 'Under Review')}
                          className="px-2.5 py-1 text-xs font-medium rounded-md bg-amber-50 text-amber-800 hover:bg-amber-100 transition-colors"
                        >
                          Review
                        </button>
                      )}
                      {dispute.status !== 'Resolved' && (
                        <button
                          onClick={() => handleStatusChange(dispute.id, 'Resolved')}
                          className="px-2.5 py-1 text-xs font-medium rounded-md bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors"
                        >
                          Resolve
                        </button>
                      )}
                      {dispute.status === 'Resolved' && (
                        <span className="text-xs text-emerald-600 font-medium">Closed</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredDisputes.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500 text-sm">
                    No disputes found matching current criteria.
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

