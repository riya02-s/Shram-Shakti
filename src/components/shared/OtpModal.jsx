// src/components/shared/OtpModal.jsx
import React, { useState } from 'react';

export default function OtpModal({
  isOpen,
  expectedOtp = '1234',
  mode = 'display', // 'display' | 'verify' | 'both'
  onVerifySuccess,
  onClose,
}) {
  const [enteredOtp, setEnteredOtp] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const displayCode = String(expectedOtp || '1234').padStart(4, '0');

  const handleVerify = () => {
    if (enteredOtp.trim() === displayCode.trim()) {
      setError('');
      setIsSuccess(true);
      setTimeout(() => {
        if (onVerifySuccess) onVerifySuccess();
        if (onClose) onClose();
      }, 700);
    } else {
      setError('Invalid OTP code. Please enter the matching 4-digit code.');
    }
  };

  const handleFillDemo = () => {
    setEnteredOtp(displayCode);
    setError('');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(19, 42, 19, 0.75)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(6px)',
        padding: '16px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          background: '#FFFFFF',
          padding: '24px 20px',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '380px',
          textAlign: 'center',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          border: '1px solid #E2E8F0',
          boxSizing: 'border-box',
        }}
      >
        {/* Header Icon & Title */}
        <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔐</div>
        <h3 style={{ margin: '0 0 6px', fontSize: '18px', fontWeight: '800', color: '#1E293B' }}>
          {mode === 'verify' ? 'Worker OTP Verification' : 'Service Start OTP'}
        </h3>
        <p style={{ color: '#64748B', fontSize: '12px', margin: '0 0 16px', lineHeight: 1.4 }}>
          {mode === 'verify'
            ? 'Enter the 4-digit verification code provided by the customer to start the job.'
            : 'Share this 4-digit security code with the cooperative professional upon arrival.'}
        </p>

        {/* Amber Demo Notification Box */}
        <div
          style={{
            backgroundColor: '#FFFBEB',
            border: '1.5px solid #FDE68A',
            borderRadius: '12px',
            padding: '14px 16px',
            marginBottom: '18px',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '6px' }}>
            <span style={{ fontSize: '14px' }}>🛡️</span>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#B45309', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Official Security Code
            </span>
          </div>

          {/* Large Letter-Spaced 4-Digit Code Display */}
          <div
            style={{
              fontSize: '34px',
              fontWeight: '900',
              letterSpacing: '10px',
              color: '#D97706',
              fontFamily: 'monospace',
              padding: '6px 0',
            }}
          >
            {displayCode}
          </div>

          <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#92400E' }}>
            Single-use code • Verifies authentic cooperative worker attendance
          </p>
        </div>

        {/* Single-Input Worker Entry Mode */}
        {mode === 'verify' && (
          <div style={{ marginBottom: '16px', textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
              Worker Code Entry:
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="••••"
                value={enteredOtp}
                maxLength={4}
                onChange={(e) => {
                  setEnteredOtp(e.target.value.replace(/\D/g, ''));
                  setError('');
                }}
                autoFocus
                style={{
                  width: '100%',
                  padding: '12px',
                  textAlign: 'center',
                  fontSize: '24px',
                  fontWeight: '800',
                  letterSpacing: '12px',
                  border: error ? '2px solid #EF4444' : '2px solid #CBD5E1',
                  borderRadius: '10px',
                  outline: 'none',
                  backgroundColor: '#F8FAFC',
                  color: '#0F172A',
                  fontFamily: 'monospace',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Quick Demo Fill Pill */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
              <button
                type="button"
                onClick={handleFillDemo}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '11px',
                  color: '#16A34A',
                  fontWeight: '600',
                  padding: 0,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Auto-fill demo OTP ({displayCode})
              </button>
            </div>

            {error && (
              <p style={{ color: '#DC2626', fontSize: '12px', margin: '6px 0 0', fontWeight: '500' }}>
                ⚠️ {error}
              </p>
            )}
            {isSuccess && (
              <p style={{ color: '#16A34A', fontSize: '12px', margin: '6px 0 0', fontWeight: '700' }}>
                ✅ OTP Verified Successfully! Starting job...
              </p>
            )}
          </div>
        )}

        {/* Modal Buttons */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              flex: 1,
              padding: '12px 14px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              background: '#F8FAFC',
              color: '#475569',
              fontWeight: '600',
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            {mode === 'verify' ? 'Cancel' : 'Close'}
          </button>

          {mode === 'verify' ? (
            <button
              type="button"
              onClick={handleVerify}
              disabled={enteredOtp.length < 4 || isSuccess}
              style={{
                flex: 1.4,
                padding: '12px 16px',
                borderRadius: '8px',
                border: 'none',
                background: enteredOtp.length === 4 ? '#16A34A' : '#94A3B8', // Solid Green Action Button
                color: '#FFFFFF',
                fontWeight: '700',
                fontSize: '13px',
                cursor: enteredOtp.length === 4 ? 'pointer' : 'not-allowed',
                boxShadow: enteredOtp.length === 4 ? '0 4px 10px rgba(22, 163, 74, 0.3)' : 'none',
              }}
            >
              Verify & Start
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1.4,
                padding: '12px 16px',
                borderRadius: '8px',
                border: 'none',
                background: '#16A34A', // Solid Green Action Button
                color: '#FFFFFF',
                fontWeight: '700',
                fontSize: '13px',
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(22, 163, 74, 0.3)',
              }}
            >
              I Understand
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

