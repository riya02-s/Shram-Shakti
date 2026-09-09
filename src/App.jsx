import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";

// Customer Screens
import CustomerHome from "./screens/customer/CustomerHome";
import WorkerSearch from "./screens/customer/WorkerSearch";
import WorkerProfile from "./screens/customer/WorkerProfile";
import BookingCreation from "./screens/customer/BookingCreation";
import BookingTracker from "./screens/customer/BookingTracker";
import InvoicePayment from "./screens/customer/InvoicePayment";
import Rating from "./screens/customer/Rating";
import BookingHistory from "./screens/customer/BookingHistory";
import EmergencyBooking from "./screens/customer/EmergencyBooking";

// Worker & Admin Screens (stubs — owned by teammates)
import WorkerDashboard from "./screens/worker/WorkerDashboard";
import AdminDashboard from "./screens/admin/AdminDashboard";

// ─── Service Categories ──────────────────────────────────────────────
const SERVICE_CATEGORIES = [
  {
    id: "plumbing",
    key: "plumbing",
    name: "Plumbing",
    nameI18n: { en: "Plumbing", hi: "प्लंबिंग", pa: "ਪਲੰਬਿੰਗ" },
    basePriceMin: 300,
    basePriceMax: 800,
  },
  {
    id: "electrical",
    key: "electrical",
    name: "Electrical",
    nameI18n: { en: "Electrical", hi: "बिजली", pa: "ਬਿਜਲੀ" },
    basePriceMin: 350,
    basePriceMax: 900,
  },
  {
    id: "cleaning",
    key: "cleaning",
    name: "Cleaning",
    nameI18n: { en: "Cleaning", hi: "सफ़ाई", pa: "ਸਫ਼ਾਈ" },
    basePriceMin: 200,
    basePriceMax: 600,
  },
  {
    id: "carpentry",
    key: "carpentry",
    name: "Carpentry",
    nameI18n: { en: "Carpentry", hi: "बढ़ईगिरी", pa: "ਬੰਨੜੀ" },
    basePriceMin: 400,
    basePriceMax: 1000,
  },
  {
    id: "gardening",
    key: "gardening",
    name: "Gardening",
    nameI18n: { en: "Gardening", hi: "बागवानी", pa: "ਬਾਗਵਾਨੀ" },
    basePriceMin: 250,
    basePriceMax: 700,
  },
];

// ─── Allocation Engine (rankWorkers) ─────────────────────────────────
// allocationEngine.js is empty (Umesh's pending work). This minimal
// adapter provides the shared ranking contract that WorkerSearch consumes.
// Uses the 5-factor weighted formula from spec §6.1 where data exists.

// Category ids use plural service names (plumbing/electrical/cleaning), but
// the shared seed data uses worker job titles (plumber/electrician/cleaner).
// This map bridges the two so ranking/matching actually returns workers.
const CATEGORY_TO_SERVICE = {
  plumbing: "plumber",
  electrical: "electrician",
  cleaning: "cleaner",
  carpentry: "carpenter",
  gardening: "gardener",
};

function serviceTypeFor(categoryId) {
  if (!categoryId) return "";
  const key = String(categoryId).toLowerCase();
  return CATEGORY_TO_SERVICE[key] || key;
}

// Normalize the shared snake_case worker seed into the camelCase shape the
// Customer screens read (name/fullName, ratingAvg, skill, area, hourlyRate…).
// Applied once at the adapter boundary; never mutates the shared store.
function normalizeWorker(w) {
  if (!w) return w;
  return {
    ...w,
    id: w.id ?? w.worker_id,
    workerId: w.workerId ?? w.worker_id,
    name: w.name ?? w.fullName ?? w.full_name,
    fullName: w.fullName ?? w.full_name,
    ratingAvg: w.ratingAvg ?? w.rating_avg,
    rating: w.rating ?? w.rating_avg,
    skillLevel: w.skillLevel ?? w.skill_level,
    hourlyRate: w.hourlyRate ?? w.hourly_rate,
    skill: w.skill ?? w.service_type,
    area: w.area,
    available: w.available ?? (w.active !== undefined ? w.active === 1 || w.active === true : undefined),
    isAvailable: w.isAvailable ?? (w.active !== undefined ? w.active === 1 || w.active === true : undefined),
    experienceYears: w.experienceYears ?? w.experience_years,
    ratingAvgDisplay: w.ratingAvgDisplay,
  };
}

function normalizedWorkers(workers) {
  return Array.isArray(workers) ? workers.map(normalizeWorker) : workers;
}

function rankWorkers(workers, serviceType) {
  if (!Array.isArray(workers) || !serviceType) return [];

  const target = serviceTypeFor(serviceType);
  return workers
    .filter((w) => {
      const st = String(w.service_type || "").toLowerCase();
      const isActive = w.active === 1 || w.active === true || w.active === "1";
      return st === target && isActive;
    })
    .map((w) => {
      const ratingNorm = (w.rating_avg || 0) / 5;
      const score = (0.15 * ratingNorm).toFixed(4);
      return { worker: w, fairAllocationScore: Number(score) };
    })
    .sort((a, b) => b.fairAllocationScore - a.fairAllocationScore);
}

// ─── Price Estimator ─────────────────────────────────────────────────
// No pricing.js exists. Simple estimate from category basePrice + worker rate.
function requestPriceEstimate({ category, worker }) {
  const hourlyRate = worker?.hourly_rate || worker?.hourlyRate || 0;
  const min = category?.basePriceMin || Math.max(200, hourlyRate - 100);
  const max = category?.basePriceMax || hourlyRate + 200;
  return { min, max, currency: "\u20B9" };
}

// ─── History Normalizer ──────────────────────────────────────────────
// BookingHistory (and the tracker/invoice/rating views it opens) read
// `id`/`bookingId`, `category`/`serviceCategory`, `worker.name`,
// `amount`/`totalAmount`, `paymentStatus`, and a camelCase `status`.
// The shared AppContext store uses snake_case (`booking_id`, `service_type`,
// `final_amount`). This adapter aligns the two. It never dumps the array —
// it maps over a copy, so the teammate-owned store is untouched.
function normalizeHistoryBookings(list) {
  if (!Array.isArray(list)) return [];
  return list.map((b) => {
    if (!b) return b;
    if (b.id !== undefined && b.category !== undefined && b.workerName !== undefined) {
      return b;
    }
    const st = b.status || "requested";
    const cat = b.serviceCategory || b.serviceType
      ? typeof b.service_type === "string"
        ? { id: b.service_type, key: b.service_type, name: b.service_type }
        : b.service_type
      : b.service_type;
    return {
      ...b,
      id: b.id ?? b.bookingId ?? b.booking_id,
      booking_id: b.booking_id ?? b.id ?? b.bookingId,
      bookingId: b.bookingId ?? b.booking_id ?? b.id,
      status: b.status ?? st,
      category: typeof b.category === "string" ? b.category : b.category?.name || cat?.name || b.service_type,
      serviceCategory: cat,
      service_type: b.service_type ?? cat?.id,
      serviceType: b.serviceType ?? cat?.id ?? b.service_type,
      worker:
        b.worker ||
        (b.workerName
          ? { id: b.worker_id, workerId: b.worker_id, name: b.workerName }
          : undefined),
      workerName: b.workerName || b.worker?.name,
      worker_id: b.worker_id ?? b.worker?.id ?? b.workerId,
      workerId: b.workerId ?? b.worker_id ?? b.worker?.id,
      amount: b.amount ?? b.totalAmount ?? b.priceEstimate ?? b.final_amount,
      totalAmount: b.totalAmount ?? b.amount ?? b.final_amount,
      priceEstimate: b.priceEstimate ?? b.final_amount,
      final_amount: b.final_amount ?? b.amount ?? b.totalAmount,
      paymentStatus: b.paymentStatus ?? (st === "paid" ? "paid" : null),
      ratingSubmitted: b.ratingSubmitted ?? (b.status === "rated" || (b.rating !== undefined && b.rating !== null)),
      rating: b.rating ?? b.rating_by_customer ?? null,
    };
  });
}

// ─── Invoice Generator ───────────────────────────────────────────────
function generateInvoice(booking) {
  const labour = booking.worker?.hourly_rate || booking.worker_hourly_rate || 500;
  const material = Math.round(labour * 0.15);
  const other = Math.round(labour * 0.05);
  return {
    id: `INV-${booking.booking_id || booking.id}`,
    bookingId: booking.booking_id || booking.id,
    labourCharge: labour,
    materialCharge: material,
    otherCharges: other,
    totalAmount: labour + material + other,
    currency: "\u20B9",
    paymentStatus: "pending",
  };
}

// ─── Customer Flow Orchestrator ──────────────────────────────────────
function CustomerFlow() {
  const {
    language,
    workers,
    bookings: ctxBookings,
    addBooking,
    updateBookingStatus,
  } = useApp();

  const [view, setView] = useState("home");

  // Navigation state
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [rankedWorkers, setRankedWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [activeBooking, setActiveBooking] = useState(null);
  const [viewingBooking, setViewingBooking] = useState(null);
  const [bookingInvoice, setBookingInvoice] = useState(null);

  const t = (key, fallback) => fallback;

  // ── CustomerHome ──────────────────────────────────────────────────
  function handleSelectCategory(category) {
    setSelectedCategory(category);
    const ranked = rankWorkers(normalizedWorkers(workers), category.id || category.key || category.name);
    setRankedWorkers(ranked);
    setView("search");
  }

  // ── WorkerSearch ──────────────────────────────────────────────────
  function handleViewProfile(worker) {
    setSelectedWorker(worker);
    setView("profile");
  }

  function handleBookNowFromSearch(worker) {
    setSelectedWorker(worker);
    setView("create");
  }

  // ── WorkerProfile ─────────────────────────────────────────────────
  function handleBookNowFromProfile(worker, category) {
    setSelectedWorker(worker);
    if (category) setSelectedCategory(category);
    setView("create");
  }

  // ── BookingCreation ───────────────────────────────────────────────
  function handleConfirmBooking(payload) {
    const workerId =
      selectedWorker?.worker_id || selectedWorker?.workerId || selectedWorker?.id || "";
    const workerName =
      selectedWorker?.full_name || selectedWorker?.fullName || selectedWorker?.name || "Worker";
    const catObj = selectedCategory || {};
    const categoryName =
      catObj.nameI18n?.[language] || catObj.nameI18n?.en || catObj.name || "";

    const booking = {
      // Rich fields for customer screens
      id: payload.bookingId || `B${Date.now()}`,
      booking_id: `B${Date.now()}`,
      bookingId: `B${Date.now()}`,
      category: categoryName,
      serviceCategory: catObj,
      service_type: catObj.id || catObj.key || catObj.name || payload.categoryId,
      serviceType: catObj.id || catObj.key || catObj.name || payload.categoryId,
      worker: { id: workerId, workerId, name: workerName, ...selectedWorker },
      workerName,
      workerId,
      worker_id: workerId,
      worker_hourly_rate: selectedWorker?.hourly_rate || selectedWorker?.hourlyRate,
      location: payload.location,
      address: payload.location,
      date: payload.date,
      time: payload.time,
      serviceDetails: payload.serviceDetails,
      status: "requested",
      amount: 0,
      totalAmount: 0,
      priceEstimate: 0,
      paymentStatus: null,
      ratingSubmitted: false,
      rating: null,
      rating_by_customer: null,
      final_amount: 0,
      otp: null,
      isEmergency: false,
    };

    // Persist to shared store
    const ctxBooking = addBooking({
      worker_id: workerId,
      service_type: booking.service_type,
      customer_id: "C000001",
      final_amount: 0,
    });

    booking.booking_id = ctxBooking.booking_id;
    booking.bookingId = ctxBooking.booking_id;
    booking.id = ctxBooking.booking_id;
    booking.otp = ctxBooking.otp;

    setActiveBooking(booking);
    setView("tracker");
  }

  // ── BookingTracker ────────────────────────────────────────────────
  // (No callbacks needed — Tracker is read-only for the customer)

  // ── InvoicePayment ────────────────────────────────────────────────
  function handlePay() {
    if (!activeBooking) return;
    const updated = { ...activeBooking, status: "paid", paymentStatus: "paid" };
    setActiveBooking(updated);
    updateBookingStatus(activeBooking.booking_id || activeBooking.id, "paid");
    const inv = generateInvoice(updated);
    inv.paymentStatus = "paid";
    setBookingInvoice(inv);
  }

  function handleContinueToRating(booking) {
    setActiveBooking(booking || activeBooking);
    setView("rating");
  }

  // ── Rating ────────────────────────────────────────────────────────
  function handleSubmitRating(payload) {
    const updated = {
      ...activeBooking,
      status: "rated",
      rating: payload.rating,
      ratingSubmitted: true,
    };
    setActiveBooking(updated);
    updateBookingStatus(activeBooking.booking_id || activeBooking.id, "rated");
  }

  // ── BookingHistory ────────────────────────────────────────────────
  function handleViewBooking(booking) {
    setViewingBooking(booking);
    setActiveBooking(booking);
    setView("tracker");
  }

  function handleViewInvoice(booking) {
    setActiveBooking(booking);
    setBookingInvoice(generateInvoice(booking));
    setView("invoice");
  }

  function handleRateBooking(booking) {
    setActiveBooking(booking);
    setView("rating");
  }

  // ── EmergencyBooking ──────────────────────────────────────────────
  function handleEmergencyRequest(payload) {
    const target = serviceTypeFor(payload.categoryId);
    const candidates = normalizedWorkers(workers).filter((w) => {
      const st = String(w.service_type || "").toLowerCase();
      const isActive = w.active === 1 || w.active === true;
      return st === target && isActive;
    });
    if (candidates.length === 0) return null;
    candidates.sort((a, b) => (b.rating_avg || 0) - (a.rating_avg || 0));
    return candidates[0];
  }

  function handleEmergencyContinue(matchedWorker, category, requestPayload) {
    setSelectedWorker(matchedWorker);
    setSelectedCategory(category);

    const workerId = matchedWorker?.worker_id || matchedWorker?.workerId || matchedWorker?.id || "";
    const workerName =
      matchedWorker?.full_name || matchedWorker?.fullName || matchedWorker?.name || "Worker";
    const catObj = category || {};
    const categoryName = catObj.nameI18n?.[language] || catObj.nameI18n?.en || catObj.name || "";

    const booking = {
      id: `B${Date.now()}`,
      booking_id: `B${Date.now()}`,
      bookingId: `B${Date.now()}`,
      category: categoryName,
      serviceCategory: catObj,
      service_type: catObj.id || catObj.key || catObj.name,
      serviceType: catObj.id || catObj.key || catObj.name,
      worker: { id: workerId, workerId, name: workerName, ...matchedWorker },
      workerName,
      workerId,
      worker_id: workerId,
      location: requestPayload.location,
      address: requestPayload.location,
      date: new Date().toISOString().slice(0, 10),
      time: new Date().toTimeString().slice(0, 5),
      status: "requested",
      amount: 0,
      totalAmount: 0,
      paymentStatus: null,
      ratingSubmitted: false,
      rating: null,
      final_amount: 0,
      otp: null,
      isEmergency: true,
    };

    const ctxBooking = addBooking({
      worker_id: workerId,
      service_type: booking.service_type,
      customer_id: "C000001",
      final_amount: 0,
    });

    booking.booking_id = ctxBooking.booking_id;
    booking.bookingId = ctxBooking.booking_id;
    booking.id = ctxBooking.booking_id;
    booking.otp = ctxBooking.otp;

    setActiveBooking(booking);
    setView("tracker");
  }

  // ── Screen Router ─────────────────────────────────────────────────
  switch (view) {
    case "home":
      return (
        <CustomerHome
          categories={SERVICE_CATEGORIES}
          language={language}
          onSelectCategory={handleSelectCategory}
          onEmergency={() => setView("emergency")}
          onGoToHistory={() => setView("history")}
          t={t}
        />
      );

    case "search":
      return (
        <WorkerSearch
          category={selectedCategory}
          rankedWorkers={rankedWorkers}
          onViewProfile={handleViewProfile}
          onBookNow={handleBookNowFromSearch}
          onBack={() => setView("home")}
          language={language}
          t={t}
        />
      );

    case "profile":
      return (
        <WorkerProfile
          worker={selectedWorker}
          category={selectedCategory}
          onBookNow={handleBookNowFromProfile}
          onBack={() => setView("search")}
          language={language}
          t={t}
        />
      );

    case "create":
      return (
        <BookingCreation
          worker={selectedWorker}
          category={selectedCategory}
          onConfirmBooking={handleConfirmBooking}
          onBack={() => setView("profile")}
          requestPriceEstimate={requestPriceEstimate}
          language={language}
          t={t}
        />
      );

    case "tracker":
      return (
        <BookingTracker
          booking={activeBooking}
          currentStatus={activeBooking?.status}
          otp={activeBooking?.otp}
          onBack={() => setView("history")}
          language={language}
          t={t}
        />
      );

    case "invoice":
      return (
        <InvoicePayment
          booking={activeBooking}
          invoice={bookingInvoice}
          onPay={handlePay}
          onContinueToRating={handleContinueToRating}
          onBack={() => setView("tracker")}
          language={language}
          t={t}
        />
      );

    case "rating":
      return (
        <Rating
          booking={activeBooking}
          onSubmitRating={handleSubmitRating}
          onBack={() => setView("tracker")}
          onGoToHistory={() => setView("history")}
          language={language}
          t={t}
        />
      );

    case "history":
      return (
        <BookingHistory
          bookings={normalizeHistoryBookings(ctxBookings)}
          onViewBooking={handleViewBooking}
          onViewInvoice={handleViewInvoice}
          onRateBooking={handleRateBooking}
          onBack={() => setView("home")}
          language={language}
          t={t}
        />
      );

    case "emergency":
      return (
        <EmergencyBooking
          categories={SERVICE_CATEGORIES}
          category={selectedCategory}
          onEmergencyRequest={handleEmergencyRequest}
          onContinue={handleEmergencyContinue}
          onBack={() => setView("home")}
          language={language}
          t={t}
        />
      );

    default:
      return (
        <CustomerHome
          categories={SERVICE_CATEGORIES}
          language={language}
          onSelectCategory={handleSelectCategory}
          onEmergency={() => setView("emergency")}
          onGoToHistory={() => setView("history")}
          t={t}
        />
      );
  }
}

// ─── App ─────────────────────────────────────────────────────────────
export default function App() {
  return (
    <AppProvider>
      <Router>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px" }}>
          <Routes>
            <Route path="/*" element={<CustomerFlow />} />
            <Route path="/worker/dashboard" element={<WorkerDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}
