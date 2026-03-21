import { Github, Linkedin, BarChart3, Heart, Coffee } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/Mzaq1559', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/zulqarnain', label: 'LinkedIn' },
  { icon: BarChart3, href: 'https://kaggle.com/zulqarnain', label: 'Kaggle' }
];

const quickLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' }
];

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer 
      className="relative pt-16 pb-8 px-6 md:px-16 lg:px-32"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)'
      }}
    >
      {/* Gradient Border Top */}
      <div 
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-second) 100%)'
        }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Tagline */}
          <div>
            <div 
              className="font-display text-3xl font-bold mb-3"
              style={{
                background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-second) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              MZ
            </div>
            <p className="font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
              Dev & Data Engineer - UET Taxila, Computer Science.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg mb-4" style={{ color: 'var(--text-primary)' }}>
              Quick Links
            </h3>
            <div className="flex flex-wrap gap-4">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="font-mono text-sm transition-colors duration-300 hover:text-[var(--accent-primary)]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-display text-lg mb-4" style={{ color: 'var(--text-primary)' }}>
              Connect
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_var(--accent-glow)] hover:-translate-y-1"
                    style={{
                      backgroundColor: 'var(--bg-glass)',
                      border: '1px solid var(--border-subtle)'
                    }}
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div 
          className="pt-8 text-center border-t"
          style={{ 
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-secondary)' 
          }}
        >
          <p className="font-mono text-sm flex items-center justify-center gap-2 flex-wrap">
            <span>© 2026 Muhammad Zulqarnain. Crafted with</span>
            <Heart className="w-4 h-4 inline-block" style={{ color: 'var(--accent-primary)' }} />
            <span>and</span>
            <Coffee className="w-4 h-4 inline-block" style={{ color: 'var(--accent-second)' }} />
          </p>
        </div>
      </div>
    </footer>
  );
}
