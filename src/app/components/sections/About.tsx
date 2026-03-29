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
          {/* Left - Illustration */}
          <motion.div
            className="relative"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -40 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              {/* Illustration with Gradient Border */}
              <div 
                className="relative rounded-2xl overflow-hidden p-1"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-second) 100%)'
                }}
              >
                <div className="rounded-xl overflow-hidden bg-[#1a2332] aspect-square flex items-center justify-center p-8">
                  <svg 
                    viewBox="0 0 200 200" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-2xl"
                  >
                    {/* Background Glow */}
                    <circle cx="100" cy="100" r="80" fill="url(#glowGradient)" fillOpacity="0.15" />
                    
                    {/* Isometric Server Base */}
                    <path d="M100 160L40 130L100 100L160 130L100 160Z" fill="#2d3748" />
                    <path d="M40 130V140L100 170V160L40 130Z" fill="#1a202c" />
                    <path d="M160 130V140L100 170V160L160 130Z" fill="#1a202c" />

                    {/* Server Rack 1 (Bottom) */}
                    <g className="animate-[float_4s_ease-in-out_infinite_alternate]">
                      <path d="M100 145L50 120L100 95L150 120L100 145Z" fill="#384459" stroke="#4d5f7a" />
                      <path d="M50 120V130L100 155V145L50 120Z" fill="var(--accent-primary)" fillOpacity="0.8" />
                      <path d="M150 120V130L100 155V145L150 120Z" fill="var(--accent-primary)" fillOpacity="0.6" />
                      {/* Lights */}
                      <circle cx="85" cy="135" r="2" fill="#a8d5c2" />
                      <circle cx="115" cy="135" r="2" fill="#a8d5c2" className="animate-pulse" />
                    </g>

                    {/* Server Rack 2 (Middle) */}
                    <g className="animate-[float_4s_ease-in-out_infinite_alternate]" style={{ animationDelay: '0.5s' }}>
                      <path d="M100 115L50 90L100 65L150 90L100 115Z" fill="#4d5f7a" stroke="#a8d5c2" strokeOpacity="0.5" />
                      <path d="M50 90V100L100 125V115L50 90Z" fill="#a8d5c2" fillOpacity="0.7" />
                      <path d="M150 90V100L100 125V115L150 90Z" fill="#a8d5c2" fillOpacity="0.5" />
                      {/* Indicator Lines */}
                      <rect x="70" y="105" width="20" height="2" rx="1" fill="#1a2332" />
                      <rect x="110" y="105" width="20" height="2" rx="1" fill="#1a2332" />
                    </g>

                    {/* Server Rack 3 (Top) */}
                    <g className="animate-[float_4s_ease-in-out_infinite_alternate]" style={{ animationDelay: '1s' }}>
                      <path d="M100 85L50 60L100 35L150 60L100 85Z" fill="var(--accent-primary)" fillOpacity="0.9" />
                      <path d="M50 60V70L100 95V85L50 60Z" fill="var(--accent-second)" fillOpacity="0.8" />
                      <path d="M150 60V70L100 95V85L150 60Z" fill="var(--accent-second)" fillOpacity="0.6" />
                      {/* Top CPU Slot */}
                      <path d="M100 75L70 60L100 45L130 60L100 75Z" fill="#1a2332" fillOpacity="0.4" />
                    </g>

                    {/* Floating Code Bits */}
                    <rect x="30" y="50" width="15" height="4" rx="2" fill="#a8d5c2" className="animate-bounce" style={{ animationDuration: '3s' }} />
                    <rect x="160" y="80" width="20" height="3" rx="1.5" fill="var(--accent-primary)" className="animate-bounce" style={{ animationDuration: '4s' }} />
                    <rect x="40" y="150" width="10" height="10" rx="5" fill="var(--accent-second)" fillOpacity="0.5" className="animate-pulse" />

                    <defs>
                      <radialGradient id="glowGradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(100 100) rotate(90) scale(80)">
                        <stop offset="0" stopColor="#a8d5c2" />
                        <stop offset="1" stopColor="#a8d5c2" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                  </svg>
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
                  Backend Architect
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
              Building Distributed Systems & Scalable Software
            </h2>

            {/* Bio Paragraphs */}
            <div className="space-y-4 mb-8" style={{ color: 'var(--text-secondary)' }}>
              <p className="text-base md:text-lg leading-relaxed">
                I'm Muhammad Zulqarnain Abdullah, a Computer Science student at UET Taxila focused on backend systems, 
                distributed architecture, and scalable software. I enjoy building reliable services 
                and data processing pipelines that handle complexity with elegance.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                My workflow combines systems thinking with practical engineering: designing clean APIs, 
                implementing sharding/replication strategies, and deploying infrastructure tooling 
                that ensures high availability and performance for modern applications.
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
