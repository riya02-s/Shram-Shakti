import React, { useState } from 'react';
import mockWorkers from '../../data/mockWorkers.json';
import mockBookings from '../../data/mockBookings.json';

const WorkerDashboard = () => {
  // Let's assume Ghazal is viewing the dashboard for worker W00008 (Zayan Apte - Electrician)
  const currentWorkerId = "W00008";
  const workerProfile = mockWorkers.find(w => w.worker_id === currentWorkerId);
  
  // Find a mock incoming booking for this worker
  const initialIncomingJob = mockBookings.find(b => b.worker_id === currentWorkerId && b.status === "active") || {
    booking_id: 'B999', customer_id: 'C123', task: 'Unknown Task', estEarnings: 500
  };

  // State for the worker job lifecycle
  // 'idle' -> 'incoming' -> 'accepted' -> 'started' -> 'completed'
  const [jobState, setJobState] = useState('idle');
  const [otp, setOtp] = useState('');
  
  // Mock data for the worker profile
  const [earnings, setEarnings] = useState(1250);
  const [jobHistory, setJobHistory] = useState([
    { id: 1, date: '2023-10-20', task: 'Plumbing Repair', earnings: 500, status: 'Completed' },
    { id: 2, date: '2023-10-18', task: 'Electrical Wiring', earnings: 750, status: 'Completed' },
  ]);
  // Worker state populated from mock data
  const [earnings, setEarnings] = useState(0); 
  const [jobHistory, setJobHistory] = useState(
    mockBookings.filter(b => b.worker_id === currentWorkerId && b.status === 'completed')
  );
  
  const welfareInfo = {
    insuranceStatus: 'Active (Valid till Dec 2024)',
    certification: 'Level 2 Verified Electrician/Plumber',
    society: 'Delhi Shramik Cooperative'
    certification: `Level ${workerProfile.skill_level} Verified ${workerProfile.service_type}`,
    society: workerProfile.area + ' Cooperative'
  };

  const incomingJob = {
    id: 101,
    customer: 'Rahul Verma',
    task: 'Fix Leaking Pipe',
    location: 'Sector 4, Dwarka (2.5 km away)',
    estEarnings: 400,
    id: initialIncomingJob.booking_id,
    customer: 'Customer ' + initialIncomingJob.customer_id,
    task: workerProfile.skill,
    location: workerProfile.area,
    estEarnings: workerProfile.hourly_rate,
  };

  // Handlers for job flow
  const handleAcceptJob = () => setJobState('accepted');
  const handleRejectJob = () => setJobState('idle');
  
  const handleStartJob = () => {
    if (otp === '1234') {
      setJobState('started');
    } else {
      alert('Invalid OTP. Please enter the 4-digit OTP provided by the customer.');
    }
  };

  const handleCompleteJob = () => {
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
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Worker Dashboard</h1>
      
      {/* Simulation Trigger (For Demo Purposes) */}
      {jobState === 'idle' && (
        <button 
          onClick={() => setJobState('incoming')}
          style={{ width: '100%', padding: '10px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', marginBottom: '20px', cursor: 'pointer' }}
        >
          Simulate Incoming Job Request
        </button>
      )}

      {/* Incoming Job Request Screen */}
      {jobState === 'incoming' && (
        <div style={{ border: '2px solid #3498db', padding: '15px', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#ebf5fb' }}>
          <h2 style={{ margin: '0 0 10px 0', color: '#2980b9' }}>🚨 New Job Request!</h2>
          <p><strong>Customer:</strong> {incomingJob.customer}</p>
          <p><strong>Task:</strong> {incomingJob.task}</p>
          <p><strong>Location:</strong> {incomingJob.location}</p>
          <p><strong>Est. Earnings:</strong> ₹{incomingJob.estEarnings}</p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <button onClick={handleAcceptJob} style={{ flex: 1, padding: '10px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Accept</button>
            <button onClick={handleRejectJob} style={{ flex: 1, padding: '10px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Reject</button>
          </div>
        </div>
      )}

      {/* Active Job Screen - Accepted */}
      {jobState === 'accepted' && (
        <div style={{ border: '2px solid #f39c12', padding: '15px', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#fef9e7' }}>
          <h2 style={{ margin: '0 0 10px 0', color: '#d35400' }}>📍 Active Job: Proceed to Location</h2>
          <p><strong>Customer:</strong> {incomingJob.customer} ({incomingJob.location})</p>
          <p>Ask the customer for the OTP to start the job.</p>
          <div style={{ marginTop: '10px' }}>
            <input 
              type="text" 
              placeholder="Enter 4-digit OTP (Try: 1234)" 
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={{ padding: '10px', width: '100%', boxSizing: 'border-box', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <button onClick={handleStartJob} style={{ width: '100%', padding: '10px', backgroundColor: '#f39c12', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Verify OTP & Start Job
            </button>
          </div>
        </div>
      )}

      {/* Active Job Screen - Started */}
      {jobState === 'started' && (
        <div style={{ border: '2px solid #2ecc71', padding: '15px', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#eafaf1' }}>
          <h2 style={{ margin: '0 0 10px 0', color: '#27ae60' }}>🛠️ Job in Progress</h2>
          <p><strong>Task:</strong> {incomingJob.task}</p>
          <p>You have successfully started the job.</p>
          <button onClick={handleCompleteJob} style={{ width: '100%', padding: '10px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', marginTop: '10px', cursor: 'pointer' }}>
            Mark Job as Completed
          </button>
        </div>
      )}

      <hr style={{ margin: '30px 0' }} />

      {/* Worker Earnings & Welfare Info */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ flex: 1, padding: '15px', backgroundColor: '#ecf0f1', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>💰 Earnings</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#27ae60' }}>₹{earnings}</p>
        </div>
        <div style={{ flex: 1, padding: '15px', backgroundColor: '#ecf0f1', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>🛡️ Welfare Info</h3>
          <p style={{ margin: '0 0 5px 0', fontSize: '14px' }}><strong>Insurance:</strong> {welfareInfo.insuranceStatus}</p>
          <p style={{ margin: '0 0 5px 0', fontSize: '14px' }}><strong>Cert:</strong> {welfareInfo.certification}</p>
        </div>
      </div>

      {/* Job History */}
      <div>
        <h3>📜 Job History</h3>
        {jobHistory.map((job, index) => (
          <div key={index} style={{ padding: '10px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <p style={{ margin: 0, fontWeight: 'bold' }}>{job.task}</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#7f8c8d' }}>{job.date} - {job.status}</p>
              <p style={{ margin: 0, fontWeight: 'bold' }}>{job.service_type || job.task}</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#7f8c8d' }}>{job.booking_time || job.date} - {job.status}</p>
            </div>
            <div style={{ fontWeight: 'bold', color: '#27ae60' }}>+₹{job.earnings}</div>
            <div style={{ fontWeight: 'bold', color: '#27ae60' }}>+₹{job.final_amount || job.earnings}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkerDashboard;

