import { useState, useRef } from 'react';

const useResizable = (
  initialWidth = 3,
  minWidth = 2,
  maxWidth = 10,
  onWidthChange,
) => {
  const [currentWidth, setCurrentWidth] = useState(initialWidth);
  const containerRef = useRef(null);
  const isResizingRef = useRef(false);

  const handleMouseDown = () => {
    isResizingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isResizingRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const newWidth =
      ((e.clientX - containerRect.left) / containerRect.width) * 12;

    // Clamp between min and max
    const clampedWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
    setCurrentWidth(clampedWidth);
    onWidthChange?.(clampedWidth);
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return {
    currentWidth,
    containerRef,
    handleMouseDown,
    isResizingRef,
  };
};

export default useResizable;
