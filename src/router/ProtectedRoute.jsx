import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    // In a real app, you'd navigate to a Login screen
    return <Navigate to="/" replace />; 
  }
  return children;
};

export default ProtectedRoute;