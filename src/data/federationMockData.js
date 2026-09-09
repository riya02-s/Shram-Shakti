// src/data/federationMockData.js
// Self-contained mock dataset for the Federation Admin & Demand Forecast module

export const federationMetrics = {
  totalWorkers: 148,
  totalBookings: 1842,
  emergencyRequests: 37,
  averageRating: 4.82,
  activeSocieties: 12,
  pendingDisputes: 5,
  growthStats: {
    workersMoM: "+14%",
    bookingsMoM: "+22%",
    emergencyChange: "-8%",
    ratingTrend: "+0.05"
  }
};

export const jobDistributionData = [
  { workerName: "Ramesh Kumar", category: "Plumbing", jobsAssigned: 14, jobsCompleted: 13, fairnessScore: 0.94, status: "Optimal" },
  { workerName: "Sunita Devi", category: "Cleaning", jobsAssigned: 12, jobsCompleted: 12, fairnessScore: 0.96, status: "Optimal" },
  { workerName: "Harpreet Singh", category: "Electrical", jobsAssigned: 16, jobsCompleted: 15, fairnessScore: 0.91, status: "High Load" },
  { workerName: "Manoj Verma", category: "Carpentry", jobsAssigned: 8, jobsCompleted: 8, fairnessScore: 0.98, status: "Available" },
  { workerName: "Pooja Sharma", category: "Gardening", jobsAssigned: 9, jobsCompleted: 9, fairnessScore: 0.97, status: "Available" },
  { workerName: "Gurpreet Kaur", category: "Cleaning", jobsAssigned: 15, jobsCompleted: 14, fairnessScore: 0.92, status: "High Load" },
  { workerName: "Amit Patel", category: "Plumbing", jobsAssigned: 11, jobsCompleted: 11, fairnessScore: 0.95, status: "Optimal" },
  { workerName: "Rajesh Yadav", category: "Electrical", jobsAssigned: 10, jobsCompleted: 10, fairnessScore: 0.96, status: "Optimal" }
];

export const societiesData = [
  {
    id: "SOC-001",
    name: "North Delhi Urban Labour Co-op",
    location: "Rohini, North Delhi",
    zone: "North",
    workers: 38,
    bookings: 480,
    status: "Active",
    leadContact: "+91 98112 34567"
  },
  {
    id: "SOC-002",
    name: "South Delhi Shramik Seva Sahakari",
    location: "Saket, South Delhi",
    zone: "South",
    workers: 45,
    bookings: 620,
    status: "Active",
    leadContact: "+91 98223 45678"
  },
  {
    id: "SOC-003",
    name: "East Capital Workers Cooperative",
    location: "Laxmi Nagar, East Delhi",
    zone: "East",
    workers: 29,
    bookings: 395,
    status: "Active",
    leadContact: "+91 98334 56789"
  },
  {
    id: "SOC-004",
    name: "West Metro Artisan Cooperative",
    location: "Janakpuri, West Delhi",
    zone: "West",
    workers: 24,
    bookings: 285,
    status: "Under Review",
    leadContact: "+91 98445 67890"
  },
  {
    id: "SOC-005",
    name: "Central Craft & Maintenance Guild",
    location: "Karol Bagh, Central Delhi",
    zone: "Central",
    workers: 12,
    bookings: 62,
    status: "Active",
    leadContact: "+91 98556 78901"
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
  recommendedAction: "Pre-allocate 15 reserve workers to North and South Delhi cooperative zones."
};

export const escalatedDisputesData = [
  {
    id: "DISP-104",
    society: "North Delhi Urban Labour Co-op",
    customer: "Vikram Malhotra",
    worker: "Ramesh Kumar",
    category: "Plumbing",
    issue: "Dispute over unlisted material charges during pipe overhaul",
    status: "Escalated",
    priority: "High",
    escalatedDate: "2026-09-07",
    amount: "₹1,250"
  },
  {
    id: "DISP-108",
    society: "East Capital Workers Cooperative",
    customer: "Ananya Iyer",
    worker: "Manoj Verma",
    category: "Carpentry",
    issue: "Delayed arrival causing damage to customer schedule (emergency booking)",
    status: "Under Review",
    priority: "Medium",
    escalatedDate: "2026-09-08",
    amount: "₹600"
  },
  {
    id: "DISP-112",
    society: "West Metro Artisan Cooperative",
    customer: "Rajiv Khosla",
    worker: "Gurpreet Kaur",
    category: "Cleaning",
    issue: "Service quality dissatisfaction following post-construction deep clean",
    status: "Escalated",
    priority: "High",
    escalatedDate: "2026-09-08",
    amount: "₹2,100"
  },
  {
    id: "DISP-097",
    society: "South Delhi Shramik Seva Sahakari",
    customer: "Priya Nair",
    worker: "Rajesh Yadav",
    category: "Electrical",
    issue: "Incomplete wiring inspection before OTP closure",
    status: "Resolved",
    priority: "Low",
    escalatedDate: "2026-09-05",
    amount: "₹450"
  }
];

