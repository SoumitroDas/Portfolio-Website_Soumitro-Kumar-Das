import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useObserverNode } from './hooks/useObserverNode';
import { ObserverNode } from './components/ObserverNode';
import { Background } from './components/Background';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Research } from './sections/Research';
import { ResearchMap } from './sections/ResearchMap';
import { Projects } from './sections/Projects';
import { Timeline } from './sections/Timeline';
import { Skills } from './sections/Skills';
import { Debate } from './sections/Debate';
import { Inquiry } from './sections/Inquiry';
import { ContactModal } from './components/ui/ContactModal';
import { AssistantChat } from './components/ui/AssistantChat';
import { StatsBar } from './components/StatsBar';
import { SECTIONS, SectionMode } from './lib/constants';
import { Linkedin, Github, Search, Mail, GraduationCap, Database, BookOpen, Fingerprint } from 'lucide-react';

const SectionWrapper: React.FC<{ 
  id: string; 
  mode: SectionMode; 
  setMode: (m: SectionMode) => void; 
  children: React.ReactNode 
}> = ({ id, mode, setMode, children }) => {
  const { ref, inView } = useInView({
    threshold: 0.4,
  });

  useEffect(() => {
    if (inView) {
      setMode(mode);
    }
  }, [inView, mode, setMode]);

  return <div ref={ref} id={id}>{children}</div>;
};

export default function App() {
  const { energyLevel, nodeMode, sectionMode, setSectionMode, isPulsing, triggerPulse } = useObserverNode();
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Global dispatcher for sections to trigger contact modal
  useEffect(() => {
    (window as any).dispatchContactModal = () => setIsContactOpen(true);
    (window as any).dispatchStarPulse = () => triggerPulse();
    return () => { 
      delete (window as any).dispatchContactModal; 
      delete (window as any).dispatchStarPulse;
    };
  }, [triggerPulse]);

  return (
    <div className="relative min-h-screen selection:bg-accentCyan selection:text-bgPrimary">
      <Background />
      
      {/* Scrollable Content */}
      <main className="relative z-10">
        <SectionWrapper id="hero" mode={SECTIONS.HERO} setMode={setSectionMode}>
          <Hero />
        </SectionWrapper>

        <StatsBar />

        <SectionWrapper id="about" mode={SECTIONS.ABOUT} setMode={setSectionMode}>
          <About />
        </SectionWrapper>

        <SectionWrapper id="research" mode={SECTIONS.RESEARCH} setMode={setSectionMode}>
          <Research />
          <ResearchMap />
        </SectionWrapper>

        <SectionWrapper id="projects" mode={SECTIONS.PROJECTS} setMode={setSectionMode}>
          <Projects />
        </SectionWrapper>

        <SectionWrapper id="skills" mode={SECTIONS.SKILLS} setMode={setSectionMode}>
          <Skills />
        </SectionWrapper>

        <SectionWrapper id="timeline" mode={SECTIONS.TIMELINE} setMode={setSectionMode}>
          <Timeline />
        </SectionWrapper>

        <SectionWrapper id="debate" mode={SECTIONS.DEBATE} setMode={setSectionMode}>
          <Debate />
        </SectionWrapper>

        <SectionWrapper id="inquiry" mode={SECTIONS.INQUIRY} setMode={setSectionMode}>
          <Inquiry />
        </SectionWrapper>

        {/* Footer / Connect Trigger */}
        <section className="py-24 px-6 md:px-20 border-t border-white/5 bg-bgSurface/20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="space-y-4">
               <h2 className="font-display text-4xl">Researcher Portfolio</h2>
               <p className="font-mono text-xs text-textSecondary uppercase tracking-widest">© 2026 Soumitro Kumar Das. ALL RIGHTS RESERVED</p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-10">
               <button 
                 onClick={() => setIsContactOpen(true)}
                 className="px-14 py-5 bg-accentCyan text-bgPrimary font-bold uppercase tracking-[0.25em] text-sm skew-x-[-12deg] hover:skew-x-0 transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(56,189,248,0.5)] active:scale-95 shadow-[0_0_20px_rgba(56,189,248,0.3)]"
               >
                 Connect
               </button>
               
               <div className="flex gap-4 md:gap-10 text-textSecondary flex-wrap justify-center md:justify-end">
                  <a href="https://www.linkedin.com/in/soumitro-kumar-das" target="_blank" rel="noopener noreferrer" className="hover:text-accentCyan transition-colors" title="LinkedIn"><Linkedin className="w-5 h-5"/></a>
                  <a href="https://github.com/SoumitroDas" target="_blank" rel="noopener noreferrer" className="hover:text-accentCyan transition-colors" title="GitHub"><Github className="w-5 h-5"/></a>
                  <a href="https://www.researchgate.net/profile/Soumitro-Kumar-Das" target="_blank" rel="noopener noreferrer" className="hover:text-accentCyan transition-colors" title="ResearchGate"><BookOpen className="w-5 h-5"/></a>
                  <a href="https://orcid.org/0009-0009-1597-4653" target="_blank" rel="noopener noreferrer" className="hover:text-accentCyan transition-colors" title="ORCID"><Fingerprint className="w-5 h-5"/></a>
                  <a href="mailto:sdasshuvro@gmail.com" className="hover:text-accentCyan transition-colors" title="Email"><Mail className="w-5 h-5"/></a>
               </div>
            </div>
          </div>
        </section>
      </main>

      {/* Persistent Components */}
      <ObserverNode 
        energyLevel={energyLevel} 
        sectionMode={sectionMode} 
        isPulsing={isPulsing}
        nodeMode={nodeMode}
      />

      <AssistantChat />

      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
        onSuccess={triggerPulse}
      />

      {/* Global Header */}
      <header className="fixed top-0 left-0 w-full z-[80] px-6 py-6 md:px-20 flex justify-between items-center pointer-events-none">
          <div className="font-display text-2xl text-textPrimary pointer-events-auto">
             Soumitro K. Das
          </div>
          <nav className="hidden md:flex gap-12 pointer-events-auto">
              {['Research', 'Projects', 'Inquiry'].map(item => (
                <a 
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="font-mono text-[10px] uppercase tracking-[0.3em] text-textSecondary hover:text-accentCyan transition-colors"
                >
                    {item}
                </a>
              ))}
          </nav>
      </header>
    </div>
  );
}

