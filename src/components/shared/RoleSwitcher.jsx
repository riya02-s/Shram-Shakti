// src/components/shared/RoleSwitcher.jsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

export default function RoleSwitcher() {
  const { role, setRole, language, setLanguage } = useApp();
  const navigate = useNavigate();

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (newRole === 'customer') navigate('/');
    if (newRole === 'worker') navigate('/worker/dashboard');
    if (newRole === 'admin') navigate('/admin/dashboard');
  };

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 20px',
      backgroundColor: '#0F172A',
      color: '#FFFFFF',
      borderRadius: '10px',
      marginBottom: '20px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    }}>
      {/* Brand & SIH Badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.5px' }}>
          ⚡ Shram-Shakti
        </span>
        <span style={{
          fontSize: '11px',
          background: '#1E293B',
          color: '#38BDF8',
          padding: '2px 8px',
          borderRadius: '12px',
          fontWeight: '600',
          border: '1px solid #334155'
        }}>
          SIH 2026
        </span>
      </div>

      {/* Quick Nav Links */}
      <nav style={{ display: 'flex', gap: '16px', fontSize: '14px' }}>
        <Link to="/" style={{ color: role === 'customer' ? '#38BDF8' : '#94A3B8', textDecoration: 'none', fontWeight: '500' }}>
          Customer Home
        </Link>
        <Link to="/search/plumber" style={{ color: '#94A3B8', textDecoration: 'none' }}>
          Find Workers
        </Link>
        <Link to="/emergency" style={{ color: '#EF4444', textDecoration: 'none', fontWeight: '600' }}>
          🚨 Emergency SOS
        </Link>
      </nav>

      {/* Language & Role Selectors */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {/* Vernacular Language Selector */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            padding: '6px 10px',
            borderRadius: '6px',
            background: '#1E293B',
            color: '#F8FAFC',
            border: '1px solid #334155',
            fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          <option value="en">🌐 English</option>
          <option value="hi">🌐 हिंदी (Hindi)</option>
          <option value="pa">🌐 ਪੰਜਾਬੀ (Punjabi)</option>
        </select>

        {/* Role Toggle */}
        <select
          value={role}
          onChange={(e) => handleRoleChange(e.target.value)}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            background: '#2563EB',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          <option value="customer">👤 Mode: Customer</option>
          <option value="worker">👷 Mode: Worker</option>
          <option value="admin">🛡️ Mode: Admin / Coop</option>
        </select>
      </div>
    </header>
  );
}
