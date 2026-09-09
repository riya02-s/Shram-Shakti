// src/components/shared/InvoiceModal.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function InvoiceModal({
  isOpen,
  booking,
  onClose,
  onPaymentSuccess,
}) {
  const { updateBookingStatus } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(booking?.status === 'completed');

  if (!isOpen || !booking) return null;

  const totalAmount = Number(booking.final_amount) || 450;
  // Transparent 10% cooperative welfare & platform maintenance deduction
  const platformFee = Math.round(totalAmount * 0.10);
  const workerWage = totalAmount - platformFee;

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment gateway response delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      updateBookingStatus(booking.booking_id, 'completed');
      if (onPaymentSuccess) onPaymentSuccess();
    }, 1200);
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
          width: '380px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', color: '#0F172A' }}>
              Tax Invoice & Settlement
            </h3>
            <span style={{ fontSize: '12px', color: '#64748B' }}>
              Punjab Labour Cooperative Federation
            </span>
          </div>
          <span
            style={{
              fontSize: '11px',
              padding: '4px 8px',
              borderRadius: '12px',
              fontWeight: '700',
              background: isPaid ? '#DCFCE7' : '#FEF3C7',
              color: isPaid ? '#15803D' : '#B45309',
            }}
          >
            {isPaid ? 'PAID' : 'PAYMENT DUE'}
          </span>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '12px 0' }} />

        {/* Invoice Breakdown */}
        <div style={{ fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '10px', color: '#334155' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Booking ID:</span>
            <strong>{booking.booking_id}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Service Provided:</span>
            <strong style={{ textTransform: 'capitalize' }}>{booking.service_type || 'General Service'}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Worker Direct Wage (90%):</span>
            <span style={{ fontWeight: '600', color: '#0F172A' }}>₹{workerWage}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
            <span>Coop Welfare & Insurance (10%):</span>
            <span>₹{platformFee}</span>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px dashed #CBD5E1', margin: '14px 0' }} />

        {/* Total Price */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>
          <span>Total Amount:</span>
          <span style={{ color: '#2563EB' }}>₹{totalAmount}</span>
        </div>

        {/* Action Buttons */}
        <div style={{ marginTop: '22px', display: 'flex', gap: '10px' }}>
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
            {isPaid ? 'Close' : 'Cancel'}
          </button>

          {!isPaid && (
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              style={{
                flex: 1.3,
                padding: '10px',
                borderRadius: '8px',
                border: 'none',
                background: isProcessing ? '#94A3B8' : '#10B981',
                color: '#FFFFFF',
                fontWeight: '700',
                cursor: isProcessing ? 'not-allowed' : 'pointer',
              }}
            >
              {isProcessing ? 'Processing...' : '💳 Pay via UPI'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
