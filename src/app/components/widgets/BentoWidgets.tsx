import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Github, Linkedin, BookOpen, BarChart3 } from 'lucide-react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

const glass =
  'rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:shadow-[var(--shadow-soft-hover)]';

const socialPills = [
  { icon: Github, href: 'https://github.com/Mzaq1559', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/muhammad-zulqarnain-26276b319', label: 'LinkedIn' },
  { icon: BookOpen, href: 'https://mzaq1559.github.io/Blog_Website-My-Learning-Diary-/', label: 'Blog' },
  { icon: BarChart3, href: 'https://www.kaggle.com/mzaq1559', label: 'Kaggle' }
];

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

export function BentoWidgets() {
  const [now, setNow] = useState(() => new Date());
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0.35);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setProgress((p) => (p >= 1 ? 0 : p + 0.008));
    }, 400);
    return () => clearInterval(t);
  }, [playing]);

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
        className={`${glass} p-4 shrink-0`}
        style={{
          background: 'var(--bg-glass)',
          borderColor: 'var(--border-glass)',
          boxShadow: 'var(--shadow-soft)'
        }}
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPlaying(!playing)}
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, var(--accent-primary), #6ec9bd)',
              color: '#fff',
              boxShadow: '0 4px 16px var(--accent-glow)'
            }}
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 pl-0.5" />}
          </button>
          <div className="min-w-0 flex-1">
            <p className="font-display font-semibold text-sm truncate" style={{ color: 'var(--text-primary)' }}>
              Close To You
            </p>
            <p className="font-mono text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
              Focus playlist · chill
            </p>
            <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(77,191,176,0.2)' }}>
              <div
                className="h-full rounded-full transition-[width] duration-300"
                style={{
                  width: `${Math.min(100, progress * 100)}%`,
                  background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-second))'
                }}
              />
            </div>
          </div>
        </div>
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

      {/* Recent + recommendation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 min-h-0">
        <motion.div
          className={`${glass} p-4 flex flex-col`}
          style={{
            background: 'var(--bg-glass)',
            borderColor: 'var(--border-glass)',
            boxShadow: 'var(--shadow-soft)'
          }}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <p className="font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: 'var(--accent-second)' }}>
            Recent
          </p>
          <div
            className="h-16 rounded-xl mb-2 bg-cover bg-center"
            style={{
              backgroundImage: 'linear-gradient(135deg, rgba(77,191,176,0.35), rgba(244,168,184,0.35))'
            }}
          />
          <p className="font-display font-semibold text-sm leading-snug" style={{ color: 'var(--text-primary)' }}>
            Portfolio Website — Vite + React
          </p>
          <p className="font-mono text-[10px] mt-1" style={{ color: 'var(--text-secondary)' }}>
            In progress · 2024
          </p>
        </motion.div>

        <motion.div
          className={`${glass} p-4 flex flex-col justify-center`}
          style={{
            background: 'var(--bg-glass)',
            borderColor: 'var(--border-glass)',
            boxShadow: 'var(--shadow-soft)'
          }}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: 'var(--accent-primary)' }}>
            Pick for you
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="px-2 py-1 rounded-lg font-mono text-xs font-medium"
              style={{ background: 'rgba(77,191,176,0.2)', color: 'var(--accent-primary)' }}
            >
              TypeScript
            </span>
            <span
              className="px-2 py-1 rounded-lg font-mono text-xs font-medium"
              style={{ background: 'rgba(244,168,184,0.35)', color: '#b4536b' }}
            >
              JavaScript
            </span>
          </div>
          <p className="text-xs mt-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Strong typing + modern ES — a cozy stack for APIs & dashboards.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
