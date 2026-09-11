import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Link, useLocation } from 'react-router-dom';

export default function WorkerList({ workers: propWorkers }) {
  const { workers: appWorkers } = useApp();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  const workers = propWorkers || appWorkers || [];

  const filteredWorkers = workers.filter(w => {
    const name = (w.full_name || w.fullName || w.name || '').toLowerCase();
    const service = (w.service_type || w.serviceType || w.skill || '').toLowerCase();
    const query = searchTerm.toLowerCase();
    return name.includes(query) || service.includes(query);
  });

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
          Registered Cooperative Workers
        </h2>
        <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>
          Directory of skilled artisans and service professionals
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

      {/* Search Input */}
      <div style={{ marginBottom: '14px' }}>
        <input
          type="text"
          placeholder="Search by worker name or trade..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 12px',
            borderRadius: '8px',
            border: '1px solid #CBD5E1',
            fontSize: '13px',
            boxSizing: 'border-box',
            outline: 'none',
            backgroundColor: '#FFFFFF',
          }}
        />
      </div>

      {/* Workers Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {filteredWorkers.map(w => {
          const id = w.worker_id || w.workerId || w.id;
          const name = w.full_name || w.fullName || w.name || 'Worker';
          const service = w.service_type || w.serviceType || w.skill || 'General';
          const level = w.verification_level || w.verificationLevel || 1;
          const rating = w.rating_avg || w.rating || 4.5;
          const isActive = w.active === true || w.active === 1 || w.active === '1' || w.active === undefined;

          return (
            <div
              key={id}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '10px',
                padding: '12px 14px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>{name}</span>
                  <span style={{ fontSize: '10px', padding: '1px 6px', borderRadius: '4px', backgroundColor: '#F1F5F9', color: '#475569', fontWeight: '600' }}>
                    L{level}
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px', textTransform: 'capitalize' }}>
                  {service} • ID: {id}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#D97706' }}>
                  ★ {Number(rating).toFixed(1)}
                </div>
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '10px',
                    fontWeight: '700',
                    color: isActive ? '#15803D' : '#DC2626',
                    marginTop: '2px',
                  }}
                >
                  {isActive ? '● Active' : '○ Inactive'}
                </span>
              </div>
            </div>
          );
        })}
        {filteredWorkers.length === 0 && (
          <p style={{ textAlign: 'center', color: '#64748B', fontSize: '13px', padding: '24px' }}>
            No workers match your search query.
          </p>
        )}
      </div>
    </div>
  );
}


