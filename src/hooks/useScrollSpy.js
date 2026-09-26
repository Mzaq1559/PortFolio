import { useState, useEffect, useRef } from 'react';

/**
 * Tracks which section is currently active using IntersectionObserver instead
 * of a scroll listener. This avoids synchronous layout reads (offsetTop /
 * offsetHeight) on every scroll tick and lets the browser batch the work.
 *
 * `offset` approximates the old top-offset behavior by shifting the
 * observer's root margin, so a section is considered "active" once it
 * crosses the same horizontal line under the sticky navbar / header.
 */
export const useScrollSpy = (sectionIds, offset = 100) => {
  const [activeSection, setActiveSection] = useState('');
  const ratiosRef = useRef(new Map());

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const rootMargin = `-${offset}px 0px -${Math.max(0, 100 - offset / 10)}% 0px`;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratiosRef.current.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let bestId = '';
        let bestRatio = 0;
        for (const id of sectionIds) {
          const ratio = ratiosRef.current.get(id) || 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        if (bestId) setActiveSection(bestId);
      },
      {
        rootMargin,
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sectionIds, offset]);

  return activeSection;
};
