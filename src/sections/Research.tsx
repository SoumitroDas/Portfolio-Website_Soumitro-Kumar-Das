import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

interface ResearchCardProps {
  title: string;
  venue: string;
  status: 'published' | 'under-review' | 'conference';
  abstract: string;
  doi?: string;
  methodology?: string[];
  diagram?: React.ReactNode;
}

export const ResearchCard: React.FC<ResearchCardProps> = ({
  title, venue, status, abstract, doi, methodology, diagram
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const statusColors = {
    published: 'bg-accentEmerald text-bgPrimary',
    'under-review': 'bg-accentGold text-bgPrimary',
    conference: 'bg-accentCyan text-bgPrimary',
  };

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      className={cn(
        "group relative p-8 bg-bgSurface border border-white/5 rounded-sm cursor-pointer transition-all hover:border-white/20",
        isExpanded && "border-accentCyan/30"
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <span className={cn("px-3 py-1 text-[10px] font-mono uppercase tracking-widest rounded-full", statusColors[status])}>
          {status}
        </span>
        <ChevronRight className={cn("text-textSecondary transition-transform w-5 h-5", isExpanded && "rotate-90")} />
      </div>

      <h3 className="font-display text-2xl md:text-3xl mb-2 group-hover:text-accentCyan transition-colors">
        {title}
      </h3>
      <p className="font-mono text-xs text-textSecondary uppercase tracking-widest mb-4">
        {venue}
      </p>

      <motion.div layout className="space-y-6">
        <p className={cn("text-textSecondary leading-relaxed", !isExpanded && "line-clamp-2")}>
          {abstract}
        </p>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-6 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div>
              <h4 className="font-mono text-xs text-accentCyan mb-4 uppercase tracking-wider">Methodology</h4>
              <ul className="space-y-2">
                {methodology?.map((item, i) => (
                  <li key={i} className="flex items-center text-sm text-textPrimary">
                    <span className="w-1.5 h-1.5 bg-accentCyan rounded-full mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
              
              {doi && (
                <a 
                  href={doi} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-8 flex items-center text-accentCyan hover:underline font-mono text-xs uppercase"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Publication <ExternalLink className="ml-2 w-3 h-3" />
                </a>
              )}
            </div>
            
            <div className="bg-white/5 rounded-sm p-4 flex items-center justify-center">
               {diagram || <div className="text-textSecondary text-xs italic">Structural diagram (interactive)</div>}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export const Research: React.FC = () => {
  return (
    <section id="research" className="py-16 px-6 md:px-20 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="font-display text-4xl md:text-6xl mb-4">Core Research</h2>
        <div className="h-0.5 w-24 bg-accentCyan" />
      </div>

      <div className="grid grid-cols-1 gap-8">
        <ResearchCard
          title="Role of Carrying Capacity in Dengue Control"
          venue="Arab Journal of Basic and Applied Sciences (Q1)"
          status="published"
          doi="https://doi.org/10.1080/25765299.2026.2651569"
          abstract="An exploration of compartmental ODEs modeling dengue transmission dynamics, specifically investigating the limiting factors of carrying capacity on waste management and its subsequent impact on R₀."
          methodology={[
            "Compartmental ODE epidemiological system",
            "Carrying capacity parameter integration",
            "Equilibrium and stability analysis",
            "Basic reproduction number (R₀) derivation",
            "Sensitivity analysis via PRCC",
            "Numerical simulation (Python / MATLAB)",
            "Parameter interaction analysis",
            "Awareness-waste-management coupling",
            "Disease transmission dynamics"
          ]}
          diagram={
            <svg viewBox="0 0 400 200" className="w-full text-accentCyan fill-none stroke-current">
              <rect x="20" y="20" width="40" height="40" rx="4" label="S" />
              <text x="35" y="45" stroke="none" fill="currentColor" className="text-[10px] font-mono">S</text>
              <line x1="60" y1="40" x2="100" y2="40" />
              
              <rect x="100" y="20" width="40" height="40" rx="4" label="E" />
              <text x="115" y="45" stroke="none" fill="currentColor" className="text-[10px] font-mono">E</text>
              <line x1="140" y1="40" x2="180" y2="40" />
              
              <rect x="180" y="20" width="40" height="40" rx="4" label="I" />
              <text x="195" y="45" stroke="none" fill="currentColor" className="text-[10px] font-mono">I</text>
              <line x1="220" y1="40" x2="260" y2="40" />
              
              <rect x="260" y="20" width="40" height="40" rx="4" label="R" />
              <text x="275" y="45" stroke="none" fill="currentColor" className="text-[10px] font-mono">R</text>
              
              {/* Vector connection */}
              <path d="M40 60 Q 40 120 100 120" strokeDasharray="4 2" />
              <rect x="100" y="100" width="40" height="40" rx="4" />
              <text x="110" y="125" stroke="none" fill="currentColor" className="text-[8px] font-mono">Vector</text>
              <text x="150" y="125" stroke="none" fill="currentColor" className="text-[8px] font-mono">R₀, K</text>
            </svg>
          }
        />

        <ResearchCard
          title="Data-Driven Exploration of Daily Routines on Mental Wellbeing"
          venue="Under Review (Q1 Journal)"
          status="under-review"
          abstract="Investigating the causal link between continuous behavioral patterns (daily routines) and student mental health outcomes using applied machine learning architectures."
          methodology={[
            "Data-driven parameter estimation",
            "Supervised learning algorithms (Scikit-Learn)",
            "Behavioral pattern recognition",
            "Feature importance analysis for intervention"
          ]}
        />
        
        <ResearchCard
          title="Fractional-Order Modeling of SARS-CoV-2 Variant NB.1.8.1"
          venue="ICSHSD 2025"
          status="conference"
          abstract="Applying non-integer derivatives to capture memory effects and complex transmission dynamics in epidemiological forecasting. Comparative analysis of Homotopy and Adams-Bashforth-Moulton methods."
          methodology={[
            "Caputo fractional derivative",
            "Homotopy perturbation method",
            "Adams-Bashforth-Moulton predictor corrector method",
            "Comparative analysis",
            "Memory effect modeling"
          ]}
        />

        <ResearchCard
          title="Chikungunya Control via Carrying Capacity & Waste Management"
          venue="8th International Statistics & Data Science Conference in 4IR"
          status="conference"
          abstract="Addressing the role of public awareness and structural waste management in controlling vector-borne disease outbreaks in urban environments."
          methodology={[
            "Epidemiological simulation (Python, MATLAB)",
            "Control theory applications",
            "Public awareness parameterization",
            "Structural intervention analysis"
          ]}
        />
      </div>
    </section>
  );
};
