import React, { useEffect, useState } from "react";

const styles = {
  wrapper: {
    minHeight: "100vh",
    padding: "32px 20px 48px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    background: "linear-gradient(180deg, #fff5f4 0%, #ffffff 100%)",
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
    color: "#c62828",
    background: "transparent",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  banner: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "14px 18px",
    background: "#c62828",
    color: "#ffffff",
    borderRadius: "14px",
  },
  bannerTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: 800,
    letterSpacing: "0.03em",
  },
  bannerIcon: {
    fontSize: "22px",
  },
  card: {
    background: "#ffffff",
    border: "1px solid #f2d6d4",
    borderRadius: "16px",
    boxShadow: "0 2px 8px rgba(198, 40, 40, 0.08)",
    padding: "20px 24px",
  },
  cardTitle: {
    margin: "0 0 14px",
    fontSize: "15px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    color: "#a15a58",
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
    border: "1px solid #d9bfbd",
    borderRadius: "10px",
    boxSizing: "border-box",
    outline: "none",
  },
  errorText: {
    margin: "6px 0 0",
    fontSize: "12px",
    color: "#c62828",
  },
  categoryChips: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  chip: {
    padding: "8px 14px",
    fontSize: "14px",
    fontWeight: 600,
    background: "#ffffff",
    border: "1px solid #d9bfbd",
    color: "#8a3b39",
    borderRadius: "999px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  chipSelected: {
    background: "#c62828",
    borderColor: "#c62828",
    color: "#ffffff",
  },
  emergencyBtn: {
    width: "100%",
    padding: "16px 20px",
    fontSize: "17px",
    fontWeight: 800,
    color: "#ffffff",
    background: "#c62828",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontFamily: "inherit",
    boxShadow: "0 4px 14px rgba(198, 40, 40, 0.3)",
  },
  emergencyBtnDisabled: {
    background: "#d89a98",
    boxShadow: "none",
    cursor: "not-allowed",
  },
  searching: {
    textAlign: "center",
    padding: "40px 20px",
  },
  searchingIcon: {
    fontSize: "44px",
    display: "block",
    marginBottom: "12px",
  },
  searchingTitle: {
    margin: "0 0 6px",
    fontSize: "20px",
    fontWeight: 700,
    color: "#17263b",
  },
  searchingHint: {
    margin: 0,
    fontSize: "14px",
    color: "#5b6b82",
  },
  resultCard: {
    textAlign: "center",
  },
  resultIcon: {
    fontSize: "40px",
    display: "block",
    marginBottom: "10px",
  },
  resultName: {
    margin: "0 0 4px",
    fontSize: "22px",
    fontWeight: 700,
    color: "#17263b",
  },
  resultSkill: {
    margin: "0 0 14px",
    fontSize: "14px",
    color: "#5b6b82",
  },
  resultMeta: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "8px",
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
  continueBtn: {
    width: "100%",
    marginTop: "16px",
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
  secondaryBtn: {
    width: "100%",
    marginTop: "10px",
    padding: "12px 20px",
    fontSize: "15px",
    fontWeight: 700,
    color: "#c62828",
    background: "#ffffff",
    border: "1px solid #c62828",
    borderRadius: "12px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  emptyIcon: {
    fontSize: "40px",
    display: "block",
    marginBottom: "10px",
  },
  emptyTitle: {
    margin: "0 0 6px",
    fontSize: "20px",
    fontWeight: 700,
    color: "#17263b",
  },
  emptyMessage: {
    margin: "0 0 16px",
    fontSize: "14px",
    color: "#5b6b82",
  },
};

const STAR = "\u2605";
const SIREN = "\uD83D\uDEA8";
const SEARCHING_ICON = "\uD83D\uDD0D";
const FOUND_ICON = "\u2705";
const NO_WORKER_ICON = "\uD83D\uDED1";
const ERROR_ICON = "\u26A0\uFE0F";

function localizedName(category, language) {
  if (!category) return undefined;
  if (category.nameI18n && typeof category.nameI18n === "object") {
    return category.nameI18n[language] || category.nameI18n.en || category.name || undefined;
  }
  return category.name || undefined;
}

function categoryIdOf(category) {
  return category?.id ?? category?.key ?? category?.name;
}

function pick(...keys) {
  return (obj) => {
    if (!obj) return undefined;
    for (const key of keys) {
      if (obj[key] !== undefined && obj[key] !== null && obj[key] !== "") return obj[key];
    }
    return undefined;
  };
}

const getRating = pick("ratingAvg", "rating");
const getDistance = pick("distanceKm", "distance");
const getReliability = pick("reliabilityScore");
const getVerification = pick("verificationLevel", "verification");

function normalizeWorker(result) {
  if (!result) return null;
  if (result.worker) return result.worker;
  if (result.name || result.id || result.workerId) return result;
  return null;
}

function formatRating(value) {
  if (value === undefined) return undefined;
  const num = Number(value);
  if (Number.isNaN(num)) return value;
  return num.toFixed(1);
}

function verificationLabel(level) {
  if (level === undefined || level === null || level === "") return undefined;
  const normalized = String(level).toUpperCase();
  return normalized.startsWith("L") ? normalized : `L${normalized}`;
}

export default function EmergencyBooking({
  categories = [],
  category: selectedCategory,
  onEmergencyRequest,
  onContinue,
  onBack,
  language = "en",
  t = (key, fallback) => fallback,
}) {
  const [category, setCategory] = useState(selectedCategory || null);
  const [location, setLocation] = useState("");
  const [touched, setTouched] = useState(false);
  const [state, setState] = useState("idle");
  const [matchedWorker, setMatchedWorker] = useState(null);
  const [dots, setDots] = useState("");
  const [requestPayload, setRequestPayload] = useState(null);

  useEffect(() => {
    if (state !== "searching") return;
    const id = setInterval(() => setDots((d) => (d.length >= 3 ? "" : `${d}.`)), 450);
    return () => clearInterval(id);
  }, [state]);

  const categoryId = categoryIdOf(category);
  const categoryName = localizedName(category, language);
  const canSubmit =
    !!categoryId && !!location.trim() && typeof onEmergencyRequest === "function";

  const handleRequest = async () => {
    if (state === "searching") return;
    if (!categoryId) {
      return;
    }
    if (!location.trim()) {
      return;
    }
    const payload = { categoryId, location: location.trim(), isEmergency: true };
    setRequestPayload(payload);
    setState("searching");
    try {
      const result = await Promise.resolve(onEmergencyRequest(payload));
      const worker = normalizeWorker(result);
      setMatchedWorker(worker);
      setState(worker ? "found" : "noWorker");
    } catch (err) {
      setState("error");
    }
  };

  const handleRetry = () => {
    setState("idle");
    setMatchedWorker(null);
  };

  const handleContinue = () => {
    if (!matchedWorker || !onContinue || !requestPayload) return;
    onContinue(matchedWorker, category, requestPayload);
  };

  const renderIdle = () => (
    <>
      <div style={styles.banner}>
        <span style={styles.bannerIcon} role="img" aria-hidden="true">
          {SIREN}
        </span>
        <p style={styles.bannerTitle}>
          {t("customer.emergency.title", "EMERGENCY SERVICE REQUEST")}
        </p>
      </div>

      {categories.length > 0 ? (
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            {t("customer.emergency.chooseCategory", "Choose an emergency service")}
          </h2>
          <div style={styles.categoryChips}>
            {categories.map((cat) => {
              const id = categoryIdOf(cat);
              const name = localizedName(cat, language);
              const selected = categoryId === id;
              return (
                <button
                  key={id ?? name}
                  type="button"
                  style={{ ...styles.chip, ...(selected ? styles.chipSelected : {}) }}
                  onClick={() => {
                    setTouched(true);
                    setCategory(cat);
                  }}
                >
                  {name}
                </button>
              );
            })}
          </div>
          {!categoryId && touched ? (
            <p style={styles.errorText}>
              {t("customer.emergency.errCategory", "Please choose a service category.")}
            </p>
          ) : null}
        </div>
      ) : categoryId ? null : (
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            {t("customer.emergency.chooseCategory", "Choose an emergency service")}
          </h2>
          <p style={styles.emptyMessage}>
            {t(
              "customer.emergency.noCategories",
              "Service categories are not available yet. Please choose a category first."
            )}
          </p>
        </div>
      )}

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>{t("customer.emergency.locationTitle", "Your location")}</h2>
        <label style={styles.label} htmlFor="emergency-location">
          {t("customer.emergency.location", "Location / address")}
        </label>
        <input
          id="emergency-location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder={t("customer.emergency.locationPlaceholder", "Current address or nearby landmark")}
          style={styles.control}
        />
        {!location.trim() && touched ? (
          <p style={styles.errorText}>
            {t("customer.emergency.errLocation", "Please enter your location.")}
          </p>
        ) : null}
      </div>

      <button
        type="button"
        style={{ ...styles.emergencyBtn, ...(canSubmit ? {} : styles.emergencyBtnDisabled) }}
        disabled={!canSubmit}
        onClick={handleRequest}
      >
        {t("customer.emergency.request", "Request Emergency Service")}
      </button>

      {typeof onEmergencyRequest !== "function" ? (
        <p style={{ ...styles.errorText, textAlign: "center" }}>
          {t(
            "customer.emergency.notConnected",
            "Emergency routing is not connected yet. The team integrating emergency routing needs to provide onEmergencyRequest."
          )}
        </p>
      ) : null}
    </>
  );

  const renderSearching = () => (
    <div style={{ ...styles.card, ...styles.searching }}>
      <span style={styles.searchingIcon} role="img" aria-hidden="true">
        {SEARCHING_ICON}
      </span>
      <p style={styles.searchingTitle}>
        {t("customer.emergency.searching", "Finding a worker")}
        {dots}
      </p>
      <p style={styles.searchingHint}>
        {t(
          "customer.emergency.searchingHint",
          "We are searching nearby and widening the search if needed."
        )}
      </p>
    </div>
  );

  const renderFound = () => {
    const workerName =
      matchedWorker?.name || matchedWorker?.fullName || t("customer.emergency.anonymous", "Worker");
    const rating = getRating(matchedWorker);
    const distance = getDistance(matchedWorker);
    const reliability = getReliability(matchedWorker);
    const verification = getVerification(matchedWorker);
    return (
      <div style={{ ...styles.card, ...styles.resultCard }}>
        <span style={styles.resultIcon} role="img" aria-hidden="true">
          {FOUND_ICON}
        </span>
        <p style={styles.resultName}>{workerName}</p>
        {categoryName ? <p style={styles.resultSkill}>{categoryName}</p> : null}
        <div style={styles.resultMeta}>
          {rating !== undefined ? (
            <span style={styles.metaItem}>
              <span style={styles.metaLabel}>{t("customer.emergency.rating", "Rating")}: </span>
              {formatRating(rating)} {STAR}
            </span>
          ) : null}
          {distance !== undefined ? (
            <span style={styles.metaItem}>
              <span style={styles.metaLabel}>{t("customer.emergency.distance", "Distance")}: </span>
              {distance} {t("customer.emergency.km", "km")}
            </span>
          ) : null}
          {reliability !== undefined ? (
            <span style={styles.metaItem}>
              <span style={styles.metaLabel}>{t("customer.emergency.reliability", "Reliability")}: </span>
              {reliability}
            </span>
          ) : null}
          {verification !== undefined ? (
            <span style={styles.metaItem}>
              {t("customer.emergency.verified", "Verified")} {verificationLabel(verification)}
            </span>
          ) : null}
        </div>
        <button type="button" style={styles.continueBtn} onClick={handleContinue}>
          {t("customer.emergency.continue", "Continue to Booking")}
        </button>
      </div>
    );
  };

  const renderNoWorker = () => (
    <div style={{ ...styles.card, ...styles.resultCard }}>
      <span style={styles.emptyIcon} role="img" aria-hidden="true">
        {NO_WORKER_ICON}
      </span>
      <p style={styles.emptyTitle}>{t("customer.emergency.noWorker", "No worker found")}</p>
      <p style={styles.emptyMessage}>
        {t(
          "customer.emergency.noWorkerHint",
          "No worker is available nearby right now. You can retry or make a normal booking."
        )}
      </p>
      <button type="button" style={styles.secondaryBtn} onClick={handleRetry}>
        {t("customer.emergency.retry", "Try again")}
      </button>
    </div>
  );

  const renderError = () => (
    <div style={{ ...styles.card, ...styles.resultCard }}>
      <span style={styles.emptyIcon} role="img" aria-hidden="true">
        {ERROR_ICON}
      </span>
      <p style={styles.emptyTitle}>{t("customer.emergency.error", "Something went wrong")}</p>
      <p style={styles.emptyMessage}>
        {t(
          "customer.emergency.errorHint",
          "We could not complete the emergency request. Please try again."
        )}
      </p>
      <button type="button" style={styles.secondaryBtn} onClick={handleRetry}>
        {t("customer.emergency.retry", "Try again")}
      </button>
    </div>
  );

  let body;
  if (state === "searching") body = renderSearching();
  else if (state === "found") body = renderFound();
  else if (state === "noWorker") body = renderNoWorker();
  else if (state === "error") body = renderError();
  else body = renderIdle();

  return (
    <section style={styles.wrapper}>
      <div style={styles.content}>
        <header>
          {typeof onBack === "function" ? (
            <button type="button" style={styles.backBtn} onClick={onBack}>
              {"\u2190"} {t("customer.emergency.back", "Back")}
            </button>
          ) : null}
        </header>
        {body}
      </div>
    </section>
  );
}

EmergencyBooking.displayName = "EmergencyBooking";