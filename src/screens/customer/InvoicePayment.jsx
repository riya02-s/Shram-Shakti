import React, { useState } from "react";

const PAID_STATES = ["paid", "success", "completed", "successful", "true"];

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
  invoice: {
    background: "#ffffff",
    border: "1px solid #e0e8f2",
    borderRadius: "16px",
    boxShadow: "0 2px 8px rgba(23, 38, 59, 0.06)",
    overflow: "hidden",
  },
  invoiceHead: {
    padding: "20px 24px",
    background: "#17263b",
    color: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "12px",
    flexWrap: "wrap",
  },
  invoiceBrand: {
    margin: 0,
    fontSize: "18px",
    fontWeight: 800,
  },
  invoiceSub: {
    margin: "4px 0 0",
    fontSize: "12px",
    color: "#b7c4d6",
  },
  invoiceId: {
    margin: 0,
    fontSize: "14px",
    fontWeight: 600,
    color: "#dbe5f0",
    textAlign: "right",
  },
  invoiceBody: {
    padding: "20px 24px",
  },
  statusRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "14px",
  },
  statusChip: {
    display: "inline-block",
    padding: "6px 12px",
    fontSize: "13px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    borderRadius: "999px",
  },
  pendingChip: {
    color: "#b54708",
    background: "#fdf0e2",
  },
  paidChip: {
    color: "#1a7f3d",
    background: "#e3f8e9",
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
  totalRow: {
    borderTop: "2px solid #e0e8f2",
    marginTop: "6px",
    paddingTop: "14px",
  },
  totalValue: {
    fontSize: "20px",
    fontWeight: 800,
    color: "#0b6bcb",
  },
  notice: {
    margin: 0,
    fontSize: "14px",
    color: "#5b6b82",
    background: "#f7fafd",
    border: "1px solid #e8eef6",
    borderRadius: "10px",
    padding: "12px 14px",
  },
  payBtn: {
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
  payBtnProcessing: {
    background: "#5b9bd8",
    cursor: "progress",
  },
  payBtnDisabled: {
    background: "#b9c6d6",
    cursor: "not-allowed",
  },
  mockNote: {
    margin: "6px 0 0",
    fontSize: "12px",
    textAlign: "center",
    color: "#8191a6",
  },
  successBox: {
    background: "#e3f8e9",
    border: "1px solid #b4e3c4",
    borderRadius: "12px",
    padding: "18px 20px",
    textAlign: "center",
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
  continueBtn: {
    width: "100%",
    marginTop: "12px",
    padding: "14px 20px",
    fontSize: "16px",
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

const DASH = "\u2014";
const EMPTY_ICON = "\uD83E\uDDFE";
const SUCCESS_ICON = "\u2705";
const RUPPEE = "\u20B9";
const DOT = "\u2022";

function pick(...keys) {
  return (obj) => {
    if (!obj) return undefined;
    for (const key of keys) {
      if (obj[key] !== undefined && obj[key] !== null && obj[key] !== "") return obj[key];
    }
    return undefined;
  };
}

const getInvoiceId = pick("id", "invoiceId", "invoiceNumber", "number");
const getBookingId = pick("bookingId", "booking_id", "booking");
const getLabour = pick("labourCharge", "labour", "serviceCharge", "labourCost");
const getMaterial = pick("materialCharge", "material", "additionalCharges", "partsCharge");
const getOther = pick("otherCharges", "other", "miscCharges", "misc", "extraCharges");
const getTotal = pick("totalAmount", "total", "amount", "grandTotal");
const getCurrency = pick("currency");

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

function fromInvoice(invoice, getter) {
  const direct = getter(invoice);
  if (direct !== undefined) return direct;
  const nested = pick("charges", "details", "lineItems")(invoice);
  return nested ? getter(nested) : undefined;
}

function money(value, currency) {
  if (value === undefined || value === null || value === "") return DASH;
  const num = Number(value);
  if (Number.isNaN(num)) return `${currency}${value}`;
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency || "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(num);
}

function normalizeStatus(value) {
  if (value === undefined || value === null || value === "") return undefined;
  return String(value).trim().toLowerCase();
}

function isPaidStatus(value) {
  const status = normalizeStatus(value);
  return status !== undefined && PAID_STATES.includes(status);
}

export default function InvoicePayment({
  booking,
  invoice,
  paymentStatus,
  onPay,
  onContinueToRating,
  onBack,
  language = "en",
  t = (key, fallback) => fallback,
}) {
  const [paymentResult, setPaymentResult] = useState("idle");

  const sharedStatus = normalizeStatus(paymentStatus ?? invoice?.paymentStatus ?? invoice?.status);
  const alreadyPaid = isPaidStatus(paymentStatus) || isPaidStatus(invoice?.paymentStatus);
  const hasInvoice = !!invoice;

  const invoiceId = invoice ? getInvoiceId(invoice) : undefined;
  const bookingId = getBookingId(invoice) || booking?.id || booking?.bookingId;
  const category = categoryLabel(booking, language);
  const workerName = booking?.worker?.name || booking?.workerName;
  const currency = invoice ? getCurrency(invoice) || RUPPEE : RUPPEE;

  const labour = hasInvoice ? fromInvoice(invoice, getLabour) : undefined;
  const material = hasInvoice ? fromInvoice(invoice, getMaterial) : undefined;
  const other = hasInvoice ? fromInvoice(invoice, getOther) : undefined;
  const total = hasInvoice ? fromInvoice(invoice, getTotal) : undefined;

  const pending =
    !alreadyPaid && (paymentResult === "idle" || paymentResult === "error");
  const processing = paymentResult === "processing";
  const succeeded = paymentResult === "success" || alreadyPaid;
  const failed = paymentResult === "error";

  const showCharges =
    hasInvoice && (labour !== undefined || material !== undefined || other !== undefined);

  const handlePay = async () => {
    if (!onPay || processing) return;
    setPaymentResult("processing");
    try {
      const result = onPay({ booking, invoice });
      if (result && typeof result.then === "function") {
        await result;
      }
      setPaymentResult("success");
    } catch (err) {
      setPaymentResult("error");
    }
  };

  const payLabel = processing
    ? t("customer.invoice.processing", "Processing...")
    : t("customer.invoice.payNow", "Pay Now");

  return (
    <section style={styles.wrapper}>
      <div style={styles.content}>
        <header>
          {typeof onBack === "function" ? (
            <button type="button" style={styles.backBtn} onClick={onBack}>
              {"\u2190"} {t("customer.invoice.back", "Back")}
            </button>
          ) : null}
        </header>

        <h1 style={styles.heading}>{t("customer.invoice.heading", "Invoice & Payment")}</h1>

        {!hasInvoice ? (
          <>
            <div style={styles.empty}>
              <span style={styles.emptyIcon} role="img" aria-hidden="true">
                {EMPTY_ICON}
              </span>
              <p style={styles.emptyTitle}>
                {t("customer.invoice.noInvoice", "Invoice not available")}
              </p>
              <p style={styles.emptyMessage}>
                {t(
                  "customer.invoice.noInvoiceHint",
                  "An invoice will appear here once the service is completed and confirmed."
                )}
              </p>
            </div>
            {typeof onContinueToRating === "function" ? (
              <button
                type="button"
                style={styles.continueBtn}
                onClick={() => onContinueToRating(booking, invoice)}
              >
                {t("customer.invoice.continue", "Continue to Rating")}
              </button>
            ) : null}
          </>
        ) : (
          <>
            <div style={styles.invoice}>
              <div style={styles.invoiceHead}>
                <div>
                  <p style={styles.invoiceBrand}>Sahyog Seva</p>
                  <p style={styles.invoiceSub}>
                    {t("customer.invoice.invoice", "Invoice")} {invoiceId ? `#${invoiceId}` : DASH}
                  </p>
                </div>
                {bookingId ? (
                  <p style={styles.invoiceId}>
                    {t("customer.invoice.bookingId", "Booking")} #{bookingId}
                  </p>
                ) : null}
              </div>

              <div style={styles.invoiceBody}>
                <div style={styles.statusRow}>
                  <span
                    style={{
                      ...styles.statusChip,
                      ...(succeeded ? styles.paidChip : styles.pendingChip),
                    }}
                  >
                    {succeeded
                      ? t("customer.invoice.paid", "Paid")
                      : sharedStatus
                      ? sharedStatus
                      : t("customer.invoice.pending", "Pending")}
                  </span>
                </div>

                <div style={styles.row}>
                  <span style={styles.rowKey}>{t("customer.invoice.category", "Service")}</span>
                  <span style={styles.rowVal}>{category || DASH}</span>
                </div>
                <div style={styles.row}>
                  <span style={styles.rowKey}>{t("customer.invoice.worker", "Worker")}</span>
                  <span style={styles.rowVal}>{workerName || DASH}</span>
                </div>

                {showCharges ? (
                  <>
                    <div style={styles.row}>
                      <span style={styles.rowKey}>
                        {t("customer.invoice.labour", "Labour / service charge")}
                      </span>
                      <span style={styles.rowVal}>{money(labour, currency)}</span>
                    </div>
                    {material !== undefined ? (
                      <div style={styles.row}>
                        <span style={styles.rowKey}>
                          {t("customer.invoice.material", "Material / additional charges")}
                        </span>
                        <span style={styles.rowVal}>{money(material, currency)}</span>
                      </div>
                    ) : null}
                    {other !== undefined ? (
                      <div style={styles.row}>
                        <span style={styles.rowKey}>{t("customer.invoice.other", "Other charges")}</span>
                        <span style={styles.rowVal}>{money(other, currency)}</span>
                      </div>
                    ) : null}
                  </>
                ) : null}

                {total !== undefined ? (
                  <div style={{ ...styles.row, ...styles.totalRow }}>
                    <span style={styles.rowKey}>{t("customer.invoice.total", "Total amount")}</span>
                    <span style={{ ...styles.rowVal, ...styles.totalValue }}>
                      {money(total, currency)}
                    </span>
                  </div>
                ) : (
                  <p style={{ ...styles.notice, marginTop: "12px" }}>
                    {t(
                      "customer.invoice.noTotal",
                      "Total amount is not available on this invoice yet."
                    )}
                  </p>
                )}
              </div>
            </div>

            {failed ? (
              <div style={styles.errorBox}>
                <p style={styles.errorTitle}>
                  {t("customer.invoice.failedTitle", "Payment failed")}
                </p>
                <p style={styles.errorHint}>
                  {t("customer.invoice.failedHint", "Please try again. No money was charged.")}
                </p>
              </div>
            ) : null}

            {succeeded ? (
              <div style={styles.successBox}>
                <span style={styles.emptyIcon} role="img" aria-hidden="true">
                  {SUCCESS_ICON}
                </span>
                <p style={styles.successTitle}>
                  {t("customer.invoice.successTitle", "Payment successful")}
                </p>
                <p style={styles.successHint}>
                  {t(
                    "customer.invoice.successHint",
                    "This is a mock payment. Your booking is now marked as paid."
                  )}
                </p>
              </div>
            ) : null}

            {pending ? (
              <>
                <button
                  type="button"
                  style={{
                    ...styles.payBtn,
                    ...(processing ? styles.payBtnProcessing : {}),
                    ...(onPay ? {} : styles.payBtnDisabled),
                  }}
                  disabled={processing || !onPay}
                  onClick={handlePay}
                >
                  {payLabel}
                </button>
                <p style={styles.mockNote}>
                  {t(
                    "customer.invoice.mockNote",
                    "This is a simulated payment — no real money is involved."
                  )}
                </p>
              </>
            ) : null}

            {succeeded && typeof onContinueToRating === "function" ? (
              <button
                type="button"
                style={styles.continueBtn}
                onClick={() => onContinueToRating(booking, invoice)}
              >
                {t("customer.invoice.continue", "Continue to Rating")} {DOT}{" "}
                {t("customer.invoice.rate", "Rate your worker")}
              </button>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}

InvoicePayment.displayName = "InvoicePayment";