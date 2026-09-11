import React from "react";

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

const styles = {
  wrapper: {
    minHeight: "100vh",
    padding: "32px 20px 48px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    background: "linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)",
    boxSizing: "border-box",
  },
  content: {
    maxWidth: "640px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
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
    borderRadius: "16px",
    boxShadow: "0 2px 8px rgba(23, 38, 59, 0.06)",
    padding: "20px 24px",
  },
  statusBanner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    flexWrap: "wrap",
  },
  statusLabel: {
    margin: 0,
    fontSize: "18px",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.03em",
  },
  statusHint: {
    margin: "6px 0 0",
    fontSize: "14px",
    color: "#5b6b82",
  },
  statusNormal: {
    color: "#0b6bcb",
    background: "#e3f0fc",
  },
  statusCancelled: {
    color: "#c62828",
    background: "#fdecec",
  },
  statusExpired: {
    color: "#b54708",
    background: "#fdf0e2",
  },
  statusBusy: {
    color: "#7a4a0b",
    background: "#faf2dd",
  },
  chip: {
    display: "inline-block",
    padding: "6px 12px",
    fontSize: "13px",
    fontWeight: 600,
    borderRadius: "999px",
  },
  cardTitle: {
    margin: "0 0 12px",
    fontSize: "14px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    color: "#8191a6",
  },
  exceptionBox: {
    marginTop: "12px",
    padding: "12px 14px",
    borderRadius: "10px",
    fontSize: "14px",
    background: "#fdf3f3",
    border: "1px solid #f3d2d2",
    color: "#8a2c2c",
  },
  stepper: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    marginTop: "16px",
  },
  stage: {
    flex: "1 1 0",
    minWidth: "86px",
    textAlign: "center",
  },
  stageDot: {
    width: "30px",
    height: "30px",
    margin: "0 auto 6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    fontSize: "14px",
    fontWeight: 700,
    background: "#eef2f7",
    color: "#8191a6",
  },
  stageDone: {
    background: "#1a7f3d",
    color: "#ffffff",
  },
  stageCurrent: {
    background: "#0b6bcb",
    color: "#ffffff",
    boxShadow: "0 0 0 4px rgba(11, 107, 203, 0.2)",
  },
  stagePending: {
    background: "#eef2f7",
    color: "#8191a6",
  },
  stageLabel: {
    fontSize: "11px",
    fontWeight: 600,
    color: "#8191a6",
  },
  stageLabelCurrent: {
    color: "#0b6bcb",
    fontWeight: 700,
  },
  stageLabelDone: {
    color: "#1a7f3d",
  },
  bar: {
    height: "3px",
    flex: 1,
    alignSelf: "flex-start",
    marginTop: "14px",
    borderRadius: "999px",
    minWidth: "30px",
    background: "#eef2f7",
  },
  barDone: {
    background: "#1a7f3d",
  },
  otpBox: {
    textAlign: "center",
    padding: "16px",
    borderRadius: "12px",
    background: "#e3f0fc",
    border: "1px solid #bcd9f6",
  },
  otpCode: {
    margin: "8px 0 0",
    fontSize: "28px",
    fontWeight: 800,
    letterSpacing: "0.35em",
    color: "#0b6bcb",
  },
  otpHint: {
    margin: "6px 0 0",
    fontSize: "13px",
    color: "#5b6b82",
  },
  otpWaiting: {
    margin: 0,
    fontSize: "14px",
    color: "#5b6b82",
  },
  details: {
    marginTop: "4px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    padding: "9px 0",
    fontSize: "14px",
    borderBottom: "1px solid #eef2f7",
  },
  rowLast: {
    borderBottom: "none",
  },
  rowKey: {
    color: "#5b6b82",
  },
  rowVal: {
    fontWeight: 600,
    color: "#17263b",
    textAlign: "right",
  },
  empty: {
    maxWidth: "640px",
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
};

const CHECK = "\u2713";
const DOT = "\u2022";
const DASH = "\u2014";
const EMPTY_ICON = "\uD83D\uDC64";
const UNKNOWN_ICON = "\u2753";
const OTP_ICON = "\uD83D\uDD22";

function pick(...keys) {
  return (obj) => {
    if (!obj) return undefined;
    for (const key of keys) {
      if (obj[key] !== undefined && obj[key] !== null && obj[key] !== "") return obj[key];
    }
    return undefined;
  };
}

const getBookingId = pick("id", "bookingId");
const getWorkerName = pick("workerName");
const getLocation = pick("location", "address");

function localizedName(category, language) {
  if (!category) return undefined;
  if (category.nameI18n && typeof category.nameI18n === "object") {
    return category.nameI18n[language] || category.nameI18n.en || category.name || undefined;
  }
  return category.name || undefined;
}

function categoryLabel(booking, language) {
  const category = pick("category", "serviceCategory", "serviceType")(booking);
  if (typeof category === "string") return category;
  return localizedName(category, language) || category?.name || undefined;
}

function normalizeStatus(raw) {
  if (raw === undefined || raw === null || raw === "") return undefined;
  return String(raw).trim().toLowerCase();
}

function statusMeta(status, t) {
  const labels = {
    requested: t("customer.tracker.st.requested", "Requested"),
    matched: t("customer.tracker.st.matched", "Matched"),
    accepted: t("customer.tracker.st.accepted", "Accepted"),
    on_the_way: t("customer.tracker.st.onTheWay", "On the way"),
    started: t("customer.tracker.st.started", "Started"),
    completed: t("customer.tracker.st.completed", "Completed"),
    confirmed: t("customer.tracker.st.confirmed", "Confirmed"),
    paid: t("customer.tracker.st.paid", "Paid"),
    rated: t("customer.tracker.st.rated", "Rated"),
    cancelled: t("customer.tracker.st.cancelled", "Cancelled"),
    rejected: t("customer.tracker.st.rejected", "Rejected"),
    expired: t("customer.tracker.st.expired", "Expired"),
    disputed: t("customer.tracker.st.disputed", "Disputed"),
  };
  const hints = {
    requested: t(
      "customer.tracker.hint.requested",
      "Waiting for a worker to accept your request."
    ),
    matched: t(
      "customer.tracker.hint.matched",
      "A worker has been matched to your request."
    ),
    accepted: t(
      "customer.tracker.hint.accepted",
      "Worker accepted. Share the OTP with the worker to start."
    ),
    on_the_way: t(
      "customer.tracker.hint.onTheWay",
      "The worker is on the way to your location."
    ),
    started: t("customer.tracker.hint.started", "Service is in progress."),
    completed: t(
      "customer.tracker.hint.completed",
      "Service completed. Awaiting confirmation."
    ),
    confirmed: t("customer.tracker.hint.confirmed", "Booking confirmed. Payment is ready."),
    paid: t("customer.tracker.hint.paid", "Payment received. Thanks for using Sahyog Seva!"),
    rated: t("customer.tracker.hint.rated", "Booking completed and rated. See you again!"),
    cancelled: t("customer.tracker.hint.cancelled", "This booking was cancelled."),
    rejected: t("customer.tracker.hint.rejected", "The worker rejected this booking."),
    expired: t("customer.tracker.hint.expired", "This booking timed out with no worker."),
    disputed: t(
      "customer.tracker.hint.disputed",
      "This booking is under dispute and under review."
    ),
  };
  return { label: labels[status], hint: hints[status] };
}

function exceptionKind(status) {
  if (status === "cancelled" || status === "rejected") return "cancelled";
  if (status === "expired") return "expired";
  if (status === "disputed") return "pending";
  return null;
}

function stageLabel(status, t) {
  const map = {
    requested: t("customer.tracker.stage.requested", "Requested"),
    matched: t("customer.tracker.stage.matched", "Matched"),
    accepted: t("customer.tracker.stage.accepted", "Accepted"),
    on_the_way: t("customer.tracker.stage.onTheWay", "On the way"),
    started: t("customer.tracker.stage.started", "Started"),
    completed: t("customer.tracker.stage.completed", "Completed"),
    confirmed: t("customer.tracker.stage.confirmed", "Confirmed"),
    paid: t("customer.tracker.stage.paid", "Paid"),
    rated: t("customer.tracker.stage.rated", "Rated"),
  };
  return map[status];
}

export default function BookingTracker({
  booking,
  currentStatus,
  otp,
  onBack,
  language = "en",
  t = (key, fallback) => fallback,
}) {
  const heading = t("customer.tracker.heading", "Booking Status");
  const status = normalizeStatus(currentStatus ?? booking?.status);

  if (!booking) {
    return (
      <section style={styles.wrapper}>
        <div style={styles.empty}>
          <span style={styles.emptyIcon} role="img" aria-hidden="true">
            {EMPTY_ICON}
          </span>
          <p style={styles.emptyTitle}>{t("customer.tracker.noBooking", "No booking found")}</p>
          <p style={styles.emptyMessage}>
            {t(
              "customer.tracker.noBookingHint",
              "Select a booking from your history to see its status."
            )}
          </p>
        </div>
      </section>
    );
  }

  const unknown = status === undefined || (!LIFECYCLE.includes(status) && !EXCEPTIONS.includes(status));

  if (unknown) {
    return (
      <section style={styles.wrapper}>
        <div style={styles.empty}>
          <span style={styles.emptyIcon} role="img" aria-hidden="true">
            {UNKNOWN_ICON}
          </span>
          <p style={styles.emptyTitle}>
            {t("customer.tracker.unknownStatus", "Unknown booking status")}
          </p>
          <p style={styles.emptyMessage}>
            {t(
              "customer.tracker.unknownStatusHint",
              "The status for this booking could not be recognised."
            )}
          </p>
        </div>
      </section>
    );
  }

  const bookingId = getBookingId(booking);
  const workerName = getWorkerName(booking) || booking?.worker?.name;
  const location = getLocation(booking);
  const date = booking?.date;
  const time = booking?.time;
  const category = categoryLabel(booking, language);
  const meta = statusMeta(status, t);
  const isException = EXCEPTIONS.includes(status);
  const currentIndex = LIFECYCLE.indexOf(status);
  const exceptionStyle =
    status === "expired" || status === "disputed"
      ? styles.statusExpired
      : styles.statusCancelled;

  let otpCode;
  if (otp && typeof otp === "object") {
    otpCode = otp.code ?? otp.otp ?? otp.value;
  } else {
    otpCode = otp;
  }
  const showOtp = otpCode !== undefined && otpCode !== null && otpCode !== "";

  const otpApplicable = status === "accepted" || status === "on_the_way" || status === "started";

  return (
    <section style={styles.wrapper}>
      <div style={styles.content}>
        <header>
          {typeof onBack === "function" ? (
            <button type="button" style={styles.backBtn} onClick={onBack}>
              {"\u2190"} {t("customer.tracker.back", "Back")}
            </button>
          ) : null}
        </header>

        <h1 style={styles.heading}>{heading}</h1>

        <div style={styles.card}>
          <div style={styles.statusBanner}>
            <div>
              <p style={{ ...styles.statusLabel, ...(isException ? exceptionStyle : styles.statusNormal) }}>
                {meta.label}
              </p>
              <p style={styles.statusHint}>{meta.hint}</p>
            </div>
            {bookingId ? (
              <span style={{ ...styles.chip, ...styles.statusNormal }}>
                {t("customer.tracker.bookingId", "Booking")} #{bookingId}
              </span>
            ) : null}
          </div>

          {isException ? (
            <div style={{ ...styles.exceptionBox, ...(status === "disputed" ? { background: "#faf2dd", borderColor: "#ecd9a8", color: "#7a4a0b" } : {}) }}>
              {status === "disputed"
                ? t(
                    "customer.tracker.disputeNote",
                    "Your booking is under review. Our team will get in touch."
                  )
                : null}
              {status === "cancelled"
                ? t(
                    "customer.tracker.cancelledNote",
                    "This booking will not proceed further. You can make a new booking any time."
                  )
                : null}
              {status === "rejected"
                ? t(
                    "customer.tracker.rejectedNote",
                    "The worker could not take this job. Try booking another worker."
                  )
                : null}
              {status === "expired"
                ? t(
                    "customer.tracker.expiredNote",
                    "No worker accepted within the time window. Please try again."
                  )
                : null}
            </div>
          ) : (
            <div style={styles.stepper}>
              {LIFECYCLE.map((stage, i) => {
                const done = i < currentIndex;
                const current = i === currentIndex;
                const pending = i > currentIndex;
                let dotStyle = styles.stagePending;
                if (done) dotStyle = styles.stageDone;
                else if (current) dotStyle = styles.stageCurrent;
                return (
                  <div key={stage} style={{ display: "contents" }}>
                    {i > 0 ? (
                      <span style={{ ...styles.bar, ...(i <= currentIndex ? styles.barDone : {}) }} />
                    ) : null}
                    <div style={styles.stage}>
                      <div style={dotStyle}>{done ? CHECK : <span>{i + 1}</span>}</div>
                      <div
                        style={{
                          ...styles.stageLabel,
                          ...(current ? styles.stageLabelCurrent : {}),
                          ...(done ? styles.stageLabelDone : {}),
                        }}
                      >
                        {stageLabel(stage, t)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {isException ? null : (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>
              {OTP_ICON} {t("customer.tracker.otpTitle", "Service OTP")}
            </h2>
            {showOtp ? (
              <div style={styles.otpBox}>
                <p style={{ ...styles.otpCode }}>{otpCode}</p>
                <p style={styles.otpHint}>
                  {t(
                    "customer.tracker.otpHint",
                    "Share this code with your worker. The worker enters it to start the service."
                  )}
                </p>
              </div>
            ) : otpApplicable ? (
              <div style={styles.otpBox}>
                <p style={styles.otpWaiting}>
                  {t(
                    "customer.tracker.otpWaiting",
                    "OTP is not generated yet. It will appear here once available."
                  )}
                </p>
              </div>
            ) : (
              <p style={styles.otpWaiting}>
                {t(
                  "customer.tracker.otpNotYet",
                  "OTP appears once your booking is accepted by a worker."
                )}
              </p>
            )}
          </div>
        )}

        <div style={{ ...styles.card, ...styles.details }}>
          <h2 style={styles.cardTitle}>{t("customer.tracker.detailsTitle", "Booking details")}</h2>
          <div style={styles.row}>
            <span style={styles.rowKey}>{t("customer.tracker.details.category", "Service")}</span>
            <span style={styles.rowVal}>{category || DASH}</span>
          </div>
          <div style={styles.row}>
            <span style={styles.rowKey}>{t("customer.tracker.details.worker", "Worker")}</span>
            <span style={styles.rowVal}>{workerName || DASH}</span>
          </div>
          <div style={styles.row}>
            <span style={styles.rowKey}>{t("customer.tracker.details.location", "Location")}</span>
            <span style={styles.rowVal}>{location || DASH}</span>
          </div>
          <div style={styles.row}>
            <span style={styles.rowKey}>{t("customer.tracker.details.date", "Date")}</span>
            <span style={styles.rowVal}>{date || DASH}</span>
          </div>
          <div style={{ ...styles.row, ...styles.rowLast }}>
            <span style={styles.rowKey}>{t("customer.tracker.details.time", "Time")}</span>
            <span style={styles.rowVal}>
              {time || DASH} {DOT} {meta.label}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

BookingTracker.displayName = "BookingTracker";