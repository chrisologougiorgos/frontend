import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { activityService } from '../api/activityService';
import { useAuth } from '../context/AuthContext';
import { formatDate, formatTime } from '../utils/formatters';
import { ArrowLeft, Calendar, Clock, MapPin, BarChart, User, Package } from 'lucide-react';

const ActivityDetails = () => {
  const { id } = useParams();
  const { userId } = useAuth();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    activityService.getActivityDetails(userId, id).then(data => {
        console.log("Backend Data Received:", data); // Check your browser console (F12)
        setDetails(data);
    });
  }, [id, userId]);

  if (!details) return <div className="container">Loading...</div>;

  // Use the date array for time if 'time' field is missing (Common in Spring Boot)
  const displayTime = details.time || formatTime(details.date);
  
  // Safe accessors (Handles nulls/undefined)
  const location = details.location || "No location specified";
  const difficulty = details.difficultyLevel || details.difficulty || "N/A";
  const equipment = details.equipment || [];
  const current = details.currentParticipants || 0;
  const max = details.maxParticipants || "?";

  return (
    <div className="container">
      <div style={{ background: 'var(--primary-green)', color: 'white', padding: '15px', borderRadius: '0 0 15px 15px', margin: '-20px -20px 20px -20px', display: 'flex', alignItems: 'center' }}>
        <ArrowLeft style={{ cursor: 'pointer', marginRight: '15px' }} onClick={() => navigate(-1)} />
        <h2 style={{ color: 'white', fontSize: '18px' }}>{details.activityType || "Activity"}</h2>
      </div>

      {/* Details Card */}
      <div className="card">
        <h3 style={{borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px'}}>Details</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', fontSize: '14px' }}>
            <div style={{display:'flex', alignItems:'center', gap: '8px'}}>
                <Calendar size={16}/> {formatDate(details.date)}
            </div>
            <div style={{display:'flex', alignItems:'center', gap: '8px'}}>
                <BarChart size={16}/> {difficulty}
            </div>
            <div style={{display:'flex', alignItems:'center', gap: '8px'}}>
                <Clock size={16}/> {displayTime}
            </div>
            <div style={{display:'flex', alignItems:'center', gap: '8px'}}>
                <User size={16}/> {current}/{max}
            </div>
            <div style={{gridColumn: 'span 2', display:'flex', alignItems:'center', gap: '8px'}}>
                <MapPin size={16}/> {location}
            </div>
            <div style={{gridColumn: 'span 2', display:'flex', alignItems:'center', gap: '8px'}}>
                <Package size={16}/> {Array.isArray(equipment) ? equipment.join(', ') : equipment}
            </div>
        </div>
      </div>

      {/* Users Section */}
      <div className="card">
        <h3>Users</h3>
        {/* The Spec does not include a participants list, so we handle it safely */}
        {details.participants && details.participants.length > 0 ? (
            details.participants.map((u, index) => (
                <div key={u.userId || index} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
                    <span>{u.username || "User"}</span>
                    <button className="btn-primary" style={{ padding: '3px 8px', fontSize: '12px' }}>View</button>
                </div>
            ))
        ) : (
            <p style={{ color: '#999', fontSize: '14px' }}>No participant info available.</p>
        )}
      </div>

      {/* DEBUGGER: Remove this after fixing 
      <div style={{ marginTop: '20px', padding: '10px', background: '#333', color: '#0f0', fontSize: '10px', borderRadius: '8px', overflow: 'scroll' }}>
        <strong>DEBUG DATA:</strong>
        <pre>{JSON.stringify(details, null, 2)}</pre>
      </div>
      */}

      <button className="btn-secondary" style={{width: '100%', background: 'var(--warning-yellow)', color: 'black', marginTop: '20px'}} onClick={() => navigate(`/review/${id}`)}>
        Review Activity
      </button>
    </div>
  );
};

export default ActivityDetails;