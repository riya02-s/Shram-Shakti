import React from 'react';
import { useApp } from '../../context/AppContext';
import { Link, useLocation } from 'react-router-dom';

export default function LocalBookings({ bookings: propBookings }) {
  const { bookings: appBookings } = useApp();
  const location = useLocation();

  const bookings = propBookings || appBookings || [];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
      case 'paid':
      case 'rated':
        return { bg: '#DCFCE7', text: '#15803D' };
      case 'active':
      case 'started':
      case 'on_the_way':
      case 'accepted':
        return { bg: '#DBEAFE', text: '#1E40AF' };
      case 'cancelled':
      case 'rejected':
        return { bg: '#FEE2E2', text: '#DC2626' };
      case 'requested':
      default:
        return { bg: '#FEF3C7', text: '#B45309' };
    }
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
          Local Society Bookings
        </h2>
        <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>
          Live feed of service requests within this cooperative zone
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

      {/* Bookings Feed Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {bookings.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#64748B', fontSize: '13px', padding: '24px' }}>No bookings recorded.</p>
        ) : (
          bookings.map(b => {
            const id = b.booking_id || b.bookingId || b.id;
            const status = b.status || 'requested';
            const colors = getStatusColor(status);
            const timeStr = b.booking_time || b.date ? `${b.date || ''} ${b.time || ''}`.trim() : 'Just now';

            return (
              <div
                key={id}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: '#0F172A' }}>
                    #{id}
                  </span>
                  <span
                    style={{
                      padding: '2px 8px',
                      borderRadius: '999px',
                      fontSize: '10px',
                      fontWeight: '700',
                      backgroundColor: colors.bg,
                      color: colors.text,
                      textTransform: 'uppercase',
                    }}
                  >
                    {status}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#334155', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '600', textTransform: 'capitalize' }}>
                    🛠️ {b.service_type || b.category || 'General'}
                  </span>
                  <span style={{ fontWeight: '700', color: '#16A34A' }}>
                    ₹{b.final_amount || b.amount || 500}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748B' }}>
                  <span>Cust: {b.customer_id || 'C001'} • Worker: {b.worker_id || 'Assigned'}</span>
                  <span>{timeStr}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}


