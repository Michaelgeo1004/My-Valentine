"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Heart, RotateCcw, PenTool } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";
import { logInsight } from "@/utils/insights";

interface LeafTrail {
    x: number;
    y: number;
    id: number;
    rotation: number;
    scale: number;
}

export default function GardenPage() {
    const { lang } = useAppContext();
    const router = useRouter();
    const [trails, setTrails] = useState<LeafTrail[]>([]);
    const nextId = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        logInsight('lastPage', 'Garden of Memories');
    }, []);

    const handleInteraction = (clientX: number, clientY: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const newLeaf: LeafTrail = {
            x,
            y,
            id: nextId.current++,
            rotation: Math.random() * 360,
            scale: 0.5 + Math.random() * 0.8
        };

        setTrails(prev => [...prev.slice(-40), newLeaf]);
        logInsight('hugCount', 0.1); // Small affection points for drawing
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (e.buttons === 1) handleInteraction(e.clientX, e.clientY);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
    };

    return (
        <CinematicContainer>
            <StoryCard className="max-w-2xl h-[600px] flex flex-col">
                <h1 className="text-3xl md:text-5xl font-black mb-2 text-romantic text-center">
                    {content[lang].garden_title}
                </h1>
                <p className="text-sm md:text-base font-medium opacity-60 italic mb-8 text-center px-4">
                    {content[lang].garden_desc}
                </p>

                <div
                    ref={containerRef}
                    onMouseMove={onMouseMove}
                    onTouchMove={onTouchMove}
                    className="flex-1 relative glass-card rounded-3xl border-white/10 bg-black/5 overflow-hidden cursor-crosshair touch-none select-none"
                >
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                        <div className="text-center">
                            <PenTool size={48} className="mx-auto mb-2" />
                            <p className="text-[10px] font-black uppercase tracking-widest">Draw with touch or mouse</p>
                        </div>
                    </div>

                    {/* Leaf Trails */}
                    {trails.map((leaf) => (
                        <motion.div
                            key={leaf.id}
                            initial={{ opacity: 0, scale: 0, rotate: leaf.rotation - 45 }}
                            animate={{ opacity: 1, scale: leaf.scale, rotate: leaf.rotation }}
                            exit={{ opacity: 0, scale: 0 }}
                            style={{ left: leaf.x - 20, top: leaf.y - 20 }}
                            className="absolute pointer-events-none text-2xl md:text-3xl z-10"
                        >
                            🍁
                        </motion.div>
                    ))}

                    {/* Subtle Glow at last leaf */}
                    {trails.length > 0 && (
                        <motion.div
                            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            style={{
                                left: trails[trails.length - 1].x - 40,
                                top: trails[trails.length - 1].y - 40
                            }}
                            className="absolute w-20 h-20 bg-romantic-pink/20 blur-2xl rounded-full pointer-events-none"
                        />
                    )}
                </div>

                <div className="mt-8 flex gap-4">
                    <button
                        onClick={() => setTrails([])}
                        className="glass-card px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors"
                    >
                        Clear Garden
                    </button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        onClick={() => router.push("/story/adventure")}
                        className="flex-1 bg-romantic-red text-white py-4 rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-3 group"
                    >
                        <span>{content[lang].cta_adventure}</span>
                        <RotateCcw size={20} className="rotate-90 group-hover:rotate-180 transition-transform duration-500" />
                    </motion.button>
                </div>
            </StoryCard>
        </CinematicContainer>
    );
}
