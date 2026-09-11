// src/context/AppContext.jsx
import React, { createContext, useContext, useState } from 'react';
import initialWorkers from '../data/mockWorkers.json';
import initialCustomers from '../data/mockCustomers.json';
import initialBookings from '../data/mockBookings.json';
import initialCooperatives from '../data/mockCooperatives.json';
import * as federationData from '../data/federationMockData';
import { translations } from '../utils/translations';

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
  const addBooking = (bookingData = {}) => {
    const nextId = `B${String(bookings.length + 1).padStart(6, '0')}`;
    const newBooking = {
      ...bookingData,
      booking_id: bookingData.booking_id || nextId,
      customer_id: bookingData.customer_id || 'C000001',
      worker_id: bookingData.worker_id,
      service_type: bookingData.service_type || 'General',
      booking_time: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: bookingData.status || 'requested',
      final_amount: bookingData.final_amount ?? 500,
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

  const submitRating = (bookingId, workerId, rating, feedback = '') => {
    setBookings((prev) => prev.map((booking) => (
      booking.booking_id === bookingId
        ? { ...booking, status: 'rated', rating, rating_by_customer: rating, feedback }
        : booking
    )));
    setWorkers((prev) => prev.map((worker) => {
      if (worker.worker_id !== workerId) return worker;
      const currentRating = Number(worker.rating_avg) || 0;
      return {
        ...worker,
        rating_avg: Number(((currentRating + Number(rating)) / 2).toFixed(2)),
      };
    }));
  };

  const verifyWorker = (workerId, level = 2) => {
    setWorkers((prev) => prev.map((worker) => (
      worker.worker_id === workerId
        ? { ...worker, verification_level: level, verificationLevel: level, verified: true }
        : worker
    )));
  };

  const t = (key, fallback) => {
    return translations[key]?.[language] || translations[key]?.en || fallback || key;
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
        setCustomers,
        bookings,
        setBookings,
        cooperatives,
        federation: federationData,
        federationData,
        activeBooking,
        setActiveBooking,
        addBooking,
        updateBookingStatus,
        submitRating,
        verifyWorker,
        t,
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
