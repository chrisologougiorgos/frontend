import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, onRate, readOnly = false, size = 32 }) => {
  return (
    <div style={{ display: 'flex', gap: '5px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          fill={star <= rating ? "#FFD700" : "none"}
          color={star <= rating ? "#FFD700" : "#ccc"}
          onClick={() => !readOnly && onRate && onRate(star)}
          style={{ cursor: readOnly ? 'default' : 'pointer' }}
        />
      ))}
    </div>
  );
};

export default StarRating;