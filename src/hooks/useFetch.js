import { useEffect, useState } from 'react';

const useFetch = (fn, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fn();
        if (isMounted) {
          setData(result);
        }
      } catch (e) {
        if (isMounted) {
          setError(e);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Αν π.χ. περιμένουμε userId, μην κάνεις κλήση με undefined
    const hasUndefinedDep = deps.some(d => d === undefined || d === null);
    if (!hasUndefinedDep) {
      fetchData();
    } else {
      // Αν λείπει κάποιο dependency (π.χ. userId), καθάρισε τα δεδομένα
      setData(null);
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, deps); // <-- ΠΟΛΥ ΣΗΜΑΝΤΙΚΟ

  return { data, loading, error };
};

export default useFetch;
