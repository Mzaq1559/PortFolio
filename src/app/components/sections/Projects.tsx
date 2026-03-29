import { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { projects } from '../../../data/projects';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

const categories = ['All', 'Web App', 'Data Science', 'UI/UX'];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const prefersReducedMotion = useReducedMotion();

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section 
      id="projects" 
      className="py-24 px-6 md:px-16 lg:px-32"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-12"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
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

        {/* Filter Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className="relative px-6 py-2 rounded-full font-mono text-sm uppercase tracking-wider transition-all duration-300"
              style={{
                color: activeFilter === category ? 'var(--text-primary)' : 'var(--text-secondary)',
                backgroundColor: activeFilter === category ? 'var(--accent-primary)' : 'var(--bg-glass)',
                border: `1px solid ${activeFilter === category ? 'var(--accent-primary)' : 'var(--border-subtle)'}`
              }}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              featured={project.featured}
            />
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <button
            className="group px-8 py-4 rounded-full font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_30px_var(--accent-glow)]"
            style={{
              color: 'var(--accent-primary)',
              border: '2px solid var(--accent-primary)',
              backgroundColor: 'transparent'
            }}
          >
            <span className="flex items-center gap-2">
              View All Projects
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    liveUrl: string;
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
      className={`group relative rounded-2xl overflow-hidden ${featured ? 'md:col-span-2' : ''}`}
      style={{
        backgroundColor: 'var(--bg-glass)',
        border: '1px solid var(--border-subtle)'
      }}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={prefersReducedMotion ? {} : { y: -8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={featured ? 'md:flex md:flex-row' : ''}>
        {/* Image */}
        <div className={`relative overflow-hidden ${featured ? 'md:w-1/2' : 'h-56'}`}>
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
            animate={prefersReducedMotion ? {} : { scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center gap-4"
            style={{ backgroundColor: 'rgba(10, 10, 15, 0.9)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full font-mono text-sm transition-all duration-300 hover:scale-110"
              style={{
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--bg-primary)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="flex items-center gap-2">
                Live Demo <ExternalLink className="w-4 h-4" />
              </span>
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full transition-all duration-300 hover:scale-110"
              style={{
                backgroundColor: 'var(--bg-glass)',
                border: '1px solid var(--border-subtle)'
              }}
              onClick={(e) => e.stopPropagation()}
              aria-label="View on GitHub"
            >
              <Github className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
            </a>
          </motion.div>
        </div>

        {/* Content */}
        <div className={`p-6 ${featured ? 'md:w-1/2 md:flex md:flex-col md:justify-center' : ''}`}>
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

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full font-mono text-xs"
                style={{
                  backgroundColor: 'rgba(110, 231, 247, 0.1)',
                  color: 'var(--accent-primary)',
                  border: '1px solid rgba(110, 231, 247, 0.2)'
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
