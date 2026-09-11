import React from "react";

const CATEGORY_ICONS = {
  plumbing: "🔧",
  electrical: "⚡",
  cleaning: "🧹",
  carpentry: "🔨",
  gardening: "🌱",
};

const CATEGORY_SUBTITLES = {
  plumbing: {
    en: "Taps, pipes & leaks",
    hi: "नल और पाइप मरम्मत",
    pa: "ਨਲਕੇ ਅਤੇ ਪਾਈਪ",
  },
  electrical: {
    en: "Wiring, switch & repair",
    hi: "तार और उपकरण",
    pa: "ਤਾਰਾਂ ਅਤੇ ਮੁਰੰਮਤ",
  },
  cleaning: {
    en: "Deep home & office",
    hi: "घर और दफ्तर सफाई",
    pa: "ਘਰ ਅਤੇ ਦਫਤਰ ਸਫ਼ਾਈ",
  },
  carpentry: {
    en: "Furniture & woodwork",
    hi: "फर्नीचर और लकड़ी",
    pa: "ਫਰਨੀਚਰ ਅਤੇ ਲੱਕੜ",
  },
  gardening: {
    en: "Pruning & lawn care",
    hi: "पौधों व बाग की देखभाल",
    pa: "ਬਾਗਵਾਨੀ ਅਤੇ ਦੇਖਭਾਲ",
  },
};

const FALLBACK_ICON = "🛠️";
const EMPTY_STATE_ICON = "📋";

const styles = {
  wrapper: {
    padding: "16px 14px 28px",
    boxSizing: "border-box",
    width: "100%",
  },
  header: {
    marginBottom: "20px",
    textAlign: "left",
  },
  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "8px",
    color: "#15803D",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  eyebrowDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#15803D",
  },
  heading: {
    margin: "0 0 4px",
    fontSize: "22px",
    lineHeight: 1.2,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: "-0.5px",
  },
  hint: {
    margin: 0,
    fontSize: "13px",
    color: "#64748B",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)", // 2-Column strict layout
    gap: "12px",
    width: "100%",
    boxSizing: "border-box",
  },
  card: {
    minHeight: "132px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: "14px",
    border: "1px solid #E2E8F0",
    borderRadius: "14px",
    background: "#FFFFFF",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.04)",
    cursor: "pointer",
    fontFamily: "inherit",
    textAlign: "left",
    transition: "all 0.15s ease",
    boxSizing: "border-box",
  },
  cardHover: {
    border: "1px solid #16A34A",
    boxShadow: "0 6px 14px rgba(22, 163, 74, 0.12)",
    transform: "translateY(-2px)",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "42px",
    height: "42px",
    borderRadius: "10px",
    backgroundColor: "#DCFCE7", // Green icon container matching d1.png
    color: "#15803D",
    fontSize: "22px",
    lineHeight: 1,
    marginBottom: "12px",
  },
  cardContent: {
    width: "100%",
  },
  cardTitle: {
    fontSize: "15px",
    fontWeight: "800",
    color: "#0F172A",
    lineHeight: 1.2,
    margin: "0 0 3px",
  },
  cardSubtitle: {
    fontSize: "11px",
    color: "#64748B",
    margin: 0,
    lineHeight: 1.3,
  },
  actions: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  emergencyBtn: {
    width: "100%",
    padding: "14px 16px",
    fontSize: "14px",
    fontWeight: "800",
    color: "#FFFFFF",
    backgroundColor: "#DC2626",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(220, 38, 38, 0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  historyBtn: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "14px",
    fontWeight: "700",
    color: "#15803D",
    backgroundColor: "#F0FDF4",
    border: "1.5px solid #BBF7D0",
    borderRadius: "10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  empty: {
    padding: "36px 16px",
    textAlign: "center",
    border: "1px dashed #CBD5E1",
    borderRadius: "14px",
    background: "#FFFFFF",
  },
  emptyIcon: {
    fontSize: "36px",
    display: "block",
    marginBottom: "10px",
  },
  emptyTitle: {
    margin: "0 0 6px",
    fontSize: "16px",
    fontWeight: 700,
    color: "#0F172A",
  },
  emptyMessage: {
    margin: 0,
    fontSize: "13px",
    color: "#64748B",
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

function getLocalizedSubtitle(categoryKey, language) {
  const key = String(categoryKey || "").toLowerCase();
  const sub = CATEGORY_SUBTITLES[key];
  if (sub) {
    return sub[language] || sub.en || "";
  }
  return "Verified local cooperative service";
}

function getIcon(category) {
  const raw = category.key || category.id || category.name || "";
  const key = String(raw).trim().toLowerCase();
  return CATEGORY_ICONS[key] || FALLBACK_ICON;
}

export default function CustomerHome({
  categories = [],
  language = "en",
  onSelectCategory,
  onEmergency,
  onGoToHistory,
  t = (key, fallback) => fallback,
}) {
  const heading = t("customer.home.chooseService", "Cooperative Services");
  const hint = t(
    "customer.home.selectCategory",
    "Fair allocation & verified skilled labour."
  );

  return (
    <section style={styles.wrapper}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.eyebrow}>
          <span style={styles.eyebrowDot} aria-hidden="true" />
          <span>सहयोग सेवा · Labour Mobility</span>
        </div>
        <h2 style={styles.heading}>{heading}</h2>
        <p style={styles.hint}>{hint}</p>
      </header>

      {/* 2-Column Category Grid matching d1.png */}
      {categories.length === 0 ? (
        <div style={styles.empty}>
          <span style={styles.emptyIcon} role="img" aria-hidden="true">
            {EMPTY_STATE_ICON}
          </span>
          <p style={styles.emptyTitle}>No services available</p>
          <p style={styles.emptyMessage}>Services are being updated. Please check back shortly.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {categories.map((category) => {
            const name = getLocalizedName(category, language);
            const key = category.id ?? category.key ?? category.name;
            const subtitle = getLocalizedSubtitle(key, language);
            const onClick = () => onSelectCategory && onSelectCategory(category);

            return (
              <button
                key={key}
                type="button"
                onClick={onClick}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border = styles.cardHover.border;
                  e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
                  e.currentTarget.style.transform = styles.cardHover.transform;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border = styles.card.border;
                  e.currentTarget.style.boxShadow = styles.card.boxShadow;
                  e.currentTarget.style.transform = "";
                }}
                style={styles.card}
                aria-label={`${name} — ${subtitle}`}
              >
                {/* Green icon container #DCFCE7 */}
                <div style={styles.iconContainer} role="img" aria-hidden="true">
                  {getIcon(category)}
                </div>
                <div style={styles.cardContent}>
                  <div style={styles.cardTitle}>{name}</div>
                  <p style={styles.cardSubtitle}>{subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Quick Action Triggers */}
      <div style={styles.actions}>
        {typeof onEmergency === "function" && (
          <button type="button" style={styles.emergencyBtn} onClick={onEmergency}>
            <span>🚨</span>
            <span>{t("customer.home.emergency", "SOS Emergency Request")}</span>
          </button>
        )}

        {typeof onGoToHistory === "function" && (
          <button type="button" style={styles.historyBtn} onClick={onGoToHistory}>
            <span>📋</span>
            <span>{t("customer.home.history", "My Service Bookings")}</span>
          </button>
        )}
      </div>
    </section>
  );
}

CustomerHome.displayName = "CustomerHome";