import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { skills } from '../../../data/skills';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

type ProficiencyLevel = 'Proficient' | 'Comfortable' | 'Learning';

const categories = Object.keys(skills) as Array<keyof typeof skills>;
const defaultTab = categories[0] as keyof typeof skills;

/* ── Proficiency badge style map ─────────────────────────────── */
const proficiencyStyles: Record<
  ProficiencyLevel,
  { label: string; bg: string; color: string; border: string; borderStyle?: string }
> = {
  Proficient: {
    label: 'Proficient',
    bg: 'rgba(77, 191, 176, 0.18)',
    color: '#2a9d8f',
    border: '1.5px solid #4dbfb0',
    borderStyle: 'solid',
  },
  Comfortable: {
    label: 'Comfortable',
    bg: 'transparent',
    color: '#4dbfb0',
    border: '1.5px solid #4dbfb0',
    borderStyle: 'solid',
  },
  Learning: {
    label: 'Learning',
    bg: 'transparent',
    color: '#94a3b8',
    border: '1.5px dashed #94a3b8',
    borderStyle: 'dashed',
  },
};

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
            Technologies &amp; Tools
          </h2>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className="relative px-5 py-2.5 rounded-full font-mono text-sm uppercase tracking-wider transition-all duration-300"
              style={{
                color: activeTab === category ? 'var(--bg-primary)' : 'var(--text-secondary)',
                backgroundColor:
                  activeTab === category ? 'transparent' : 'var(--bg-glass)',
                border: `1px solid ${
                  activeTab === category ? 'transparent' : 'var(--border-subtle)'
                }`,
              }}
            >
              {activeTab === category && (
                <motion.div
                  className="absolute inset-0 rounded-full -z-10"
                  layoutId="activeTab"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-second) 100%)',
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

        {/* Proficiency Legend */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {(Object.keys(proficiencyStyles) as ProficiencyLevel[]).map((level) => {
            const s = proficiencyStyles[level];
            return (
              <span
                key={level}
                className="flex items-center gap-2 px-3 py-1 rounded-full font-mono text-xs"
                style={{
                  background: s.bg,
                  color: s.color,
                  border: s.border,
                }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: s.color }}
                />
                {s.label}
              </span>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ── SkillCard ───────────────────────────────────────────────── */
interface SkillCardProps {
  skill: {
    name: string;
    proficiency: string;
    icon: string;
  };
  index: number;
}

function SkillCard({ skill, index }: SkillCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const level = skill.proficiency as ProficiencyLevel;
  const style = proficiencyStyles[level] ?? proficiencyStyles['Comfortable'];

  return (
    <motion.div
      className="group p-5 rounded-2xl backdrop-blur transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col gap-3"
      style={{
        backgroundColor: 'var(--bg-glass)',
        border: '1px solid var(--border-subtle)',
      }}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{
        borderColor: 'var(--accent-primary)',
        boxShadow: '0 0 20px var(--accent-glow)',
      }}
    >
      {/* Icon */}
      <div className="text-3xl">{skill.icon}</div>

      {/* Name */}
      <h3
        className="font-display font-semibold text-base leading-snug"
        style={{ color: 'var(--text-primary)' }}
      >
        {skill.name}
      </h3>

      {/* Proficiency Badge */}
      <span
        className="self-start px-2.5 py-0.5 rounded-full font-mono text-xs tracking-wide"
        style={{
          background: style.bg,
          color: style.color,
          border: style.border,
        }}
      >
        {style.label}
      </span>
    </motion.div>
  );
}
