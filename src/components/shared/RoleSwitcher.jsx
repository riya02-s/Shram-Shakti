// src/components/shared/RoleSwitcher.jsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function RoleSwitcher() {
  const { role, setRole, language, setLanguage } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (newRole === 'customer') navigate('/');
    if (newRole === 'worker') navigate('/worker/dashboard');
    if (newRole === 'admin') navigate('/admin/dashboard');
    if (newRole === 'federation') navigate('/federation');
  };

  return (
    <header
      style={{
        backgroundColor: '#15803D', // Forest Green
        color: '#FFFFFF',
        padding: '12px 14px',
        borderBottom: '2px solid #166534',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Row: Official Emblem Badge & Bilingual Titles */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Emblem Badge */}
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              border: '2px solid #FEF08A',
              flexShrink: 0,
            }}
          >
            {/* National / Cooperative Crest Emblem */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#15803D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" stroke="#15803D" strokeWidth="1.5" />
              <path d="M12 3v18" stroke="#D97706" strokeWidth="1.5" />
              <path d="M3 12h18" stroke="#D97706" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="3" fill="#15803D" />
            </svg>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Link to="/" style={{ textDecoration: 'none', color: '#FFFFFF' }}>
                <h1 style={{ margin: 0, fontSize: '15px', fontWeight: '800', letterSpacing: '-0.2px', lineHeight: 1.2 }}>
                  सहयोग सेवा / Shram-Shakti
                </h1>
              </Link>
              <span
                style={{
                  fontSize: '9px',
                  backgroundColor: '#DCFCE7',
                  color: '#166534',
                  padding: '1px 5px',
                  borderRadius: '4px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                }}
              >
                SIH 2026
              </span>
            </div>
            <p style={{ margin: '2px 0 0', fontSize: '10px', color: '#DCFCE7', opacity: 0.9, fontWeight: '500' }}>
              सहकारी श्रम मंत्रालय, भारत सरकार
            </p>
          </div>
        </div>

        {/* Language Toggle */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          aria-label="Select Language"
          style={{
            padding: '4px 6px',
            borderRadius: '6px',
            backgroundColor: '#166534',
            color: '#FFFFFF',
            border: '1px solid #4ADE80',
            fontSize: '11px',
            fontWeight: '600',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="pa">ਪੰਜਾਬੀ</option>
        </select>
      </div>

      {/* Second Row: Persona Switcher & Fast Links */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '10px',
          paddingTop: '8px',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          gap: '8px',
        }}
      >
        {/* Navigation Pills */}
        <nav style={{ display: 'flex', gap: '6px', fontSize: '12px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
          <Link
            to="/"
            style={{
              padding: '3px 8px',
              borderRadius: '6px',
              backgroundColor: location.pathname === '/' ? '#FFFFFF' : 'rgba(255,255,255,0.15)',
              color: location.pathname === '/' ? '#15803D' : '#FFFFFF',
              fontWeight: location.pathname === '/' ? '700' : '500',
              textDecoration: 'none',
              fontSize: '11px',
            }}
          >
            🏠 Home
          </Link>
          <Link
            to="/customer/history"
            style={{
              padding: '3px 8px',
              borderRadius: '6px',
              backgroundColor: location.pathname.includes('/history') ? '#FFFFFF' : 'rgba(255,255,255,0.15)',
              color: location.pathname.includes('/history') ? '#15803D' : '#FFFFFF',
              fontWeight: location.pathname.includes('/history') ? '700' : '500',
              textDecoration: 'none',
              fontSize: '11px',
            }}
          >
            📋 Bookings
          </Link>
          <Link
            to="/emergency"
            style={{
              padding: '3px 8px',
              borderRadius: '6px',
              backgroundColor: location.pathname === '/emergency' ? '#FEE2E2' : '#DC2626',
              color: location.pathname === '/emergency' ? '#991B1B' : '#FFFFFF',
              fontWeight: '700',
              textDecoration: 'none',
              fontSize: '11px',
            }}
          >
            🚨 SOS
          </Link>
        </nav>

        {/* SIH Persona Switcher Dropdown */}
        <select
          value={role}
          onChange={(e) => handleRoleChange(e.target.value)}
          aria-label="Switch Persona"
          style={{
            padding: '4px 8px',
            borderRadius: '6px',
            backgroundColor: '#FEF08A',
            color: '#854D0E',
            border: 'none',
            fontSize: '11px',
            fontWeight: '700',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <option value="customer">👤 Customer</option>
          <option value="worker">👷 Worker</option>
          <option value="admin">🛡️ Society Admin</option>
          <option value="federation">🏛️ Apex Federation</option>
        </select>
      </div>
    </header>
  );
}

