export const COLORS = {
  bgPrimary: '#0B0F14',
  bgSurface: '#111827',
  textPrimary: '#E5E7EB',
  textSecondary: '#9CA3AF',
  accentCyan: '#38BDF8',
  accentGold: '#D4A373',
  accentEmerald: '#34D399',
  accentPurple: '#A855F7', // Added for research shift
  accentSilver: '#9CA3AF', // For inquiry shift
  accentCoral: '#FB7185', // For contact shift
};

export const SECTIONS = {
  HERO: 'hero',
  ABOUT: 'about',
  RESEARCH: 'research',
  PROJECTS: 'projects',
  SKILLS: 'skills',
  TIMELINE: 'timeline',
  DEBATE: 'debate',
  INQUIRY: 'inquiry',
  CONTACT: 'contact',
} as const;

export type SectionMode = typeof SECTIONS[keyof typeof SECTIONS];

export const TIMELINE_DATA = [
  { year: '2019', entry: 'B.Sc. Applied Mathematics begins — University of Rajshahi' },
  { year: '2019', entry: 'Joined Rajshahi University Debating Forum & Began Private Tutoring' },
  { year: '2022', entry: 'Convenor — Freshers Debate Championship 2022' },
  { year: '2023', entry: 'B.Sc. Completed — CGPA 3.24/4.00' },
  { year: '2023', entry: 'Int\'l Top Breaking Adjudicator — 7th Bicol Intervarsity Debate, Philippines' },
  { year: '2024', entry: 'M.Sc. Applied Mathematics begins — University of Rajshahi' },
  { year: '2024', entry: 'Presented Chikungunya Model — 8th Int\'l Statistics & Data Science Conference' },
  { year: '2025', entry: 'Led Project Newborn (RUDF), Mentoring 107 First-Year Students' },
  { year: '2025', entry: 'Appointed Research Assistant — Mathematical Epidemiology & Fractional Dynamics' },
  { year: '2025', entry: '2nd Place — UiPath Global Bootcamp Challenge (Generative AI & PII)' },
  { year: '2025', entry: 'M.Sc. Completed — CGPA 3.45/4.00' },
  { year: '2025', entry: 'ICSHSD 2025 Conference — Fractional-Order COVID-19 Modeling' },
  { year: '2026', entry: 'Q1 Publication — Role of Carrying Capacity in Dengue Control (Arab J. Basic Appl. Sci.)' },
];

export const RESEARCH_NODES = [
  { id: 'dengue', label: 'Dengue', cluster: 'epidemiology' },
  { id: 'chikungunya', label: 'Chikungunya', cluster: 'epidemiology' },
  { id: 'sars-cov-2', label: 'SARS-CoV-2 Fractional Modeling', cluster: 'epidemiology' },
  { id: 'fractional-calculus', label: 'Fractional Calculus', cluster: 'theory' },
  { id: 'dynamical-systems', label: 'Dynamical Systems', cluster: 'theory' },
  { id: 'epidemiology', label: 'Epidemiology', cluster: 'epidemiology' },
  { id: 'ml', label: 'Machine Learning', cluster: 'computation' },
  { id: 'neural-arch', label: 'Neural Architectures', cluster: 'computation' },
  { id: 'optimization', label: 'Optimization', cluster: 'computation' },
  { id: 'complex-systems', label: 'Complex Systems', cluster: 'theory' },
  { id: 'systems-theory', label: 'Systems Theory', cluster: 'theory' },
  { id: 'consciousness', label: 'Consciousness (inquiry)', cluster: 'inquiry' },
  { id: 'behavioral', label: 'Behavioral Analysis', cluster: 'inquiry' },
];

export const MATH_NOTATIONS = [
  'dX/dt = F(X,t,θ)',
  'D^α x(t) = f(x,t)',
  'R₀ = βS₀/γ',
  '∂ₜu + v·∇u = νΔu',
  '∑ᵢ wᵢ φᵢ(x)',
  'Γ(α) = ∫₀^∞ t^(α-1)e^(-t)dt',
];
