import React, { createContext, useContext, useState, useMemo } from 'react';

const defaultUserId = process.env.REACT_APP_CURRENT_USER_ID 
  ? parseInt(process.env.REACT_APP_CURRENT_USER_ID) 
  : 1; 

export const AuthContext = createContext({
  userId: defaultUserId,
  isAuthenticated: true,
  user: { name: 'Vagelis', initial: 'V' }
});

export const AuthProvider = ({ children }) => {
  // Simulating Basic Authentication State
  const [userId] = useState(defaultUserId);
  const isAuthenticated = true; // Assume always true per initial requirements

  const value = useMemo(() => ({
    userId,
    isAuthenticated,
    user: { name: 'Vagelis', initial: 'V' }
  }), [userId]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);