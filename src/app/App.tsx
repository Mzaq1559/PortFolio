import { CustomCursor } from './components/layout/CustomCursor';
import { MotionConfig } from 'motion/react';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Contact } from './components/sections/Contact';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen" style={{ background: 'transparent', fontFamily: 'var(--font-body)' }}>
      <CustomCursor />
      <ScrollProgress />
      <div className="flex items-start bg-transparent">
        <Navbar />

        <main className="flex-1 min-w-0">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
                    <Contact />
        </main>
      </div>
      <ScrollToTop />
      </div>
    </MotionConfig>
  );
}