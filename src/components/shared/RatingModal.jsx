// src/components/shared/RatingModal.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function RatingModal({
  isOpen,
  booking,
  onClose,
  onSubmitSuccess,
}) {
  const { submitRating } = useApp();
  const [stars, setStars] = useState(5);
  const [hoveredStars, setHoveredStars] = useState(0);
  const [feedback, setFeedback] = useState('');

  if (!isOpen || !booking) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitRating) {
      submitRating(booking.booking_id, booking.worker_id, stars, feedback);
    }
    if (onSubmitSuccess) onSubmitSuccess();
    onClose();
  };

  const starNumbers = [1, 2, 3, 4, 5];

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
          width: '360px',
          textAlign: 'center',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div style={{ fontSize: '36px', marginBottom: '8px' }}>⭐</div>
        <h3 style={{ margin: '0 0 6px', fontSize: '18px', color: '#0F172A' }}>
          Rate Service Quality
        </h3>
        <p style={{ color: '#64748B', fontSize: '13px', margin: '0 0 16px' }}>
          How was your experience for booking <strong>{booking.booking_id}</strong>?
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '16px',
          }}
        >
          {starNumbers.map((num) => {
            const isFilled = num <= (hoveredStars || stars);
            return (
              <button
                key={num}
                type="button"
                onClick={() => setStars(num)}
                onMouseEnter={() => setHoveredStars(num)}
                onMouseLeave={() => setHoveredStars(0)}
                style={{
                  fontSize: '28px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: isFilled ? '#F59E0B' : '#CBD5E1',
                  transform: isFilled ? 'scale(1.15)' : 'scale(1)',
                  transition: 'transform 0.15s ease, color 0.15s ease',
                  padding: '2px',
                }}
              >
                ★
              </button>
            );
          })}
        </div>

        <textarea
          placeholder="Share brief comments on worker punctuality, skills, or behavior..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={3}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #CBD5E1',
            fontSize: '13px',
            marginBottom: '16px',
            outline: 'none',
            resize: 'none',
            boxSizing: 'border-box',
          }}
        />

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
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
            Skip
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            style={{
              flex: 1.2,
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              background: '#2563EB',
              color: '#FFFFFF',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Submit Rating
          </button>
        </div>
      </div>
    </div>
  );
}
