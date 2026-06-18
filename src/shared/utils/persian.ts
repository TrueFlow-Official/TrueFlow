/**
 * Utility functions for Persian language support, numbers, currency, and Jalali date formatting.
 * Uses native Javascript Intl APIs (RTL/Persian support) without external dependencies.
 */

/**
 * Converts English digits in a string or number to Persian digits.
 */
export function toPersianDigits(input: string | number): string {
  if (input === undefined || input === null) return "";
  const str = String(input);
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/[0-9]/g, (w) => persianDigits[parseInt(w, 10)]);
}

/**
 * Converts Persian digits in a string to English digits.
 */
export function toEnglishDigits(str: string): string {
  if (!str) return "";
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/[۰-۹]/g, (w) => String(persianDigits.indexOf(w)));
}

/**
 * Formats a numeric amount into Persian currency (Toman).
 * Adds thousands separators and appends the currency name in Persian.
 */
export function formatToman(amount: number): string {
  if (amount === undefined || amount === null || isNaN(amount)) return "";
  const formatted = new Intl.NumberFormat("fa-IR", {
    useGrouping: true,
  }).format(amount);
  return `${formatted} تومان`;
}

/**
 * Formats a Date object, timestamp, or date string into a Jalali date string.
 */
export function toJalaliDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
): string {
  const d = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  if (!d || isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", options).format(d);
}

/**
 * Formats a Date object, timestamp, or date string into a Jalali date and time string.
 */
export function toJalaliDateTime(date: Date | string | number): string {
  return toJalaliDate(date, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
