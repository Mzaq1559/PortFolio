import { useEffect, useState, useRef } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>();

  useEffect(() => {
    // Hide custom cursor on touch devices
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Animation loop for smooth following
    const animate = () => {
      setPosition(prev => {
        const dx = cursorRef.current.x - prev.x;
        const dy = cursorRef.current.y - prev.y;
        
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15
        };
      });
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <div
        className="custom-cursor fixed w-2 h-2 rounded-full pointer-events-none z-[9999] transition-transform duration-100"
        style={{
          left: `${cursorRef.current.x}px`,
          top: `${cursorRef.current.y}px`,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.5 : 1})`,
          backgroundColor: 'var(--accent-primary)'
        }}
      />
      
      {/* Outer ring */}
      <div
        className="custom-cursor-ring fixed rounded-full border-2 pointer-events-none z-[9998] transition-all duration-200"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isPointer ? '52px' : '32px',
          height: isPointer ? '52px' : '32px',
          transform: `translate(-50%, -50%)`,
          borderColor: 'var(--accent-primary)',
          backgroundColor: isPointer ? 'rgba(110, 231, 247, 0.1)' : 'transparent'
        }}
      />
    </>
  );
}
