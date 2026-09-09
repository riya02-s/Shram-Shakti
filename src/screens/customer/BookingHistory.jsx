import React, { useEffect, useState } from "react";

const LIFECYCLE = [
  "requested",
  "matched",
  "accepted",
  "on_the_way",
  "started",
  "completed",
  "confirmed",
  "paid",
  "rated",
];

const EXCEPTIONS = ["cancelled", "rejected", "expired", "disputed"];
const RATE_ELIGIBLE = ["completed", "confirmed", "paid"];

const styles = {
  wrapper: {
    minHeight: "100vh",
    padding: "32px 20px 48px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    background: "linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)",
    boxSizing: "border-box",
  },
  content: {
    maxWidth: "680px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  backBtn: {
    alignSelf: "flex-start",
    padding: "8px 14px",
    fontSize: "14px",
    fontWeight: 600,
    color: "#0b6bcb",
    background: "transparent",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  heading: {
    margin: "0",
    fontSize: "26px",
    fontWeight: 700,
    color: "#17263b",
  },
  card: {
    background: "#ffffff",
    border: "1px solid #e0e8f2",
    borderRadius: "14px",
    boxShadow: "0 2px 8px rgba(23, 38, 59, 0.06)",
    padding: "18px 20px",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "12px",
    flexWrap: "wrap",
  },
  bookingId: {
    margin: 0,
    fontSize: "14px",
    fontWeight: 700,
    color: "#17263b",
  },
  category: {
    margin: "4px 0 0",
    fontSize: "13px",
    color: "#5b6b82",
  },
  statusChip: {
    display: "inline-block",
    padding: "6px 12px",
    fontSize: "12px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.03em",
    borderRadius: "999px",
  },
  chipBase: {
    color: "#0b6bcb",
    background: "#e3f0fc",
  },
  chipPaid: {
    color: "#1a7f3d",
    background: "#e3f8e9",
  },
  chipActive: {
    color: "#6a3fbf",
    background: "#f0e9fc",
  },
  chipCancelled: {
    color: "#c62828",
    background: "#fdecec",
  },
  chipAmber: {
    color: "#b54708",
    background: "#fdf0e2",
  },
  meta: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "12px",
  },
  metaItem: {
    fontSize: "13px",
    color: "#2a3b52",
    background: "#f1f5fa",
    padding: "4px 10px",
    borderRadius: "8px",
  },
  metaLabel: {
    color: "#8191a6",
  },
  actions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "14px",
  },
  outlineBtn: {
    flex: 1,
    minWidth: "120px",
    padding: "10px 16px",
    fontSize: "14px",
    fontWeight: 600,
    color: "#0b6bcb",
    background: "#ffffff",
    border: "1px solid #0b6bcb",
    borderRadius: "10px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  rateBtn: {
    flex: 1,
    minWidth: "120px",
    padding: "10px 16px",
    fontSize: "14px",
    fontWeight: 700,
    color: "#ffffff",
    background: "#0b6bcb",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  loading: {
    textAlign: "center",
    padding: "40px 20px",
  },
  loadingTitle: {
    margin: "0 0 6px",
    fontSize: "18px",
    fontWeight: 700,
    color: "#17263b",
  },
  loadingHint: {
    margin: 0,
    fontSize: "14px",
    color: "#5b6b82",
  },
  empty: {
    maxWidth: "680px",
    margin: "24px auto 0",
    padding: "40px 20px",
    textAlign: "center",
    border: "1px dashed #c6d2e2",
    borderRadius: "16px",
    background: "#ffffff",
  },
  emptyIcon: {
    fontSize: "36px",
    display: "block",
    marginBottom: "12px",
  },
  emptyTitle: {
    margin: "0 0 6px",
    fontSize: "18px",
    fontWeight: 600,
    color: "#17263b",
  },
  emptyMessage: {
    margin: 0,
    fontSize: "14px",
    color: "#5b6b82",
  },
  ratedBanner: {
    marginTop: "10px",
    fontSize: "13px",
    fontWeight: 600,
    color: "#1a7f3d",
    background: "#e3f8e9",
    padding: "6px 12px",
    borderRadius: "999px",
    display: "inline-block",
  },
};

const DASH = "\u2014";
const EMPTY_ICON = "\uD83D\uDED2";
const LOADING_ICON = "\u23F3";
const RATED = "\u2713";

function localizedName(category, language) {
  if (!category) return undefined;
  if (category.nameI18n && typeof category.nameI18n === "object") {
    return category.nameI18n[language] || category.nameI18n.en || category.name || undefined;
  }
  return category.name || undefined;
}

function normalizeStatus(value) {
  if (value === undefined || value === null || value === "") return undefined;
  return String(value).trim().toLowerCase();
}

function statusLabel(status, t) {
  const map = {
    requested: t("customer.history.st.requested", "Requested"),
    matched: t("customer.history.st.matched", "Matched"),
    accepted: t("customer.history.st.accepted", "Accepted"),
    on_the_way: t("customer.history.st.onTheWay", "On the way"),
    started: t("customer.history.st.started", "Started"),
    completed: t("customer.history.st.completed", "Completed"),
    confirmed: t("customer.history.st.confirmed", "Confirmed"),
    paid: t("customer.history.st.paid", "Paid"),
    rated: t("customer.history.st.rated", "Rated"),
    cancelled: t("customer.history.st.cancelled", "Cancelled"),
    rejected: t("customer.history.st.rejected", "Rejected"),
    expired: t("customer.history.st.expired", "Expired"),
    disputed: t("customer.history.st.disputed", "Disputed"),
  };
  return map[status] || status || t("customer.history.unknown", "Unknown");
}

function statusChipStyle(status) {
  if (status === "cancelled" || status === "rejected") return styles.chipCancelled;
  if (status === "expired" || status === "disputed") return styles.chipAmber;
  if (status === "paid" || status === "rated") return styles.chipPaid;
  if (status === "started" || status === "on_the_way" || status === "accepted") return styles.chipActive;
  return styles.chipBase;
}

function alreadyRated(booking) {
  const status = normalizeStatus(booking.status);
  return (
    status === "rated" ||
    booking.ratingSubmitted === true ||
    (booking.rating !== undefined && booking.rating !== null)
  );
}

function isException(status) {
  return EXCEPTIONS.includes(status);
}

function invoiceApplicable(status) {
  return ["completed", "confirmed", "paid", "rated"].includes(status);
}

export default function BookingHistory({
  bookings = [],
  onViewBooking,
  onViewInvoice,
  onRateBooking,
  loading = false,
  onBack,
  language = "en",
  t = (key, fallback) => fallback,
}) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (!loading) return;
    const id = setInterval(() => setDots((d) => (d.length >= 3 ? "" : `${d}.`)), 450);
    return () => clearInterval(id);
  }, [loading]);

  const heading = t("customer.history.heading", "Booking History");

  if (loading) {
    return (
      <section style={styles.wrapper}>
        <div style={styles.empty}>
          <span style={styles.emptyIcon} role="img" aria-hidden="true">
            {LOADING_ICON}
          </span>
          <p style={styles.loadingTitle}>
            {t("customer.history.loading", "Loading your bookings")}
            {dots}
          </p>
          <p style={styles.loadingHint}>
            {t("customer.history.loadingHint", "Please wait a moment.")}
          </p>
        </div>
      </section>
    );
  }

  if (bookings.length === 0) {
    return (
      <section style={styles.wrapper}>
        <div style={styles.empty}>
          <span style={styles.emptyIcon} role="img" aria-hidden="true">
            {EMPTY_ICON}
          </span>
          <p style={styles.emptyTitle}>{t("customer.history.noBookings", "No bookings yet")}</p>
          <p style={styles.emptyMessage}>
            {t(
              "customer.history.noBookingsHint",
              "Book a service from the home screen and it will appear here."
            )}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section style={styles.wrapper}>
      <div style={styles.content}>
        <header>
          {typeof onBack === "function" ? (
            <button type="button" style={styles.backBtn} onClick={onBack}>
              {"\u2190"} {t("customer.history.back", "Back")}
            </button>
          ) : null}
        </header>

        <h1 style={styles.heading}>{heading}</h1>

        {bookings.map((booking, index) => {
          const status = normalizeStatus(booking.status);
          const bookingId = booking.id ?? booking.bookingId;
          const category =
            typeof booking.category === "string"
              ? booking.category
              : localizedName(booking.category || booking.serviceCategory, language) ||
                booking.serviceCategory?.name;
          const workerName = booking.worker?.name || booking.workerName;
          const date = booking.date;
          const time = booking.time;
          const amount = booking.amount ?? booking.totalAmount ?? booking.priceEstimate;
          const paymentStatus = normalizeStatus(booking.paymentStatus);
          const paid = paymentStatus === "paid" || paymentStatus === "success" || paymentStatus === "completed";
          const rated = alreadyRated(booking);
          const exception = isException(status);
          const rateEligible = RATE_ELIGIBLE.includes(status) && !rated;
          const showInvoice = !exception && invoiceApplicable(status);

          return (
            <div key={bookingId ?? `${category}-${date}-${index}`} style={styles.card}>
              <div style={styles.cardTop}>
                <div>
                  <p style={styles.bookingId}>
                    {bookingId ? `${t("customer.history.bookingId", "Booking")} #${bookingId}` : category || DASH}
                  </p>
                  {bookingId ? <p style={styles.category}>{category || DASH}</p> : null}
                </div>
                <span style={{ ...styles.statusChip, ...statusChipStyle(status) }}>
                  {statusLabel(status, t)}
                </span>
              </div>

              <div style={styles.meta}>
                <span style={styles.metaItem}>
                  <span style={styles.metaLabel}>{t("customer.history.worker", "Worker")}: </span>
                  {workerName || DASH}
                </span>
                {date ? (
                  <span style={styles.metaItem}>
                    <span style={styles.metaLabel}>{t("customer.history.date", "Date")}: </span>
                    {date}
                  </span>
                ) : null}
                {time ? (
                  <span style={styles.metaItem}>
                    <span style={styles.metaLabel}>{t("customer.history.time", "Time")}: </span>
                    {time}
                  </span>
                ) : null}
                {amount !== undefined && amount !== null ? (
                  <span style={styles.metaItem}>
                    <span style={styles.metaLabel}>{t("customer.history.amount", "Amount")}: </span>
                    {amount}
                  </span>
                ) : null}
                <span style={styles.metaItem}>
                  <span style={styles.metaLabel}>{t("customer.history.payment", "Payment")}: </span>
                  {paid
                    ? t("customer.history.paid", "Paid")
                    : paymentStatus
                    ? paymentStatus
                    : t("customer.history.notPaid", "Pending")}
                </span>
              </div>

              {rated ? (
                <div>
                  <span style={styles.ratedBanner}>
                    {RATED} {t("customer.history.rated", "Rated")}
                  </span>
                </div>
              ) : null}

              <div style={styles.actions}>
                {typeof onViewBooking === "function" ? (
                  <button type="button" style={styles.outlineBtn} onClick={() => onViewBooking(booking)}>
                    {t("customer.history.view", "View Status")}
                  </button>
                ) : null}
                {showInvoice && typeof onViewInvoice === "function" ? (
                  <button type="button" style={styles.outlineBtn} onClick={() => onViewInvoice(booking)}>
                    {t("customer.history.invoice", "View Invoice")}
                  </button>
                ) : null}
                {rateEligible && typeof onRateBooking === "function" ? (
                  <button type="button" style={styles.rateBtn} onClick={() => onRateBooking(booking)}>
                    {t("customer.history.rate", "Rate Service")}
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

BookingHistory.displayName = "BookingHistory";