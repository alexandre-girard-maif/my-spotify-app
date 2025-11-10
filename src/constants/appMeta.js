// Centralized application metadata
export const APP_NAME = 'Music Discovery App';

/**
 * Build a page title using a section label.
 * @param {string} section
 * @returns {string}
 */
export function buildTitle(section) {
  return `${section} | ${APP_NAME}`;
}
