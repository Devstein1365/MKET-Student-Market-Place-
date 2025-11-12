// Utility helpers for price formatting and parsing
export const cleanNumber = (val) => {
  if (val === null || val === undefined) return "";
  const s = String(val);
  // allow digits and dot only
  const cleaned = s.replace(/[^0-9.]/g, "");
  const parts = cleaned.split(".");
  if (parts.length <= 1) return parts[0];
  // keep only first dot, join remaining decimals
  return parts[0] + "." + parts.slice(1).join("");
};

export const formatIntWithCommas = (intStr) => {
  if (!intStr) return "";
  try {
    return Number(intStr).toLocaleString();
  } catch {
    return intStr;
  }
};

export const formatAsUserTyping = (rawValue) => {
  const cleaned = cleanNumber(rawValue);
  const [intPart, decPart] = cleaned.split(".");
  const intFormatted = intPart ? formatIntWithCommas(intPart) : "";
  return decPart !== undefined ? `${intFormatted}.${decPart}` : intFormatted;
};

export const formatOnBlur = (val) => {
  if (!val) return "";
  const cleaned = cleanNumber(val);
  const num = Number(cleaned || 0);
  if (Number.isNaN(num)) return val;
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const parseToNumber = (val) => {
  const cleaned = cleanNumber(val);
  const num = Number(cleaned || 0);
  return Number.isNaN(num) ? 0 : num;
};

export const toKobo = (val) => {
  // val is number (Naira) or formatted string
  const num = typeof val === "number" ? val : parseToNumber(val);
  return Math.round(num * 100);
};

export default {
  cleanNumber,
  formatIntWithCommas,
  formatAsUserTyping,
  formatOnBlur,
  parseToNumber,
  toKobo,
};
