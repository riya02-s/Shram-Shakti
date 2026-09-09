# Sahyog Seva — Prototype Spec (v2)

**Type:** Frontend-only prototype (no backend, no database)
**Stack:** React (single-page web app)
**Data:** Mock JSON, held in in-memory React state (resets on page refresh)
**Scope:** Full customer booking journey + Federation/Cooperative dashboard + AI demand forecast (simulated) + rule-based Fair Allocation Engine (5-factor weighted formula) + Multilingual UI + two-dataset data strategy (master/seed data vs. historical forecasting data)

---

## 1. Purpose

Demonstrate the core Sahyog Seva product experience end-to-end for a hackathon demo, without any real backend, database, auth server, payment gateway, or persistence layer. Everything runs client-side against pre-seeded mock data and simulated logic.

## 2. What This Prototype Is / Is Not

**Is:**
- A single React app with role-based views (Customer, Worker, Cooperative Society Admin, Federation Admin)
- Fully clickable, realistic UI for the entire booking lifecycle
- Simulated smart matching driven by a 5-factor weighted Fair Allocation Engine (deterministic scoring formula, not a tiebreaker), OTP flow, invoicing, ratings, and AI demand forecasting — all computed in-browser from mock data, no real ML/APIs
- A basic multilingual UI (English / Hindi / Punjabi) using static string bundles
- Local-only state — no login/session survives a refresh

**Is Not:**
- Connected to a real database (Postgres/PostGIS from the full proposal is out of scope)
- Connected to real payment gateways (Razorpay), maps APIs, or SMS/OTP providers — these are mocked/simulated
- Multi-user / networked — one browser tab represents "the whole system" (role switching simulates different users)
- Persistent — refreshing the browser resets all bookings, ratings, and state to the seeded starting data
- Using Flutter (the proposal's real mobile stack) — since this is a single web prototype, all roles including "Customer" and "Worker" apps are simulated as web screens in the same React app

## 3. Roles Simulated

A role switcher (e.g. a dropdown/top bar) lets the demo presenter jump between:

1. **Customer** — browse, book, track, pay (mock), rate
2. **Worker** — see assigned jobs, accept/reject, mark started/completed
3. **Cooperative Society Admin** — verify workers, manage local bookings/disputes
4. **Federation Admin** — cross-society dashboard, analytics, AI demand forecast

*(Platform Administrator role is out of scope for the prototype — not customer/worker facing and adds no demo value.)*

## 4. Tech Approach

| Concern | Approach |
|---|---|
| Framework | React (functional components + hooks) |
| State | React Context + `useState`/`useReducer` — one in-memory "mock store" simulating what would be DB tables |
| Routing | Client-side routing (e.g. simple route state or a lightweight router) between role-specific screens |
| Data | Static seed JSON (workers, societies, federations, categories, sample bookings) loaded into the store on app start |
| "Backend logic" | Plain JS functions that mimic API endpoints (Fair Allocation Engine, pricing estimate, OTP generation, invoice generation, forecast lookup) — called directly from components instead of over HTTP |
| Persistence | None — intentionally in-memory only, per requirement |
| Localization | Static per-language JSON string bundles (`en.json`, `hi.json`, `pa.json`) loaded into a simple i18n context; language selector switches the active bundle at runtime — no build-time compilation needed for a prototype |
| Styling | Simple, clean component styling (no design system dependency required) |

## 5. Mock Data Model

All of this lives in one seed JSON object in memory — same shape as the real schema in the proposal, minus SQL/FKs:

```
{
  users: [...],
  federations: [...],
  cooperativeSocieties: [...],
  workers: [...],           // includes verificationLevel, ratingAvg, reliabilityScore, lat/lng, jobsAssignedCount
  serviceCategories: [...], // includes nameI18n: { en, hi, pa }
  serviceRequests: [...],   // "bookings" — created/mutated at runtime
  invoices: [...],
  ratings: [...],
  disputes: [...],
  welfareRecords: [...],
  demandForecast: [...]     // pre-computed mock forecast rows per zone/category
}
```

Seed data should include: 1 federation, 2–3 cooperative societies, ~10–15 workers across categories (plumbing, electrical, cleaning, carpentry, gardening), a handful of pre-existing completed bookings (so ratings/history aren't empty on load), and a pre-computed demand forecast table. Service category names are seeded with English, Hindi, and Punjabi labels.

## 6. Core Simulated Logic (replacing backend modules)

| Module | Simulated Behavior |
|---|---|
| **Smart Matching & Fair Allocation Engine** | Given category + location, score every mock candidate worker using the 5-factor weighted formula defined in Section 6.1 and return a ranked list. Workload fairness is one of the five weighted factors — it doesn't only apply when scores tie — so the top-ranked worker can change outright based on how loaded other candidates are, matching Section 08 of the proposal but with fairness built into the core score rather than bolted on after |
| **Reliability Score** | Precomputed per worker in seed data; optionally recalculated client-side after a booking completes/cancels |
| **Emergency Routing** | If no worker found within initial mock "radius," widen search to next society/federation in the mock data |
| **Pricing Estimate** | Simple lookup/formula from `serviceCategories.basePriceMin/Max` — no real pricing engine |
| **OTP Confirmation** | Generate a random 4–6 digit code shown to the "customer" screen; entering it on the "worker" screen flips booking status to `started` |
| **Invoice Generation** | Computed client-side from labour + material + additional charges at completion |
| **Payment** | Simulated "Pay Now" button that instantly marks invoice `PAID` — no real gateway |
| **Ratings** | Only bookings with status `completed` can be rated; rating updates the worker's mock `ratingAvg` |
| **Disputes** | Simple status flow: `open → under_review → resolved`, editable from the Society Admin screen |
| **AI Demand Forecast** | Static/pre-seeded forecast table displayed as-is (Section 20 of proposal) — explicitly *not* a live ML model, matches the proposal's own MVP note that forecasting is demonstrated on a small simulated dataset |
| **Localization** | UI strings swapped from the active language bundle (EN/HI/PA); service category names read from each category's `nameI18n` object, falling back to English if a translation is missing — mirrors the proposal's static-strings-vs-dynamic-content split (Section 18), simplified for a prototype (no JSONB, no backend `lang` param — just a client-side lookup) |

### 6.1 Fair Allocation Engine — Formula & Worked Example

The Fair Allocation Engine is **rule-based, not AI**: a deterministic weighted-scoring formula, not a trained model. This distinction matters for the demo — it's what makes the engine auditable and instantly tunable live in front of judges, unlike a black-box ML model. (The genuinely AI-driven module in this system is Demand Forecasting — see Section 6's forecast row and Section 13 below — which is trained on historical data. The allocation engine consumes forecast output where relevant but does not itself learn anything.)

**Formula**

For every available worker matching a customer's request, compute a single score:

```
Score = (0.30 × Skill Match) + (0.25 × Availability) + (0.20 × Distance Score)
      + (0.15 × Rating) + (0.10 × Workload Fairness)
```

Each factor is normalized to a 0–1 scale, multiplied by its fixed weight, and summed. Highest score wins — no learning, no training data required.

| Factor | Weight | What it measures |
|---|---|---|
| Skill Match | 0.30 | How closely the worker's verified skill matches the requested category |
| Availability | 0.25 | Whether the worker is free right now / in the requested window |
| Distance Score | 0.20 | Normalized inverse of distance from customer (closer = higher) |
| Rating | 0.15 | Worker's average rating, normalized |
| Workload Fairness | 0.10 | Normalized inverse of current job load (fewer active/today's jobs = higher) |

**Worked example — Plumber request, two candidates**

| Factor (0–1) | Worker A | Worker B |
|---|---|---|
| Skill Match | 1.0 (exact match) | 1.0 (exact match) |
| Availability | 1.0 (free now) | 1.0 (free now) |
| Distance Score | 0.9 (1 km away) | 0.7 (3 km away) |
| Rating | 0.98 (4.9★) | 0.92 (4.6★) |
| Workload Fairness | 0.2 (8 jobs today — heavily loaded) | 0.9 (1 job today — mostly free) |

```
Score A = 0.30(1.0) + 0.25(1.0) + 0.20(0.9) + 0.15(0.98) + 0.10(0.2)
        = 0.30 + 0.25 + 0.18 + 0.147 + 0.02 = 0.897

Score B = 0.30(1.0) + 0.25(1.0) + 0.20(0.7) + 0.15(0.92) + 0.10(0.9)
        = 0.30 + 0.25 + 0.14 + 0.138 + 0.09 = 0.918
```

**Worker B wins** — despite a lower rating and being farther away — because the workload-fairness term pulls the total ahead. Every number is traceable arithmetic, so the recommendation can always be explained to a worker, customer, or cooperative admin who asks "why."

**Implementation notes for the prototype**

- `logic/matching.js` implements this exact formula against the mock worker pool; weights are named constants (`SKILL_WEIGHT = 0.30`, etc.) so they're trivially editable.
- `jobsAssignedCount` (see Section 5's mock data model) feeds the Workload Fairness factor — it increments in the mock store whenever a booking is `accepted` (see Section 7), so fairness responds to actions taken during the live demo, not just static seed values.
- **Optional live-demo enhancement:** expose the five weights as sliders on a "Matching Explainer" screen so the presenter can drag Workload Fairness from 10% up to 30% and watch the ranked worker list re-order instantly. This works specifically *because* the engine is rule-based — no retraining needed — and is a strong differentiator to show judges.
- Suggested judge-facing framing, if asked "where's the AI in this part?": *this specific engine is intentionally rule-based, not machine-learned, because allocation decisions need to be transparent and auditable for a cooperative to trust and govern them; the AI is specifically in demand forecasting, which feeds this engine but stays deterministic itself.*

## 7. Booking Lifecycle (state machine, in-memory)

```
requested → matched → accepted → on_the_way → started → completed → confirmed → paid → rated
```
Exception states: `cancelled`, `rejected`, `expired`, `disputed`

Implemented as a simple status field on the mock booking object; each screen action is a pure function that transitions status and updates the store. On `accepted`, the assigned worker's `jobsAssignedCount` increments, feeding the Workload Fairness factor in the Fair Allocation Engine (Section 6.1).

## 8. Screens (by role)

**Customer**
- Home / service category picker (localized category names)
- Worker search results (ranked list from the Fair Allocation Engine, Section 6.1)
- Worker profile view
- Booking creation (location, time, price estimate)
- Emergency booking variant
- Booking status tracker (with OTP display)
- Invoice & mock payment screen
- Rating screen
- Booking history

**Worker**
- Incoming job requests (accept/reject)
- Active job screen (enter OTP to start, mark complete)
- Job history & earnings (mock)
- Welfare info (read-only mock: insurance/certification status)

**Cooperative Society Admin**
- Worker list + verification actions (Level 1/2/3, matches Section 06)
- Local bookings overview
- Dispute queue + resolution action

**Federation Admin**
- Key metrics dashboard (workers, bookings, emergency requests, avg rating — computed from mock data)
- Job distribution / fair allocation view (jobs per worker, to show the Workload Fairness factor's effect)
- Societies overview
- Demand forecast view (static table, Section 20 style)
- Escalated disputes

**Global**
- Language selector (EN / हिंदी / ਪੰਜਾਬੀ) visible on every screen, persisted only for the session (in-memory)

## 9. Out of Scope for Prototype

Explicitly excluded (per proposal's own "What We Will NOT Build Initially," Section 32, plus the no-DB constraint):
- Real database / persistence of any kind
- Real authentication (JWT/OAuth) — role switch is a UI toggle only
- Real payment gateway integration
- Real maps/geolocation API — lat/lng are mock numbers, no live map rendering required (a simple list or static map illustration is enough)
- Real push notifications/SMS OTP delivery
- Real ML model for demand forecasting
- Flutter mobile builds — the Customer and Worker "apps" are simulated as web screens
- Build-time localization tooling (`easy_localization`, JSONB backend translation) — a simplified client-side string-bundle swap stands in for it
- Multi-device/multi-user sync

## 10. Suggested Folder Structure

```
/src
  /data
    seed.js                 // all mock data
  /i18n
    en.json
    hi.json
    pa.json
    I18nContext.jsx
  /store
    AppContext.jsx           // in-memory store + reducer
  /logic
    matching.js               // Fair Allocation Engine — 5-factor weighted formula (Section 6.1)
    pricing.js
    otp.js
    invoice.js
    forecast.js
  /screens
    customer/...
    worker/...
    society/...
    federation/...
  /components
    WorkerCard.jsx
    BookingStatusTracker.jsx
    RoleSwitcher.jsx
    LanguageSwitcher.jsx
    ...
  App.jsx
  index.jsx
```

## 11. Demo Script (suggested walkthrough order)

1. Switch language to Hindi/Punjabi and back, to show the localized UI and category names
2. Customer requests a plumbing service → sees ranked worker matches → books. If the "Matching Explainer" is enabled, show the weighted breakdown (Section 6.1) and drag the Workload Fairness slider to demonstrate the ranking changing live
3. Switch to Worker role → accept job → enter OTP → mark started → mark complete
4. Switch to Customer role → see invoice → pay (mock) → rate the worker
5. Switch to Society Admin role → verify a new worker, resolve a sample dispute
6. Switch to Federation Admin role → show metrics dashboard, job distribution view, and the demand forecast table
7. (Optional) Trigger an Emergency booking with no nearby worker to show radius-widening

## 12. Data Strategy — Two Dataset Types

The prototype needs **two distinct datasets** that serve different purposes. Conflating them is a common mistake worth avoiding explicitly in the spec.

### 12.1 Master / Seed Data — powers the clickable demo

This is the data already described in Section 5: a fixed set of workers, cooperative societies, customers, and service categories loaded into the app so there's something to search, book, and rate.

- **Used by:** the Fair Allocation Engine (Section 6.1), the booking flow, all dashboards — loaded directly into the in-memory mock store (`data/seed.js`)
- **Needs:** ~8–15 workers (name, skill category, rating, experience, lat/lng, current workload/`jobsAssignedCount`, verification level), 2–3 cooperative societies (name + worker IDs), 5–10 customers (name, saved location, preferred language), 3–5 service categories with `nameI18n` and base price ranges
- **Doesn't need to be statistically realistic** — it needs to be *varied enough* that the Fair Allocation Engine's trade-offs are visible in the demo (e.g. one worker with a high rating but heavy workload, one with a lower rating but free — mirroring the worked example in Section 6.1)

### 12.2 Historical Bookings Dataset — trains the Demand Forecast module

A separate, larger, time-based dataset: simulated past bookings over a window (e.g. 90 days), used to produce the forecast shown in the Federation Admin dashboard (Section 20 of the proposal).

- **Used by:** a one-time (or periodic) offline step that generates `demandForecast` rows from patterns in this dataset — the raw historical rows themselves are **not** browsed live in the app UI, only the resulting forecast table is
- **Needs:** date, day-of-week, zone, service category, time-slot, and number-of-requests — with deliberately built-in patterns (e.g. weekend cleaning spikes, festival-season electrical spikes) so there's real signal to show in the forecast, rather than random noise
- **Why it must stay separate from Section 12.1:** the master data is what a judge clicks through during the live demo; the historical dataset is only ever consumed to *produce* the static forecast table baked into the seed (`demandForecast` in Section 5). The app does not compute forecasts live from raw history — consistent with Section 6's note that forecasting is a static/pre-seeded demo, not a live model.

**Bottom line:** without 12.1 the booking flow has nothing to click through; without 12.2 the demand-forecast slide/screen has nothing behind it. Both are needed, and neither substitutes for the other.

## 13. Open Items to Confirm Before Build

- Exact list of service categories to seed (suggest: Plumbing, Electrical, Cleaning, Carpentry, Gardening)
- Whether a real map library (e.g. Leaflet) should render mock lat/lng pins, or a simple list/card view is sufficient for the demo
- Whether to build the optional "Matching Explainer" screen with live weight sliders (Section 6.1) for the demo, or keep the formula server-side/invisible to the audience
- Size and pattern design of the synthetic historical bookings dataset (Section 12.2) — how many days, zones, and categories, and which spike patterns to bake in
