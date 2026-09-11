import React from 'react';
import { useApp } from '../../context/AppContext';
import { Link, useLocation } from 'react-router-dom';

export default function WorkerVerification({ workers: propWorkers, updateWorkerLevel: propUpdateWorkerLevel }) {
  const { workers: appWorkers, verifyWorker } = useApp();
  const location = useLocation();

  const workers = propWorkers || appWorkers || [];
  const updateWorkerLevel = propUpdateWorkerLevel || ((id, lvl) => verifyWorker(id, lvl));

  const handleLevelChange = (workerId, newLevel) => {
    updateWorkerLevel(workerId, newLevel);
  };

  const getBadgeStyle = (level) => {
    if (level === 3) return { backgroundColor: '#DCFCE7', color: '#15803D', border: '1px solid #86EFAC' };
    if (level === 2) return { backgroundColor: '#DBEAFE', color: '#1E40AF', border: '1px solid #93C5FD' };
    return { backgroundColor: '#F1F5F9', color: '#475569', border: '1px solid #CBD5E1' };
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
        <span style={{ fontSize: '11px', fontWeight: '700', color: '#15803D', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          🛡️ Society Admin Portal
        </span>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', margin: '4px 0 2px' }}>
          Worker Verification Queue
        </h2>
        <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>
          Assign verified skill credentials (Level 1 / Level 2 / Level 3)
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

      {/* Worker List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {workers.map(w => {
          const level = w.verification_level || w.verificationLevel || 1;
          const name = w.full_name || w.fullName || w.name || 'Worker';
          const service = w.service_type || w.serviceType || w.skill || 'General';
          const id = w.worker_id || w.workerId || w.id;

          return (
            <div
              key={id}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '14px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{name}</h3>
                  <span style={{ fontSize: '12px', color: '#64748B', textTransform: 'capitalize' }}>{service} • ID: {id}</span>
                </div>
                <span
                  style={{
                    padding: '3px 8px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: '700',
                    ...getBadgeStyle(level),
                  }}
                >
                  Level {level}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
                <button
                  type="button"
                  style={{
                    flex: 1,
                    padding: '6px 0',
                    fontSize: '11px',
                    fontWeight: '700',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: level === 1 ? '#475569' : '#F8FAFC',
                    color: level === 1 ? '#FFFFFF' : '#475569',
                    cursor: level === 1 ? 'default' : 'pointer',
                  }}
                  onClick={() => handleLevelChange(id, 1)}
                  disabled={level === 1}
                >
                  L1 Basic
                </button>
                <button
                  type="button"
                  style={{
                    flex: 1,
                    padding: '6px 0',
                    fontSize: '11px',
                    fontWeight: '700',
                    borderRadius: '6px',
                    border: '1px solid #93C5FD',
                    backgroundColor: level === 2 ? '#2563EB' : '#EFF6FF',
                    color: level === 2 ? '#FFFFFF' : '#1D4ED8',
                    cursor: level === 2 ? 'default' : 'pointer',
                  }}
                  onClick={() => handleLevelChange(id, 2)}
                  disabled={level === 2}
                >
                  L2 Verified
                </button>
                <button
                  type="button"
                  style={{
                    flex: 1,
                    padding: '6px 0',
                    fontSize: '11px',
                    fontWeight: '700',
                    borderRadius: '6px',
                    border: '1px solid #86EFAC',
                    backgroundColor: level === 3 ? '#16A34A' : '#F0FDF4',
                    color: level === 3 ? '#FFFFFF' : '#15803D',
                    cursor: level === 3 ? 'default' : 'pointer',
                  }}
                  onClick={() => handleLevelChange(id, 3)}
                  disabled={level === 3}
                >
                  L3 Master
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


