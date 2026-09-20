import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { useCountUp } from '../../../hooks/useCountUp';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { Live2DCompanion } from '../widgets/Live2DCompanion';

const stats = [
  { value: 10, label: 'Projects Built', suffix: '+' },
  { value: 2, label: 'Years Learning', suffix: '+' },
  { value: 3.57, label: 'CGPA', suffix: '', display: '3.57' }
];

export function About() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-24 px-6 md:px-10 relative overflow-hidden w-full max-w-full"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="max-w-[1400px] mx-auto w-full min-w-0">
        <div className="grid grid-cols-1 xl:grid-cols-[320px_minmax(0,1fr)] gap-10 xl:gap-14 items-center min-w-0">
          
          {/* Live2D Anime Companion Card (Left at xl, below text on smaller screens) */}
          <motion.div
            className="order-2 xl:order-1 w-full max-w-[320px] mx-auto min-w-0 relative"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -40 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="rounded-3xl backdrop-blur-lg p-4 flex flex-col items-center"
              style={{
                backgroundColor: 'var(--bg-glass)',
                border: '1px solid var(--border-glass)',
                boxShadow: 'var(--shadow-soft)'
              }}
            >
              <Live2DCompanion />
              <p
                className="font-mono text-[11px] uppercase tracking-widest mt-3 text-center"
                style={{ color: 'var(--text-secondary)' }}
              >
                Interactive · move your cursor
              </p>
            </div>
          </motion.div>

          {/* Text Block (Right at xl, first on smaller screens) */}
          <motion.div
            className="order-1 xl:order-2 max-w-2xl mx-auto xl:mx-0 xl:max-w-none w-full min-w-0"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 40 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Section Label */}
            <p 
              className="font-mono text-sm uppercase tracking-widest mb-4"
              style={{ color: 'var(--accent-primary)' }}
            >
              &lt; ABOUT ME /&gt;
            </p>

            {/* Heading */}
            <h2 
              className="font-display text-3xl xl:text-4xl font-bold mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              Bridging Full-Stack Development & AI/ML Engineering
            </h2>

            {/* Bio Paragraphs */}
            <div className="space-y-4 mb-8" style={{ color: 'var(--text-secondary)' }}>
              <p className="text-base leading-relaxed">
                I'm Muhammad Zulqarnain Abdullah, a Computer Science undergraduate at UET Taxila with a full-stack
                development background, now building toward AI/ML engineering. I enjoy turning ideas into working
                systems — from serverless web apps to data structures built from scratch — and documenting the
                process along the way.
              </p>
              <p className="text-base leading-relaxed">
                My work spans building and shipping full-stack projects (React, FastAPI, SQL), strengthening core
                CS fundamentals through DSA and competitive problem-solving, and diving into applied AI/ML — from
                neural network foundations to LLM-powered tools like RAG pipelines. I'm working toward a career
                in AI/ML engineering, with an eye on graduate study abroad.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <StatCard
                  key={stat.label}
                  stat={stat}
                  startCounting={isInView}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

interface StatCardProps {
  stat: {
    value: number;
    label: string;
    suffix: string;
    special?: boolean;
    display?: string;
  };
  startCounting: boolean;
  delay: number;
}

function StatCard({ stat, startCounting, delay }: StatCardProps) {
  const count = useCountUp(stat.value, 2000, startCounting);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="text-center"
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <div 
        className="font-display text-2xl md:text-3xl font-bold mb-2"
        style={{
          background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-second) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        {stat.special ? '∞' : stat.display ? stat.display : count}
        {!stat.special && !stat.display && stat.suffix}
      </div>
      <div 
        className="font-mono text-xs uppercase tracking-wider"
        style={{ color: 'var(--text-secondary)' }}
      >
        {stat.label}
      </div>
    </motion.div>
  );
}
