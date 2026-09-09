import React from 'react';

const styles = {
  container: { padding: '20px', fontFamily: 'sans-serif' },
  header: { marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' },
  card: { border: '1px solid #ddd', borderRadius: '8px', padding: '16px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  info: { flex: 1 },
  actions: { display: 'flex', gap: '8px' },
  button: { padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', color: 'white' },
  btnLevel1: { backgroundColor: '#4b5563' },
  btnLevel2: { backgroundColor: '#3b82f6' },
  btnLevel3: { backgroundColor: '#10b981' },
  badge: { padding: '4px 8px', borderRadius: '12px', fontSize: '12px', color: 'white', fontWeight: 'bold', display: 'inline-block', marginTop: '8px' }
};

export default function WorkerVerification({ workers, updateWorkerLevel }) {
  const handleLevelChange = (workerId, newLevel) => {
    if (window.confirm(`Are you sure you want to change verification level to ${newLevel}?`)) {
      updateWorkerLevel(workerId, newLevel);
    }
  };

  const getBadgeColor = (level) => {
    if (level === 3) return '#10b981';
    if (level === 2) return '#3b82f6';
    return '#4b5563';
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Worker Verification</h2>
      {workers.map(w => {
        const level = w.verification_level || 1;
        return (
          <div key={w.worker_id} style={styles.card}>
            <div style={styles.info}>
              <strong>{w.full_name}</strong> ({w.service_type})
              <div>
                <span style={{...styles.badge, backgroundColor: getBadgeColor(level)}}>
                  Level {level} Verified
                </span>
              </div>
            </div>
            <div style={styles.actions}>
              <button 
                style={{...styles.button, ...styles.btnLevel1, opacity: level === 1 ? 0.5 : 1}} 
                onClick={() => handleLevelChange(w.worker_id, 1)}
                disabled={level === 1}
              >Set L1</button>
              <button 
                style={{...styles.button, ...styles.btnLevel2, opacity: level === 2 ? 0.5 : 1}} 
                onClick={() => handleLevelChange(w.worker_id, 2)}
                disabled={level === 2}
              >Set L2</button>
              <button 
                style={{...styles.button, ...styles.btnLevel3, opacity: level === 3 ? 0.5 : 1}} 
                onClick={() => handleLevelChange(w.worker_id, 3)}
                disabled={level === 3}
              >Set L3</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

