import React from "react";

const styles = {
  wrapper: {
    minHeight: "100vh",
    padding: "clamp(20px, 5vw, 56px) 0 12px",
    boxSizing: "border-box",
  },
  header: {
    maxWidth: "920px",
    margin: "0 auto 28px",
  },
  heading: {
    margin: "0 0 8px",
    fontSize: "clamp(32px, 5vw, 52px)",
    lineHeight: 1,
    letterSpacing: "-0.03em",
    fontWeight: 800,
    color: "#18302b",
  },
  subtitle: {
    margin: 0,
    fontSize: "17px",
    color: "#64756e",
  },
  categoryTag: {
    display: "inline-block",
    marginTop: "10px",
    padding: "6px 14px",
    fontSize: "14px",
    fontWeight: 600,
    color: "#126b63",
    background: "#e7f0e8",
    borderRadius: "7px",
  },
  list: {
    maxWidth: "920px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  card: {
    display: "flex",
    gap: "18px",
    padding: "18px",
    background: "rgba(255, 253, 248, 0.88)",
    border: "1px solid #dfe5dc",
    borderRadius: "10px",
    boxShadow: "0 8px 20px rgba(24, 48, 43, 0.05)",
  },
  avatar: {
    flexShrink: 0,
    width: "52px",
    height: "52px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    background: "#126b63",
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
    color: "#18302b",
  },
  scoreChip: {
    fontSize: "13px",
    fontWeight: 700,
    color: "#126b63",
    background: "#e7f0e8",
    padding: "4px 10px",
    borderRadius: "7px",
  },
  skill: {
    margin: "4px 0 0",
    fontSize: "14px",
    color: "#64756e",
  },
  meta: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "12px",
  },
  metaItem: {
    fontSize: "13px",
    color: "#38534c",
    background: "#eef3ed",
    padding: "4px 10px",
    borderRadius: "8px",
  },
  metaLabel: {
    color: "#7b8b82",
  },
  availabilityBadge: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: 600,
  },
  availabilityAvailable: {
    color: "#267447",
    background: "#e5f3e6",
  },
  availabilityBusy: {
    color: "#a8542c",
    background: "#faeee2",
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
    background: "#126b63",
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
    color: "#126b63",
    background: "transparent",
    border: "1px solid #126b63",
    borderRadius: "10px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  empty: {
    maxWidth: "920px",
    margin: "24px auto 0",
    padding: "40px 20px",
    textAlign: "center",
    border: "1px dashed #c6d2e2",
    borderRadius: "10px",
    background: "rgba(255, 253, 248, 0.8)",
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
    color: "#18302b",
  },
  emptyMessage: {
    margin: 0,
    fontSize: "14px",
    color: "#64756e",
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