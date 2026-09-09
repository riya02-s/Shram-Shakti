// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import RoleSwitcher from './components/shared/RoleSwitcher';

// Customer Screens
import CustomerHome from './screens/customer/CustomerHome';
import WorkerSearch from './screens/customer/WorkerSearch';
import WorkerProfile from './screens/customer/WorkerProfile';
import BookingCreation from './screens/customer/BookingCreation';
import EmergencyBooking from './screens/customer/EmergencyBooking';

// Worker & Admin Screens
import WorkerDashboard from './screens/worker/WorkerDashboard';
import AdminDashboard from './screens/admin/AdminDashboard';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
          <RoleSwitcher />
          <Routes>
            {/* Customer Flow */}
            <Route path="/" element={<CustomerHome />} />
            <Route path="/search/:serviceType" element={<WorkerSearch />} />
            <Route path="/worker/:workerId" element={<WorkerProfile />} />
            <Route path="/book/:workerId" element={<BookingCreation />} />
            <Route path="/emergency" element={<EmergencyBooking />} />

            {/* Worker Flow */}
            <Route path="/worker/dashboard" element={<WorkerDashboard />} />

            {/* Admin Flow */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}
