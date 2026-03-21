import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../../../data/testimonials';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <section 
      id="testimonials" 
      className="py-24 px-6 md:px-16 lg:px-32 overflow-hidden"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="max-w-5xl mx-auto">
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
            &lt; TESTIMONIALS /&gt;
          </p>
          <h2 
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            What People Say
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Cards Container */}
          <div className="relative min-h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="w-full"
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 100 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -100 }}
                transition={{ duration: 0.4 }}
              >
                <TestimonialCard testimonial={testimonials[currentIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_var(--accent-glow)]"
              style={{
                backgroundColor: 'var(--bg-glass)',
                border: '1px solid var(--border-subtle)'
              }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" style={{ color: 'var(--accent-primary)' }} />
            </button>

            {/* Dot Indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className="transition-all duration-300"
                  style={{
                    width: currentIndex === index ? '32px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    backgroundColor: currentIndex === index 
                      ? 'var(--accent-primary)' 
                      : 'var(--border-subtle)'
                  }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_var(--accent-glow)]"
              style={{
                backgroundColor: 'var(--bg-glass)',
                border: '1px solid var(--border-subtle)'
              }}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" style={{ color: 'var(--accent-primary)' }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  testimonial: {
    name: string;
    role: string;
    company: string;
    avatar: string;
    quote: string;
  };
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div 
      className="relative p-8 md:p-12 rounded-2xl backdrop-blur mx-auto max-w-3xl"
      style={{
        backgroundColor: 'var(--bg-glass)',
        borderLeft: '4px solid var(--accent-primary)',
        border: '1px solid var(--border-subtle)'
      }}
    >
      {/* Quote Icon */}
      <div 
        className="absolute top-6 right-6 opacity-10"
      >
        <Quote className="w-16 h-16 md:w-24 md:h-24" style={{ color: 'var(--accent-primary)' }} />
      </div>

      {/* Quote Text */}
      <blockquote 
        className="relative z-10 text-lg md:text-xl leading-relaxed mb-8 italic"
        style={{ color: 'var(--text-primary)' }}
      >
        "{testimonial.quote}"
      </blockquote>

      {/* Author Info */}
      <div className="flex items-center gap-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-14 h-14 rounded-full object-cover"
          loading="lazy"
          style={{
            border: '2px solid var(--accent-primary)'
          }}
        />
        
        <div>
          <h4 
            className="font-display font-bold text-lg"
            style={{ color: 'var(--text-primary)' }}
          >
            {testimonial.name}
          </h4>
          <p 
            className="font-mono text-sm"
            style={{ color: 'var(--text-secondary)' }}
          >
            {testimonial.role}
          </p>
          <p 
            className="font-mono text-xs"
            style={{ color: 'var(--accent-primary)' }}
          >
            {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}
