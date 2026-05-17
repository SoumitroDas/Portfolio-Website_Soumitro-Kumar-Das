import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, ArrowRight, BookOpen, BrainCircuit, BarChart, Code2 } from 'lucide-react';

export const Projects: React.FC = () => {
    const categories = ['All', 'Research / Math', 'Machine Learning', 'Data Analysis', 'Development'];
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        const handleFilterEvent = (e: Event) => {
            const customEvent = e as CustomEvent;
            if (customEvent.detail && customEvent.detail.category) {
                if (categories.includes(customEvent.detail.category)) {
                    setActiveFilter(customEvent.detail.category);
                }
            }
        };
        window.addEventListener('filterProjects', handleFilterEvent);
        return () => window.removeEventListener('filterProjects', handleFilterEvent);
    }, []);

    const projects = [
        {
            title: "Dengue Carrying Capacity Model - SEIR-SEI",
            category: 'Research / Math',
            desc: "Mathematical modeling of dengue transmission dynamics incorporating waste management and public awareness interventions.",
            details: "Identified that 30% waste management improvement reduces R₀ by ~40%. Published in Arab Journal of Basic and Applied Sciences (2026).",
            tools: ["Mathematical Modeling", "Wolfram Mathematica", "Differential Equations"],
            repo: "https://github.com/SoumitroDas/dengue-carrying-capacity-model-simulations",
            icon: <BookOpen className="w-5 h-5 text-accentCyan" />
        },
        {
            title: "Pneumonia Detection from Chest X-Ray",
            category: 'Machine Learning',
            desc: "Binary image classification pipeline for pneumonia detection in pediatric chest X-rays using Convolutional Neural Networks.",
            details: "Trained on 5,856 pediatric X-ray images. Achieved solid performance with multi-layer CNN and data augmentation.",
            tools: ["TensorFlow/Keras", "CNN", "Medical Image Analysis", "Python"],
            repo: "https://github.com/SoumitroDas/Project-Pneumonia-Detection-from-Chest-Xray-CNN",
            icon: <BrainCircuit className="w-5 h-5 text-accentEmerald" />
        },
        {
            title: "Customer Segmentation - ML Study",
            category: 'Machine Learning',
            desc: "Exhaustive comparison of clustering algorithms (K-Means, DBSCAN, GMM) for customer segmentation.",
            details: "Innovated feature engineering with a 'Spending Efficiency' metric. Identified 3 optimal customer segments with actionable profiles.",
            tools: ["Scikit-Learn", "K-Means", "DBSCAN", "Matplotlib"],
            repo: "https://github.com/SoumitroDas/Project-Clustering-Tryouts",
            icon: <BrainCircuit className="w-5 h-5 text-accentEmerald" />
        },
        {
            title: "Online Retail Customer Classification",
            category: 'Machine Learning',
            desc: "Behavioral customer segmentation on UCI Online Retail dataset using unsupervised learning.",
            details: "Deep dived into customer purchasing behavior to establish specific segment profiles for targeted marketing.",
            tools: ["Unsupervised ML", "Behavioral Analysis", "Customer Segmentation"],
            repo: "https://github.com/SoumitroDas/Project-Online-Retail-Customer-Classfire",
            icon: <BrainCircuit className="w-5 h-5 text-accentEmerald" />
        },
        {
            title: "YouTube Engagement & Audience Analysis",
            category: 'Data Analysis',
            desc: "Final project analyzing YouTube engagement metrics, subscriber behavior, and correlation studies.",
            details: "Polished visualizations extracting actionable insights on how audience retention metrics impact overall channel performance.",
            tools: ["Pandas", "Statistical Analysis", "Seaborn"],
            repo: "https://github.com/SoumitroDas/Python-Project-YouTube-Engagement-Audience-Analysis",
            icon: <BarChart className="w-5 h-5 text-accentGold" />
        },
        {
            title: "Chocolate Sales Dashboard - Power BI",
            category: 'Data Analysis',
            desc: "Interactive Power BI dashboard visualizing $3.5M in global chocolate sales.",
            details: "Features geographic sales maps, product performance analysis, KPI cards, and an interactive country-wise breakdown.",
            tools: ["Power BI", "Data Visualization", "Business Intelligence"],
            repo: "https://github.com/SoumitroDas/Edu-Linking-Project-Unwrapping-Global-Chocolate-Sales-Insights-By-PowerBI",
            icon: <BarChart className="w-5 h-5 text-accentGold" />
        },
        {
            title: "Superstore Sales Analysis - Tableau",
            category: 'Data Analysis',
            desc: "Interactive Tableau bar chart and dashboard for superstore sales categorized systematically.",
            details: "Features region-based filtering, category performance analysis, and detailed targeted breakdown capability.",
            tools: ["Tableau", "Sales Analytics", "Dashboard Design"],
            repo: "https://github.com/SoumitroDas/Edu-Linking-Project-Sparking-Retail-Insights-with-Superstore-Sales-by-Tableau",
            icon: <BarChart className="w-5 h-5 text-accentGold" />
        },
        {
            title: "Numerical Methods Implementation - C++",
            category: 'Development',
            desc: "C++ implementations of numerical methods from my Applied Mathematics coursework.",
            details: "Includes solvers for non-linear equations, interpolation algorithms, and numerical integration approaches using C++.",
            tools: ["C++", "Numerical Analysis", "Scientific Computing"],
            repo: "https://github.com/SoumitroDas/Numerical-Methods-CPP",
            icon: <Code2 className="w-5 h-5 text-accentPurple" />
        }
    ];

    const filteredProjects = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter);

    return (
        <section id="projects" className="py-24 px-6 md:px-20 max-w-7xl mx-auto min-h-screen">
             <header className="mb-12">
                <span className="font-mono text-xs text-accentCyan mb-4 block uppercase tracking-widest">02 / Implementation</span>
                <h2 className="font-display text-4xl md:text-6xl mb-8 text-textPrimary">Applied Systems & Projects</h2>
                
                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all rounded-sm border ${
                                activeFilter === cat 
                                ? 'bg-accentCyan/10 border-accentCyan text-accentCyan shadow-[0_0_15px_rgba(56,189,248,0.2)]' 
                                : 'bg-transparent border-white/10 text-textSecondary hover:border-white/30 hover:text-textPrimary'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </header>

            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode='popLayout'>
                    {filteredProjects.map((p, i) => (
                        <motion.div
                            key={p.title}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="bg-bgSurface p-8 border border-white/5 rounded-lg hover:border-accentCyan/30 transition-all group flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-white/5 rounded-lg group-hover:scale-110 transition-transform">
                                        {p.icon}
                                    </div>
                                    <a 
                                        href={p.repo} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="p-2 text-textSecondary hover:text-accentCyan transition-colors hover:scale-110"
                                        title="View Source on GitHub"
                                    >
                                        <Github className="w-5 h-5" />
                                    </a>
                                </div>
                                <h3 className="font-display text-2xl mb-3 text-textPrimary group-hover:text-accentCyan transition-colors">
                                    <a href={p.repo} target="_blank" rel="noopener noreferrer">{p.title}</a>
                                </h3>
                                <p className="text-sm text-textSecondary mb-4">
                                    {p.desc}
                                </p>
                                <p className="text-xs text-textSecondary/70 mb-8 italic">
                                    {p.details}
                                </p>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                                {p.tools.map(t => (
                                    <span key={t} className="px-2 py-1 bg-bgPrimary/50 border border-white/5 rounded-sm font-mono text-[10px] text-textSecondary uppercase tracking-widest">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
            
            <div className="mt-20 p-12 bg-gradient-to-br from-[#111827] to-[#0B0F14] border border-white/10 rounded-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <span className="font-display text-9xl">107</span>
                </div>
                <div className="relative z-10 max-w-xl">
                    <span className="font-mono text-xs text-accentGold mb-4 block uppercase tracking-widest flex items-center gap-2">
                        <BookOpen size={14} /> Knowledge Transfer
                    </span>
                    <h3 className="font-display text-3xl mb-4 text-textPrimary">Project Newborn</h3>
                    <p className="text-textSecondary leading-relaxed mb-8">
                        Mentorship as a systematic process of intellectual scaffolding. Establishing foundational paradigms for emerging scholars through guided inquiry and critical review at Rajshahi University Debating Forum.
                    </p>
                    <div className="flex items-end gap-3 font-mono">
                        <span className="text-5xl text-accentGold drop-shadow-[0_0_15px_rgba(212,163,115,0.3)]">107</span>
                        <span className="text-xs pb-1 uppercase tracking-widest text-textSecondary">Students Mentored</span>
                    </div>
                </div>
            </div>
        </section>
    );
};
