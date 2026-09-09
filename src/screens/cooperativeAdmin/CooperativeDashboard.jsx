import React from 'react';

const styles = {
  container: { padding: '20px', fontFamily: 'sans-serif' },
  header: { fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', color: '#111827' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' },
  card: { padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  cardTitle: { fontSize: '14px', color: '#6b7280', marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase' },
  cardValue: { fontSize: '32px', fontWeight: 'bold', color: '#111827' },
  tabs: { display: 'flex', gap: '8px', borderBottom: '1px solid #e5e7eb', marginBottom: '24px' },
  tab: { padding: '12px 24px', cursor: 'pointer', border: 'none', backgroundColor: 'transparent', fontSize: '16px', fontWeight: '500', color: '#6b7280', borderBottom: '2px solid transparent' },
  activeTab: { color: '#0b6bcb', borderBottomColor: '#0b6bcb' }
};

export default function CooperativeDashboard({ stats, currentTab, setCurrentTab }) {
  const tabs = ['Overview', 'Workers', 'Verifications', 'Bookings', 'Disputes'];

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Society Admin Dashboard</h1>
      
      <div style={styles.tabs}>
        {tabs.map(tab => (
          <button 
            key={tab} 
            style={{...styles.tab, ...(currentTab === tab ? styles.activeTab : {})}}
            onClick={() => setCurrentTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {currentTab === 'Overview' && (
        <div style={styles.grid}>
          <div style={styles.card}>
            <div style={styles.cardTitle}>Total Workers</div>
            <div style={styles.cardValue}>{stats.totalWorkers}</div>
          </div>
          <div style={styles.card}>
            <div style={styles.cardTitle}>Active Bookings</div>
            <div style={styles.cardValue}>{stats.activeBookings}</div>
          </div>
          <div style={styles.card}>
            <div style={styles.cardTitle}>Pending Verifications (L1)</div>
            <div style={styles.cardValue}>{stats.pendingVerifications}</div>
          </div>
          <div style={styles.card}>
            <div style={styles.cardTitle}>Open Disputes</div>
            <div style={styles.cardValue}>{stats.openDisputes}</div>
          </div>
        </div>
      )}
    </div>
  );
}

