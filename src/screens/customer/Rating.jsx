import React, { useState } from "react";

const ELIGIBLE_STATUSES = ["completed", "confirmed", "paid"];

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
    padding: "24px",
  },
  worker: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    width: "48px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    background: "#0b6bcb",
    color: "#ffffff",
    fontSize: "20px",
    fontWeight: 700,
    flexShrink: 0,
  },
  workerName: {
    margin: 0,
    fontSize: "18px",
    fontWeight: 700,
    color: "#17263b",
  },
  workerMeta: {
    margin: "2px 0 0",
    fontSize: "14px",
    color: "#5b6b82",
  },
  stars: {
    display: "flex",
    gap: "6px",
    marginTop: "20px",
  },
  star: {
    fontSize: "36px",
    lineHeight: 1,
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "0 2px",
    color: "#d4dbe6",
  },
  starSelected: {
    color: "#f5a623",
  },
  starLabel: {
    margin: "10px 0 0",
    fontSize: "14px",
    color: "#5b6b82",
  },
  errorText: {
    margin: "8px 0 0",
    fontSize: "13px",
    color: "#c62828",
  },
  label: {
    display: "block",
    margin: "18px 0 6px",
    fontSize: "14px",
    fontWeight: 600,
    color: "#2a3b52",
  },
  textarea: {
    width: "100%",
    minHeight: "96px",
    padding: "11px 12px",
    fontSize: "15px",
    fontFamily: "inherit",
    color: "#17263b",
    background: "#ffffff",
    border: "1px solid #c6d2e2",
    borderRadius: "10px",
    boxSizing: "border-box",
    outline: "none",
    resize: "vertical",
  },
  submitBtn: {
    width: "100%",
    marginTop: "18px",
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
  submitProcessing: {
    background: "#5b9bd8",
    cursor: "progress",
  },
  submitDisabled: {
    background: "#b9c6d6",
    cursor: "not-allowed",
  },
  success: {
    background: "#e3f8e9",
    border: "1px solid #b4e3c4",
    borderRadius: "12px",
    padding: "20px",
    textAlign: "center",
  },
  successIcon: {
    fontSize: "36px",
    display: "block",
    marginBottom: "10px",
  },
  successTitle: {
    margin: "0 0 4px",
    fontSize: "18px",
    fontWeight: 800,
    color: "#1a7f3d",
  },
  successHint: {
    margin: 0,
    fontSize: "14px",
    color: "#2a3b52",
  },
  errorBox: {
    background: "#fdecec",
    border: "1px solid #f3cfcf",
    borderRadius: "12px",
    padding: "16px 20px",
    textAlign: "center",
  },
  errorTitle: {
    margin: "0 0 4px",
    fontSize: "16px",
    fontWeight: 700,
    color: "#c62828",
  },
  errorHint: {
    margin: 0,
    fontSize: "14px",
    color: "#8a2c2c",
  },
  noticeBox: {
    background: "#f7fafd",
    border: "1px solid #e8eef6",
    borderRadius: "12px",
    padding: "16px 20px",
    textAlign: "center",
  },
  noticeTitle: {
    margin: "0 0 4px",
    fontSize: "16px",
    fontWeight: 700,
    color: "#17263b",
  },
  noticeHint: {
    margin: 0,
    fontSize: "14px",
    color: "#5b6b82",
  },
  actionRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "14px",
  },
  primaryAction: {
    flex: 1,
    padding: "13px 18px",
    fontSize: "15px",
    fontWeight: 700,
    color: "#ffffff",
    background: "#0b6bcb",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  secondaryAction: {
    flex: 1,
    padding: "13px 18px",
    fontSize: "15px",
    fontWeight: 700,
    color: "#0b6bcb",
    background: "#ffffff",
    border: "1px solid #0b6bcb",
    borderRadius: "12px",
    cursor: "pointer",
    fontFamily: "inherit",
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

const STAR = "\u2605";
const EMPTY_ICON = "\uD83D\uDC64";
const RATED_ICON = "\u2705";
const SUCCESS_ICON = "\uD83C\uDF1F";

function localizedName(category, language) {
  if (!category) return undefined;
  if (category.nameI18n && typeof category.nameI18n === "object") {
    return category.nameI18n[language] || category.nameI18n.en || category.name || undefined;
  }
  return category.name || undefined;
}

function categoryLabel(booking, language) {
  const category = booking?.category || booking?.serviceCategory || booking?.serviceType;
  if (typeof category === "string") return category;
  return localizedName(category, language) || category?.name || undefined;
}

function normalizeStatus(value) {
  if (value === undefined || value === null || value === "") return undefined;
  return String(value).trim().toLowerCase();
}

function ratingLabel(rating, t) {
  const labels = {
    1: t("customer.rating.poor", "Poor service"),
    2: t("customer.rating.fair", "Fair service"),
    3: t("customer.rating.good", "Good service"),
    4: t("customer.rating.great", "Great service"),
    5: t("customer.rating.excellent", "Excellent service"),
  };
  return labels[rating] || "";
}

export default function Rating({
  booking,
  onSubmitRating,
  onBack,
  onGoToHistory,
  language = "en",
  t = (key, fallback) => fallback,
}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [state, setState] = useState("idle");

  if (!booking) {
    return (
      <section style={styles.wrapper}>
        <div style={styles.empty}>
          <span style={styles.emptyIcon} role="img" aria-hidden="true">
            {EMPTY_ICON}
          </span>
          <p style={styles.emptyTitle}>{t("customer.rating.noBooking", "No booking found")}</p>
          <p style={styles.emptyMessage}>
            {t(
              "customer.rating.noBookingHint",
              "Choose a completed booking to leave a rating."
            )}
          </p>
        </div>
      </section>
    );
  }

  const status = normalizeStatus(booking.status);
  const bookingId = booking.id ?? booking.bookingId;
  const workerId = booking.workerId ?? booking.worker?.id ?? booking.worker?.workerId;
  const workerName = booking.worker?.name || booking.workerName || t("customer.rating.anonymous", "Worker");
  const category = categoryLabel(booking, language);
  const date = booking.date;
  const alreadyRated =
    status === "rated" ||
    booking.ratingSubmitted === true ||
    (booking.rating !== undefined && booking.rating !== null);

  if (alreadyRated) {
    return (
      <section style={styles.wrapper}>
        <div style={styles.content}>
          <header>
            {typeof onBack === "function" ? (
              <button type="button" style={styles.backBtn} onClick={onBack}>
                {"\u2190"} {t("customer.rating.back", "Back")}
              </button>
            ) : null}
          </header>
          <h1 style={styles.heading}>{t("customer.rating.heading", "Rate your worker")}</h1>
          <div style={styles.noticeBox}>
            <span style={styles.emptyIcon} role="img" aria-hidden="true">
              {RATED_ICON}
            </span>
            <p style={styles.noticeTitle}>
              {t("customer.rating.alreadyRated", "Already rated")}
            </p>
            <p style={styles.noticeHint}>
              {t(
                "customer.rating.alreadyRatedHint",
                "You have already rated this booking. Thanks for your feedback!"
              )}
            </p>
            {typeof onGoToHistory === "function" ? (
              <div style={styles.actionRow}>
                <button type="button" style={styles.primaryAction} onClick={onGoToHistory}>
                  {t("customer.rating.goToHistory", "Go to Booking History")}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  const eligible = ELIGIBLE_STATUSES.includes(status);

  if (!eligible) {
    return (
      <section style={styles.wrapper}>
        <div style={styles.content}>
          <header>
            {typeof onBack === "function" ? (
              <button type="button" style={styles.backBtn} onClick={onBack}>
                {"\u2190"} {t("customer.rating.back", "Back")}
              </button>
            ) : null}
          </header>
          <h1 style={styles.heading}>{t("customer.rating.heading", "Rate your worker")}</h1>
          <div style={styles.noticeBox}>
            <span style={styles.emptyIcon} role="img" aria-hidden="true">
              {EMPTY_ICON}
            </span>
            <p style={styles.noticeTitle}>
              {t("customer.rating.notEligible", "Rating not available yet")}
            </p>
            <p style={styles.noticeHint}>
              {t(
                "customer.rating.notEligibleHint",
                "You can rate this booking once the service is completed."
              )}
            </p>
          </div>
        </div>
      </section>
    );
  }

  const validRating = rating >= 1 && rating <= 5;
  const submitting = state === "submitting";
  const succeeded = state === "success";
  const failed = state === "error";

  const handleSubmit = async () => {
    if (!validRating || submitting || !onSubmitRating) return;
    const payload = {
      bookingId,
      workerId,
      rating,
      review: review.trim() || undefined,
    };
    setState("submitting");
    try {
      const result = onSubmitRating(payload);
      if (result && typeof result.then === "function") {
        await result;
      }
      setState("success");
    } catch (err) {
      setState("error");
    }
  };

  const initials = workerName
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  if (succeeded) {
    return (
      <section style={styles.wrapper}>
        <div style={styles.content}>
          <h1 style={styles.heading}>{t("customer.rating.heading", "Rate your worker")}</h1>
          <div style={styles.success}>
            <span style={styles.successIcon} role="img" aria-hidden="true">
              {SUCCESS_ICON}
            </span>
            <p style={styles.successTitle}>
              {t("customer.rating.successTitle", "Thank you for your rating!")}
            </p>
            <p style={styles.successHint}>
              {t("customer.rating.successHint", "Your feedback helps workers and the community.")}
            </p>
            <div style={styles.actionRow}>
              {typeof onGoToHistory === "function" ? (
                <button type="button" style={styles.primaryAction} onClick={onGoToHistory}>
                  {t("customer.rating.goToHistory", "Go to Booking History")}
                </button>
              ) : null}
              {typeof onBack === "function" ? (
                <button type="button" style={styles.secondaryAction} onClick={onBack}>
                  {t("customer.rating.back", "Back")}
                </button>
              ) : null}
            </div>
          </div>
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
              {"\u2190"} {t("customer.rating.back", "Back")}
            </button>
          ) : null}
        </header>

        <h1 style={styles.heading}>{t("customer.rating.heading", "Rate your worker")}</h1>

        <div style={styles.card}>
          <div style={styles.worker}>
            <div style={styles.avatar}>{initials}</div>
            <div>
              <p style={styles.workerName}>{workerName}</p>
              <p style={styles.workerMeta}>
                {[category, t("customer.rating.bookingId", "Booking"), bookingId]
                  .filter((v) => v !== undefined && v !== null && v !== "")
                  .join(" \u2022 ")}
                {date ? ` \u2022 ${date}` : ""}
              </p>
            </div>
          </div>

          <div style={styles.stars} onMouseLeave={() => setHover(0)}>
            {[1, 2, 3, 4, 5].map((value) => {
              const active = value <= (hover || rating);
              return (
                <button
                  key={value}
                  type="button"
                  aria-label={`${value} ${t("customer.rating.stars", "stars")}`}
                  style={{ ...styles.star, ...(active ? styles.starSelected : {}) }}
                  onMouseEnter={() => setHover(value)}
                  onClick={() => setRating(value)}
                >
                  {STAR}
                </button>
              );
            })}
          </div>

          <p style={styles.starLabel}>
            {validRating ? ratingLabel(rating, t) : t("customer.rating.pickStars", "Tap a star to rate")}
          </p>

          <label style={styles.label} htmlFor="rating-review">
            {t("customer.rating.reviewLabel", "Write a review (optional)")}
          </label>
          <textarea
            id="rating-review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder={t("customer.rating.reviewPlaceholder", "Share your experience...")}
            style={styles.textarea}
          />

          {failed ? (
            <div style={{ ...styles.errorBox, marginTop: "14px" }}>
              <p style={styles.errorTitle}>
                {t("customer.rating.failedTitle", "Could not submit rating")}
              </p>
              <p style={styles.errorHint}>
                {t("customer.rating.failedHint", "Please try again.")}
              </p>
            </div>
          ) : null}

          <button
            type="button"
            style={{
              ...styles.submitBtn,
              ...(submitting ? styles.submitProcessing : {}),
              ...(!validRating || !onSubmitRating ? styles.submitDisabled : {}),
            }}
            disabled={submitting || !validRating || !onSubmitRating}
            onClick={handleSubmit}
          >
            {submitting
              ? t("customer.rating.submitting", "Submitting...")
              : t("customer.rating.submit", "Submit Rating")}
          </button>
        </div>
      </div>
    </section>
  );
}

Rating.displayName = "Rating";