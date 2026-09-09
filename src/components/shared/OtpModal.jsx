// src/components/shared/OtpModal.jsx
import React, { useState } from 'react';

export default function OtpModal({
  isOpen,
  expectedOtp,
  mode = 'display', // 'display' (Customer view) | 'verify' (Worker view)
  onVerifySuccess,
  onClose,
}) {
  const [enteredOtp, setEnteredOtp] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleVerify = () => {
    if (enteredOtp.trim() === expectedOtp?.toString().trim()) {
      setError('');
      if (onVerifySuccess) onVerifySuccess();
    } else {
      setError('❌ Invalid OTP. Please enter the correct 4-digit code.');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        style={{
          background: '#FFFFFF',
          padding: '28px',
          borderRadius: '16px',
          width: '350px',
          textAlign: 'center',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div style={{ fontSize: '36px', marginBottom: '8px' }}>🔐</div>
        <h3 style={{ margin: '0 0 8px', fontSize: '18px', color: '#0F172A' }}>
          Service OTP Verification
        </h3>

        {mode === 'display' ? (
          /* Customer Display Mode */
          <>
            <p style={{ color: '#64748B', fontSize: '13px', margin: '0 0 16px' }}>
              Share this 4-digit verification code with the service professional upon arrival:
            </p>
            <div
              style={{
                fontSize: '32px',
                fontWeight: '800',
                letterSpacing: '8px',
                color: '#2563EB',
                background: '#EFF6FF',
                padding: '14px',
                borderRadius: '10px',
                marginBottom: '16px',
                border: '1px dashed #93C5FD',
              }}
            >
              {expectedOtp || '----'}
            </div>
          </>
        ) : (
          /* Worker Verification Input Mode */
          <>
            <p style={{ color: '#64748B', fontSize: '13px', margin: '0 0 16px' }}>
              Ask the customer for the 4-digit code to start the service:
            </p>
            <input
              type="text"
              placeholder="Enter OTP"
              value={enteredOtp}
              maxLength={4}
              onChange={(e) => setEnteredOtp(e.target.value)}
              style={{
                width: '80%',
                padding: '10px',
                textAlign: 'center',
                fontSize: '20px',
                fontWeight: '700',
                letterSpacing: '6px',
                border: '2px solid #CBD5E1',
                borderRadius: '8px',
                marginBottom: '8px',
                outline: 'none',
              }}
            />
            {error && (
              <p style={{ color: '#EF4444', fontSize: '12px', margin: '4px 0 12px' }}>
                {error}
              </p>
            )}
          </>
        )}

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '16px' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              background: '#F8FAFC',
              fontWeight: '500',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
          {mode === 'verify' && (
            <button
              onClick={handleVerify}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: 'none',
                background: '#2563EB',
                color: '#FFFFFF',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Verify & Start
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
