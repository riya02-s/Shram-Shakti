import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const WorkerDashboard = () => {
  const { workers, bookings, updateBookingStatus, setActiveBooking, t } = useApp();
  const currentWorkerId = "W00008";
  const workerProfile = workers.find(w => w.worker_id === currentWorkerId) || {
    worker_id: currentWorkerId,
    full_name: 'Worker',
    area: 'Local area',
    service_type: 'general',
    skill: 'General service',
    skill_level: 'basic',
    hourly_rate: 500,
  };
  
  const initialIncomingJob = bookings.find(
    (booking) => booking.worker_id === currentWorkerId && ['requested', 'pending', 'active'].includes(booking.status)
  ) || {
    booking_id: 'B999', customer_id: 'C123', task: 'Unknown Task', estEarnings: 500, otp: '1234'
  };

  // State for the worker job lifecycle
  // 'idle' -> 'incoming' -> 'accepted' -> 'started' -> 'completed'
  const [jobState, setJobState] = useState('idle');
  const [otp, setOtp] = useState('');
  
  // Worker state populated from mock data
  const [earnings, setEarnings] = useState(0);
  const [jobHistory, setJobHistory] = useState(
    bookings.filter(b => b.worker_id === currentWorkerId && b.status === 'completed')
  );
  
  const welfareInfo = {
    insuranceStatus: 'Active (Valid till Dec 2024)',
    certification: `Level ${workerProfile.skill_level} Verified ${workerProfile.service_type}`,
    society: workerProfile.area + ' Cooperative'
  };

  const incomingJob = {
    id: initialIncomingJob.booking_id,
    customer: 'Customer ' + initialIncomingJob.customer_id,
    task: workerProfile.skill,
    location: workerProfile.area,
    estEarnings: workerProfile.hourly_rate,
  };

  // Handlers for job flow
  const handleAcceptJob = () => {
    updateBookingStatus(initialIncomingJob.booking_id, 'accepted');
    setActiveBooking(initialIncomingJob);
    setJobState('accepted');
  };
  const handleRejectJob = () => {
    updateBookingStatus(initialIncomingJob.booking_id, 'rejected');
    setJobState('idle');
  };
  
  const handleStartJob = () => {
    if (otp === String(initialIncomingJob.otp || '1234')) {
      updateBookingStatus(initialIncomingJob.booking_id, 'started');
      setJobState('started');
    } else {
      alert('Invalid OTP. Please enter the 4-digit OTP provided by the customer.');
    }
  };

  const handleCompleteJob = () => {
    updateBookingStatus(initialIncomingJob.booking_id, 'completed');
    setJobState('idle');
    setEarnings(prev => prev + incomingJob.estEarnings);
    setJobHistory(prev => [
      { id: incomingJob.id, date: 'Today', task: incomingJob.task, earnings: incomingJob.estEarnings, status: 'Completed' },
      ...prev
    ]);
    setOtp('');
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>{t('worker.dashboard.title', 'Worker Dashboard')}</h1>
      
      {/* Simulation Trigger (For Demo Purposes) */}
      {jobState === 'idle' && (
        <button 
          onClick={() => setJobState('incoming')}
          style={{ width: '100%', padding: '10px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', marginBottom: '20px', cursor: 'pointer' }}
        >
          {t('worker.dashboard.simulateJob', 'Simulate Incoming Job Request')}
        </button>
      )}

      {/* Incoming Job Request Screen */}
      {jobState === 'incoming' && (
        <div style={{ border: '2px solid #3498db', padding: '15px', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#ebf5fb' }}>
          <h2 style={{ margin: '0 0 10px 0', color: '#2980b9' }}>{t('worker.job.newRequest', '🚨 New Job Request!')}</h2>
          <p><strong>{t('worker.job.customer', 'Customer')}:</strong> {incomingJob.customer}</p>
          <p><strong>{t('worker.job.task', 'Task')}:</strong> {incomingJob.task}</p>
          <p><strong>{t('worker.job.location', 'Location')}:</strong> {incomingJob.location}</p>
          <p><strong>{t('worker.job.estEarnings', 'Est. Earnings')}:</strong> ₹{incomingJob.estEarnings}</p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <button onClick={handleAcceptJob} style={{ flex: 1, padding: '10px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>{t('common.accept', 'Accept')}</button>
            <button onClick={handleRejectJob} style={{ flex: 1, padding: '10px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>{t('common.reject', 'Reject')}</button>
          </div>
        </div>
      )}

      {/* Active Job Screen - Accepted */}
      {jobState === 'accepted' && (
        <div style={{ border: '2px solid #f39c12', padding: '15px', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#fef9e7' }}>
          <h2 style={{ margin: '0 0 10px 0', color: '#d35400' }}>{t('worker.job.activeTitle', '📍 Active Job: Proceed to Location')}</h2>
          <p><strong>{t('worker.job.customer', 'Customer')}:</strong> {incomingJob.customer} ({incomingJob.location})</p>
          <p>{t('worker.job.askOtp', 'Ask the customer for the OTP to start the job.')}</p>
          <div style={{ marginTop: '10px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <input 
                type="text" 
                placeholder={t('worker.job.enterOtp', 'Enter 4-digit OTP')}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{ padding: '10px', flex: 1, boxSizing: 'border-box', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px', letterSpacing: '2px', fontWeight: 'bold', textAlign: 'center' }}
              />
              <button
                type="button"
                onClick={() => setOtp(String(initialIncomingJob.otp || '1234'))}
                style={{ padding: '0 12px', fontSize: '12px', background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                {t('worker.job.autofill', 'Auto-fill')} ({initialIncomingJob.otp || '1234'})
              </button>
            </div>
            <button onClick={handleStartJob} style={{ width: '100%', padding: '11px', backgroundColor: '#15803d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
              {t('worker.job.startBtn', 'Verify OTP & Start Job')}
            </button>
          </div>
        </div>
      )}

      {/* Active Job Screen - Started */}
      {jobState === 'started' && (
        <div style={{ border: '2px solid #2ecc71', padding: '15px', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#eafaf1' }}>
          <h2 style={{ margin: '0 0 10px 0', color: '#27ae60' }}>{t('worker.job.inProgress', '🛠️ Job in Progress')}</h2>
          <p><strong>{t('worker.job.task', 'Task')}:</strong> {incomingJob.task}</p>
          <p>{t('worker.job.startedMsg', 'You have successfully started the job.')}</p>
          <button onClick={handleCompleteJob} style={{ width: '100%', padding: '11px', backgroundColor: '#15803d', color: 'white', border: 'none', borderRadius: '8px', marginTop: '10px', cursor: 'pointer', fontWeight: 600 }}>
            {t('worker.job.markCompleted', 'Mark Job as Completed')}
          </button>
        </div>
      )}

      <hr style={{ margin: '24px 0', borderColor: '#e2e8f0' }} />

      {/* Worker Earnings & Welfare Info */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <div style={{ flex: 1, padding: '14px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
          <h4 style={{ margin: '0 0 6px 0', color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>{t('worker.stats.earnings', '💰 Earnings')}</h4>
          <p style={{ fontSize: '22px', fontWeight: 'bold', margin: 0, color: '#15803d' }}>₹{earnings}</p>
        </div>
        <div style={{ flex: 1, padding: '14px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
          <h4 style={{ margin: '0 0 6px 0', color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>{t('worker.stats.welfare', '🛡️ Welfare Info')}</h4>
          <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#334155' }}><strong>{t('worker.stats.insurance', 'Insurance')}:</strong> {t('worker.stats.insuranceActive', 'Active')}</p>
          <p style={{ margin: '0', fontSize: '11px', color: '#334155' }}><strong>{t('worker.stats.cert', 'Cert')}:</strong> {t('worker.stats.level', 'Level')} {workerProfile.skill_level || '1'}</p>
        </div>
      </div>

      {/* Job History */}
      <div>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', marginBottom: '10px' }}>{t('worker.history.title', '📜 Job History')}</h3>
        {jobHistory.length === 0 ? (
          <p style={{ fontSize: '13px', color: '#94a3b8', textAlign: 'center', padding: '20px' }}>{t('worker.history.noJobs', 'No completed jobs yet')}</p>
        ) : (
          jobHistory.map((job, index) => (
            <div key={index} style={{ padding: '12px 10px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: 0, fontWeight: '600', fontSize: '14px', color: '#1e293b' }}>{job.service_type || job.task || 'Service Task'}</p>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>{job.booking_time || job.date || t('common.recent', 'Recent')} • <span style={{ color: '#15803d', fontWeight: 600 }}>{t('common.completed', 'Completed')}</span></p>
              </div>
              <div style={{ fontWeight: '700', color: '#15803d', fontSize: '15px' }}>+₹{job.final_amount || job.earnings || 500}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WorkerDashboard;

