/**
 * Utility helper functions for the Claude MCP Demo
 */

/**
 * Formats a date object into a human-readable string
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
function formatDate(date) {
  if (!(date instanceof Date)) {
    throw new TypeError('Input must be a Date object');
  }
  
  return date.toLocaleString();
}

/**
 * Validates that input is a non-empty string
 * @param {any} input - The input to validate
 * @returns {boolean} Whether the input is valid
 */
function isValidString(input) {
  return typeof input === 'string' && input.trim().length > 0;
}

/**
 * Safely parses JSON with error handling
 * @param {string} jsonString - The JSON string to parse
 * @returns {Object|null} Parsed object or null if invalid
 */
function safeJsonParse(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return null;
  }
}

/**
 * Generates a random ID
 * @param {number} length - Length of the ID to generate
 * @returns {string} Random ID
 */
function generateId(length = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return result;
}

module.exports = {
  formatDate,
  isValidString,
  safeJsonParse,
  generateId
};
