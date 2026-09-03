import { useState, useEffect, useCallback, useRef } from 'react';
import { WEB_SOCKET_STATUS } from '../utils/Constant';

const useWebSocket = (url, auto = true) => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState(WEB_SOCKET_STATUS.CONNECTING);
  const ws = useRef(null);

  useEffect(() => {
    if (!auto || !url) {
      return;
    }

    ws.current = new WebSocket(url);
    ws.current.onopen = () => setStatus(WEB_SOCKET_STATUS.OPEN);
    ws.current.onclose = () => setStatus(WEB_SOCKET_STATUS.CLOSED);
    ws.current.onerror = () => setStatus(WEB_SOCKET_STATUS.ERROR);

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [url, auto]);

  const sendMessage = useCallback((data) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(data));
    }
  }, []);

  return { messages, status, sendMessage };
};

export default useWebSocket;
