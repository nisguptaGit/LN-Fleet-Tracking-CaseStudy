import { useEffect, useCallback } from 'react';
import useApi from './useApi';

const useFetch = (url, options = {}, auto = true) => {
  const { data, loading, error, execute } = useApi();

  const defaultOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  };

  const triggerFetch = useCallback(
    async (fetchUrl = url, fetchOptions = defaultOptions) => {
      if (!fetchUrl) {
        return null;
      }

      return await execute(async () => {
        const response = await window.fetch(fetchUrl, fetchOptions);
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const result = await response.json();

        return { success: true, data: result };
      });
    },
    [execute, url, defaultOptions],
  );

  const refetch = useCallback(() => {
    return triggerFetch(url, defaultOptions);
  }, [triggerFetch, url, defaultOptions]);

  useEffect(() => {
    if (!auto || !url) return;
    triggerFetch(url, defaultOptions);
  }, [auto, url, triggerFetch]);

  return {
    data,
    loading,
    error,
    fetch: triggerFetch,
    refetch,
  };
};

export default useFetch;
