import React from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function CooperativeDashboard({ stats: propStats, currentTab = 'Overview', setCurrentTab }) {
  const { workers, bookings, t } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const computedStats = propStats || {
    totalWorkers: workers?.length || 0,
    activeBookings: bookings?.filter(b => ['requested', 'accepted', 'started', 'active'].includes(b.status))?.length || 0,
    pendingVerifications: workers?.filter(w => (w.verification_level || w.verificationLevel || 1) === 1)?.length || 0,
    openDisputes: 2,
  };

  const navItems = [
    { label: t('admin.nav.overview', 'Overview'), path: '/admin/dashboard' },
    { label: t('admin.nav.workers', 'Workers'), path: '/admin/workers' },
    { label: t('admin.nav.verifications', 'Verify'), path: '/admin/verification' },
    { label: t('admin.nav.bookings', 'Bookings'), path: '/admin/bookings' },
    { label: t('admin.nav.disputes', 'Disputes'), path: '/admin/disputes' },
  ];

  return (
    <div style={{ padding: '16px 14px 28px', boxSizing: 'border-box', width: '100%' }}>
      {/* Title */}
      <div style={{ marginBottom: '14px' }}>
        <span style={{ fontSize: '11px', fontWeight: '700', color: '#15803D', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          🛡️ {t('admin.title', 'Society Admin Portal')}
        </span>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', margin: '4px 0 2px' }}>
          Ludhiana Cooperative #104
        </h2>
        <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>
          Local worker verification, active dispatches & disputes
        </p>
      </div>

      {/* Admin Navigation Pills */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', marginBottom: '18px', paddingBottom: '4px' }}>
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

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '18px' }}>
        <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '600', textTransform: 'uppercase' }}>{t('admin.metrics.totalWorkers', 'Workers')}</div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', marginTop: '4px' }}>{computedStats.totalWorkers}</div>
          <div style={{ fontSize: '10px', color: '#16A34A', fontWeight: '600', marginTop: '2px' }}>Registered Pool</div>
        </div>

        <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '600', textTransform: 'uppercase' }}>{t('admin.metrics.activeBookings', 'Active Jobs')}</div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#2563EB', marginTop: '4px' }}>{computedStats.activeBookings}</div>
          <div style={{ fontSize: '10px', color: '#2563EB', fontWeight: '600', marginTop: '2px' }}>In Progress</div>
        </div>

        <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '600', textTransform: 'uppercase' }}>{t('admin.metrics.pendingVerifications', 'Pending (L1)')}</div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#D97706', marginTop: '4px' }}>{computedStats.pendingVerifications}</div>
          <div style={{ fontSize: '10px', color: '#D97706', fontWeight: '600', marginTop: '2px' }}>Needs Review</div>
        </div>

        <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '600', textTransform: 'uppercase' }}>{t('admin.metrics.openDisputes', 'Disputes')}</div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#DC2626', marginTop: '4px' }}>{computedStats.openDisputes}</div>
          <div style={{ fontSize: '10px', color: '#DC2626', fontWeight: '600', marginTop: '2px' }}>Open Queue</div>
        </div>
      </div>

      {/* Quick Action Navigation Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button
          onClick={() => navigate('/admin/verification')}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '13px',
            fontWeight: '600',
            color: '#0F172A',
          }}
        >
          <span>🔍 Review Pending Worker Verifications</span>
          <span style={{ color: '#16A34A' }}>→</span>
        </button>

        <button
          onClick={() => navigate('/admin/disputes')}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '13px',
            fontWeight: '600',
            color: '#0F172A',
          }}
        >
          <span>⚖️ Resolve Local Dispute Queue</span>
          <span style={{ color: '#DC2626' }}>→</span>
        </button>

        <button
          onClick={() => navigate('/admin/bookings')}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '13px',
            fontWeight: '600',
            color: '#0F172A',
          }}
        >
          <span>📋 View Local Society Bookings</span>
          <span style={{ color: '#2563EB' }}>→</span>
        </button>
      </div>
    </div>
  );
}


