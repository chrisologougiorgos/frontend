// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ActivityCard from '../components/ActivityCard';
import StatusModal from '../components/StatusModal';
import { activityService } from '../api/activityService';
import { useAuth } from '../context/AuthContext';
import useActivities from '../hooks/useActivities';
import { ACTIVITY_TYPES, LOCATIONS } from '../utils/constants';
import { Filter } from 'lucide-react';

const Home = () => {
  const { userId } = useAuth();
  const {
    activities,
    loading,
    currentFilters,
    handleApplyFilters,
    refetch,
  } = useActivities();
  const [showFilters, setShowFilters] = useState(false);
  const [pendingFilters, setPendingFilters] = useState(currentFilters);
  const [modalMsg, setModalMsg] = useState(null);

  // Modal για "No activities found"
  useEffect(() => {
    if (!loading && Array.isArray(activities) && activities.length === 0) {
      setModalMsg({
        type: 'error',
        text: 'No activities found!',
        filterAgain: true,
      });
    }
  }, [loading, activities]);

  const applyFilters = () => {
    handleApplyFilters(pendingFilters);
    setShowFilters(false);
  };

  const handleJoin = async (id) => {
    try {
      await activityService.joinActivity(userId, id);
      setModalMsg({ type: 'success', text: 'Request sent!' });
    } catch (e) {
      console.error('Join error:', e);
      const serverMsg = e?.response?.data?.message || e.message;
      setModalMsg({
        type: 'error',
        text: serverMsg || 'Failed to join activity.',
      });
    }
  };

  return (
    <div className="container">
      <Navbar />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px',
        }}
      >
        <h2>Upcoming Activities</h2>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            cursor: 'pointer',
          }}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={20} /> <span>Filters</span>
        </div>
      </div>

      {showFilters && (
        <div className="card">
          <h3 style={{ marginBottom: '15px' }}>Filters</h3>
          <div style={{ margin: '10px 0' }}>
            <label>Type</label>
            <select
              style={{ width: '100%', padding: '8px', borderRadius: '8px' }}
              onChange={(e) =>
                setPendingFilters({ ...pendingFilters, type: e.target.value })
              }
            >
              <option value="">All</option>
              {ACTIVITY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div style={{ margin: '10px 0' }}>
            <label>Location</label>
            <select
              style={{ width: '100%', padding: '8px', borderRadius: '8px' }}
              onChange={(e) =>
                setPendingFilters({
                  ...pendingFilters,
                  location: e.target.value,
                })
              }
            >
              <option value="">All</option>
              {LOCATIONS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
          <button
            className="btn-primary"
            style={{ width: '100%', marginTop: '15px' }}
            onClick={applyFilters}
          >
            Apply
          </button>
        </div>
      )}

      {loading && <p>Loading activities...</p>}

      <div>
        {Array.isArray(activities)
          ? activities.map((act) => (
              <ActivityCard
                key={act.activityId}
                activity={act}
                type="feed"
                onAction={handleJoin}
              />
            ))
          : null}
      </div>

      {modalMsg && (
        <StatusModal
          type={modalMsg.type}
          message={modalMsg.text}
          onClose={() => setModalMsg(null)}
          actionLabel={modalMsg.filterAgain ? 'Filter Again' : null}
          onAction={modalMsg.filterAgain ? () => setModalMsg(null) : null}
        />
      )}
    </div>
  );
};

export default Home;
