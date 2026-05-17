import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ArrowRight } from 'lucide-react';
import { RESEARCH_NODES, COLORS } from '../lib/constants';

interface NodeData {
    title: string;
    body: string;
    cta?: { label: string; target: string };
}

const NODE_INFO: Record<string, NodeData> = {
    'dengue': {
        title: "Dengue",
        body: "Published — Arab Journal of Basic and Applied Sciences (Q1, 2026). Compartmental ODE model with carrying capacity and R₀ analysis.",
        cta: { label: "View Publication →", target: "research" }
    },
    'chikungunya': {
        title: "Chikungunya",
        body: "Conference presentation — 8th Int'l Statistics & Data Science Conference, Rajshahi, Dec 2024. Carrying capacity model for vector control."
    },
    'sars-cov-2': {
        title: "SARS-CoV-2 Fractional Modeling",
        body: "Under Review — Q1 Journal. Caputo fractional derivative model. Presented at ICSHSD 2025, Dhaka.",
        cta: { label: "View Research →", target: "research" }
    },
    'fractional-calculus': {
        title: "Fractional Calculus",
        body: "Core methodology across epidemic and AI research. Caputo and Atangana-Baleanu operators. Memory-driven dynamics."
    },
    'ml': {
        title: "Machine Learning",
        body: "Applied to student mental wellbeing behavioral analysis. Under Review — Q1 Journal."
    },
    'dynamical-systems': {
        title: "Dynamical Systems",
        body: "Foundation of all modeling work. Equilibrium analysis, stability, bifurcation theory."
    },
    'neural-arch': {
        title: "Neural Architectures",
        body: "Current research direction — fractional neural architectures integrating memory operators with deep learning."
    },
    'epidemiology': {
        title: "Epidemiology",
        body: "Primary application domain. Human-vector compartmental systems with environmental and behavioral coupling."
    },
    'complex-systems': {
        title: "Complex Systems",
        body: "Theoretical framework connecting all research domains — emergence, interaction, nonlinearity."
    },
    'optimization': {
        title: "Optimization",
        body: "Parameter estimation, sensitivity analysis (PRCC), numerical methods (RK4, Adams-Bashforth-Moulton)."
    },
    'systems-theory': {
        title: "Systems Theory",
        body: "Philosophical and mathematical foundation. Connecting debate, music, mathematics as systems of structure."
    },
    'consciousness': {
        title: "Consciousness (Inquiry)",
        body: "Explored in the Inquiry section as an observational problem, not a metaphysical claim.",
        cta: { label: "Go to Inquiry →", target: "inquiry" }
    },
    'behavioral': {
        title: "Behavioral Analysis",
        body: "ML-based causal analysis of daily routines and student mental wellbeing."
    }
};

export const ResearchMap: React.FC = () => {
    const svgRef = useRef<SVGSVGElement>(null);
    const fullscreenSvgRef = useRef<SVGSVGElement>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedNode, setSelectedNode] = useState<{ id: string; x: number; y: number; label: string } | null>(null);
    const [summary, setSummary] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const summaryCache = useRef<Record<string, string>>({});

    useEffect(() => {
        if (selectedNode) {
            if (summaryCache.current[selectedNode.id]) {
                setSummary(summaryCache.current[selectedNode.id]);
                setIsLoading(false);
                return;
            }

            setSummary(null);
            setIsLoading(true);
            const allTopics = RESEARCH_NODES.map(n => n.label);
            fetch('/api/research-summary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic: selectedNode.label, allResearchTopics: allTopics }),
            })
            .then(async (res) => {
                if (res.status === 429) throw new Error('429');
                if (!res.ok) throw new Error('Failed');
                return res.json();
            })
            .then(data => {
                summaryCache.current[selectedNode.id] = data.summary;
                setSummary(data.summary);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                if (err.message === '429') {
                    setSummary("Daily API quota limit reached. Please try again later.");
                } else {
                    setSummary("Failed to load summary.");
                }
                setIsLoading(false);
            });
        }
    }, [selectedNode]);

    const initSimulation = (ref: React.RefObject<SVGSVGElement>, size: { w: number; h: number }, scale: number = 1) => {
        if (!ref.current) return;

        const width = size.w;
        const height = size.h;

        const svg = d3.select(ref.current)
            .attr('viewBox', `0 0 ${width} ${height}`)
            .attr('preserveAspectRatio', 'xMidYMid meet');

        svg.selectAll('*').remove();

        const simulation = d3.forceSimulation(RESEARCH_NODES as any)
            .force('link', d3.forceLink().id((d: any) => d.id).distance(scale > 1 ? 200 : 120))
            .force('charge', d3.forceManyBody().strength(scale > 1 ? -400 : -200))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collision', d3.forceCollide().radius(scale > 1 ? 80 : 40));

        const links = [
            { source: 'dengue', target: 'epidemiology' },
            { source: 'chikungunya', target: 'epidemiology' },
            { source: 'sars-cov-2', target: 'fractional-calculus' },
            { source: 'fractional-calculus', target: 'dynamical-systems' },
            { source: 'ml', target: 'optimization' },
            { source: 'neural-arch', target: 'ml' },
            { source: 'complex-systems', target: 'systems-theory' },
            { source: 'consciousness', target: 'behavioral' },
            { source: 'epidemiology', target: 'ml' },
            { source: 'dynamical-systems', target: 'complex-systems' }
        ];

        (simulation.force('link') as d3.ForceLink<any, any>).links(links);

        const link = svg.append('g')
            .selectAll('line')
            .data(links)
            .enter().append('line')
            .attr('stroke', COLORS.accentCyan)
            .attr('stroke-opacity', 0.15)
            .attr('stroke-width', 1 * scale);

        const node = svg.append('g')
            .selectAll('g')
            .data(RESEARCH_NODES)
            .enter().append('g')
            .style('cursor', 'pointer')
            .on('click', (event, d: any) => {
                event.stopPropagation();
                if (scale > 1) { // Only handle selection in fullscreen
                    setSelectedNode({ id: d.id, x: d.x, y: d.y, label: d.label });
                }
            })
            .on('mouseenter', (event, d: any) => {
                if (scale > 1) { // Only handle selection in fullscreen
                    setSelectedNode({ id: d.id, x: d.x, y: d.y });
                }
            })
            .call(d3.drag<any, any>()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended) as any);

        node.append('circle')
            .attr('r', (d: any) => (5 + (links.filter(l => l.source === d.id || l.target === d.id).length * 2)) * scale)
            .attr('fill', (d: any) => {
                if (d.cluster === 'epidemiology') return COLORS.accentEmerald;
                if (d.cluster === 'computation') return COLORS.accentCyan;
                if (d.cluster === 'theory') return COLORS.accentGold;
                return COLORS.accentSilver;
            })
            .attr('fill-opacity', 0.2)
            .attr('stroke', (d: any) => {
                if (d.cluster === 'epidemiology') return COLORS.accentEmerald;
                if (d.cluster === 'computation') return COLORS.accentCyan;
                if (d.cluster === 'theory') return COLORS.accentGold;
                return COLORS.accentSilver;
            })
            .attr('stroke-width', 1 * scale);

        node.append('text')
            .text((d: any) => d.label)
            .attr('font-family', 'Inter, sans-serif')
            .attr('font-size', `${scale > 1 ? 14 : 8}px`)
            .attr('fill', COLORS.textPrimary)
            .attr('text-anchor', 'middle')
            .attr('dy', 25 * scale)
            .attr('opacity', 0.9)
            .style('pointer-events', 'none');

        // Pulse effect for nodes
        node.append('circle')
            .attr('r', (d: any) => (5 + (links.filter(l => l.source === d.id || l.target === d.id).length * 2)) * scale)
            .attr('fill', 'none')
            .attr('stroke', (d: any) => {
                if (d.cluster === 'epidemiology') return COLORS.accentEmerald;
                if (d.cluster === 'computation') return COLORS.accentCyan;
                if (d.cluster === 'theory') return COLORS.accentGold;
                return COLORS.accentSilver;
            })
            .attr('stroke-width', 0.5 * scale)
            .attr('opacity', 0.5)
            .append('animate')
            .attr('attributeName', 'r')
            .attr('from', (d: any) => (5 + (links.filter(l => l.source === d.id || l.target === d.id).length * 2)) * scale)
            .attr('to', (d: any) => (15 + (links.filter(l => l.source === d.id || l.target === d.id).length * 2)) * scale)
            .attr('dur', '3s')
            .attr('repeatCount', 'indefinite');

        const radius = scale > 1 ? 60 : 30;

        simulation.on('tick', () => {
            node.attr('transform', (d: any) => {
                // Keep the nodes within the bounded canvas
                d.x = Math.max(radius, Math.min(width - radius, d.x));
                d.y = Math.max(radius, Math.min(height - radius, d.y));
                return `translate(${d.x},${d.y})`;
            });

            link
                .attr('x1', (d: any) => d.source.x)
                .attr('y1', (d: any) => d.source.y)
                .attr('x2', (d: any) => d.target.x)
                .attr('y2', (d: any) => d.target.y);
        });

        function dragstarted(event: any) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        function dragged(event: any) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        function dragended(event: any) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }

        return simulation;
    };

    useEffect(() => {
        const sim = initSimulation(svgRef, { w: 800, h: 500 }, 1);
        return () => sim?.stop();
    }, []);

    useEffect(() => {
        if (isExpanded) {
            document.body.style.overflow = 'hidden';
            const sim = initSimulation(fullscreenSvgRef, { w: window.innerWidth, h: window.innerHeight }, 2.5);
            return () => {
                document.body.style.overflow = 'unset';
                sim?.stop();
            };
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isExpanded]);

    const handleAction = (target: string) => {
        setIsExpanded(false);
        setTimeout(() => {
            document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto border-t border-white/5">
            <div className="flex flex-col items-center">
                <h3 className="font-mono text-xs text-textSecondary uppercase tracking-widest mb-12 text-center">Research Topology Map</h3>
                
                <div className="w-full bg-bgSurface/50 rounded-sm border border-white/5 overflow-hidden relative group">
                    <svg ref={svgRef} className="w-full cursor-move" />
                    
                    <button 
                        onClick={() => setIsExpanded(true)}
                        className="absolute bottom-6 right-6 px-4 py-2 bg-bgPrimary/80 border border-white/10 text-white/60 hover:text-accentCyan hover:border-accentCyan/50 transition-all font-mono text-[10px] uppercase tracking-widest flex items-center gap-2 backdrop-blur-sm"
                    >
                        <Maximize2 className="w-3 h-3" />
                        Expand Map
                    </button>
                </div>
                
                <p className="font-mono text-[10px] text-textSecondary mt-6 text-center opacity-40 uppercase tracking-widest">
                   Force-directed graph of interdisciplinary intersections.
                </p>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-[#0B0F14] flex flex-col"
                    >
                        <div className="absolute top-8 right-8 z-[110]">
                            <button 
                                onClick={() => setIsExpanded(false)}
                                className="p-3 border border-white/10 bg-white/5 text-white/50 hover:text-white rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-1 relative overflow-hidden" onClick={() => setSelectedNode(null)}>
                            <svg ref={fullscreenSvgRef} className="w-full h-full cursor-move" />

                            <AnimatePresence>
                                {selectedNode && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                        onClick={(e) => e.stopPropagation()}
                                        style={{ 
                                            position: 'absolute',
                                            left: Math.min(window.innerWidth - 340, Math.max(20, selectedNode.x - 160)),
                                            top: Math.min(window.innerHeight - 250, Math.max(20, selectedNode.y + 40)),
                                        }}
                                        className="w-80 p-6 bg-[#111827] border border-[#38BDF8]/30 rounded-lg shadow-2xl z-[120]"
                                    >
                                        <h4 className="font-sans font-medium text-[13px] uppercase tracking-widest text-[#38BDF8] mb-3">
                                            {NODE_INFO[selectedNode.id]?.title || selectedNode.id}
                                        </h4>
                                        <div className="text-[#9CA3AF] text-[13px] font-sans leading-relaxed mb-4 space-y-2">
                                            <p>{NODE_INFO[selectedNode.id]?.body || "Research cluster detail pending expansion."}</p>
                                            
                                            <div className="pt-2 border-t border-white/10">
                                                <p className="font-mono text-[10px] uppercase text-[#38BDF8] mb-1">Recent Advances (AI Summary):</p>
                                                {isLoading ? (
                                                    <p className="animate-pulse">Analyzing...</p>
                                                ) : (
                                                    <p>{summary || "No summary available."}</p>
                                                )}
                                            </div>
                                        </div>
                                        {NODE_INFO[selectedNode.id]?.cta && (
                                            <button 
                                                onClick={() => handleAction(NODE_INFO[selectedNode.id]!.cta!.target)}
                                                className="px-4 py-2 border border-[#38BDF8]/40 hover:bg-[#38BDF8]/10 text-white text-[10px] font-mono uppercase tracking-[0.2em] transition-colors rounded-sm flex items-center gap-2"
                                            >
                                                {NODE_INFO[selectedNode.id]!.cta!.label}
                                            </button>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center pointer-events-none">
                                <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em]">
                                    Interactive Topology — Drag to reconfigure, click nodes for details
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
