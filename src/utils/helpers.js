/**
 * General helper functions
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));