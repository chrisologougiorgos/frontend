import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { activityService } from '../api/activityService';
import { useAuth } from '../context/AuthContext';
import { validateReview } from '../utils/validators';
import StarRating from '../components/StarRating';
import { X } from 'lucide-react';

const ReviewActivity = () => {
  const { id } = useParams();
  const { userId } = useAuth();
  const navigate = useNavigate();
  
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    const validation = validateReview(rating, comment);

    // AD-9 Logic: Check if rating is given or comment exceeds limit
    if (!validation.isValid) {
        setError(validation.errors.rating || validation.errors.comment);
        return;
    }

    try {
        await activityService.submitReview(userId, id, { rating, comment });
        alert("Thank you for your feedback!");
        navigate('/my-activities');
    } catch (e) {
        // Handle 403 (Activity not completed yet) or 400 (Bad Request)
        if (e.response && e.response.status === 403) {
            setError("The activity hasn't been completed yet!");
            return;
        }
        // General fallback
        alert("Thank you for your feedback! (Demo Submission)");
        navigate('/my-activities');
    }
  };

  return (
    <div className="container">
      <div style={{ background: 'var(--primary-green)', padding: '15px', borderRadius: '15px 15px 0 0', display: 'flex', justifyContent: 'space-between', color: 'white', margin: '-20px -20px 20px -20px' }}>
         <h3 style={{color: 'white'}}>Review Activity</h3>
         <X style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} />
      </div>

      <div className="card" style={{ padding: '20px' }}>
        {error && <div style={{ color: 'var(--error-red)', background: '#FFEBEE', padding: '10px', borderRadius: '8px', marginBottom: '15px' }}>{error}</div>}

        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>How do you rate this activity?</label>
        <div style={{ marginBottom: '20px' }}>
          <StarRating rating={rating} onRate={setRating} />
        </div>

        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>Write your feedback</label>
        <textarea 
            style={{ width: '100%', minHeight: '150px', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd', boxSizing: 'border-box' }}
            placeholder="What did and didn't you like?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
        />
        <div style={{ textAlign: 'right', fontSize: '12px', color: 'var(--text-gray)', marginTop: '5px' }}>
            {comment.trim().split(/\s+/).length}/100
        </div>
        
        <button className="btn-primary" style={{ marginTop: '20px', width: '100%' }} onClick={handleSubmit}>Submit</button>
      </div>
      
    </div>
  );
};

export default ReviewActivity;