/**
 * src/utils/formatters.js
 * Helper functions to format dates and times consistently.
 */

/**
 * Formats a date input into "DD/MM/YYYY"
 * Handles:
 * 1. Arrays [2025, 3, 20] (Common Backend format)
 * 2. Arrays [20, 3, 2025] (Mock format)
 * 3. Strings "2025-03-20"
 */
export const formatDate = (date) => {
  if (!date) return 'N/A';

  if (Array.isArray(date)) {
    // If array is empty or too short
    if (date.length < 3) return 'Invalid Date';

    let day, month, year;

    // Check if the first number is a Year (e.g., 2025)
    if (date[0] > 31) {
      // Format: [Year, Month, Day]
      [year, month, day] = date;
    } else {
      // Format: [Day, Month, Year]
      [day, month, year] = date;
    }

    // Pad with zeros (e.g., 3 -> 03)
    const dayStr = String(day).padStart(2, '0');
    const monthStr = String(month).padStart(2, '0');

    return `${dayStr}/${monthStr}/${year}`;
  }

  // If it's a string, return as is or try to parse standard date
  return String(date);
};

/**
 * Formats time into "HH:MM"
 * Handles:
 * 1. Arrays [..., ..., ..., 8, 30] (Extracts time from LocalDateTime array)
 * 2. Strings "8:30" -> "08:30"
 */
export const formatTime = (time) => {
  if (!time) return '--:--';

  // 1. Handle Array (e.g., [2025, 3, 20, 8, 30])
  if (Array.isArray(time)) {
    if (time.length >= 5) {
      const hour = String(time[3]).padStart(2, '0');
      const minute = String(time[4]).padStart(2, '0');
      return `${hour}:${minute}`;
    }
    // If array is just [8, 30]
    if (time.length === 2) {
        const hour = String(time[0]).padStart(2, '0');
        const minute = String(time[1]).padStart(2, '0');
        return `${hour}:${minute}`;
    }
  }

  // 2. Handle String (e.g., "8:30")
  if (typeof time === 'string') {
    // If it already has a colon
    if (time.includes(':')) {
        const [h, m] = time.split(':');
        return `${h.padStart(2, '0')}:${m.padStart(2, '0')}`;
    }
  }

  return String(time);
};