import { motion } from 'motion/react';
import React from 'react';
import { experience, education } from '../../../data/experience';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import CardSwap, { Card } from '../widgets/CardSwap';
import './ExperienceSwap.css';

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
            Practical Experience
          </h2>
        </motion.div>

        {/* Experience Card Stack */}
        <div className="exp-swap-wrap mb-20">
          <CardSwap
            className="exp-swap"
            width={480}
            height={440}
            cardDistance={44}
            verticalDistance={56}
            delay={5000}
            autoplay
            pauseOnHover
            draggable
            visibleCards={4}
            theme="light"
          >
            {experience.map((exp) => (
              <Card key={exp.id}>
                <div className="exp-swap-body">
                  <div className="mb-4">{exp.logo}</div>

                  <h3
                    className="font-display text-xl font-bold mb-1"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {exp.role}
                  </h3>
                  <p
                    className="font-display text-base"
                    style={{ color: 'var(--accent-primary)', fontWeight: 600 }}
                  >
                    {exp.company}
                  </p>
                  <p
                    className="font-mono text-sm mt-1 mb-4"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {exp.period}
                  </p>

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
              </Card>
            ))}
          </CardSwap>
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
            Education
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

interface EducationCardProps {
  edu: {
    degree: string;
    institution: string;
    year: string;
    icon: React.ReactNode;
  };
  index: number;
}

function EducationCard({ edu, index }: EducationCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_var(--accent-glow)]"
      style={{
        backgroundColor: 'var(--bg-glass)',
        border: '1px solid var(--border-subtle)'
      }}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="mb-4">{edu.icon}</div>
      
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
