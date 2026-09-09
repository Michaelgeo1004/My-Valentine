"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ArrowRight, PenTool } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";
import { logInsight, sendTrackBeacon, useOnRealUnmount } from "@/utils/insights";

interface LeafTrail {
    x: number;
    y: number;
    id: number;
    rotation: number;
    scale: number;
}

const MILESTONE_COUNT = 50;

export default function GardenPage() {
    const { lang } = useAppContext();
    const router = useRouter();
    const [trails, setTrails] = useState<LeafTrail[]>([]);
    const [showMilestone, setShowMilestone] = useState(false);
    const nextId = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPoint = useRef({ x: -1000, y: -1000 });
    const milestoneShown = useRef(false);
    const leafCountRef = useRef(0);

    useEffect(() => {
        logInsight('lastPage', 'Garden of Memories');
    }, []);

    // Reports the final leaf count tagged to THIS page on leave, instead of
    // letting it surface later as a stray field on whatever page comes next.
    useOnRealUnmount(() => {
        if (leafCountRef.current > 0) {
            sendTrackBeacon({ path: '/story/garden', event: 'garden_leave', gardenLeaves: leafCountRef.current });
        }
    });

    const handleInteraction = (clientX: number, clientY: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        // Only drop a leaf once the pointer has actually moved a few pixels —
        // without this, careful slow writing burns the whole budget on near-duplicate points.
        const dx = x - lastPoint.current.x;
        const dy = y - lastPoint.current.y;
        if (Math.sqrt(dx * dx + dy * dy) < 6) return;
        lastPoint.current = { x, y };

        const newLeaf: LeafTrail = {
            x,
            y,
            id: nextId.current++,
            rotation: Math.random() * 360,
            scale: 0.5 + Math.random() * 0.8
        };

        setTrails(prev => {
            const next = [...prev.slice(-800), newLeaf];
            if (!milestoneShown.current && next.length >= MILESTONE_COUNT) {
                milestoneShown.current = true;
                setShowMilestone(true);
                setTimeout(() => setShowMilestone(false), 3500);
            }
            leafCountRef.current = next.length;
            logInsight('gardenLeaves', next.length);
            return next;
        });
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
            <StoryCard className="max-w-2xl h-[82dvh] min-h-[500px] max-h-[720px] flex flex-col">
                <h1 className="text-3xl md:text-5xl font-black mb-2 text-romantic text-center">
                    {content[lang].garden_title}
                </h1>
                <p className="text-sm md:text-base font-medium opacity-60 italic mb-2 text-center px-4">
                    {content[lang].garden_desc}
                </p>

                {/* Status row — kept outside the canvas so it never covers what she's
                    drawing. Swaps to the milestone line briefly, then back to the count. */}
                <div className="h-9 flex items-center justify-center mb-2">
                    <AnimatePresence mode="wait">
                        {showMilestone ? (
                            <motion.p
                                key="milestone"
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                className={`text-xs md:text-sm font-bold italic text-romantic text-center px-4 ${lang === 'ta' ? 'font-tamil' : ''}`}
                            >
                                {content[lang].garden_milestone}
                            </motion.p>
                        ) : trails.length > 0 ? (
                            <motion.p
                                key="counter"
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                className="text-[10px] md:text-xs font-black uppercase tracking-widest text-romantic-red/70"
                            >
                                🍁 {trails.length} {content[lang].garden_counter_label}
                            </motion.p>
                        ) : null}
                    </AnimatePresence>
                </div>

                <div
                    ref={containerRef}
                    onMouseMove={onMouseMove}
                    onTouchMove={onTouchMove}
                    className="flex-1 relative glass-card rounded-3xl border-white/10 bg-black/5 overflow-hidden cursor-crosshair touch-none select-none"
                >
                    {trails.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                            <div className="text-center">
                                <PenTool size={48} className="mx-auto mb-2" />
                                <p className="text-[10px] font-black uppercase tracking-widest">Draw with touch or mouse</p>
                            </div>
                        </div>
                    )}

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

                <div className="mt-4 flex gap-4">
                    <button
                        onClick={() => {
                            setTrails([]);
                            lastPoint.current = { x: -1000, y: -1000 };
                            milestoneShown.current = false;
                            leafCountRef.current = 0;
                            setShowMilestone(false);
                        }}
                        className="glass-card px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors"
                    >
                        Clear Garden
                    </button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        onClick={() => router.push("/story/adventure")}
                        className="flex-1 min-w-0 glass-card text-romantic-red py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2 whitespace-nowrap group"
                    >
                        <span>{content[lang].cta_garden}</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-500" />
                    </motion.button>
                </div>
            </StoryCard>
        </CinematicContainer>
    );
}
