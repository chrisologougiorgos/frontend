import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ActivityDetails from '../pages/ActivityDetails';
import MyActivities from '../pages/MyActivities';
import ReviewActivity from '../pages/ReviewActivity';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activity/:id" element={<ActivityDetails />} />
        
        {/* Routes requiring Auth (My Activities, Review) */}
        <Route path="/my-activities" element={
            <ProtectedRoute><MyActivities /></ProtectedRoute>
        } />
        <Route path="/review/:id" element={
            <ProtectedRoute><ReviewActivity /></ProtectedRoute>
        } />
        
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;