import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, BookOpen, BarChart3 } from 'lucide-react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { MusicPlayerWidget } from './MusicPlayerWidget';

const glass =
  'rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:shadow-[var(--shadow-soft-hover)]';

const socialPills = [
  { icon: Github, href: 'https://github.com/Mzaq1559', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/muhammad-zulqarnain-26276b319', label: 'LinkedIn' },
  { icon: BookOpen, href: 'https://mzaq1559.github.io/My-Learning-Diary/', label: 'Blog' },
  { icon: BarChart3, href: 'https://www.kaggle.com/mzaq1559', label: 'Kaggle' }
];

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

export function BentoWidgets() {
  const [now, setNow] = useState(() => new Date());
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const y = now.getFullYear();
  const m = now.getMonth();
  const d = now.getDate();
  const firstDow = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const monthLabel = now.toLocaleString('default', { month: 'long', year: 'numeric' });

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) cells.push(day);

  return (
    <div className="flex flex-col gap-3 w-full h-full min-h-[320px] md:min-h-[520px]">
      {/* Row: clock + calendar */}
      <div className="grid grid-cols-2 gap-3 shrink-0">
        <motion.div
          className={`${glass} p-4 flex flex-col justify-center items-center`}
          style={{
            background: 'var(--bg-glass)',
            borderColor: 'var(--border-glass)',
            boxShadow: 'var(--shadow-soft)'
          }}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--text-secondary)' }}>
            Local time
          </p>
          <p
            className="font-mono text-3xl sm:text-4xl font-semibold tabular-nums tracking-tight"
            style={{ color: 'var(--accent-primary)' }}
          >
            {pad(now.getHours())}:{pad(now.getMinutes())}
          </p>
          <p className="font-mono text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            {now.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
          </p>
        </motion.div>

        <motion.div
          className={`${glass} p-3 overflow-hidden`}
          style={{
            background: 'var(--bg-glass)',
            borderColor: 'var(--border-glass)',
            boxShadow: 'var(--shadow-soft)'
          }}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <p className="font-display font-semibold text-sm text-center mb-2" style={{ color: 'var(--text-primary)' }}>
            {monthLabel}
          </p>
          <div className="grid grid-cols-7 gap-0.5 text-center">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, di) => (
              <span key={`dow-${di}`} className="font-mono text-[9px] text-[var(--text-secondary)]">
                {day}
              </span>
            ))}
            {cells.map((day, i) => (
              <span
                key={`c-${i}`}
                className="font-mono text-[10px] leading-6 rounded-full"
                style={{
                  backgroundColor: day === d ? 'var(--accent-primary)' : 'transparent',
                  color: day === null ? 'transparent' : day === d ? '#ffffff' : 'var(--text-primary)'
                }}
              >
                {day ?? ''}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Music player */}
      <motion.div
        className={`${glass} p-4 flex-1 flex flex-col justify-center`}
        style={{
          background: 'var(--bg-glass)',
          borderColor: 'var(--border-glass)',
          boxShadow: 'var(--shadow-soft)'
        }}
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <MusicPlayerWidget />
      </motion.div>

      {/* Social pills */}
      <div className="flex flex-wrap gap-2 justify-center shrink-0">
        {socialPills.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-full font-mono text-xs transition-all duration-300 hover:-translate-y-0.5 ${glass}`}
            style={{
              background: 'var(--bg-glass)',
              borderColor: 'var(--border-glass)',
              boxShadow: 'var(--shadow-soft)',
              color: 'var(--text-primary)'
            }}
            aria-label={label}
          >
            <Icon className="w-3.5 h-3.5" style={{ color: 'var(--accent-primary)' }} />
            {label}
          </a>
        ))}
      </div>

    </div>
  );
}
