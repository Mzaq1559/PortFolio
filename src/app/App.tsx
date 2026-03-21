import { CustomCursor } from './components/layout/CustomCursor';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Testimonials } from './components/sections/Testimonials';
import { Contact } from './components/sections/Contact';

export default function App() {
  return (
    <div className="min-h-screen" style={{ background: 'transparent', fontFamily: 'var(--font-body)' }}>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      
      <main className="md:ml-[320px]">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}