// src/context/AppContext.jsx
import React, { createContext, useContext, useState } from 'react';
import initialWorkers from '../data/mockWorkers.json';
import initialCustomers from '../data/mockCustomers.json';
import initialBookings from '../data/mockBookings.json';
import initialCooperatives from '../data/mockCooperatives.json';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [role, setRole] = useState('customer'); // 'customer' | 'worker' | 'admin'
  const [language, setLanguage] = useState('en'); // 'en' | 'hi' | 'pa'
  const [workers, setWorkers] = useState(initialWorkers);
  const [customers, setCustomers] = useState(initialCustomers);
  const [bookings, setBookings] = useState(initialBookings);
  const [cooperatives] = useState(initialCooperatives);
  const [activeBooking, setActiveBooking] = useState(null);

  // Core action: Create new booking (Used by Riya in Customer Booking)
  const addBooking = (bookingData) => {
    const newBooking = {
      booking_id: `B00000${bookings.length + 1}`,
      customer_id: bookingData.customer_id || 'C000001',
      worker_id: bookingData.worker_id,
      service_type: bookingData.service_type || 'General',
      booking_time: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: 'pending',
      final_amount: bookingData.final_amount || 500,
      otp: Math.floor(1000 + Math.random() * 9000).toString(),
      rating_by_customer: null,
    };
    setBookings((prev) => [newBooking, ...prev]);
    setActiveBooking(newBooking);
    return newBooking;
  };

  // Core action: Update status (Used by Ghazal in Worker Accept/Complete)
  const updateBookingStatus = (bookingId, status) => {
    setBookings((prev) =>
      prev.map((b) => (b.booking_id === bookingId ? { ...b, status } : b))
    );
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        language,
        setLanguage,
        workers,
        setWorkers,
        customers,
        bookings,
        setBookings,
        cooperatives,
        activeBooking,
        setActiveBooking,
        addBooking,
        updateBookingStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
