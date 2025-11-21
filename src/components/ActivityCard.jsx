import React from 'react';
import { Pin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/formatters';

const ActivityCard = ({ activity, type = 'upcoming', onAction }) => {
  const navigate = useNavigate();
  const { activityId, details } = activity;

  return (
    <div className="card" style={{ position: 'relative' }}>
       {type !== 'completed' && <Pin size={16} style={{ position: 'absolute', top: 15, left: 10, transform: 'rotate(45deg)' }} />}

      <div style={{ paddingLeft: '25px' }}>
        <h3 style={{ marginBottom: '5px' }}>{details.activityType}</h3>
        
        <div className="text-muted" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
          <div>Date: {formatDate(details.date)}</div>
          <div>Time: {details.time}</div>
          <div>Location: {details.location}</div>
        </div>

        <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span 
            style={{ textDecoration: 'underline', fontSize: '14px', cursor: 'pointer' }}
            onClick={() => navigate(`/activity/${activityId}`)}
          >
            View details
          </span>

          {type === 'feed' && (
            <button className="btn-primary" onClick={(e) => { e.stopPropagation(); onAction(activityId); }}>
              Join
            </button>
          )}
          
          {type === 'upcoming_joined' && (
             <button className="btn-primary" style={{ backgroundColor: 'var(--error-red)' }} onClick={() => onAction(activityId)}>
               Leave
             </button>
          )}

          {type === 'completed' && (
             <button className="btn-primary" onClick={() => navigate(`/review/${activityId}`)}>
               Review
             </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;