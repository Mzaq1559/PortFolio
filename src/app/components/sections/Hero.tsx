import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, ArrowRight, Github, Linkedin, BookOpen, BarChart3 } from 'lucide-react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { BentoWidgets } from '../widgets/BentoWidgets';

const roles = ['Software Developer', 'AI/ML Engineer in Progress', 'CS Student @ UET Taxila'];

const socialLinks = [
  { icon: Github, href: 'https://github.com/Mzaq1559', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/muhammad-zulqarnain-26276b319', label: 'LinkedIn' },
  { icon: BookOpen, href: 'https://mzaq1559.github.io/My-Learning-Diary/', label: 'Blog' },
  { icon: BarChart3, href: 'https://www.kaggle.com/mzaq1559', label: 'Kaggle' }
];

export function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 35 });
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

  const firstName = 'Muhammad Zulqarnain';
  const lastName = 'Abdullah';

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center px-6 md:px-16 lg:px-24 xl:px-32 overflow-hidden"
      onPointerMove={(event) => {
        if (prefersReducedMotion) return;
        const rect = event.currentTarget.getBoundingClientRect();
        setSpotlight({
          x: ((event.clientX - rect.left) / rect.width) * 100,
          y: ((event.clientY - rect.top) / rect.height) * 100
        });
      }}
    >
      {/* Lightweight spotlight/grid background — inspired by modern spotlight hero patterns. */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={prefersReducedMotion ? {} : { left: `${spotlight.x}%`, top: `${spotlight.y}%` }}
          transition={{ type: 'spring', stiffness: 80, damping: 24, mass: 0.35 }}
          style={{
            background: 'radial-gradient(circle, rgba(77,191,176,0.16) 0%, rgba(77,191,176,0.06) 32%, transparent 70%)',
            filter: 'blur(12px)'
          }}
        />
        <div
          className="absolute -top-48 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full blur-3xl opacity-25"
          style={{ background: 'radial-gradient(circle, var(--accent-primary), transparent 68%)' }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'linear-gradient(rgba(15,118,110,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(15,118,110,0.07) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'linear-gradient(to bottom, black, transparent 82%)'
          }}
        />
      </div>

      <div className="relative z-10 w-full pt-20 md:pt-0 pb-12 md:pb-0">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 lg:gap-12 items-stretch">
          <div className="md:col-span-3">
            <motion.p
              className="font-mono text-sm md:text-base mb-4 uppercase tracking-widest"
              style={{ color: 'var(--accent-primary)' }}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              transition={{ delay: 0.05, duration: 0.6 }}
            >
              Hello, I&apos;m
            </motion.p>

            <div className="mb-6 overflow-visible max-w-none sm:max-w-2xl lg:max-w-3xl">
              <h1 className="font-display font-bold tracking-[-0.04em] leading-[0.98] text-[clamp(2.2rem,4.2vw,4.25rem)]">
                <motion.span
                  className="block"
                  style={{ color: 'var(--hero-name-line1)' }}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
                >
                  {firstName}
                </motion.span>
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

            <div className="h-auto min-h-[4rem] md:min-h-[5.5rem] mb-6 flex items-center">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={currentRoleIndex}
                  className="font-display text-xl md:text-3xl lg:text-4xl font-semibold leading-tight"
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
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              I&apos;m a 5th-semester Computer Science student at UET Taxila who likes learning by actually building things. I started out mostly interested in software development, but over time I&apos;ve found myself getting more curious about what happens behind intelligent systems. These days I&apos;m building full-stack apps, experimenting with computer vision and LLMs, and working through machine learning fundamentals one project at a time.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mb-10"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
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

              <a
                href={`${import.meta.env.BASE_URL}cv/Muhammad_Zulqarnain_Abdullah_CV.pdf`}
                download="Muhammad_Zulqarnain_Abdullah_CV.pdf"
                className="group px-8 py-4 rounded-full font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center gap-2 no-underline"
                style={{
                  color: '#b4536b',
                  border: '2px solid var(--accent-second)',
                  backgroundColor: 'rgba(255, 255, 255, 0.45)',
                  boxShadow: 'var(--shadow-soft)'
                }}
              >
                Download CV
                <Download className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
              </a>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
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

          {/* Bento / status panel */}
          <div className="flex flex-col md:col-span-2 w-full min-h-[380px] md:min-h-[min(520px,72vh)] mt-6 md:mt-0">
            <div
              className="relative flex-1 rounded-[2rem] p-4 border transition-all duration-300 hover:shadow-[var(--shadow-soft-hover)] overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.42)',
                borderColor: 'rgba(255,255,255,0.72)',
                boxShadow: 'var(--shadow-soft)',
                backdropFilter: 'blur(18px)'
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
