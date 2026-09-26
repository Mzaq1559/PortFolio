import { motion, useScroll, useSpring } from 'motion/react';

/**
 * ScrollProgress - a thin bar tracking scroll progress.
 *
 * Perf notes: `useScroll` reads scroll position via Motion's own
 * rAF-batched, passive scroll tracking and returns a MotionValue — there is
 * no React state and no re-render on scroll. `useSpring` smooths the value,
 * and `scaleX` is applied directly as a transform, so this component renders
 * exactly once.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left will-change-transform"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-second) 100%)'
      }}
    />
  );
}
