import React from 'react';
import { motion } from 'motion/react';
import { Database, Code, LineChart, BrainCircuit, Blocks } from 'lucide-react';

interface SkillSet {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  className?: string;
}

export const Skills: React.FC = () => {
  const handleSkillClick = (categoryName: string) => {
    // Map skill category to project category
    const categoryMap: Record<string, string> = {
        "Mathematical Modeling": "Research / Math",
        "Programming": "Development",
        "Data Science & ML": "Machine Learning",
        "Database Management": "Data Analysis",
        "Data Visualization": "Data Analysis"
    };
    const targetCategory = categoryMap[categoryName] || 'All';
    
    // Dispatch custom event to filter projects
    const event = new CustomEvent('filterProjects', { detail: { category: targetCategory } });
    window.dispatchEvent(event);

    // Scroll to projects section smoothly
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const skillCategories: SkillSet[] = [
    {
      title: "Mathematical Modeling",
      icon: <Blocks className="w-5 h-5 text-accentCyan" />,
      skills: ["Compartmental Models", "Epidemiological Dynamics", "Fractional Calculus", "Caputo-Fabrizio & Beta Derivatives", "Numerical Analysis (RK4, Adams-Bashforth-Moulton)", "Linear Algebra & Tensor Analysis"],
      className: "md:col-span-2 md:row-span-2 bg-gradient-to-br from-bgSurface to-[#0B0F14]"
    },
    {
      title: "Programming",
      icon: <Code className="w-5 h-5 text-accentGold" />,
      skills: ["Python", "MATLAB", "Mathematica", "C / C++", "Fortran", "HTML"],
    },
    {
      title: "Data Science & ML",
      icon: <BrainCircuit className="w-5 h-5 text-accentEmerald" />,
      skills: ["Machine Learning", "Parameter Estimation", "CNN & RNN Arch.", "Computer Vision", "Scikit-Learn", "Numpy & Pandas", "SciPy", "SPSS"],
      className: "md:row-span-2"
    },
    {
      title: "Database Management",
      icon: <Database className="w-5 h-5 text-accentPurple" />,
      skills: ["PostgreSQL", "MySQL", "pgAdmin", "Database Design", "Google Sheets"],
    },
    {
      title: "Data Visualization",
      icon: <LineChart className="w-5 h-5 text-accentCoral" />,
      skills: ["Tableau", "Power BI", "Looker Studio", "Matplotlib", "Seaborn"],
    }
  ];

  return (
    <section id="skills" className="py-24 px-6 md:px-20 relative max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="font-display text-4xl md:text-6xl mb-4">Technical Expertise</h2>
        <div className="h-0.5 w-24 bg-accentCyan" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(180px,auto)]">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`p-8 border border-white/10 rounded-xl bg-bgSurface/40 hover:bg-bgSurface transition-colors hover:border-white/20 group ${category.className || ''}`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white/5 rounded-lg group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <h3 className="font-display text-2xl text-textPrimary group-hover:text-accentCyan transition-colors">
                {category.title}
              </h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, i) => (
                <button 
                  key={i} 
                  onClick={() => handleSkillClick(category.title)}
                  className="px-3 py-1.5 text-xs font-mono text-textSecondary bg-bgPrimary/80 border border-white/5 rounded-sm hover:text-textPrimary hover:border-accentCyan/30 transition-colors cursor-pointer text-left"
                >
                  {skill}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
