import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Navigate, Routes, Route, useNavigate, useParams, useLocation } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import RoleSwitcher from "./components/shared/RoleSwitcher";

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
import FederationLayout from "./screens/Federation/FederationLayout";
import CooperativeAdminModule from "./screens/cooperativeAdmin";
import { rankWorkers as allocationRankWorkers } from "./logic/allocationEngine";

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
    currency: "INR",
    paymentStatus: "pending",
  };
}

// ─── Customer Flow Orchestrator ──────────────────────────────────────
function CustomerFlow({ initialView = "home" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceType, workerId, bookingId } = useParams();

  const {
    language,
    workers,
    bookings: ctxBookings,
    setBookings,
    addBooking,
    updateBookingStatus,
  } = useApp();

  const allNormWorkers = React.useMemo(() => normalizedWorkers(workers), [workers]);
  const historyList = React.useMemo(() => normalizeHistoryBookings(ctxBookings), [ctxBookings]);

  // Selected state
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [activeBooking, setActiveBooking] = useState(null);
  const [bookingInvoice, setBookingInvoice] = useState(null);

  // Derive active category
  const resolvedCategory = React.useMemo(() => {
    if (selectedCategory) return selectedCategory;
    if (serviceType) {
      const found = SERVICE_CATEGORIES.find(
        (c) => c.id.toLowerCase() === serviceType.toLowerCase() || c.key.toLowerCase() === serviceType.toLowerCase()
      );
      if (found) return found;
    }
    if (selectedWorker) {
      const st = String(selectedWorker.service_type || "").toLowerCase();
      const found = SERVICE_CATEGORIES.find((c) => serviceTypeFor(c.id) === st);
      if (found) return found;
    }
    return SERVICE_CATEGORIES[0];
  }, [selectedCategory, serviceType, selectedWorker]);

  // Derive active worker
  const resolvedWorker = React.useMemo(() => {
    if (selectedWorker) return selectedWorker;
    if (workerId) {
      return (
        allNormWorkers.find(
          (w) =>
            String(w.id) === String(workerId) ||
            String(w.worker_id) === String(workerId) ||
            String(w.workerId) === String(workerId)
        ) || allNormWorkers[0]
      );
    }
    return allNormWorkers[0] || null;
  }, [selectedWorker, workerId, allNormWorkers]);

  // Derive ranked workers
  const effectiveRankedWorkers = React.useMemo(() => {
    const targetCat = resolvedCategory || SERVICE_CATEGORIES[0];
    return allocationRankWorkers(allNormWorkers, targetCat.id || targetCat.key || targetCat.name);
  }, [allNormWorkers, resolvedCategory]);

  // Derive active booking
  const resolvedBooking = React.useMemo(() => {
    if (activeBooking) return activeBooking;
    if (bookingId) {
      const found = historyList.find(
        (b) =>
          String(b.booking_id) === String(bookingId) ||
          String(b.id) === String(bookingId) ||
          String(b.bookingId) === String(bookingId)
      );
      if (found) return found;
    }
    return historyList[0] || null;
  }, [activeBooking, bookingId, historyList]);

  // Derive invoice
  const effectiveInvoice = React.useMemo(() => {
    if (bookingInvoice) return bookingInvoice;
    if (resolvedBooking) return generateInvoice(resolvedBooking);
    return null;
  }, [bookingInvoice, resolvedBooking]);

  const t = (key, fallback) => fallback;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname, initialView]);

  // ── Handlers ──────────────────────────────────────────────────────
  function handleSelectCategory(category) {
    setSelectedCategory(category);
    navigate(`/search/${category.id || category.key}`);
  }

  function handleViewProfile(worker) {
    setSelectedWorker(worker);
    navigate(`/worker/${worker.worker_id || worker.id || worker.workerId}`);
  }

  function handleBookNowFromSearch(worker) {
    setSelectedWorker(worker);
    navigate(`/book/${worker.worker_id || worker.id || worker.workerId}`);
  }

  function handleBookNowFromProfile(worker, category) {
    setSelectedWorker(worker);
    if (category) setSelectedCategory(category);
    navigate(`/book/${worker.worker_id || worker.id || worker.workerId}`);
  }

  function handleConfirmBooking(payload) {
    const workerObj = resolvedWorker || selectedWorker;
    const workerIdVal =
      workerObj?.worker_id || workerObj?.workerId || workerObj?.id || "W00008";
    const workerName =
      workerObj?.full_name || workerObj?.fullName || workerObj?.name || "Worker";
    const catObj = resolvedCategory || selectedCategory || {};
    const categoryName =
      catObj.nameI18n?.[language] || catObj.nameI18n?.en || catObj.name || "";

    const ctxBooking = addBooking({
      worker_id: workerIdVal,
      service_type: catObj.id || catObj.key || catObj.name || payload.categoryId,
      customer_id: "C000001",
      final_amount: 0,
    });

    const booking = {
      id: ctxBooking.booking_id,
      booking_id: ctxBooking.booking_id,
      bookingId: ctxBooking.booking_id,
      category: categoryName,
      serviceCategory: catObj,
      service_type: catObj.id || catObj.key || catObj.name || payload.categoryId,
      serviceType: catObj.id || catObj.key || catObj.name || payload.categoryId,
      worker: { id: workerIdVal, workerId: workerIdVal, name: workerName, ...workerObj },
      workerName,
      workerId: workerIdVal,
      worker_id: workerIdVal,
      worker_hourly_rate: workerObj?.hourly_rate || workerObj?.hourlyRate,
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
      otp: ctxBooking.otp,
      isEmergency: false,
    };

    setActiveBooking(booking);
    navigate(`/customer/tracker/${ctxBooking.booking_id}`);
  }

  function handlePay() {
    const currentBk = resolvedBooking || activeBooking;
    if (!currentBk) return;
    const bId = currentBk.booking_id || currentBk.id;
    const updated = { ...currentBk, status: "paid", paymentStatus: "paid" };
    setActiveBooking(updated);
    setBookings((previous) =>
      previous.map((booking) =>
        booking.booking_id === bId
          ? { ...booking, status: "paid", paymentStatus: "paid" }
          : booking
      )
    );
    updateBookingStatus(bId, "paid");
    const inv = generateInvoice(updated);
    inv.paymentStatus = "paid";
    setBookingInvoice(inv);
  }

  function handleContinueToRating(booking) {
    const b = booking || resolvedBooking || activeBooking;
    setActiveBooking(b);
    navigate(`/customer/rate/${b?.booking_id || b?.id || "B000001"}`);
  }

  function handleSubmitRating(payload) {
    const currentBk = resolvedBooking || activeBooking;
    const bId = currentBk?.booking_id || currentBk?.id;
    const updated = {
      ...currentBk,
      status: "rated",
      rating: payload.rating,
      ratingSubmitted: true,
    };
    setActiveBooking(updated);
    if (bId) {
      setBookings((previous) =>
        previous.map((booking) =>
          booking.booking_id === bId
            ? {
                ...booking,
                status: "rated",
                rating: payload.rating,
                rating_by_customer: payload.rating,
                ratingSubmitted: true,
              }
            : booking
        )
      );
      updateBookingStatus(bId, "rated");
    }
    navigate("/customer/history");
  }

  function handleViewBooking(booking) {
    setActiveBooking(booking);
    navigate(`/customer/tracker/${booking.booking_id || booking.id}`);
  }

  function handleViewInvoice(booking) {
    setActiveBooking(booking);
    setBookingInvoice(generateInvoice(booking));
    navigate(`/customer/invoice/${booking.booking_id || booking.id}`);
  }

  function handleRateBooking(booking) {
    setActiveBooking(booking);
    navigate(`/customer/rate/${booking.booking_id || booking.id}`);
  }

  function handleEmergencyRequest(payload) {
    const target = serviceTypeFor(payload.categoryId);
    const activeWorkers = allNormWorkers.filter((w) => {
      const isActive = w.active === 1 || w.active === true || w.active === "1";
      return isActive;
    });
    const localCandidates = activeWorkers.filter((w) => {
      const st = String(w.service_type || "").toLowerCase();
      return st === target;
    });
    const candidates = localCandidates.length > 0 ? localCandidates : activeWorkers;
    if (candidates.length === 0) return null;
    candidates.sort((a, b) => (b.rating_avg || 0) - (a.rating_avg || 0));
    return candidates[0];
  }

  function handleEmergencyContinue(matchedWorker, category, requestPayload) {
    setSelectedWorker(matchedWorker);
    setSelectedCategory(category);

    const workerIdVal = matchedWorker?.worker_id || matchedWorker?.workerId || matchedWorker?.id || "";
    const workerName =
      matchedWorker?.full_name || matchedWorker?.fullName || matchedWorker?.name || "Worker";
    const catObj = category || {};
    const categoryName = catObj.nameI18n?.[language] || catObj.nameI18n?.en || catObj.name || "";

    const ctxBooking = addBooking({
      worker_id: workerIdVal,
      service_type: catObj.id || catObj.key || catObj.name,
      customer_id: "C000001",
      final_amount: 0,
    });

    const booking = {
      id: ctxBooking.booking_id,
      booking_id: ctxBooking.booking_id,
      bookingId: ctxBooking.booking_id,
      category: categoryName,
      serviceCategory: catObj,
      service_type: catObj.id || catObj.key || catObj.name,
      serviceType: catObj.id || catObj.key || catObj.name,
      worker: { id: workerIdVal, workerId: workerIdVal, name: workerName, ...matchedWorker },
      workerName,
      workerId: workerIdVal,
      worker_id: workerIdVal,
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
      otp: ctxBooking.otp,
      isEmergency: true,
    };

    setActiveBooking(booking);
    navigate(`/customer/tracker/${ctxBooking.booking_id}`);
  }

  // ── Screen Router ─────────────────────────────────────────────────
  switch (initialView) {
    case "home":
      return (
        <CustomerHome
          categories={SERVICE_CATEGORIES}
          language={language}
          onSelectCategory={handleSelectCategory}
          onEmergency={() => navigate("/emergency")}
          onGoToHistory={() => navigate("/customer/history")}
          t={t}
        />
      );

    case "search":
      return (
        <WorkerSearch
          category={resolvedCategory}
          rankedWorkers={effectiveRankedWorkers}
          onViewProfile={handleViewProfile}
          onBookNow={handleBookNowFromSearch}
          onBack={() => navigate("/")}
          language={language}
          t={t}
        />
      );

    case "profile":
      return (
        <WorkerProfile
          worker={resolvedWorker}
          category={resolvedCategory}
          onBookNow={handleBookNowFromProfile}
          onBack={() => navigate(-1)}
          language={language}
          t={t}
        />
      );

    case "create":
      return (
        <BookingCreation
          worker={resolvedWorker}
          category={resolvedCategory}
          onConfirmBooking={handleConfirmBooking}
          onBack={() => navigate(-1)}
          requestPriceEstimate={requestPriceEstimate}
          language={language}
          t={t}
        />
      );

    case "tracker":
      return (
        <BookingTracker
          booking={resolvedBooking}
          currentStatus={resolvedBooking?.status}
          otp={resolvedBooking?.otp}
          onBack={() => navigate("/customer/history")}
          language={language}
          t={t}
        />
      );

    case "invoice":
      return (
        <InvoicePayment
          booking={resolvedBooking}
          invoice={effectiveInvoice}
          onPay={handlePay}
          onContinueToRating={handleContinueToRating}
          onBack={() => navigate(-1)}
          language={language}
          t={t}
        />
      );

    case "rating":
      return (
        <Rating
          booking={resolvedBooking}
          onSubmitRating={handleSubmitRating}
          onBack={() => navigate("/customer/history")}
          onGoToHistory={() => navigate("/customer/history")}
          language={language}
          t={t}
        />
      );

    case "history":
      return (
        <BookingHistory
          bookings={historyList}
          onViewBooking={handleViewBooking}
          onViewInvoice={handleViewInvoice}
          onRateBooking={handleRateBooking}
          onBack={() => navigate("/")}
          language={language}
          t={t}
        />
      );

    case "emergency":
      return (
        <EmergencyBooking
          categories={SERVICE_CATEGORIES}
          category={resolvedCategory}
          onEmergencyRequest={handleEmergencyRequest}
          onContinue={handleEmergencyContinue}
          onBack={() => navigate("/")}
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
          onEmergency={() => navigate("/emergency")}
          onGoToHistory={() => navigate("/customer/history")}
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
        <div className="app-shell">
          <RoleSwitcher />
          <Routes>
            {/* Customer Routes */}
            <Route path="/" element={<CustomerFlow initialView="home" />} />
            <Route path="/search/:serviceType" element={<CustomerFlow initialView="search" />} />
            <Route path="/worker/:workerId" element={<CustomerFlow initialView="profile" />} />
            <Route path="/book/:workerId" element={<CustomerFlow initialView="create" />} />
            <Route path="/emergency" element={<CustomerFlow initialView="emergency" />} />
            <Route path="/customer/tracker/:bookingId" element={<CustomerFlow initialView="tracker" />} />
            <Route path="/customer/history" element={<CustomerFlow initialView="history" />} />
            <Route path="/customer/invoice/:bookingId" element={<CustomerFlow initialView="invoice" />} />
            <Route path="/customer/rate/:bookingId" element={<CustomerFlow initialView="rating" />} />

            {/* Worker Routes */}
            <Route path="/worker/dashboard" element={<WorkerDashboard />} />

            {/* Society Admin Routes */}
            <Route path="/admin/dashboard" element={<CooperativeAdminModule initialTab="Overview" />} />
            <Route path="/admin/verification" element={<CooperativeAdminModule initialTab="Verifications" />} />
            <Route path="/admin/disputes" element={<CooperativeAdminModule initialTab="Disputes" />} />
            <Route path="/admin/bookings" element={<CooperativeAdminModule initialTab="Bookings" />} />
            <Route path="/admin/workers" element={<CooperativeAdminModule initialTab="Workers" />} />

            {/* Apex Federation Routes */}
            <Route path="/federation" element={<FederationLayout />} />
            <Route path="/federation/dashboard" element={<FederationLayout />} />
            <Route path="/federation/distribution" element={<FederationLayout />} />
            <Route path="/federation/societies" element={<FederationLayout />} />
            <Route path="/federation/forecast" element={<FederationLayout />} />
            <Route path="/federation/disputes" element={<FederationLayout />} />

            {/* 404 Catch-All */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}
