import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { useCountUp } from '../../../hooks/useCountUp';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { Live2DCompanion } from '../widgets/Live2DCompanion';

const stats = [
  { value: 5, label: 'Semester', suffix: 'th' },
  { value: 3.57, label: 'CGPA', suffix: '', display: '3.57' },
  { value: 2028, label: 'Expected Graduation', suffix: '' }
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
              From Software Development to AI/ML
            </h2>

            {/* Bio Paragraphs */}
            <div className="space-y-4 mb-8" style={{ color: 'var(--text-secondary)' }}>
              <p className="text-base leading-relaxed">
                I started with programming and software development, building applications across C++, Python, JavaScript, React, FastAPI, and .NET. As I became more interested in how intelligent systems work, my focus gradually shifted toward machine learning and AI.
              </p>
              <p className="text-base leading-relaxed">
                I&apos;m now strengthening my ML foundations, experimenting with computer vision and LLM systems, and building practical projects around what I learn. My current interests include computer vision, machine learning and deep learning, RAG/LLM systems, and agentic AI. I learn by building and document that process publicly through my projects and Learning Diary.
              </p>
              <p className="text-base leading-relaxed">
                I&apos;m currently pursuing my BS Computer Science at UET Taxila (2024–2028), with a 3.57/4.00 CGPA.
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
