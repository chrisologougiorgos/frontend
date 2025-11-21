import { MAX_REVIEW_WORDS } from './constants';

export const validateReview = (rating, comment) => {
  const errors = {};
  
  // FR 14 - Must rate the activity
  if (!rating || rating === 0) {
    errors.rating = "Please rate the activity before submitting!";
  }

  // FR 14 - Comment validation
  if (comment) {
    // Basic word count validation (matches user story)
    const wordCount = comment.trim().split(/\s+/).length;
    if (wordCount > MAX_REVIEW_WORDS) {
      errors.comment = "Words limitation exceeded!";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};