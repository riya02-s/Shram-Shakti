import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const initialDisputesList = [
  {
    id: 'D001',
    booking_id: 'B000004',
    customer_id: 'C000884',
    worker_id: 'W00003',
    reason: 'Worker did not show up on scheduled time.',
    status: 'open',
    resolution: null
  },
  {
    id: 'D002',
    booking_id: 'B000002',
    customer_id: 'C000992',
    worker_id: 'W00008',
    reason: 'Disagreement over unlisted spare parts cost.',
    status: 'open',
    resolution: null
  }
];

export default function DisputeQueue({ disputes: propDisputes, resolveDispute: propResolveDispute }) {
  const [localDisputes, setLocalDisputes] = useState(initialDisputesList);
  const [activeDispute, setActiveDispute] = useState(null);
  const [notes, setNotes] = useState('');
  const location = useLocation();

  const disputes = propDisputes || localDisputes;

  const handleResolve = (disputeId, favor) => {
    if (propResolveDispute) {
      propResolveDispute(disputeId, favor, notes);
    } else {
      setLocalDisputes(prev =>
        prev.map(d =>
          d.id === disputeId ? { ...d, status: 'resolved', resolution: { favor, notes } } : d
        )
      );
    }
    setActiveDispute(null);
    setNotes('');
  };

  const navItems = [
    { label: 'Overview', path: '/admin/dashboard' },
    { label: 'Workers', path: '/admin/workers' },
    { label: 'Verify', path: '/admin/verification' },
    { label: 'Bookings', path: '/admin/bookings' },
    { label: 'Disputes', path: '/admin/disputes' },
  ];

  return (
    <div style={{ padding: '16px 14px 28px', boxSizing: 'border-box', width: '100%' }}>
      {/* Header */}
      <div style={{ marginBottom: '14px' }}>
        <span style={{ fontSize: '11px', fontWeight: '700', color: '#DC2626', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          🛡️ Society Admin Portal
        </span>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', margin: '4px 0 2px' }}>
          Local Dispute Queue
        </h2>
        <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>
          Arbitrate and resolve booking disputes between customers and cooperative workers
        </p>
      </div>

      {/* Admin Nav Pills */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', marginBottom: '16px', paddingBottom: '4px' }}>
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: isActive ? '700' : '500',
                backgroundColor: isActive ? '#15803D' : '#FFFFFF',
                color: isActive ? '#FFFFFF' : '#475569',
                border: isActive ? 'none' : '1px solid #E2E8F0',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Disputes Queue */}
      {disputes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '32px 16px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <p style={{ margin: 0, color: '#64748B', fontSize: '13px' }}>✅ No open disputes in this society.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {disputes.map(d => (
            <div
              key={d.id}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '14px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#DC2626' }}>
                  Case #{d.id} • Booking {d.booking_id}
                </span>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '999px',
                    fontSize: '10px',
                    fontWeight: '700',
                    backgroundColor: d.status === 'open' ? '#FEE2E2' : '#DCFCE7',
                    color: d.status === 'open' ? '#DC2626' : '#15803D',
                    textTransform: 'uppercase',
                  }}
                >
                  {d.status}
                </span>
              </div>

              <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '6px' }}>
                Customer: <strong>{d.customer_id}</strong> | Worker: <strong>{d.worker_id}</strong>
              </div>

              <div style={{ fontSize: '12px', color: '#334155', backgroundColor: '#F8FAFC', padding: '8px 10px', borderRadius: '8px', border: '1px solid #F1F5F9' }}>
                <strong>Issue:</strong> {d.reason}
              </div>

              {d.status === 'open' && activeDispute !== d.id && (
                <button
                  type="button"
                  onClick={() => setActiveDispute(d.id)}
                  style={{
                    marginTop: '10px',
                    padding: '8px 14px',
                    backgroundColor: '#16A34A',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer',
                  }}
                >
                  Take Arbitration Action
                </button>
              )}

              {d.status === 'resolved' && d.resolution && (
                <div style={{ marginTop: '8px', fontSize: '11px', color: '#166534', fontWeight: '500' }}>
                  ✅ Resolved in favor of: <strong>{d.resolution.favor}</strong>
                  {d.resolution.notes ? ` • "${d.resolution.notes}"` : ''}
                </div>
              )}

              {activeDispute === d.id && (
                <div style={{ marginTop: '12px', padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #CBD5E1' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                    Arbitration Notes:
                  </label>
                  <textarea
                    rows="2"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Enter resolution reasoning..."
                    style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      fontSize: '12px',
                      boxSizing: 'border-box',
                      outline: 'none',
                    }}
                  />
                  <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => handleResolve(d.id, 'customer')}
                      style={{
                        flex: 1,
                        padding: '8px',
                        backgroundColor: '#16A34A',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '700',
                        cursor: 'pointer',
                      }}
                    >
                      Favor Customer
                    </button>
                    <button
                      type="button"
                      onClick={() => handleResolve(d.id, 'worker')}
                      style={{
                        flex: 1,
                        padding: '8px',
                        backgroundColor: '#2563EB',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '700',
                        cursor: 'pointer',
                      }}
                    >
                      Favor Worker
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveDispute(null)}
                      style={{
                        padding: '8px 12px',
                        backgroundColor: '#E2E8F0',
                        color: '#475569',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


