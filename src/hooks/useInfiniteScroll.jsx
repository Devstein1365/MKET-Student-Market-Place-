import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for implementing infinite scroll functionality
 * @param {Function} fetchFunction - Function to fetch data (should accept page and limit parameters)
 * @param {number} initialLimit - Number of items to load per page
 * @returns {Object} - { data, loading, hasMore, error, loadMore, reset }
 */
const useInfiniteScroll = (fetchFunction, initialLimit = 12) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  // Load more data
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const result = await fetchFunction(page, initialLimit);

      // Handle both array response (backward compatibility) and paginated response
      if (Array.isArray(result)) {
        // Old format - just an array
        setData((prevData) => [...prevData, ...result]);
        setHasMore(result.length === initialLimit);
      } else {
        // New paginated format
        setData((prevData) => [...prevData, ...result.products]);
        setHasMore(result.hasMore);
      }

      setPage((prevPage) => prevPage + 1);
    } catch (err) {
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, page, initialLimit, loading, hasMore]);

  // Reset hook state
  const reset = useCallback(() => {
    setData([]);
    setPage(1);
    setLoading(false);
    setHasMore(true);
    setError(null);
  }, []);

  // Load initial data
  useEffect(() => {
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Detect scroll to bottom
  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;

      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      // Trigger when user is 300px from bottom
      if (scrollTop + clientHeight >= scrollHeight - 300) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore, loading, hasMore]);

  return {
    data,
    loading,
    hasMore,
    error,
    loadMore,
    reset,
  };
};

export default useInfiniteScroll;
