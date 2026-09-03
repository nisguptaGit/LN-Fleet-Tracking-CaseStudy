import { useState, useCallback } from 'react';

const useToggle = (initialValue = false) => {
  const [isActive, setIsActive] = useState(initialValue);

  const toggle = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const setTrue = useCallback(() => {
    setIsActive(true);
  }, []);

  const setFalse = useCallback(() => {
    setIsActive(false);
  }, []);

  return {
    isActive,
    toggle,
    setTrue,
    setFalse,
  };
};

export default useToggle;
