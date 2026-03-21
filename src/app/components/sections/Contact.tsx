import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Clock, Send, CheckCircle, Github, Linkedin, BarChart3 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'zulqarnain.dev@gmail.com',
    href: 'mailto:zulqarnain.dev@gmail.com'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Taxila, Pakistan',
    href: null
  },
  {
    icon: Clock,
    label: 'Availability',
    value: 'Open to opportunities',
    href: null
  }
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/Mzaq1559', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/zulqarnain', label: 'LinkedIn' },
  { icon: BarChart3, href: 'https://kaggle.com/zulqarnain', label: 'Kaggle' }
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shake, setShake] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setIsSubmitting(true);

    // EmailJS configuration
    // Replace with your actual EmailJS credentials
    const SERVICE_ID = 'YOUR_SERVICE_ID';
    const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

    try {
      // Simulating EmailJS call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Actual EmailJS call (uncomment and configure):
      // await emailjs.send(
      //   SERVICE_ID,
      //   TEMPLATE_ID,
      //   {
      //     from_name: formData.name,
      //     from_email: formData.email,
      //     subject: formData.subject,
      //     message: formData.message
      //   },
      //   PUBLIC_KEY
      // );

      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setErrors({ submit: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <section 
      id="contact" 
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
            &lt; GET IN TOUCH /&gt;
          </p>
          <h2 
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            Let's Build Something Amazing
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left - Contact Info */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -40 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p 
              className="text-lg mb-8 leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Have a project in mind or just want to chat? I'm always open to discussing new opportunities, 
              creative ideas, or partnerships.
            </p>

            {/* Contact Info Items */}
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                const content = (
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: 'var(--accent-glow)',
                        boxShadow: '0 0 20px var(--accent-glow)'
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                    </div>
                    <div>
                      <p 
                        className="font-mono text-xs uppercase tracking-wider mb-1"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {info.label}
                      </p>
                      <p 
                        className="font-display text-base"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {info.value}
                      </p>
                    </div>
                  </div>
                );

                return info.href ? (
                  <a 
                    key={index} 
                    href={info.href}
                    className="block transition-transform duration-300 hover:translate-x-2"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={index}>{content}</div>
                );
              })}
            </div>

            {/* Social Links */}
            <div>
              <p 
                className="font-mono text-sm uppercase tracking-wider mb-4"
                style={{ color: 'var(--text-secondary)' }}
              >
                Connect with me
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_var(--accent-glow)] hover:-translate-y-1"
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
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 40 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className={shake ? 'animate-[shake_0.5s]' : ''}>
                {/* Name Field */}
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-6 py-4 rounded-xl font-mono text-sm transition-all duration-300 outline-none"
                    style={{
                      backgroundColor: 'var(--bg-glass)',
                      border: `2px solid ${errors.name ? '#ef4444' : 'var(--border-subtle)'}`,
                      color: 'var(--text-primary)'
                    }}
                    onFocus={(e) => {
                      if (!errors.name) {
                        e.target.style.borderColor = 'var(--accent-primary)';
                        e.target.style.boxShadow = '0 0 20px var(--accent-glow)';
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.name) {
                        e.target.style.borderColor = 'var(--border-subtle)';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="mb-6">
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-6 py-4 rounded-xl font-mono text-sm transition-all duration-300 outline-none"
                    style={{
                      backgroundColor: 'var(--bg-glass)',
                      border: `2px solid ${errors.email ? '#ef4444' : 'var(--border-subtle)'}`,
                      color: 'var(--text-primary)'
                    }}
                    onFocus={(e) => {
                      if (!errors.email) {
                        e.target.style.borderColor = 'var(--accent-primary)';
                        e.target.style.boxShadow = '0 0 20px var(--accent-glow)';
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.email) {
                        e.target.style.borderColor = 'var(--border-subtle)';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Subject Field */}
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full px-6 py-4 rounded-xl font-mono text-sm transition-all duration-300 outline-none"
                    style={{
                      backgroundColor: 'var(--bg-glass)',
                      border: `2px solid ${errors.subject ? '#ef4444' : 'var(--border-subtle)'}`,
                      color: 'var(--text-primary)'
                    }}
                    onFocus={(e) => {
                      if (!errors.subject) {
                        e.target.style.borderColor = 'var(--accent-primary)';
                        e.target.style.boxShadow = '0 0 20px var(--accent-glow)';
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.subject) {
                        e.target.style.borderColor = 'var(--border-subtle)';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  />
                  {errors.subject && (
                    <p className="mt-2 text-sm text-red-500">{errors.subject}</p>
                  )}
                </div>

                {/* Message Field */}
                <div className="mb-6">
                  <textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={5}
                    className="w-full px-6 py-4 rounded-xl font-mono text-sm transition-all duration-300 outline-none resize-none"
                    style={{
                      backgroundColor: 'var(--bg-glass)',
                      border: `2px solid ${errors.message ? '#ef4444' : 'var(--border-subtle)'}`,
                      color: 'var(--text-primary)'
                    }}
                    onFocus={(e) => {
                      if (!errors.message) {
                        e.target.style.borderColor = 'var(--accent-primary)';
                        e.target.style.boxShadow = '0 0 20px var(--accent-glow)';
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.message) {
                        e.target.style.borderColor = 'var(--border-subtle)';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-mono text-sm uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_8px_30px_var(--accent-glow)]"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-second) 100%)',
                    color: 'var(--bg-primary)'
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" 
                           style={{ borderColor: 'var(--bg-primary)', borderTopColor: 'transparent' }} />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Send Message
                      <Send className="w-4 h-4" />
                    </span>
                  )}
                </button>

                {errors.submit && (
                  <p className="mt-4 text-sm text-red-500 text-center">{errors.submit}</p>
                )}
              </form>
            ) : (
              <motion.div
                className="text-center py-16"
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <motion.div
                  initial={prefersReducedMotion ? { scale: 1 } : { scale: 0 }}
                  animate={prefersReducedMotion ? { scale: 1 } : { scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <CheckCircle className="w-20 h-20 mx-auto mb-6" style={{ color: '#10b981' }} />
                </motion.div>
                <h3 
                  className="font-display text-2xl font-bold mb-3"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Message Sent Successfully!
                </h3>
                <p 
                  className="text-base mb-6"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Thank you for reaching out. I'll get back to you soon!
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-8 py-3 rounded-full font-mono text-sm uppercase tracking-wider transition-all duration-300"
                  style={{
                    color: 'var(--accent-primary)',
                    border: '2px solid var(--accent-primary)',
                    backgroundColor: 'transparent'
                  }}
                >
                  Send Another Message
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
