import React from "react";

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
  profileCard: {
    background: "#ffffff",
    border: "1px solid #e0e8f2",
    borderRadius: "16px",
    boxShadow: "0 2px 8px rgba(23, 38, 59, 0.06)",
    padding: "28px 24px",
    textAlign: "center",
  },
  avatar: {
    width: "84px",
    height: "84px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 14px",
    borderRadius: "50%",
    background: "#0b6bcb",
    color: "#ffffff",
    fontSize: "34px",
    fontWeight: 700,
  },
  name: {
    margin: "0 0 6px",
    fontSize: "24px",
    fontWeight: 700,
    color: "#17263b",
  },
  skill: {
    margin: "0 0 12px",
    fontSize: "15px",
    color: "#5b6b82",
  },
  chips: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "8px",
  },
  chip: {
    display: "inline-block",
    padding: "6px 12px",
    fontSize: "13px",
    fontWeight: 600,
    borderRadius: "999px",
  },
  availabilityAvailable: {
    color: "#1a7f3d",
    background: "#e3f8e9",
  },
  availabilityBusy: {
    color: "#b54708",
    background: "#fdf0e2",
  },
  verifiedChip: {
    color: "#0b6bcb",
    background: "#e3f0fc",
  },
  unverifiedChip: {
    color: "#8191a6",
    background: "#eef2f7",
  },
  section: {
    background: "#ffffff",
    border: "1px solid #e0e8f2",
    borderRadius: "16px",
    boxShadow: "0 2px 8px rgba(23, 38, 59, 0.06)",
    padding: "20px 24px",
  },
  sectionTitle: {
    margin: "0 0 14px",
    fontSize: "15px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    color: "#8191a6",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "12px",
  },
  stat: {
    background: "#f7fafd",
    border: "1px solid #e8eef6",
    borderRadius: "12px",
    padding: "12px 14px",
  },
  statValue: {
    margin: 0,
    fontSize: "18px",
    fontWeight: 700,
    color: "#17263b",
  },
  statLabel: {
    margin: "4px 0 0",
    fontSize: "12px",
    color: "#8191a6",
  },
  aboutText: {
    margin: 0,
    fontSize: "15px",
    lineHeight: 1.6,
    color: "#2a3b52",
  },
  bookActions: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  bookBtn: {
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
  bookBtnDisabled: {
    background: "#b9c6d6",
    cursor: "not-allowed",
  },
  busyNote: {
    margin: 0,
    fontSize: "13px",
    textAlign: "center",
    color: "#b54708",
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
const DASH = "\u2014";
const EMPTY_ICON = "\uD83D\uDC64";

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
const getExperience = pick("experienceYears", "yearsOfExperience", "experience");
const getDistance = pick("distanceKm", "distance");
const getAvailability = pick("available", "isAvailable");
const getVerification = pick("verificationLevel", "verification");
const getReliability = pick("reliabilityScore");
const getWorkload = pick("jobsAssignedCount", "jobsToday", "activeJobs");
const getSkill = pick("skillCategory", "skill", "primarySkill");
const getLocation = pick("city", "area", "locality", "location");
const getPhone = pick("phone", "mobile", "contactNumber", "phoneNumber");
const getAbout = pick("bio", "about", "description", "profileSummary");
const getLanguages = pick("languages", "knownLanguages", "languagesSpoken");

function localizedName(category, language) {
  if (!category) return undefined;
  if (category.nameI18n && typeof category.nameI18n === "object") {
    return category.nameI18n[language] || category.nameI18n.en || category.name || undefined;
  }
  return category.name || undefined;
}

function skillLabel(worker, category, language) {
  const skillField = getSkill(worker);
  const fromField =
    typeof skillField === "string"
      ? skillField
      : localizedName(skillField, language) || skillField?.name;
  return fromField || localizedName(category, language) || undefined;
}

function verificationLabel(level) {
  if (level === undefined || level === null || level === "") return undefined;
  const normalized = String(level).toUpperCase();
  return normalized.startsWith("L") ? normalized : `L${normalized}`;
}

function isAvailable(worker) {
  const value = getAvailability(worker);
  if (typeof value === "string") {
    const lower = value.toLowerCase();
    return !(lower === "busy" || lower === "false" || lower === "no" || lower === "unavailable");
  }
  return value !== false;
}

function formatRating(value) {
  if (value === undefined) return undefined;
  const num = Number(value);
  if (Number.isNaN(num)) return value;
  return num.toFixed(1);
}

function fmt(value) {
  if (value === undefined || value === null || value === "" || Number.isNaN(value)) return DASH;
  return value;
}

function initialsOf(name) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function Stat({ value, label }) {
  return (
    <div style={styles.stat}>
      <p style={styles.statValue}>{value}</p>
      <p style={styles.statLabel}>{label}</p>
    </div>
  );
}

export default function WorkerProfile({
  worker,
  category,
  onBookNow,
  onBack,
  language = "en",
  t = (key, fallback) => fallback,
}) {
  const notFoundTitle = t("customer.workerProfile.notFound", "Worker not found");
  const notFoundMessage = t(
    "customer.workerProfile.notFoundHint",
    "No worker was selected. Please choose a worker from the search results."
  );

  if (!worker) {
    return (
      <section style={styles.wrapper}>
        <div style={styles.empty}>
          <span style={styles.emptyIcon} role="img" aria-hidden="true">
            {EMPTY_ICON}
          </span>
          <p style={styles.emptyTitle}>{notFoundTitle}</p>
          <p style={styles.emptyMessage}>{notFoundMessage}</p>
        </div>
      </section>
    );
  }

  const name = worker.name || worker.fullName || t("customer.workerProfile.anonymous", "Worker");
  const rating = getRating(worker);
  const experience = getExperience(worker);
  const distance = getDistance(worker);
  const verification = getVerification(worker);
  const reliability = getReliability(worker);
  const workload = getWorkload(worker);
  const skill = skillLabel(worker, category, language);
  const available = isAvailable(worker);
  const location = getLocation(worker);
  const phone = getPhone(worker);
  const about = getAbout(worker);
  const languages = getLanguages(worker);
  const initial = initialsOf(name);

  const bookDisabled = !available || typeof onBookNow !== "function";

  return (
    <section style={styles.wrapper}>
      <div style={styles.content}>
        <header>
          {typeof onBack === "function" ? (
            <button type="button" style={styles.backBtn} onClick={onBack}>
              {"\u2190"} {t("customer.workerProfile.back", "Back to results")}
            </button>
          ) : null}
        </header>

        <div style={styles.profileCard}>
          <div style={styles.avatar}>{initial}</div>
          <h1 style={styles.name}>{name}</h1>
          {skill ? <p style={styles.skill}>{skill}</p> : null}

          <div style={styles.chips}>
            <span
              style={{
                ...styles.chip,
                ...(available ? styles.availabilityAvailable : styles.availabilityBusy),
              }}
            >
              {available
                ? t("customer.workerProfile.available", "Available now")
                : t("customer.workerProfile.busy", "Currently busy")}
            </span>
            {verification !== undefined ? (
              <span style={{ ...styles.chip, ...styles.verifiedChip }}>
                {t("customer.workerProfile.verified", "Verified")} {verificationLabel(verification)}
              </span>
            ) : (
              <span style={{ ...styles.chip, ...styles.unverifiedChip }}>
                {t("customer.workerProfile.notVerified", "Not verified")}
              </span>
            )}
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            {t("customer.workerProfile.keyDetails", "Key details")}
          </h2>
          <div style={styles.grid}>
            <Stat
              value={rating !== undefined ? `${formatRating(rating)} ${STAR}` : DASH}
              label={t("customer.workerProfile.rating", "Rating")}
            />
            <Stat
              value={experience !== undefined ? `${fmt(experience)} ${t("customer.workerProfile.years", "yrs")}` : DASH}
              label={t("customer.workerProfile.experience", "Experience")}
            />
            <Stat
              value={distance !== undefined ? `${fmt(distance)} ${t("customer.workerProfile.km", "km")}` : DASH}
              label={t("customer.workerProfile.distance", "Distance")}
            />
            <Stat
              value={reliability !== undefined ? fmt(reliability) : DASH}
              label={t("customer.workerProfile.reliability", "Reliability")}
            />
            <Stat
              value={workload !== undefined ? fmt(workload) : DASH}
              label={t("customer.workerProfile.workload", "Jobs today")}
            />
            {location !== undefined ? (
              <Stat value={fmt(location)} label={t("customer.workerProfile.location", "Location")} />
            ) : null}
            {phone !== undefined ? (
              <Stat value={fmt(phone)} label={t("customer.workerProfile.contact", "Contact")} />
            ) : null}
            {languages !== undefined ? (
              <Stat
                value={
                  Array.isArray(languages) ? languages.join(", ") : fmt(languages)
                }
                label={t("customer.workerProfile.languages", "Languages")}
              />
            ) : null}
          </div>
        </div>

        {about ? (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>{t("customer.workerProfile.about", "About")}</h2>
            <p style={styles.aboutText}>{about}</p>
          </div>
        ) : null}

        <div style={styles.bookActions}>
          <button
            type="button"
            style={{ ...styles.bookBtn, ...(bookDisabled ? styles.bookBtnDisabled : {}) }}
            disabled={bookDisabled}
            onClick={() => onBookNow && onBookNow(worker, category)}
          >
            {t("customer.workerProfile.bookNow", "Book Now")}
          </button>
          {!available ? (
            <p style={styles.busyNote}>
              {t("customer.workerProfile.busyNote", "This worker is currently busy.")}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

WorkerProfile.displayName = "WorkerProfile";