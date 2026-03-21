import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, ArrowRight, Github, Linkedin, BarChart3 } from 'lucide-react';
import { useTypewriter } from '../../../hooks/useTypewriter';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { BentoWidgets } from '../widgets/BentoWidgets';

const roles = ['Dev & Data Engineer', 'Backend Developer', 'Data Pipeline Builder'];

const socialLinks = [
  { icon: Github, href: 'https://github.com/Mzaq1559', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/zulqarnain', label: 'LinkedIn' },
  { icon: BarChart3, href: 'https://kaggle.com/zulqarnain', label: 'Kaggle' }
];

export function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const { displayedText } = useTypewriter("Hello, I'm", 100, 500);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const letterVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    })
  };

  const firstName = 'Muhammad';
  const lastName = 'Zulqarnain';

  return (
    <section id="hero" className="relative min-h-screen flex items-center px-6 md:px-16 lg:px-32 overflow-hidden">
      {/* Soft pastel blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[100px] opacity-35 animate-[blob-drift_20s_ease-in-out_infinite]"
          style={{ backgroundColor: 'var(--accent-primary)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[100px] opacity-30 animate-[blob-drift_25s_ease-in-out_infinite_reverse]"
          style={{ backgroundColor: 'var(--accent-second)' }}
        />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(100, 116, 139, 0.35) 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 lg:gap-12 items-stretch">
          <div className="md:col-span-3">
            <motion.p
              className="font-mono text-sm md:text-base mb-4 uppercase tracking-widest"
              style={{ color: 'var(--accent-primary)' }}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
            >
              {displayedText}
            </motion.p>

            <div className="mb-6 overflow-hidden max-w-[22rem] min-[400px]:max-w-none sm:max-w-2xl lg:max-w-3xl">
              <h1 className="font-display font-bold tracking-tight leading-[1.08] text-[clamp(1.75rem,5vw+0.5rem,4.25rem)]">
                <span className="block" style={{ color: 'var(--hero-name-line1)' }}>
                  {firstName.split('').map((char, i) => (
                    <motion.span
                      key={`f-${i}`}
                      custom={i}
                      variants={prefersReducedMotion ? {} : letterVariants}
                      initial={prefersReducedMotion ? {} : 'hidden'}
                      animate="visible"
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
                <motion.span
                  className="block mt-1 sm:mt-2"
                  style={{
                    background: 'var(--hero-name-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 2px 12px rgba(77, 191, 176, 0.25))'
                  }}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.55, ease: [0.43, 0.13, 0.23, 0.96] }}
                >
                  {lastName}
                </motion.span>
              </h1>
            </div>

            <div className="h-16 md:h-20 mb-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={currentRoleIndex}
                  className="font-display text-3xl md:text-5xl font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-second) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {roles[currentRoleIndex]}
                </motion.h2>
              </AnimatePresence>
            </div>

            <motion.p
              className="text-base md:text-lg mb-8 max-w-2xl leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.6 }}
            >
              I design and build reliable software systems, scalable APIs, and data workflows that turn raw data into
              useful products. My focus is practical engineering, clean architecture, and measurable impact.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mb-10"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ delay: 2.6, duration: 0.6 }}
            >
              <button
                onClick={() => scrollToSection('#projects')}
                className="group px-8 py-4 rounded-full font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-primary) 0%, #6ec9bd 100%)',
                  color: '#ffffff',
                  boxShadow: '0 10px 32px var(--accent-glow)'
                }}
              >
                <span className="flex items-center gap-2">
                  View My Work
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>

              <button
                className="group px-8 py-4 rounded-full font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  color: '#b4536b',
                  border: '2px solid var(--accent-second)',
                  backgroundColor: 'rgba(255, 255, 255, 0.45)',
                  boxShadow: 'var(--shadow-soft)'
                }}
              >
                <span className="flex items-center gap-2">
                  Download CV
                  <Download className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
                </span>
              </button>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.6 }}
            >
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      backgroundColor: 'var(--bg-glass)',
                      border: '1px solid var(--border-glass)',
                      boxShadow: 'var(--shadow-soft)'
                    }}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.06 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.96 }}
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>

          {/* Bento widgets — glass stack (visible on all breakpoints) */}
          <div className="flex flex-col md:col-span-2 w-full min-h-[380px] md:min-h-[min(520px,72vh)] mt-6 md:mt-0">
            <div
              className="flex-1 rounded-3xl p-4 backdrop-blur-xl border transition-all duration-300 hover:shadow-[var(--shadow-soft-hover)]"
              style={{
                background: 'var(--bg-glass)',
                borderColor: 'var(--border-glass)',
                boxShadow: 'var(--shadow-soft)'
              }}
            >
              <BentoWidgets />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
