import { useEffect, useRef } from 'react';

/**
 * CustomCursor - a lightweight dot cursor that follows the mouse with a smooth
 * lerp animation.
 *
 * Perf notes:
 * - Position is written straight to the DOM node's `style.transform` inside the
 *   rAF loop. Nothing here touches React state, so the animation never causes
 *   a component render — only a compositor-friendly transform update.
 * - Disabled entirely on coarse (touch) pointers and when the user prefers
 *   reduced motion, in which case we never attach listeners or start the loop.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouchDevice || prefersReducedMotion) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let raf = 0;
    let visible = document.visibilityState === 'visible';

    const handleMouseMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const handleVisibility = () => {
      visible = document.visibilityState === 'visible';
      if (visible && !raf) raf = requestAnimationFrame(animate);
    };

    const animate = () => {
      current.x += (target.x - current.x) * 0.15;
      current.y += (target.y - current.y) * 0.15;

      const el = dotRef.current;
      if (el) {
        el.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
      }

      raf = visible ? requestAnimationFrame(animate) : 0;
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="custom-cursor fixed left-0 top-0 w-[10px] h-[10px] rounded-full pointer-events-none z-[9999] will-change-transform"
      style={{
        backgroundColor: 'var(--accent-primary)',
        boxShadow: '0 0 10px var(--accent-glow)'
      }}
    />
  );
}
