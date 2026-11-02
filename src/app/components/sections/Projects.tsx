import { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { projects } from '../../../data/projects';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import ScrollStack, { ScrollStackItem } from '../widgets/ScrollStack';

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
      <div className="max-w-5xl mx-auto">
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

        {/* Keyed by filter so the stack resets to the first project on each change */}
        <ScrollStack
          key={activeFilter}
          useWindowScroll
          itemDistance={60}
          itemStackDistance={18}
          stackPosition="22%"
          baseScale={0.9}
          itemScale={0.04}
          dimAmount={0.25}
          holdDistance={120}
          snap={false}
        >
          {filteredProjects.map((project) => (
            <ScrollStackItem
              key={project.id}
              itemClassName="!p-0 overflow-hidden"
              style={{ height: 'auto', backgroundColor: 'rgba(255,255,255,0.96)' }}
            >
              <ProjectCard project={project} />
            </ScrollStackItem>
          ))}
        </ScrollStack>

        <motion.div
          className="text-center mt-12"
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
}

function ProjectCard({ project }: ProjectCardProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-full">
      <div className="relative overflow-hidden h-56 md:h-auto md:w-1/2 md:min-h-[340px]">
        {imageFailed ? (
          <div
            className="absolute inset-0 flex items-end p-6"
            style={{
              background: 'linear-gradient(135deg, rgba(15,118,110,0.92), rgba(244,168,184,0.78))',
            }}
          >
            <span className="font-display text-2xl font-bold text-white">{project.title}</span>
          </div>
        ) : (
          <img
            src={project.image}
            alt={`${project.title} project preview`}
            onError={() => setImageFailed(true)}
            className="absolute inset-0 w-full h-full object-cover"
            width={800}
            height={600}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        )}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(15, 23, 42, 0.2) 100%)' }}
        />
      </div>

      <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-center">
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
              className="px-3 py-1.5 rounded-lg font-mono text-[11px]"
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
  );
}
