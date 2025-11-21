import React from 'react';
import { useNavigate } from 'react-router-dom';
import { activityService } from '../api/activityService';
import { useAuth } from '../context/AuthContext';
import useFetch from '../hooks/useFetch';
import ActivityCard from '../components/ActivityCard';
import { ArrowLeft } from 'lucide-react';

const MyActivities = () => {
  const navigate = useNavigate();
  const { userId: authUserId } = useAuth();

  // ΠΡΟΣΩΡΙΝΟ: αν το authUserId είναι άδειο, χρησιμοποίησε 1
  const userId = authUserId ?? 1;

  console.log("MyActivities userId:", userId);

  const { data: upcoming, loading: loadingUpcoming } = useFetch(
    () => activityService.getMyUpcoming(userId),
    [userId] // <-- σημαντικό
  );

  const { data: completed, loading: loadingCompleted } = useFetch(
    () => activityService.getMyCompleted(userId),
    [userId] // <-- σημαντικό
  );

  const handleLeave = (activityId) => {
    alert(`Attempting to leave activity ${activityId}...`);
  };

  return (
    <div className="container">
      <div
        style={{
          background: 'var(--primary-green)',
          color: 'white',
          padding: '15px',
          borderRadius: '0 0 15px 15px',
          margin: '-20px -20px 20px -20px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <ArrowLeft
          style={{ cursor: 'pointer', marginRight: '15px' }}
          onClick={() => navigate('/')}
        />
        <h2 style={{ color: 'white', fontSize: '18px' }}>My Activities</h2>
      </div>

      <h3>Upcoming Activities</h3>
      {loadingUpcoming && <p>Loading upcoming...</p>}
      {!loadingUpcoming && (!upcoming || upcoming.length === 0) && (
        <p>No upcoming activities.</p>
      )}
      {upcoming?.map((act) => (
        <ActivityCard
          key={act.activityId}
          activity={act}
          type="upcoming_joined"
          onAction={handleLeave}
        />
      ))}

      <h3 style={{ marginTop: '30px' }}>Completed Activities</h3>
      {loadingCompleted && <p>Loading completed...</p>}
      {!loadingCompleted && (!completed || completed.length === 0) && (
        <p>No completed activities.</p>
      )}
      {completed?.map((act) => (
        <ActivityCard
          key={act.activityId}
          activity={act}
          type="completed"
        />
      ))}
    </div>
  );
};

export default MyActivities;
