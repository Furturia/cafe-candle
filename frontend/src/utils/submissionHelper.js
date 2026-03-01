import {
  convertToFullYear,
  calculateYearsSinceGraduation,
} from "./graduationCalculator.js";
import { generateHeartwarmingMessage } from "./messageGenerator.js";

/**
 * Enhance a raw submission object with computed fields
 * (fullYears, yearsSinceGraduation, heartwarmingMessage)
 * @param {Object} submission - Raw submission data from Firestore
 * @returns {Object} Enhanced submission
 */
export function enhanceSubmission(submission) {
  const gradYear = parseInt(submission.graduationYear, 10);
  const fullYears = convertToFullYear(gradYear);
  const yearsSinceGraduation = calculateYearsSinceGraduation(gradYear);
  const heartwarmingMessage = generateHeartwarmingMessage(yearsSinceGraduation);

  return {
    ...submission,
    fullYears,
    yearsSinceGraduation,
    heartwarmingMessage,
  };
}
