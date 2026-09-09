import React, { useState } from 'react';

const styles = {
  container: { padding: '20px', fontFamily: 'sans-serif' },
  header: { marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' },
  card: { border: '1px solid #ddd', borderRadius: '8px', padding: '16px', marginBottom: '16px' },
  title: { fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' },
  text: { marginBottom: '8px', color: '#4b5563' },
  buttonGroup: { display: 'flex', gap: '10px', marginTop: '12px' },
  btnResolve: { padding: '8px 16px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  textarea: { width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginTop: '10px' }
};

export default function DisputeQueue({ disputes, resolveDispute }) {
  const [activeDispute, setActiveDispute] = useState(null);
  const [notes, setNotes] = useState('');

  const handleResolve = (disputeId, favor) => {
    resolveDispute(disputeId, favor, notes);
    setActiveDispute(null);
    setNotes('');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Dispute Queue</h2>
      {disputes.length === 0 ? (
        <p>No open disputes.</p>
      ) : (
        disputes.map(d => (
          <div key={d.id} style={styles.card}>
            <div style={styles.title}>Booking Ref: {d.booking_id}</div>
            <div style={styles.text}>Customer: {d.customer_id} | Worker: {d.worker_id}</div>
            <div style={styles.text}><strong>Reason:</strong> {d.reason}</div>
            <div style={styles.text}><strong>Status:</strong> {d.status}</div>
            
            {d.status === 'open' && activeDispute !== d.id && (
              <button style={styles.btnResolve} onClick={() => setActiveDispute(d.id)}>
                Take Action
              </button>
            )}

            {activeDispute === d.id && (
              <div style={{marginTop: '16px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px'}}>
                <strong>Resolution Notes:</strong>
                <textarea 
                  style={styles.textarea} 
                  rows="3" 
                  value={notes} 
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Enter resolution details..."
                />
                <div style={styles.buttonGroup}>
                  <button style={styles.btnResolve} onClick={() => handleResolve(d.id, 'customer')}>
                    Resolve in favor of Customer
                  </button>
                  <button style={{...styles.btnResolve, backgroundColor: '#3b82f6'}} onClick={() => handleResolve(d.id, 'worker')}>
                    Resolve in favor of Worker
                  </button>
                  <button style={{...styles.btnResolve, backgroundColor: '#6b7280'}} onClick={() => setActiveDispute(null)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

