import React from "react";

const styles = {
  wrapper: {
    minHeight: "100vh",
    padding: "32px 20px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    background: "linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)",
    boxSizing: "border-box",
  },
  header: {
    maxWidth: "780px",
    margin: "0 auto 24px",
  },
  heading: {
    margin: "0 0 8px",
    fontSize: "28px",
    fontWeight: 700,
    color: "#17263b",
  },
  subtitle: {
    margin: 0,
    fontSize: "16px",
    color: "#5b6b82",
  },
  categoryTag: {
    display: "inline-block",
    marginTop: "10px",
    padding: "6px 14px",
    fontSize: "14px",
    fontWeight: 600,
    color: "#0b6bcb",
    background: "#e3f0fc",
    borderRadius: "999px",
  },
  list: {
    maxWidth: "780px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  card: {
    display: "flex",
    gap: "16px",
    padding: "20px",
    background: "#ffffff",
    border: "1px solid #e0e8f2",
    borderRadius: "14px",
    boxShadow: "0 2px 8px rgba(23, 38, 59, 0.06)",
  },
  avatar: {
    flexShrink: 0,
    width: "52px",
    height: "52px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    background: "#0b6bcb",
    color: "#ffffff",
    fontSize: "22px",
    fontWeight: 700,
  },
  body: {
    flex: 1,
    minWidth: 0,
  },
  nameRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
  },
  name: {
    margin: 0,
    fontSize: "18px",
    fontWeight: 700,
    color: "#17263b",
  },
  scoreChip: {
    fontSize: "13px",
    fontWeight: 700,
    color: "#0b6bcb",
    background: "#e3f0fc",
    padding: "4px 10px",
    borderRadius: "999px",
  },
  skill: {
    margin: "4px 0 0",
    fontSize: "14px",
    color: "#5b6b82",
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
  availabilityBadge: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: 600,
  },
  availabilityAvailable: {
    color: "#1a7f3d",
    background: "#e3f8e9",
  },
  availabilityBusy: {
    color: "#b54708",
    background: "#fdf0e2",
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    justifyContent: "center",
    flexShrink: 0,
  },
  primaryBtn: {
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: 600,
    color: "#ffffff",
    background: "#0b6bcb",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  primaryBtnDisabled: {
    background: "#b9c6d6",
    cursor: "not-allowed",
  },
  outlineBtn: {
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: 600,
    color: "#0b6bcb",
    background: "#ffffff",
    border: "1px solid #0b6bcb",
    borderRadius: "10px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  empty: {
    maxWidth: "780px",
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

const EMPTY_ICONS = {
  noCategory: "\uD83D\uDD12",
  noWorkers: "\uD83D\uDD0E",
  noAvailable: "\uD83E\uDDD1\u200D\uD83D\uDD27",
};

const STAR = "\u2605";
const DASH = "\u2014";

function getWorker(item) {
  return item && typeof item === "object" ? item.worker || item : item;
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
const getExperience = pick("experienceYears", "yearsOfExperience", "experience");
const getDistance = pick("distanceKm", "distance");
const getAvailability = pick("available", "isAvailable");
const getVerification = pick("verificationLevel", "verification");
const getReliability = pick("reliabilityScore");
const getWorkload = pick("jobsAssignedCount", "jobsToday", "activeJobs");
const getSkill = pick("skillCategory", "skill", "primarySkill");

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
  const n = normalized.startsWith("L") ? normalized : `L${normalized}`;
  return n;
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

export default function WorkerSearch({
  category,
  rankedWorkers = [],
  onViewProfile,
  onBookNow,
  language = "en",
  t = (key, fallback) => fallback,
}) {
  const heading = t("customer.workerSearch.heading", "Available Workers");
  const categoryName = localizedName(category, language);
  const subtitle = categoryName
    ? t("customer.workerSearch.subtitle", "Workers ranked by fair allocation for")
    : t("customer.workerSearch.subtitleNoCategory", "Search for workers in your chosen service.");

  const emptyNoCategory = t(
    "customer.workerSearch.noCategory",
    "Select a service category to see workers."
  );
  const emptyNoCategoryHint = t(
    "customer.workerSearch.noCategoryHint",
    "Go back and choose a service to get started."
  );
  const emptyNoWorkers = t(
    "customer.workerSearch.noWorkers",
    "No workers found"
  );
  const emptyNoWorkersHint = t(
    "customer.workerSearch.noWorkersHint",
    "No workers were matched for this service. Try again later."
  );
  const emptyNoAvailable = t(
    "customer.workerSearch.noAvailable",
    "No workers available right now"
  );
  const emptyNoAvailableHint = t(
    "customer.workerSearch.noAvailableHint",
    "All matched workers are currently busy. Please check back shortly."
  );

  const anyAvailable =
    rankedWorkers.length > 0 && rankedWorkers.some((item) => isAvailable(getWorker(item)));
  const allExplicitlyUnavailable =
    rankedWorkers.length > 0 &&
    rankedWorkers.every(
      (item) => getAvailability(getWorker(item)) !== undefined && !isAvailable(getWorker(item))
    );

  let emptyState = null;
  let showList = true;

  if (!category) {
    emptyState = { icon: EMPTY_ICONS.noCategory, title: emptyNoCategory, message: emptyNoCategoryHint };
    showList = false;
  } else if (rankedWorkers.length === 0) {
    emptyState = { icon: EMPTY_ICONS.noWorkers, title: emptyNoWorkers, message: emptyNoWorkersHint };
    showList = false;
  } else if (allExplicitlyUnavailable && !anyAvailable) {
    emptyState = { icon: EMPTY_ICONS.noAvailable, title: emptyNoAvailable, message: emptyNoAvailableHint };
    showList = false;
  }

  return (
    <section style={styles.wrapper}>
      <header style={styles.header}>
        <h1 style={styles.heading}>{heading}</h1>
        <p style={styles.subtitle}>
          {subtitle}
          {categoryName ? ` ${categoryName}` : ""}
        </p>
        {categoryName ? <span style={styles.categoryTag}>{categoryName}</span> : null}
      </header>

      {!showList ? (
        <div style={styles.empty}>
          <span style={styles.emptyIcon} role="img" aria-hidden="true">
            {emptyState.icon}
          </span>
          <p style={styles.emptyTitle}>{emptyState.title}</p>
          <p style={styles.emptyMessage}>{emptyState.message}</p>
        </div>
      ) : (
        <div style={styles.list}>
          {rankedWorkers.map((item, index) => {
            const worker = getWorker(item);
            const name = worker?.name || worker?.fullName || t("customer.workerSearch.anonymous", "Worker");
            const rating = getRating(worker);
            const experience = getExperience(worker);
            const distance = getDistance(worker);
            const verification = getVerification(worker);
            const reliability = getReliability(worker);
            const workload = getWorkload(worker);
            const skill = skillLabel(worker, category, language);
            const available = isAvailable(worker);
            const score =
              item && typeof item === "object" && "fairAllocationScore" in item
                ? item.fairAllocationScore
                : undefined;
            const scoreLabel = score !== undefined ? Number(score).toFixed(2) : index + 1;
            const initials = name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

            const bookDisabled = !available || typeof onBookNow !== "function";

            return (
              <div key={worker?.id ?? worker?.workerId ?? `${name}-${index}`} style={styles.card}>
                <div style={styles.avatar}>{initials}</div>

                <div style={styles.body}>
                  <div style={styles.nameRow}>
                    <h2 style={styles.name}>{name}</h2>
                    {score !== undefined ? (
                      <span style={styles.scoreChip}>
                        {t("customer.workerSearch.score", "Match")} {scoreLabel}
                      </span>
                    ) : (
                      <span style={styles.scoreChip}>
                        #{scoreLabel} {t("customer.workerSearch.rank", "rank")}
                      </span>
                    )}
                  </div>

                  {skill ? <p style={styles.skill}>{skill}</p> : null}

                  <div style={styles.meta}>
                    {rating !== undefined ? (
                      <span style={styles.metaItem}>
                        <span style={styles.metaLabel}>{t("customer.workerSearch.rating", "Rating")}: </span>
                        {formatRating(rating)} {STAR}
                      </span>
                    ) : (
                      <span style={styles.metaItem}>
                        {t("customer.workerSearch.rating", "Rating")}: {DASH}
                      </span>
                    )}
                    {experience !== undefined ? (
                      <span style={styles.metaItem}>
                        <span style={styles.metaLabel}>{t("customer.workerSearch.experience", "Exp")}: </span>
                        {fmt(experience)}{" "}
                        {t("customer.workerSearch.years", "yrs")}
                      </span>
                    ) : null}
                    {distance !== undefined ? (
                      <span style={styles.metaItem}>
                        <span style={styles.metaLabel}>{t("customer.workerSearch.distance", "Distance")}: </span>
                        {fmt(distance)} {t("customer.workerSearch.km", "km")}
                      </span>
                    ) : null}
                    {verification !== undefined ? (
                      <span style={styles.metaItem}>
                        <span style={styles.metaLabel}>{t("customer.workerSearch.verified", "Verified")}: </span>
                        {verificationLabel(verification)}
                      </span>
                    ) : (
                      <span style={styles.metaItem}>{t("customer.workerSearch.notVerified", "Not verified")}</span>
                    )}
                    {reliability !== undefined ? (
                      <span style={styles.metaItem}>
                        <span style={styles.metaLabel}>{t("customer.workerSearch.reliability", "Reliability")}: </span>
                        {fmt(reliability)}
                      </span>
                    ) : null}
                    {workload !== undefined ? (
                      <span style={styles.metaItem}>
                        <span style={styles.metaLabel}>{t("customer.workerSearch.workload", "Jobs today")}: </span>
                        {fmt(workload)}
                      </span>
                    ) : null}
                  </div>

                  <div style={{ marginTop: "10px" }}>
                    <span
                      style={{
                        ...styles.availabilityBadge,
                        ...(available ? styles.availabilityAvailable : styles.availabilityBusy),
                      }}
                    >
                      {available
                        ? t("customer.workerSearch.available", "Available now")
                        : t("customer.workerSearch.busy", "Currently busy")}
                    </span>
                  </div>
                </div>

                <div style={styles.actions}>
                  <button
                    type="button"
                    style={styles.outlineBtn}
                    onClick={() => onViewProfile && onViewProfile(worker)}
                  >
                    {t("customer.workerSearch.viewProfile", "View Profile")}
                  </button>
                  <button
                    type="button"
                    style={{ ...styles.primaryBtn, ...(bookDisabled ? styles.primaryBtnDisabled : {}) }}
                    disabled={bookDisabled}
                    onClick={() => onBookNow && onBookNow(worker)}
                  >
                    {t("customer.workerSearch.bookNow", "Book Now")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

WorkerSearch.displayName = "WorkerSearch";