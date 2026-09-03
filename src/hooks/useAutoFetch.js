import { useState, useEffect, useCallback } from 'react';
import useWebSocket from './useWebSocket';
import useFetch from './useFetch';
import { WEB_SOCKET_STATUS } from '../utils/Constant';

const useAutoFetch = (WEB_SOCKET_URL, apiUrl, auto = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { messages, status, sendMessage } = useWebSocket(WEB_SOCKET_URL, auto);

  const {
    data: fetchData,
    loading: fetchLoading,
    error: fetchError,
    refetch,
  } = useFetch(auto ? '' : apiUrl, {}, false);

  useEffect(() => {
    if (auto && messages.length > 0) {
      setData(messages[messages.length - 1]);
      setLoading(false);
    }
  }, [auto, messages]);

  useEffect(() => {
    if (!auto && fetchData) {
      setData(fetchData);
      setLoading(fetchLoading);
      setError(fetchError);
    }
  }, [auto, fetchData, fetchLoading, fetchError]);

  useEffect(() => {
    if (!auto) return;

    if (status === WEB_SOCKET_STATUS.CONNECTING) {
      setLoading(true);
      setError(null);
    } else if (status === WEB_SOCKET_STATUS.OPEN) {
      setLoading(false);
    } else if (status === WEB_SOCKET_STATUS.ERROR) {
      setError('WebSocket connection error');
      setLoading(false);
    } else if (status === WEB_SOCKET_STATUS.CLOSED) {
      setLoading(false);
    }
  }, [status, auto]);

  const refresh = useCallback(() => {
    if (auto) {
      if (messages.length > 0) {
        setData(messages[messages.length - 1]);
      }
    } else {
      refetch();
    }
  }, [auto, messages, refetch]);

  const fetch = useCallback(
    (payload = {}) => {
      if (auto) {
        setLoading(true);
        sendMessage(payload);
      } else {
        refetch();
      }
    },
    [auto, sendMessage, refetch],
  );

  return {
    data,
    loading: auto ? loading : fetchLoading,
    error: auto ? error : fetchError,
    status: auto ? status : WEB_SOCKET_STATUS.CLOSED,
    refresh,
    fetch,
    messages: auto ? messages : [],
    mode: auto ? 'websocket' : 'fetch',
  };
};

export default useAutoFetch;
