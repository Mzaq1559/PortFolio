import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { projects } from '../../../data/projects';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

const categories = ['All', ...Array.from(new Set(projects.map((project) => project.category)))];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const prefersReducedMotion = useReducedMotion();

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section
      id="projects"
      className="py-24 px-6 md:px-16 lg:px-32"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p
            className="font-mono text-sm uppercase tracking-widest mb-4"
            style={{ color: 'var(--accent-primary)' }}
          >
            &lt; MY WORK /&gt;
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-bold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Featured Projects
          </h2>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveFilter(category)}
              aria-pressed={activeFilter === category}
              className="relative px-5 py-2.5 rounded-full font-mono text-sm uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
              style={{
                color: activeFilter === category ? 'var(--bg-primary)' : 'var(--text-secondary)',
                backgroundColor:
                  activeFilter === category ? 'var(--accent-primary)' : 'var(--bg-glass)',
                border: `1px solid ${
                  activeFilter === category ? 'var(--accent-primary)' : 'var(--border-subtle)'
                }`,
              }}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div
          layout
          className="grid grid-flow-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                featured={project.featured}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <a
            href="https://github.com/Mzaq1559?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
            style={{
              color: 'var(--accent-primary)',
              border: '2px solid var(--accent-primary)',
              backgroundColor: 'transparent',
            }}
          >
            View All Repositories
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: {
    id: number | string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    liveUrl: string | null;
    githubUrl: string;
  };
  index: number;
  featured: boolean;
}

function ProjectCard({ project, index, featured }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      layout
      className={`group relative rounded-2xl overflow-hidden ${
        featured ? 'md:col-span-2' : ''
      }`}
      style={{
        backgroundColor: 'var(--bg-glass)',
        border: '1px solid var(--border-subtle)',
      }}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -12 }}
      transition={{ duration: 0.35, delay: prefersReducedMotion ? 0 : Math.min(index * 0.04, 0.2) }}
      whileHover={prefersReducedMotion ? {} : { y: -6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={featured ? 'md:flex md:flex-row' : ''}>
        <div className={`relative overflow-hidden ${
          featured ? 'md:w-1/2 aspect-[4/3]' : 'h-56'
        }`}>
          <motion.img
            src={project.image}
            alt={`${project.title} project preview`}
            className="w-full h-full object-cover"
            width={800}
            height={600}
            loading="lazy"
            decoding="async"
            animate={prefersReducedMotion ? {} : { scale: isHovered ? 1.03 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, transparent 50%, rgba(15, 23, 42, 0.2) 100%)',
            }}
          />
        </div>

        <div
          className={`p-6 ${
            featured ? 'md:w-1/2 md:flex md:flex-col md:justify-center' : ''
          }`}
        >
          <h3
            className="font-display text-xl md:text-2xl font-bold mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            {project.title}
          </h3>

          <p
            className="text-sm md:text-base mb-4 leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full font-mono text-xs"
                style={{
                  backgroundColor: 'rgba(77, 191, 176, 0.1)',
                  color: 'var(--accent-primary)',
                  border: '1px solid rgba(77, 191, 176, 0.2)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {project.liveUrl && /^https?:\/\//.test(project.liveUrl) && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wide transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: 'var(--bg-primary)',
                }}
              >
                Live Demo <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wide transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
              style={{
                color: 'var(--text-primary)',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'rgba(255,255,255,0.45)',
              }}
            >
              GitHub <Github className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
