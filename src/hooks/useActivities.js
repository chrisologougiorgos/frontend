import { useState } from 'react';
import { activityService } from '../api/activityService';
import { useAuth } from '../context/AuthContext';
import useFetch from './useFetch';

/**
 * Specialized hook for managing activity feed data and filters.
 */
const useActivities = () => {
  const { userId } = useAuth();
  const [filters, setFilters] = useState({});

  const fetchActivitiesWithFilters = async () => {
    return activityService.getUpcomingActivities(userId, filters);
  };
  
  const { data: activities, loading, error, refetch } = useFetch(fetchActivitiesWithFilters, [filters]);

  const handleApplyFilters = (newFilters) => {
    // Only fetch if filters actually changed to avoid unnecessary API calls
    setFilters(prev => ({...prev, ...newFilters}));
  };

  return {
    activities,
    loading,
    error,
    currentFilters: filters,
    handleApplyFilters,
    refetch,
  };
};

export default useActivities;