import { useEffect, useState, useRef } from 'react';

/**
 * CustomCursor - A simple, clean dot cursor that follows the mouse with a smooth lerp animation.
 */
export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>(null);

  useEffect(() => {
    // Hide custom cursor on touch devices for better accessibility
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Animation loop for smooth following (lerp)
    const animate = () => {
      setPosition(prev => {
        const dx = cursorRef.current.x - prev.x;
        const dy = cursorRef.current.y - prev.y;
        
        return {
          x: prev.x + dx * 0.15, // 15% follow speed for smooth lag
          y: prev.y + dy * 0.15
        };
      });
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <div
      className="custom-cursor fixed w-[10px] h-[10px] rounded-full pointer-events-none z-[9999] transition-transform duration-100"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%)`,
        backgroundColor: 'var(--accent-primary)',
        boxShadow: '0 0 10px var(--accent-glow)' // Optional: subtle glow to match site's premium feel
      }}
    />
  );
}
