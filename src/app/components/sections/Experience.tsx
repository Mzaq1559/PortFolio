import { motion } from 'motion/react';
import { experience, education } from '../../../data/experience';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

export function Experience() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section 
      id="experience" 
      className="py-24 px-6 md:px-16 lg:px-32"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-20"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p 
            className="font-mono text-sm uppercase tracking-widest mb-4"
            style={{ color: 'var(--accent-primary)' }}
          >
            &lt; MY JOURNEY /&gt;
          </p>
          <h2 
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            Experience & Education
          </h2>
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative mb-20">
          {/* Vertical Line */}
          <div 
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 hidden md:block"
            style={{
              background: 'linear-gradient(180deg, var(--accent-primary) 0%, var(--accent-second) 100%)'
            }}
          />

          {/* Mobile Vertical Line */}
          <div 
            className="absolute left-6 top-0 bottom-0 w-0.5 md:hidden"
            style={{
              background: 'linear-gradient(180deg, var(--accent-primary) 0%, var(--accent-second) 100%)'
            }}
          />

          {/* Experience Items */}
          <div className="space-y-12">
            {experience.map((exp, index) => (
              <ExperienceCard key={exp.id} exp={exp} index={index} />
            ))}
          </div>
        </div>

        {/* Education Section */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 
            className="font-display text-3xl font-bold mb-8 text-center"
            style={{ color: 'var(--text-primary)' }}
          >
            Education & Certifications
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <EducationCard key={edu.id} edu={edu} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface ExperienceCardProps {
  exp: {
    company: string;
    role: string;
    period: string;
    logo: string;
    responsibilities: string[];
    side: string;
  };
  index: number;
}

function ExperienceCard({ exp, index }: ExperienceCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const isLeft = exp.side === 'left';

  return (
    <div className={`relative ${isLeft ? 'md:pr-1/2' : 'md:pl-1/2'}`}>
      {/* Timeline Dot */}
      <div 
        className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 z-10"
        style={{
          backgroundColor: 'var(--accent-primary)',
          boxShadow: '0 0 12px var(--accent-primary)'
        }}
      />

      <motion.div
        className={`ml-16 md:ml-0 ${isLeft ? 'md:mr-16' : 'md:ml-16'}`}
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: isLeft ? -60 : 60 }}
        whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.2 }}
      >
        <div 
          className="p-6 rounded-2xl backdrop-blur hover:shadow-[0_0_30px_var(--accent-glow)] transition-all duration-300"
          style={{
            backgroundColor: 'var(--bg-glass)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          {/* Logo */}
          <div className="text-4xl mb-4">{exp.logo}</div>

          {/* Company & Role */}
          <div className="mb-3">
            <h3 
              className="font-display text-xl md:text-2xl font-bold mb-1"
              style={{ color: 'var(--text-primary)' }}
            >
              {exp.role}
            </h3>
            <p 
              className="font-display text-lg"
              style={{ 
                color: 'var(--accent-primary)',
                fontWeight: 600
              }}
            >
              {exp.company}
            </p>
          </div>

          {/* Period */}
          <p 
            className="font-mono text-sm mb-4"
            style={{ color: 'var(--text-secondary)' }}
          >
            {exp.period}
          </p>

          {/* Responsibilities */}
          <ul className="space-y-2">
            {exp.responsibilities.map((resp, i) => (
              <li 
                key={i}
                className="flex items-start gap-3 text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                <span 
                  className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: 'var(--accent-primary)' }}
                />
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

interface EducationCardProps {
  edu: {
    degree: string;
    institution: string;
    year: string;
    icon: string;
  };
  index: number;
}

function EducationCard({ edu, index }: EducationCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="p-6 rounded-2xl backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_var(--accent-glow)]"
      style={{
        backgroundColor: 'var(--bg-glass)',
        border: '1px solid var(--border-subtle)'
      }}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="text-4xl mb-4">{edu.icon}</div>
      
      <h4 
        className="font-display text-lg font-bold mb-2"
        style={{ color: 'var(--text-primary)' }}
      >
        {edu.degree}
      </h4>
      
      <p 
        className="text-sm mb-2"
        style={{ color: 'var(--accent-primary)' }}
      >
        {edu.institution}
      </p>
      
      <p 
        className="font-mono text-xs"
        style={{ color: 'var(--text-secondary)' }}
      >
        {edu.year}
      </p>
    </motion.div>
  );
}
