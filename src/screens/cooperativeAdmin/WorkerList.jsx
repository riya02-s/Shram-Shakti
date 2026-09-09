import React, { useState } from 'react';

const styles = {
  container: { padding: '20px', fontFamily: 'sans-serif' },
  header: { marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' },
  input: { padding: '8px', marginBottom: '20px', width: '100%', maxWidth: '300px', borderRadius: '4px', border: '1px solid #ccc' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
  th: { borderBottom: '2px solid #ddd', padding: '10px', textAlign: 'left' },
  td: { borderBottom: '1px solid #ddd', padding: '10px' },
};

export default function WorkerList({ workers }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWorkers = workers.filter(w => 
    w.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    w.service_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Registered Workers</h2>
      <input 
        style={styles.input}
        placeholder="Search by name or category..." 
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Level</th>
            <th style={styles.th}>Rating</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredWorkers.map(w => (
            <tr key={w.worker_id}>
              <td style={styles.td}>{w.worker_id}</td>
              <td style={styles.td}>{w.full_name}</td>
              <td style={styles.td}>{w.service_type}</td>
              <td style={styles.td}>{w.verification_level || 1}</td>
              <td style={styles.td}>{w.rating_avg}</td>
              <td style={styles.td}>{w.active ? 'Active' : 'Inactive'}</td>
            </tr>
          ))}
          {filteredWorkers.length === 0 && (
            <tr><td colSpan="6" style={{...styles.td, textAlign: 'center'}}>No workers found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

