import { motion } from 'motion/react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { Live2DCompanion } from '../widgets/Live2DCompanion';

const stats = [
  { value: 5, label: 'Semester', suffix: 'th' },
  { value: 3.60, label: 'CGPA', suffix: '', display: '3.60' },
  { value: 2028, label: 'Expected Graduation', suffix: '' }
];

export function About() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section 
      id="about" 
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
                Interactive · desktop pointer
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
                I got into computer science through programming and software development, and that naturally turned into building projects whenever I wanted to understand something better. I&apos;ve worked with C++, Python, JavaScript, React, FastAPI, and other tools along the way. More recently, I&apos;ve become much more interested in the ideas behind AI and machine learning, not just using ready-made models but understanding how these systems work.
              </p>
              <p className="text-base leading-relaxed">
                Right now, I&apos;m going back to the foundations of ML and implementing concepts from scratch so I can understand them properly. At the same time, I&apos;m building projects around computer vision, deep learning, RAG and LLM systems, and agentic AI. I tend to learn through trial and error, and I keep a Learning Diary because I like documenting what I built, what broke, and what I learned from it.
              </p>
              <p className="text-base leading-relaxed">
                I&apos;m currently pursuing my BS Computer Science at UET Taxila (2024–2028), where I&apos;m in my 5th semester with a 3.60/4.00 CGPA.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <StatCard
                  key={stat.label}
                  stat={stat}
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
  delay: number;
}

function StatCard({ stat, delay }: StatCardProps) {
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
        {stat.display ?? `${stat.value}${stat.suffix}`}
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
