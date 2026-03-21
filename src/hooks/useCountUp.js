import { useState, useEffect, useRef } from 'react';

export const useCountUp = (end, duration = 2000, startCounting = false) => {
  const [count, setCount] = useState(0);
  const frameRef = useRef();
  const startTimeRef = useRef();

  useEffect(() => {
    if (!startCounting) {
      setCount(0);
      return;
    }

    const animate = (currentTime) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuad = progress * (2 - progress);
      const currentCount = Math.floor(easeOutQuad * end);

      setCount(currentCount);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      startTimeRef.current = null;
    };
  }, [end, duration, startCounting]);

  return count;
};
