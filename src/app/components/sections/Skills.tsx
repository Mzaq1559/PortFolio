import { useState, type KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { skills } from '../../../data/skills';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import CurvedLoop from '../widgets/CurvedLoop';
import ChromaGrid, { type ChromaItem } from '../widgets/ChromaGrid';

type ProficiencyLevel = 'Proficient' | 'Comfortable' | 'Learning';

const categories = Object.keys(skills) as Array<keyof typeof skills>;
const defaultTab = categories[0] as keyof typeof skills;

const marqueeSkills = 'React • TypeScript • FastAPI • SQL Server • Python • C++ • AI/ML • Full-Stack';

/* ── Proficiency badge style map ─────────────────────────────── */
const proficiencyStyles: Record<
  ProficiencyLevel,
  { label: string; bg: string; color: string; border: string; borderStyle?: string; accent: string }
> = {
  Proficient: {
    label: 'Proficient',
    bg: 'rgba(77, 191, 176, 0.18)',
    color: '#2a9d8f',
    border: '1.5px solid #4dbfb0',
    borderStyle: 'solid',
    accent: '#4dbfb0',
  },
  Comfortable: {
    label: 'Comfortable',
    bg: 'transparent',
    color: '#0f766e',
    border: '1.5px solid #0f766e',
    borderStyle: 'solid',
    accent: '#0f766e',
  },
  Learning: {
    label: 'Learning',
    bg: 'transparent',
    color: '#94a3b8',
    border: '1.5px dashed #94a3b8',
    borderStyle: 'dashed',
    accent: '#94a3b8',
  },
};

/* Skills have emoji icons, not photos, so each icon is drawn into a small SVG tile for the grid. */
const iconArt = (icon: string) => {
  const glyph = String(icon ?? '').replace(/[<&>"']/g, '');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e6f7f4"/><stop offset="1" stop-color="#b8e6df"/></linearGradient></defs><rect width="400" height="300" fill="url(#g)"/><text x="200" y="168" font-size="110" text-anchor="middle" font-family="Segoe UI Emoji, Apple Color Emoji, Noto Color Emoji, sans-serif">${glyph}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

export function Skills() {
  const [activeTab, setActiveTab] = useState<keyof typeof skills>(defaultTab);
  const prefersReducedMotion = useReducedMotion();

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const currentIndex = categories.indexOf(activeTab);
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const offset = event.key === 'ArrowRight' ? 1 : -1;
    const next = categories[(currentIndex + offset + categories.length) % categories.length];
    setActiveTab(next);
  };

  const chromaItems: ChromaItem[] = (skills[activeTab] ?? []).map((skill) => {
    const level = skill.proficiency as ProficiencyLevel;
    const style = proficiencyStyles[level] ?? proficiencyStyles['Comfortable'];
    return {
      image: iconArt(skill.icon),
      title: skill.name,
      subtitle: style.label,
      accent: style.accent,
      alt: `${skill.name} icon`,
    };
  });

  return (
    <section
      id="skills"
      className="py-24 px-6 md:px-16 lg:px-32"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Curved skills marquee */}
        <div
          className="mb-10 overflow-hidden [&>div]:!min-h-0 [&>div]:!py-2"
          style={{ color: 'var(--accent-primary)' }}
          aria-hidden="true"
        >
          <CurvedLoop
            marqueeText={marqueeSkills}
            shape="line"
            fontSize={56}
            fontWeight={700}
            speed={1}
            interactive
            pauseOnHover
            edgeFade={0.15}
          />
        </div>

        {/* Category Tabs */}
        <motion.div
          role="tablist"
          aria-label="Skill categories"
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
              onKeyDown={handleTabKeyDown}
              role="tab"
              aria-selected={activeTab === category}
              aria-controls="skills-panel"
              id={`skill-tab-${String(category).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              tabIndex={activeTab === category ? 0 : -1}
              className="relative px-5 py-2.5 rounded-full font-mono text-sm uppercase tracking-wider transition-all duration-300"
              style={{
                color: activeTab === category ? '#ffffff' : 'var(--text-secondary)',
                backgroundColor:
                  activeTab === category ? 'transparent' : 'var(--bg-glass)',
                border: `1px solid ${
                  activeTab === category ? 'transparent' : 'var(--border-subtle)'
                }`,
              }}
            >
              {activeTab === category && (
                <motion.div
                  className="absolute inset-0 rounded-full z-0"
                  layoutId="activeTab"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-second) 100%)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className={`relative z-10 ${activeTab === category ? 'font-bold' : ''}`}>
                {category}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            id="skills-panel"
            role="tabpanel"
            aria-labelledby={`skill-tab-${String(activeTab).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
            className="mb-20"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 30 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <ChromaGrid
              items={chromaItems}
              columns={4}
              minCardWidth={170}
              gap={14}
              aspectRatio="4 / 3"
              theme="light"
              reveal="spotlight"
              grayscale={0}
              dim={0}
              radius={240}
              cardRadius={20}
            />
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
