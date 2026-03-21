import { useState, useEffect, type CSSProperties } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  Home,
  User,
  Code2,
  FolderKanban,
  Mail,
  Github,
  Linkedin,
  BarChart3
} from 'lucide-react';
import { useScrollSpy } from '../../../hooks/useScrollSpy';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import avatarImg from '../../../avatar.png';

const navLinks = [
  { name: 'Home', href: '#hero', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Skills', href: '#skills', icon: Code2 },
  { name: 'Projects', href: '#projects', icon: FolderKanban },
  { name: 'Contact', href: '#contact', icon: Mail }
];

const connectLinks = [
  { name: 'GitHub', href: 'https://github.com/Mzaq1559', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/zulqarnain', icon: Linkedin },
  { name: 'Kaggle', href: 'https://kaggle.com/zulqarnain', icon: BarChart3 }
];

const cardStyle: CSSProperties = {
  background: 'var(--sidebar-card-bg)',
  border: '1px solid var(--sidebar-card-border)',
  boxShadow: 'var(--sidebar-card-shadow)'
};

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useScrollSpy(navLinks.map((link) => link.href.substring(1)), 100);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const linkBase =
    'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-mono text-sm transition-all duration-300 hover:-translate-y-0.5';

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-5 left-5 z-50 md:hidden p-3 rounded-2xl transition-all duration-300 hover:shadow-[var(--shadow-soft-hover)]"
        style={{
          backgroundColor: 'var(--bg-glass)',
          border: '1px solid var(--border-glass)',
          color: 'var(--text-primary)',
          boxShadow: 'var(--shadow-soft)'
        }}
        aria-label="Toggle sidebar"
      >
        {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <aside className="hidden md:flex fixed top-0 left-0 z-40 h-screen w-[320px] p-6 min-h-0">
        <motion.div
          className="flex flex-col h-full min-h-0 w-full max-h-full rounded-3xl px-5 py-6 backdrop-blur-xl overflow-hidden"
          style={cardStyle}
          initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
        >
          {/* Top — fixed */}
          <div className="shrink-0">
            <img
              src={avatarImg}
              alt="Muhammad Zulqarnain"
              className="w-[120px] h-[120px] rounded-full object-cover border-4 mb-4 mx-auto md:mx-0"
              style={{
                borderColor: 'var(--accent-primary)',
                boxShadow: '0 8px 24px var(--accent-glow)'
              }}
            />

            <h2 className="font-display font-bold leading-snug tracking-tight text-center md:text-left">
              <span className="block text-[1.1rem] md:text-[1.2rem]" style={{ color: 'var(--hero-name-line1)' }}>
                Muhammad
              </span>
              <span
                className="block text-[1.3rem] md:text-[1.45rem] mt-0.5"
                style={{
                  background: 'var(--hero-name-gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Zulqarnain
              </span>
            </h2>
            <p
              className="font-mono text-[11px] uppercase mt-2 tracking-wider text-center md:text-left"
              style={{ color: 'var(--text-secondary)' }}
            >
              Dev & Data Engineer
            </p>
            <p className="font-mono text-[11px] mt-1 text-center md:text-left" style={{ color: 'var(--text-secondary)' }}>
              UET Taxila · CS
            </p>
            <span
              className="mt-3 inline-flex w-fit mx-auto md:mx-0 px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-wider"
              style={{
                color: '#b4536b',
                backgroundColor: 'rgba(244, 168, 184, 0.35)',
                border: '1px solid rgba(244, 168, 184, 0.55)'
              }}
            >
              Open to work
            </span>
          </div>

          {/* Menu — scrolls if needed */}
          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden mt-5 pr-1 -mr-1">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--text-secondary)' }}>
              Menu
            </p>
            <div className="space-y-2 pb-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className={linkBase}
                    style={{
                      backgroundColor: isActive ? 'rgba(77, 191, 176, 0.2)' : 'rgba(255,255,255,0.35)',
                      color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      border: isActive ? '1px solid rgba(77, 191, 176, 0.45)' : '1px solid rgba(255,255,255,0.5)',
                      boxShadow: isActive ? 'var(--shadow-soft)' : 'none'
                    }}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {link.name}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Connect + CTA — always visible */}
          <div className="shrink-0 pt-4 mt-2 border-t border-white/50">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--text-secondary)' }}>
              Connect
            </p>
            <div className="space-y-2 mb-4">
              {connectLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkBase}`}
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.45)',
                      border: '1px solid var(--border-glass)',
                      color: 'var(--text-secondary)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--accent-primary)';
                      e.currentTarget.style.borderColor = 'rgba(77, 191, 176, 0.5)';
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.75)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.borderColor = 'var(--border-glass)';
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.45)';
                    }}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {link.name}
                  </a>
                );
              })}
            </div>
            <button
              onClick={() => scrollToSection('#contact')}
              className="w-full py-3.5 rounded-xl font-mono text-sm uppercase tracking-widest transition-all duration-300 hover:shadow-[var(--shadow-soft-hover)] hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, var(--accent-primary) 0%, #6ec9bd 100%)',
                color: '#ffffff',
                boxShadow: '0 8px 24px var(--accent-glow)'
              }}
            >
              Hire Me
            </button>
          </div>
        </motion.div>
      </aside>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-30 md:hidden backdrop-blur-sm"
              style={{ backgroundColor: 'rgba(30, 41, 59, 0.2)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.aside
              className="fixed top-0 left-0 z-40 h-screen w-[min(290px,92vw)] p-4 md:hidden flex flex-col min-h-0"
              initial={prefersReducedMotion ? { x: -320 } : { x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
            >
              <div
                className="flex flex-col h-full min-h-0 max-h-full rounded-3xl p-5 backdrop-blur-xl overflow-hidden"
                style={cardStyle}
              >
                <div className="shrink-0">
                  <img
                    src={avatarImg}
                    alt="Muhammad Zulqarnain"
                    className="w-[100px] h-[100px] rounded-full object-cover border-4 mb-4 mx-auto"
                    style={{
                      borderColor: 'var(--accent-primary)',
                      boxShadow: '0 8px 24px var(--accent-glow)'
                    }}
                  />
                  <h2 className="font-display font-bold leading-snug text-center">
                    <span className="block text-[1rem]" style={{ color: 'var(--hero-name-line1)' }}>
                      Muhammad
                    </span>
                    <span
                      className="block text-[1.15rem] mt-0.5"
                      style={{
                        background: 'var(--hero-name-gradient)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      Zulqarnain
                    </span>
                  </h2>
                  <p className="font-mono text-[10px] uppercase tracking-wider mt-2 text-center" style={{ color: 'var(--text-secondary)' }}>
                    Dev & Data Engineer
                  </p>
                </div>

                <div className="flex-1 min-h-0 overflow-y-auto mt-4 pr-1">
                  <div className="space-y-2">
                    {navLinks.map((link) => {
                      const Icon = link.icon;
                      const isActive = activeSection === link.href.substring(1);
                      return (
                        <a
                          key={link.name}
                          href={link.href}
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection(link.href);
                            setIsMobileMenuOpen(false);
                          }}
                          className={linkBase}
                          style={{
                            backgroundColor: isActive ? 'rgba(77, 191, 176, 0.2)' : 'rgba(255,255,255,0.35)',
                            color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                            border: isActive ? '1px solid rgba(77, 191, 176, 0.45)' : '1px solid rgba(255,255,255,0.5)'
                          }}
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          {link.name}
                        </a>
                      );
                    })}
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/50">
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--text-secondary)' }}>
                      Connect
                    </p>
                    <div className="space-y-2">
                      {connectLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                          <a
                            key={link.name}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={linkBase}
                            style={{
                              backgroundColor: 'rgba(255,255,255,0.45)',
                              border: '1px solid var(--border-glass)',
                              color: 'var(--text-secondary)'
                            }}
                          >
                            <Icon className="w-4 h-4 shrink-0" />
                            {link.name}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 pt-3">
                  <button
                    onClick={() => {
                      scrollToSection('#contact');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-3.5 rounded-xl font-mono text-sm uppercase tracking-widest transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent-primary) 0%, #6ec9bd 100%)',
                      color: '#ffffff',
                      boxShadow: '0 8px 24px var(--accent-glow)'
                    }}
                  >
                    Hire Me
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
