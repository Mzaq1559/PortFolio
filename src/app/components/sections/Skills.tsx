import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { skills, techMarquee } from '../../../data/skills';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

const categories = Object.keys(skills) as Array<keyof typeof skills>;
const defaultTab = categories[0] as keyof typeof skills;

export function Skills() {
  const [activeTab, setActiveTab] = useState<keyof typeof skills>(defaultTab);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section 
      id="skills" 
      className="py-24 px-6 md:px-16 lg:px-32"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-16"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p 
            className="font-mono text-sm uppercase tracking-widest mb-4"
            style={{ color: 'var(--accent-primary)' }}
          >
            &lt; MY SKILLS /&gt;
          </p>
          <h2 
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            Technologies & Tools
          </h2>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className="relative px-6 py-3 rounded-full font-mono text-sm uppercase tracking-wider transition-all duration-300"
              style={{
                color: activeTab === category ? 'var(--bg-primary)' : 'var(--text-secondary)',
                backgroundColor: activeTab === category ? 'transparent' : 'var(--bg-glass)',
                border: `1px solid ${activeTab === category ? 'transparent' : 'var(--border-subtle)'}`
              }}
            >
              {activeTab === category && (
                <motion.div
                  className="absolute inset-0 rounded-full -z-10"
                  layoutId="activeTab"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-second) 100%)'
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              {category}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-20"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 30 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {(skills[activeTab] ?? []).map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Tech Marquee */}
        <TechMarquee />
      </div>
    </section>
  );
}

interface SkillCardProps {
  skill: {
    name: string;
    level: number;
    icon: string;
  };
  index: number;
}

function SkillCard({ skill, index }: SkillCardProps) {
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setProgress(skill.level);
      }, index * 50);
      return () => clearTimeout(timer);
    }
  }, [isInView, skill.level, index]);

  return (
    <motion.div
      ref={cardRef}
      className="group p-5 rounded-2xl backdrop-blur transition-all duration-300 hover:-translate-y-2 cursor-pointer"
      style={{
        backgroundColor: 'var(--bg-glass)',
        border: '1px solid var(--border-subtle)'
      }}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{
        borderColor: 'var(--accent-primary)',
        boxShadow: '0 0 20px var(--accent-glow)'
      }}
    >
      {/* Icon */}
      <div className="text-3xl mb-3">{skill.icon}</div>

      {/* Name */}
      <h3 
        className="font-display font-semibold text-base mb-3"
        style={{ color: 'var(--text-primary)' }}
      >
        {skill.name}
      </h3>

      {/* Progress Bar */}
      <div 
        className="h-1.5 rounded-full overflow-hidden"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-second) 100%)'
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>

      {/* Percentage */}
      <p 
        className="font-mono text-xs mt-2 text-right"
        style={{ color: 'var(--text-secondary)' }}
      >
        {progress}%
      </p>
    </motion.div>
  );
}

function TechMarquee() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="relative overflow-hidden py-8"
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <p 
        className="font-mono text-sm uppercase tracking-widest mb-6 text-center"
        style={{ color: 'var(--accent-primary)' }}
      >
        Tech I Love
      </p>

      {/* First Row */}
      <div className="flex gap-8 mb-4 animate-[marquee_30s_linear_infinite]">
        {[...techMarquee, ...techMarquee].map((tech, i) => (
          <div
            key={`row1-${i}`}
            className="flex-shrink-0 px-6 py-3 rounded-full backdrop-blur"
            style={{
              backgroundColor: 'var(--bg-glass)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)'
            }}
          >
            <span className="font-mono text-sm whitespace-nowrap">{tech}</span>
          </div>
        ))}
      </div>

      {/* Second Row (Reverse) */}
      <div className="flex gap-8 animate-[marquee_35s_linear_infinite_reverse]">
        {[...techMarquee, ...techMarquee].map((tech, i) => (
          <div
            key={`row2-${i}`}
            className="flex-shrink-0 px-6 py-3 rounded-full backdrop-blur"
            style={{
              backgroundColor: 'var(--bg-glass)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)'
            }}
          >
            <span className="font-mono text-sm whitespace-nowrap">{tech}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
