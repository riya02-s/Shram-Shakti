import React from 'react';

const styles = {
  container: { padding: '20px', fontFamily: 'sans-serif' },
  header: { marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
  th: { borderBottom: '2px solid #ddd', padding: '10px', textAlign: 'left' },
  td: { borderBottom: '1px solid #ddd', padding: '10px' },
  badge: { padding: '4px 8px', borderRadius: '12px', fontSize: '12px', color: 'white', fontWeight: 'bold' }
};

export default function LocalBookings({ bookings }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'active': return '#3b82f6';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Local Bookings Overview</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Booking ID</th>
            <th style={styles.th}>Customer ID</th>
            <th style={styles.th}>Worker ID</th>
            <th style={styles.th}>Service</th>
            <th style={styles.th}>Time</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b.booking_id}>
              <td style={styles.td}>{b.booking_id}</td>
              <td style={styles.td}>{b.customer_id}</td>
              <td style={styles.td}>{b.worker_id}</td>
              <td style={styles.td}>{b.service_type}</td>
              <td style={styles.td}>{new Date(b.booking_time).toLocaleString()}</td>
              <td style={styles.td}>
                <span style={{...styles.badge, backgroundColor: getStatusColor(b.status)}}>
                  {b.status.toUpperCase()}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

