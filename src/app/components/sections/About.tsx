import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Rocket, Zap } from 'lucide-react';
import { useCountUp } from '../../../hooks/useCountUp';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

const stats = [
  { value: 24, label: 'Projects Built', suffix: '+' },
  { value: 3, label: 'Years Learning', suffix: '+' },
  { value: 12, label: 'Data Pipelines', suffix: '+' },
  { value: 5, label: 'Internships & Labs', suffix: '+' }
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
      className="py-24 px-6 md:px-16 lg:px-32 relative"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            className="relative"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -40 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              {/* Image with Gradient Border */}
              <div 
                className="relative rounded-2xl overflow-hidden p-1"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-second) 100%)'
                }}
              >
                <div className="rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1737575655055-e3967cbefd03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzM5MzQwMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Profile"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Floating Badges */}
              <motion.div
                className="absolute -top-4 -right-4 px-4 py-2 rounded-full backdrop-blur-lg flex items-center gap-2 animate-[float_3s_ease-in-out_infinite]"
                style={{
                  backgroundColor: 'var(--bg-glass)',
                  border: '1px solid var(--border-subtle)'
                }}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
                whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Rocket className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
                <span className="font-mono text-sm" style={{ color: 'var(--text-primary)' }}>
                  Dev & Data Engineer
                </span>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 px-4 py-2 rounded-full backdrop-blur-lg flex items-center gap-2 animate-[float_3s_ease-in-out_infinite]"
                style={{
                  backgroundColor: 'var(--bg-glass)',
                  border: '1px solid var(--border-subtle)',
                  animationDelay: '1.5s'
                }}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
                whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <Zap className="w-4 h-4" style={{ color: 'var(--accent-second)' }} />
                <span className="font-mono text-sm" style={{ color: 'var(--text-primary)' }}>
                  UET Taxila · CS
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
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
              className="font-display text-4xl md:text-5xl font-bold mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              Building Software & Data Systems That Scale
            </h2>

            {/* Bio Paragraphs */}
            <div className="space-y-4 mb-8" style={{ color: 'var(--text-secondary)' }}>
              <p className="text-base md:text-lg leading-relaxed">
                I'm Muhammad Zulqarnain, a Computer Science student at UET Taxila focused on development and data engineering. 
                I enjoy building backend services, ETL workflows, and dashboard experiences that are both robust and easy to use.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                My workflow combines practical coding with data-first thinking: design clean schemas, automate pipelines, 
                and deploy maintainable systems that help teams make better decisions with real-time information.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
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
        className="font-display text-3xl md:text-4xl font-bold mb-2"
        style={{
          background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-second) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        {stat.special ? '∞' : count}
        {!stat.special && stat.suffix}
      </div>
      <div 
        className="font-mono text-sm uppercase tracking-wider"
        style={{ color: 'var(--text-secondary)' }}
      >
        {stat.label}
      </div>
    </motion.div>
  );
}
