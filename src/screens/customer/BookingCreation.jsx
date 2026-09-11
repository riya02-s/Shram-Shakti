import React, { useEffect, useMemo, useState } from "react";

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
  cardTitle: {
    margin: "0 0 14px",
    fontSize: "15px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    color: "#8191a6",
  },
  readRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 0",
    borderBottom: "1px solid #eef2f7",
  },
  readRowLast: {
    borderBottom: "none",
  },
  readRowLabel: {
    flex: "0 0 130px",
    fontSize: "14px",
    color: "#5b6b82",
  },
  readRowValue: {
    flex: 1,
    fontSize: "15px",
    fontWeight: 600,
    color: "#17263b",
  },
  chip: {
    display: "inline-block",
    padding: "6px 12px",
    fontSize: "13px",
    fontWeight: 600,
    background: "#e3f0fc",
    color: "#0b6bcb",
    borderRadius: "999px",
  },
  field: {
    marginBottom: "14px",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    fontSize: "14px",
    fontWeight: 600,
    color: "#2a3b52",
  },
  control: {
    width: "100%",
    padding: "11px 12px",
    fontSize: "15px",
    fontFamily: "inherit",
    color: "#17263b",
    background: "#ffffff",
    border: "1px solid #c6d2e2",
    borderRadius: "10px",
    boxSizing: "border-box",
    outline: "none",
  },
  textarea: {
    minHeight: "88px",
    resize: "vertical",
  },
  errorText: {
    margin: "6px 0 0",
    fontSize: "12px",
    color: "#c62828",
  },
  estimateBlock: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "10px",
  },
  estimateValue: {
    margin: 0,
    fontSize: "22px",
    fontWeight: 700,
    color: "#0b6bcb",
  },
  estimateHint: {
    margin: "4px 0 0",
    fontSize: "13px",
    color: "#5b6b82",
  },
  refreshBtn: {
    padding: "8px 14px",
    fontSize: "13px",
    fontWeight: 600,
    color: "#0b6bcb",
    background: "#e3f0fc",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  estimateUnavailable: {
    margin: 0,
    fontSize: "14px",
    color: "#5b6b82",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    padding: "9px 0",
    fontSize: "14px",
  },
  summaryKey: {
    color: "#5b6b82",
  },
  summaryVal: {
    fontWeight: 600,
    color: "#17263b",
    textAlign: "right",
  },
  confirmBtn: {
    width: "100%",
    padding: "14px 20px",
    fontSize: "16px",
    fontWeight: 700,
    color: "#ffffff",
    background: "#0b6bcb",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  confirmBtnDisabled: {
    background: "#b9c6d6",
    cursor: "not-allowed",
  },
  success: {
    background: "#e3f8e9",
    border: "1px solid #b4e3c4",
    borderRadius: "12px",
    padding: "16px 20px",
  },
  successTitle: {
    margin: "0 0 4px",
    fontSize: "16px",
    fontWeight: 700,
    color: "#1a7f3d",
  },
  successHint: {
    margin: 0,
    fontSize: "14px",
    color: "#2a3b52",
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
};

const DASH = "\u2014";
const EMPTY_ICON = "\uD83D\uDED2";

function localizedName(category, language) {
  if (!category) return undefined;
  if (category.nameI18n && typeof category.nameI18n === "object") {
    return category.nameI18n[language] || category.nameI18n.en || category.name || undefined;
  }
  return category.name || undefined;
}

function todayString() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function formatPrice(range, currency) {
  if (!range && range !== 0) return null;
  const cur = currency || "\u20B9";
  if (Array.isArray(range)) {
    const [min, max] = range;
    if (max === undefined || max === null) return `${cur} ${min}`;
    return `${cur} ${min} \u2013 ${cur} ${max}`;
  }
  if (typeof range === "object") {
    const { min, max, total } = range;
    if (total !== undefined && total !== null) return `${cur} ${total}`;
    if (max === undefined || min === undefined) return `${cur} ${range}`;
    return `${cur} ${min} \u2013 ${cur} ${max}`;
  }
  return `${cur} ${range}`;
}

export default function BookingCreation({
  worker,
  category,
  onConfirmBooking,
  onBack,
  requestPriceEstimate,
  language = "en",
  t = (key, fallback) => fallback,
}) {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [serviceDetails, setServiceDetails] = useState("");
  const [estimate, setEstimate] = useState(null);
  const [estimateLoading, setEstimateLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const categoryId = category?.id ?? category?.key ?? category?.name;
  const workerId = worker?.workerId ?? worker?.id;

  const canRequestEstimate = typeof requestPriceEstimate === "function";

  useEffect(() => {
    if (!canRequestEstimate || !categoryId || !workerId) return;
    let cancelled = false;
    setEstimateLoading(true);
    const result = requestPriceEstimate({ categoryId, workerId, category, worker });
    Promise.resolve(result)
      .then((value) => {
        if (!cancelled) setEstimate(value);
      })
      .catch(() => {
        if (!cancelled) setEstimate(null);
      })
      .finally(() => {
        if (!cancelled) setEstimateLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [canRequestEstimate, categoryId, workerId]);

  const categoryName = localizedName(category, language);
  const workerName = worker?.name || worker?.fullName || t("customer.booking.anonymous", "Worker");

  const errors = useMemo(() => {
    const next = {};
    if (!category) next.category = t("customer.booking.errCategory", "Please select a service category.");
    if (!worker) next.worker = t("customer.booking.errWorker", "Please select a worker.");
    if (!location || !location.trim())
      next.location = t("customer.booking.errLocation", "Please enter your location or address.");
    if (!date) next.date = t("customer.booking.errDate", "Please choose a date.");
    if (!time) next.time = t("customer.booking.errTime", "Please choose a time.");
    return next;
  }, [category, worker, location, date, time, t]);

  const isValid = Object.keys(errors).length === 0;
  const minDate = todayString();

  const missingWorkerOrCategory = !worker || !category;

  const handleConfirm = () => {
    if (!isValid || !onConfirmBooking) return;
    const payload = {
      categoryId,
      workerId,
      location: location.trim(),
      date,
      time,
      serviceDetails: serviceDetails.trim() || undefined,
      status: "requested",
    };
    onConfirmBooking(payload);
    setConfirmed(true);
  };

  const refreshEstimate = () => {
    if (!canRequestEstimate || estimateLoading) return;
    const result = requestPriceEstimate({ categoryId, workerId, category, worker });
    setEstimateLoading(true);
    Promise.resolve(result)
      .then(setEstimate)
      .catch(() => setEstimate(null))
      .finally(() => setEstimateLoading(false));
  };

  if (missingWorkerOrCategory) {
    return (
      <section style={styles.wrapper}>
        <div style={styles.empty}>
          <span style={styles.emptyIcon} role="img" aria-hidden="true">
            {EMPTY_ICON}
          </span>
          <p style={styles.emptyTitle}>
            {t("customer.booking.incomplete", "Booking information incomplete")}
          </p>
          <p style={styles.emptyMessage}>
            {t(
              "customer.booking.incompleteHint",
              "A worker and a service category are required to create a booking."
            )}
          </p>
        </div>
      </section>
    );
  }

  const priceText = estimate ? formatPrice(estimate, estimate.currency) : null;

  return (
    <section style={styles.wrapper}>
      <div style={styles.content}>
        <header>
          {typeof onBack === "function" ? (
            <button type="button" style={styles.backBtn} onClick={onBack}>
              {"\u2190"} {t("customer.booking.back", "Back")}
            </button>
          ) : null}
        </header>

        <h1 style={styles.heading}>{t("customer.booking.heading", "Create Booking")}</h1>

        {confirmed ? (
          <div style={styles.success}>
            <p style={styles.successTitle}>
              {t("customer.booking.confirmedTitle", "Booking request created!")}
            </p>
            <p style={styles.successHint}>
              {t(
                "customer.booking.confirmedHint",
                "Status: requested. You can track progress in your booking tracker."
              )}
            </p>
          </div>
        ) : null}

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>{t("customer.booking.summaryTitle", "Booking summary")}</h2>
          <div style={{ ...styles.readRow }}>
            <span style={styles.readRowLabel}>{t("customer.booking.category", "Service category")}</span>
            <span style={styles.readRowValue}>
              <span style={styles.chip}>{categoryName || DASH}</span>
            </span>
          </div>
          <div style={{ ...styles.readRow }}>
            <span style={styles.readRowLabel}>{t("customer.booking.worker", "Service provider")}</span>
            <span style={styles.readRowValue}>{workerName}</span>
          </div>
          <div style={{ ...styles.readRow, ...styles.readRowLast }}>
            <span style={styles.readRowLabel}>{t("customer.booking.price", "Price estimate")}</span>
            <span style={styles.readRowValue}>
              {canRequestEstimate ? (
                estimateLoading ? (
                  `${t("customer.booking.loading", "Calculating")} ...`
                ) : priceText ? (
                  priceText
                ) : (
                  <span style={styles.estimateUnavailable}>
                    {t("customer.booking.priceUnavailable", "Price unavailable right now")}
                  </span>
                )
              ) : (
                <span style={styles.estimateUnavailable}>
                  {t("customer.booking.priceNotSupported", "Price estimate not available")}
                </span>
              )}
            </span>
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>{t("customer.booking.detailsTitle", "Booking details")}</h2>

          <div style={styles.field}>
            <label style={styles.label} htmlFor="booking-location">
              {t("customer.booking.location", "Location / address")}
            </label>
            <input
              id="booking-location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={t("customer.booking.locationPlaceholder", "House no., street, area, city")}
              style={styles.control}
            />
            {errors.location ? <p style={styles.errorText}>{errors.location}</p> : null}
          </div>

          <div style={{ ...styles.field, display: "flex", gap: "12px" }}>
            <div style={{ flex: 1 }}>
              <label style={styles.label} htmlFor="booking-date">
                {t("customer.booking.date", "Date")}
              </label>
              <input
                id="booking-date"
                type="date"
                min={minDate}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={styles.control}
              />
              {errors.date ? <p style={styles.errorText}>{errors.date}</p> : null}
            </div>
            <div style={{ flex: 1 }}>
              <label style={styles.label} htmlFor="booking-time">
                {t("customer.booking.time", "Time")}
              </label>
              <input
                id="booking-time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                style={styles.control}
              />
              {errors.time ? <p style={styles.errorText}>{errors.time}</p> : null}
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label} htmlFor="booking-details">
              {t("customer.booking.details", "Service details (optional)")}
            </label>
            <textarea
              id="booking-details"
              value={serviceDetails}
              onChange={(e) => setServiceDetails(e.target.value)}
              placeholder={t(
                "customer.booking.detailsPlaceholder",
                "Describe the work you need done..."
              )}
              style={{ ...styles.control, ...styles.textarea }}
            />
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>{t("customer.booking.estimateTitle", "Price estimate")}</h2>
          <div style={styles.estimateBlock}>
            <div>
              {canRequestEstimate ? (
                estimateLoading ? (
                  <p style={{ ...styles.estimateValue, fontSize: "16px" }}>
                    {t("customer.booking.loading", "Calculating")}...
                  </p>
                ) : priceText ? (
                  <>
                    <p style={styles.estimateValue}>{priceText}</p>
                    <p style={styles.estimateHint}>
                      {t(
                        "customer.booking.estimateHint",
                        "Final price may vary once the service is completed."
                      )}
                    </p>
                  </>
                ) : (
                  <p style={styles.estimateUnavailable}>
                    {t("customer.booking.priceUnavailable", "Price unavailable right now")}
                  </p>
                )
              ) : (
                <p style={styles.estimateUnavailable}>
                  {t(
                    "customer.booking.priceNotSupported",
                    "Price estimate is not available in this prototype yet."
                  )}
                </p>
              )}
            </div>
            {canRequestEstimate ? (
              <button type="button" style={styles.refreshBtn} onClick={refreshEstimate}>
                {t("customer.booking.refresh", "Refresh")}
              </button>
            ) : null}
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>{t("customer.booking.reviewTitle", "Review & confirm")}</h2>
          <div style={styles.summaryRow}>
            <span style={styles.summaryKey}>{t("customer.booking.category", "Service category")}</span>
            <span style={styles.summaryVal}>{categoryName || DASH}</span>
          </div>
          <div style={styles.summaryRow}>
            <span style={styles.summaryKey}>{t("customer.booking.worker", "Service provider")}</span>
            <span style={styles.summaryVal}>{workerName}</span>
          </div>
          <div style={styles.summaryRow}>
            <span style={styles.summaryKey}>{t("customer.booking.location", "Location")}</span>
            <span style={styles.summaryVal}>{location.trim() || DASH}</span>
          </div>
          <div style={styles.summaryRow}>
            <span style={styles.summaryKey}>{t("customer.booking.when", "When")}</span>
            <span style={styles.summaryVal}>
              {date ? `${date} ${time ? `\u00B7 ${time}` : ""}` : DASH}
            </span>
          </div>
          {serviceDetails.trim() ? (
            <div style={styles.summaryRow}>
              <span style={styles.summaryKey}>{t("customer.booking.details", "Details")}</span>
              <span style={styles.summaryVal}>{serviceDetails.trim()}</span>
            </div>
          ) : null}
          <div style={styles.summaryRow}>
            <span style={styles.summaryKey}>{t("customer.booking.status", "Status")}</span>
            <span style={styles.summaryVal}>{t("customer.booking.requested", "requested")}</span>
          </div>
        </div>

        <button
          type="button"
          style={{ ...styles.confirmBtn, ...(isValid ? {} : styles.confirmBtnDisabled) }}
          disabled={!isValid}
          onClick={handleConfirm}
        >
          {t("customer.booking.confirm", "Confirm Booking")}
        </button>
      </div>
    </section>
  );
}

BookingCreation.displayName = "BookingCreation";