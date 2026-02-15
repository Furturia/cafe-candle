/**
 * Convert 2-digit graduation year to full Buddhist and Gregorian years
 * @param {number} twoDigitYear - 2-digit year (40-99)
 * @returns {{ buddhist: number, gregorian: number }}
 */
export function convertToFullYear(twoDigitYear) {
  const buddhist = 2500 + twoDigitYear;
  const gregorian = buddhist - 543;
  return { buddhist, gregorian };
}

/**
 * Calculate years since graduation based on 2-digit year
 * @param {number} twoDigitYear - 2-digit year (40-99)
 * @returns {number}
 */
export function calculateYearsSinceGraduation(twoDigitYear) {
  const currentYear = new Date().getFullYear();
  const { gregorian } = convertToFullYear(twoDigitYear);
  return currentYear - gregorian;
}

/**
 * Get academic generation label
 * @param {number} twoDigitYear - 2-digit year (40-99)
 * @returns {string}
 */
export function getAcademicGeneration(twoDigitYear) {
  return `รุ่น ${twoDigitYear}`;
}
