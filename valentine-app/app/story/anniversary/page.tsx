"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { Heart, Calendar, Sparkles, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";

const Confetti = () => {
    const pieces = useMemo(() => Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        xInitial: Math.random() * 300 - 150,
        xFinal: Math.random() * 400 - 200,
        duration: 2 + Math.random() * 2,
        scale: Math.random() * 0.5 + 0.5,
        width: Math.random() * 8 + 4 + 'px',
        height: Math.random() * 8 + 4 + 'px',
        delay: Math.random() * 0.5
    })), []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {pieces.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ y: -20, x: p.xInitial, opacity: 1, scale: p.scale }}
                    animate={{
                        y: 400,
                        x: p.xFinal,
                        rotate: 360,
                        opacity: 0
                    }}
                    transition={{ duration: p.duration, ease: "easeOut", delay: p.delay }}
                    className="absolute top-1/2 left-1/2"
                    style={{
                        backgroundColor: p.id % 2 === 0 ? '#ffadd2' : '#ff4d4d',
                        width: p.width,
                        height: p.height,
                        borderRadius: p.id % 3 === 0 ? '50%' : '2px'
                    }}
                />
            ))}
        </div>
    );
};

export default function AnniversaryPage() {
    const { lang } = useAppContext();
    const router = useRouter();
    const [revealed, setRevealed] = useState(false);

    // Calculate time since Jan 22, 2021 — the day they first met
    const startDate = new Date("2021-01-22");
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - startDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return (
        <CinematicContainer>
            <StoryCard className="max-w-2xl flex flex-col items-center">
                <h1 className="text-3xl md:text-5xl font-black mb-2 text-romantic text-center">
                    {content[lang].anniversary_title}
                </h1>
                <p className="text-sm md:text-base font-medium opacity-60 italic mb-12 text-center px-6">
                    {content[lang].anniversary_desc}
                </p>

                {/* Reveal Interaction */}
                <div className="relative w-full aspect-square max-w-[340px] flex items-center justify-center mb-12">
                    <AnimatePresence mode="wait">
                        {!revealed ? (
                            <motion.div
                                key="hidden"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.2 }}
                                onClick={() => setRevealed(true)}
                                className="w-full h-full glass-card rounded-[4rem] border-2 border-dashed border-romantic-red/30 flex flex-col items-center justify-center cursor-pointer hover:border-romantic-red transition-all group shadow-2xl relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-romantic-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Heart size={80} className="text-romantic-red fill-romantic-red/5 group-hover:scale-110 transition-transform duration-500" />
                                <div className="mt-8 flex flex-col items-center gap-2">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Tap to Unbox the Moment</span>
                                    <Sparkles size={18} className="text-romantic-gold animate-pulse" />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="revealed"
                                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                className="w-full h-full glass-card rounded-[4rem] border-2 border-romantic-red bg-romantic-red/5 flex flex-col justify-between p-10 shadow-[0_0_80px_rgba(255,77,77,0.2)] relative overflow-hidden text-center"
                            >
                                <Confetti />

                                <div className="space-y-1">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-romantic-red opacity-80">Since We Started</span>
                                    <h3 className="text-5xl font-black text-romantic">{diffDays}</h3>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Magical Days</p>
                                </div>

                                <motion.div
                                    animate={{ scale: [1, 1.1, 1], filter: ["drop-shadow(0 0 10px rgba(255,77,77,0.4))", "drop-shadow(0 0 20px rgba(255,77,77,0.6))", "drop-shadow(0 0 10px rgba(255,77,77,0.4))"] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    className="text-romantic-red"
                                >
                                    <Heart size={80} fill="currentColor" />
                                </motion.div>

                                <div className="space-y-1">
                                    <h2 className="text-3xl font-black text-romantic">January 22</h2>
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-romantic-red opacity-80">Where It Began</p>
                                </div>

                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                                    className="absolute inset-0 opacity-10 pointer-events-none"
                                >
                                    <Sparkles className="absolute top-10 left-10 text-romantic-gold" />
                                    <Sparkles className="absolute bottom-10 right-10 text-romantic-red" />
                                    <Heart size={12} className="absolute top-1/2 left-4 text-romantic-pink" />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="w-full space-y-8">
                    {revealed && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center bg-white/5 p-6 rounded-3xl border border-white/5 shadow-inner"
                        >
                            <p className={`text-xl font-bold italic text-romantic leading-relaxed ${lang === 'ta' ? 'font-tamil' : ''}`}>
                                "Just two people crossing paths that day, with no idea it was the start of forever. That hello became my favorite story: Us."
                            </p>
                        </motion.div>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => router.push("/story/date-gen")}
                        className="w-full bg-romantic-red text-white py-5 rounded-3xl font-black text-xl shadow-xl flex items-center justify-center gap-4 group"
                    >
                        <span>{content[lang].cta_anniversary}</span>
                        <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform duration-500" />
                    </motion.button>
                </div>
            </StoryCard>
        </CinematicContainer>
    );
}
