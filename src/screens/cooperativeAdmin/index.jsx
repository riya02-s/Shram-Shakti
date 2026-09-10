import React, { useState } from 'react';
import CooperativeDashboard from './CooperativeDashboard';
import WorkerList from './WorkerList';
import WorkerVerification from './WorkerVerification';
import LocalBookings from './LocalBookings';
import DisputeQueue from './DisputeQueue';

// Import shared seed data
import mockWorkers from '../../data/mockWorkers.json';
import mockBookings from '../../data/mockBookings.json';

const initialDisputes = [
  {
    id: 'D001',
    booking_id: 'B000004',
    customer_id: 'C000884',
    worker_id: 'W00003',
    reason: 'Worker did not show up on time.',
    status: 'open',
    resolution: null
  },
  {
    id: 'D002',
    booking_id: 'B000002',
    customer_id: 'C000992',
    worker_id: 'W00008',
    reason: 'Payment disagreement.',
    status: 'open',
    resolution: null
  }
];

export default function CooperativeAdminModule() {
  const [workers, setWorkers] = useState(
    mockWorkers.map(w => ({ ...w, verification_level: 1 }))
  );
  const [bookings, setBookings] = useState(mockBookings);
  const [disputes, setDisputes] = useState(initialDisputes);
  
  const [currentTab, setCurrentTab] = useState('Overview');

  const updateWorkerLevel = (workerId, newLevel) => {
    setWorkers(prev => prev.map(w => 
      w.worker_id === workerId ? { ...w, verification_level: newLevel } : w
    ));
  };

  const resolveDispute = (disputeId, favor, notes) => {
    setDisputes(prev => prev.map(d => 
      d.id === disputeId ? { ...d, status: 'resolved', resolution: { favor, notes } } : d
    ));
  };

  const stats = {
    totalWorkers: workers.length,
    activeBookings: bookings.filter(b => b.status === 'active').length,
    pendingVerifications: workers.filter(w => w.verification_level === 1).length,
    openDisputes: disputes.filter(d => d.status === 'open').length
  };

  return (
    <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', padding: '20px' }}>
      <CooperativeDashboard 
        stats={stats} 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
      />
      
      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '20px', minHeight: '400px' }}>
        {currentTab === 'Workers' && <WorkerList workers={workers} />}
        {currentTab === 'Verifications' && <WorkerVerification workers={workers} updateWorkerLevel={updateWorkerLevel} />}
        {currentTab === 'Bookings' && <LocalBookings bookings={bookings} />}
        {currentTab === 'Disputes' && <DisputeQueue disputes={disputes} resolveDispute={resolveDispute} />}
        {currentTab === 'Overview' && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
            <p>Select a tab above to manage workers, view bookings, or resolve disputes.</p>
          </div>
        )}
      </div>
    </div>
  );
}

