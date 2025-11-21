import React from 'react';
import { Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 20px 10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor:'pointer' }} onClick={() => navigate('/my-activities')}>
        <div style={{ 
          width: '40px', height: '40px', borderRadius: '50%', 
          background: 'var(--primary-green)', color: 'white', display: 'flex', 
          justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' 
        }}>{user.initial}</div>
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{user.name}</div>
          <div className="text-muted" style={{ fontSize: '12px', border: '1px solid var(--primary-green)', padding: '2px 6px', borderRadius: '8px', display:'inline-block' }}>My Activities</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button className="btn-primary" style={{ padding: '5px 15px', fontSize: '12px' }}>Host</button>
        <Bell size={20} />
      </div>
    </div>
  );
};

export default Navbar;