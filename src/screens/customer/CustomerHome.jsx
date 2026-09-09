import React from "react";

const CATEGORY_ICONS = {
  plumbing: "\uD83D\uDD27",
  electrical: "\u26A1",
  cleaning: "\uD83E\uDDF9",
  carpentry: "\uD83D\uDD28",
  gardening: "\uD83C\uDF31",
};

const FALLBACK_ICON = "\uD83D\uDEE0\uFE0F";

const EMPTY_STATE_ICON = "\uD83D\uDD25";

const styles = {
  wrapper: {
    minHeight: "100vh",
    padding: "32px 20px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    background: "linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)",
    boxSizing: "border-box",
  },
  header: {
    maxWidth: "760px",
    margin: "0 auto 24px",
    textAlign: "center",
  },
  heading: {
    margin: "0 0 8px",
    fontSize: "28px",
    fontWeight: 700,
    color: "#17263b",
  },
  hint: {
    margin: 0,
    fontSize: "16px",
    color: "#5b6b82",
  },
  grid: {
    maxWidth: "760px",
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    justifyContent: "center",
  },
  card: {
    flex: "1 1 200px",
    minWidth: "180px",
    maxWidth: "220px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    padding: "28px 16px",
    border: "1px solid #e0e8f2",
    borderRadius: "16px",
    background: "#ffffff",
    boxShadow: "0 2px 8px rgba(23, 38, 59, 0.06)",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "transform 0.12s ease, box-shadow 0.12s ease, border-color 0.12s ease",
  },
  cardHover: {
    borderColor: "#0b6bcb",
    boxShadow: "0 6px 18px rgba(11, 107, 203, 0.18)",
    transform: "translateY(-2px)",
  },
  icon: {
    fontSize: "40px",
    lineHeight: 1,
  },
  cardName: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#17263b",
  },
  emergencyBtn: {
    display: "block",
    maxWidth: "760px",
    margin: "20px auto 0",
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
  historyBtn: {
    display: "block",
    maxWidth: "760px",
    margin: "12px auto 0",
    padding: "14px 20px",
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
    maxWidth: "760px",
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

function getLocalizedName(category, language) {
  if (!category) return "";
  const i18n = category.nameI18n;
  if (i18n && typeof i18n === "object") {
    return i18n[language] || i18n.en || category.name || "";
  }
  return category.name || "";
}

function getIcon(category) {
  const raw = category.key || category.id || category.name || "";
  const key = String(raw).trim().toLowerCase();
  return CATEGORY_ICONS[key] || FALLBACK_ICON;
}

const EMERGENCY_ICON = "\uD83D\uDEA8";
const HISTORY_ICON = "\uD83D\uDCDA";

export default function CustomerHome({
  categories = [],
  language = "en",
  onSelectCategory,
  onEmergency,
  onGoToHistory,
  t = (key, fallback) => fallback,
}) {
  const heading = t("customer.home.chooseService", "Choose a Service");
  const hint = t(
    "customer.home.selectCategory",
    "Select a service category to explore available workers."
  );
  const emptyTitle = t("customer.home.noCategories", "No services available");
  const emptyMessage = t(
    "customer.home.noCategoriesHint",
    "Services are being set up. Please check back shortly."
  );

  return (
    <section style={styles.wrapper}>
      <header style={styles.header}>
        <h1 style={styles.heading}>{heading}</h1>
        <p style={styles.hint}>{hint}</p>
      </header>

      {categories.length === 0 ? (
        <div style={styles.empty}>
          <span style={styles.emptyIcon} role="img" aria-hidden="true">
            {EMPTY_STATE_ICON}
          </span>
          <p style={styles.emptyTitle}>{emptyTitle}</p>
          <p style={styles.emptyMessage}>{emptyMessage}</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {categories.map((category) => {
            const name = getLocalizedName(category, language);
            const key = category.id ?? category.key ?? name;
            const onClick = () => onSelectCategory && onSelectCategory(category);
            return (
              <button
                key={key}
                type="button"
                onClick={onClick}
                onMouseDown={(e) => (e.currentTarget.style.borderColor = styles.cardHover.borderColor)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = styles.cardHover.borderColor;
                  e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
                  e.currentTarget.style.transform = styles.cardHover.transform;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = styles.card.borderColor;
                  e.currentTarget.style.boxShadow = styles.card.boxShadow;
                  e.currentTarget.style.transform = "";
                }}
                style={styles.card}
                aria-label={`${name} — ${hint}`}
              >
                <span style={styles.icon} role="img" aria-hidden="true">
                  {getIcon(category)}
                </span>
                <span style={styles.cardName}>{name}</span>
              </button>
            );
          })}
        </div>
      )}

      {typeof onEmergency === "function" ? (
        <button
          type="button"
          style={styles.emergencyBtn}
          onClick={onEmergency}
        >
          <span role="img" aria-hidden="true">{EMERGENCY_ICON}</span>{" "}
          {t("customer.home.emergency", "Emergency Service")}
        </button>
      ) : null}

      {typeof onGoToHistory === "function" ? (
        <button
          type="button"
          style={styles.historyBtn}
          onClick={onGoToHistory}
        >
          <span role="img" aria-hidden="true">{HISTORY_ICON}</span>{" "}
          {t("customer.home.history", "My Bookings")}
        </button>
      ) : null}
    </section>
  );
}

CustomerHome.displayName = "CustomerHome";