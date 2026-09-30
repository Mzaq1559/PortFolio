import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Clock, Send, Github, Linkedin, BookOpen, BarChart3 } from 'lucide-react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'muhammadzulqarnain1559@gmail.com', href: 'mailto:muhammadzulqarnain1559@gmail.com' },
  { icon: MapPin, label: 'Location', value: 'Taxila, Pakistan', href: null },
  { icon: Clock, label: 'Availability', value: 'Open to opportunities', href: null }
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/Mzaq1559', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/muhammad-zulqarnain-26276b319', label: 'LinkedIn' },
  { icon: BookOpen, href: 'https://mzaq1559.github.io/My-Learning-Diary/', label: 'Blog' },
  { icon: BarChart3, href: 'https://www.kaggle.com/mzaq1559', label: 'Kaggle' }
];

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shake, setShake] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const validateForm = () => {
    const next: Record<string, string> = {};
    if (!formData.name.trim()) next.name = 'Name is required';
    if (!formData.email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) next.email = 'Invalid email address';
    if (!formData.subject.trim()) next.subject = 'Subject is required';
    if (!formData.message.trim()) next.message = 'Message is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setShake(true);
      window.setTimeout(() => setShake(false), 500);
      return;
    }

    setIsSubmitting(true);
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`;
    const mailto = `mailto:muhammadzulqarnain1559@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    window.setTimeout(() => setIsSubmitting(false), 700);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-16 lg:px-32" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-sm uppercase tracking-widest mb-4" style={{ color: 'var(--accent-primary)' }}>
            &lt; GET IN TOUCH /&gt;
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Let&apos;s Build Something Amazing
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-lg mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Have a project in mind or just want to chat? I&apos;m always open to discussing new opportunities,
              creative ideas, or partnerships.
            </p>

            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                const content = (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--accent-glow)' }}>
                      <Icon className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                    </div>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-secondary)' }}>{info.label}</p>
                      <p className="font-display text-base" style={{ color: 'var(--text-primary)' }}>{info.value}</p>
                    </div>
                  </div>
                );
                return info.href ? <a key={index} href={info.href} className="block transition-transform duration-300 hover:translate-x-2">{content}</a> : <div key={index}>{content}</div>;
              })}
            </div>

            <div>
              <p className="font-mono text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--text-secondary)' }}>Connect with me</p>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_var(--accent-glow)] hover:-translate-y-1"
                      style={{ backgroundColor: 'var(--bg-glass)', border: '1px solid var(--border-subtle)' }}
                      aria-label={social.label}>
                      <Icon className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} noValidate className={shake ? 'animate-[shake_0.5s]' : ''}>
              {[
                { field: 'name', label: 'Your Name', type: 'text' },
                { field: 'email', label: 'Your Email', type: 'email' },
                { field: 'subject', label: 'Subject', type: 'text' }
              ].map(({ field, label, type }) => (
                <div className="mb-6" key={field}>
                  <label htmlFor={field} className="sr-only">{label}</label>
                  <input
                    id={field}
                    type={type}
                    placeholder={label}
                    value={formData[field as keyof typeof formData]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    autoComplete={field === 'name' ? 'name' : field === 'email' ? 'email' : 'off'}
                    aria-invalid={Boolean(errors[field])}
                    aria-describedby={errors[field] ? `${field}-error` : undefined}
                    className="w-full px-6 py-4 rounded-xl font-mono text-sm transition-all duration-300 bg-white/40 border-2 border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-slate-500 focus-visible:outline-none focus-visible:border-[var(--accent-primary)] focus-visible:ring-4 focus-visible:ring-[var(--accent-glow)]"
                  />
                  {errors[field] && <p id={`${field}-error`} className="mt-2 text-sm text-red-600">{errors[field]}</p>}
                </div>
              ))}

              <div className="mb-6">
                <label htmlFor="message" className="sr-only">Your Message</label>
                <textarea
                  id="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={5}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className="w-full px-6 py-4 rounded-xl font-mono text-sm transition-all duration-300 resize-none bg-white/40 border-2 border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-slate-500 focus-visible:outline-none focus-visible:border-[var(--accent-primary)] focus-visible:ring-4 focus-visible:ring-[var(--accent-glow)]"
                />
                {errors.message && <p id="message-error" className="mt-2 text-sm text-red-600">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl font-mono text-sm uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-[0_8px_30px_var(--accent-glow)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--accent-glow)]"
                style={{ background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-second) 100%)', color: 'var(--bg-primary)' }}
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? 'Opening email…' : 'Send Message'}
                  <Send className="w-4 h-4" />
                </span>
              </button>

              <p className="mt-3 text-center text-xs" style={{ color: 'var(--text-secondary)' }}>
                Submitting opens your email app with the message pre-filled.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
