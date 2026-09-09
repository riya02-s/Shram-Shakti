// src/data/federationMockData.js
// Self-contained mock dataset for the Federation Admin & Demand Forecast module
// Aligned with official team master datasets (mockCooperatives.json, mockWorkers.json, mockCustomers.json)

export const federationMetrics = {
  federationName: "Punjab Labour Cooperative Federation",
  totalWorkers: 148,
  totalBookings: 1842,
  emergencyRequests: 37,
  averageRating: 4.82,
  activeSocieties: 10,
  pendingDisputes: 4,
  growthStats: {
    workersMoM: "+14%",
    bookingsMoM: "+22%",
    emergencyChange: "-8%",
    ratingTrend: "+0.05"
  }
};

export const jobDistributionData = [
  { workerName: "Aryan Maharaj", category: "Plumbing", jobsAssigned: 14, jobsCompleted: 13, fairnessScore: 0.94, status: "Optimal" },
  { workerName: "Rushil Saini", category: "Electrical", jobsAssigned: 16, jobsCompleted: 15, fairnessScore: 0.91, status: "High Load" },
  { workerName: "Gunbir Parmer", category: "Cleaning", jobsAssigned: 12, jobsCompleted: 12, fairnessScore: 0.96, status: "Optimal" },
  { workerName: "Ekaraj Bath", category: "Plumbing", jobsAssigned: 8, jobsCompleted: 8, fairnessScore: 0.98, status: "Available" },
  { workerName: "Zayan Apte", category: "Electrical", jobsAssigned: 9, jobsCompleted: 9, fairnessScore: 0.97, status: "Available" },
  { workerName: "Vidhi Dubey", category: "Carpentry", jobsAssigned: 15, jobsCompleted: 14, fairnessScore: 0.92, status: "High Load" },
  { workerName: "Garima Bala", category: "Gardening", jobsAssigned: 11, jobsCompleted: 11, fairnessScore: 0.95, status: "Optimal" },
  { workerName: "Gaurang Murty", category: "Carpentry", jobsAssigned: 10, jobsCompleted: 10, fairnessScore: 0.96, status: "Optimal" }
];

export const societiesData = [
  {
    id: "COOP001",
    name: "Ludhiana Labour Cooperative (West)",
    location: "Ludhiana West, Punjab",
    zone: "West",
    workers: 38,
    bookings: 480,
    status: "Active",
    leadContact: "+91 98112 34567"
  },
  {
    id: "COOP006",
    name: "Patiala Labour Cooperative",
    location: "Patiala Urban, Punjab",
    zone: "Urban",
    workers: 45,
    bookings: 620,
    status: "Active",
    leadContact: "+91 98223 45678"
  },
  {
    id: "COOP007",
    name: "Amritsar Labour Cooperative",
    location: "Amritsar North, Punjab",
    zone: "North",
    workers: 29,
    bookings: 395,
    status: "Active",
    leadContact: "+91 98334 56789"
  },
  {
    id: "COOP005",
    name: "Jalandhar Labour Cooperative",
    location: "Jalandhar South, Punjab",
    zone: "South",
    workers: 24,
    bookings: 285,
    status: "Under Review",
    leadContact: "+91 98445 67890"
  },
  {
    id: "COOP004",
    name: "Moga Labour Cooperative",
    location: "Moga Central, Punjab",
    zone: "Central",
    workers: 18,
    bookings: 142,
    status: "Active",
    leadContact: "+91 98556 78901"
  },
  {
    id: "COOP008",
    name: "Bathinda Labour Cooperative",
    location: "Bathinda West, Punjab",
    zone: "West",
    workers: 20,
    bookings: 165,
    status: "Active",
    leadContact: "+91 98667 89012"
  }
];

export const demandForecastData = [
  { timeSlot: "Mon", plumbing: 42, electrical: 35, cleaning: 58, carpentry: 20, predictedTotal: 155, confidence: "94%" },
  { timeSlot: "Tue", plumbing: 38, electrical: 32, cleaning: 50, carpentry: 18, predictedTotal: 138, confidence: "92%" },
  { timeSlot: "Wed", plumbing: 45, electrical: 40, cleaning: 54, carpentry: 24, predictedTotal: 163, confidence: "93%" },
  { timeSlot: "Thu", plumbing: 48, electrical: 44, cleaning: 60, carpentry: 22, predictedTotal: 174, confidence: "95%" },
  { timeSlot: "Fri", plumbing: 62, electrical: 58, cleaning: 78, carpentry: 35, predictedTotal: 233, confidence: "96%" },
  { timeSlot: "Sat (Peak)", plumbing: 88, electrical: 76, cleaning: 124, carpentry: 52, predictedTotal: 340, confidence: "98%" },
  { timeSlot: "Sun (Peak)", plumbing: 80, electrical: 70, cleaning: 110, carpentry: 45, predictedTotal: 305, confidence: "97%" }
];

export const forecastSummary = {
  isSimulated: true,
  modelName: "Synthetic 90-Day ARIMA + Moving Avg Simulator",
  forecastHorizon: "Upcoming 7 Days",
  spikeAlert: "High cleaning & electrical surge anticipated over the weekend (Festival Preparation).",
  recommendedAction: "Pre-allocate 15 reserve workers to Ludhiana and Patiala cooperative zones."
};

export const escalatedDisputesData = [
  {
    id: "DISP-104",
    society: "Ludhiana Labour Cooperative (West)",
    customer: "Zayyan Mody",
    worker: "Aryan Maharaj",
    category: "Plumbing",
    issue: "Dispute over unlisted material charges during pipe overhaul",
    status: "Escalated",
    priority: "High",
    escalatedDate: "2026-09-07",
    amount: "₹1,250"
  },
  {
    id: "DISP-108",
    society: "Patiala Labour Cooperative",
    customer: "Oscar Hans",
    worker: "Ekaraj Bath",
    category: "Plumbing",
    issue: "Delayed arrival causing damage to customer schedule (emergency booking)",
    status: "Under Review",
    priority: "Medium",
    escalatedDate: "2026-09-08",
    amount: "₹600"
  },
  {
    id: "DISP-112",
    society: "Jalandhar Labour Cooperative",
    customer: "Wyatt Pradhan",
    worker: "Gunbir Parmer",
    category: "Cleaning",
    issue: "Service quality dissatisfaction following post-construction deep clean",
    status: "Escalated",
    priority: "High",
    escalatedDate: "2026-09-08",
    amount: "₹2,100"
  },
  {
    id: "DISP-097",
    society: "Moga Labour Cooperative",
    customer: "Yasti Prasad",
    worker: "Rushil Saini",
    category: "Electrical",
    issue: "Incomplete wiring inspection before OTP closure",
    status: "Resolved",
    priority: "Low",
    escalatedDate: "2026-09-05",
    amount: "₹450"
  }
];
