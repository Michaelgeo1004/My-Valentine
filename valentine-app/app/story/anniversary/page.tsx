"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Heart, Calendar, Sparkles, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";

export default function AnniversaryPage() {
    const { lang } = useAppContext();
    const router = useRouter();
    const [revealed, setRevealed] = useState(false);

    return (
        <CinematicContainer>
            <StoryCard className="max-w-xl flex flex-col items-center">
                <h1 className="text-3xl md:text-5xl font-black mb-2 text-romantic text-center">
                    {content[lang].anniversary_title}
                </h1>
                <p className="text-sm md:text-base font-medium opacity-60 italic mb-12 text-center px-6">
                    {content[lang].anniversary_desc}
                </p>

                {/* Reveal Interaction */}
                <div className="relative w-full aspect-square max-w-[320px] flex items-center justify-center mb-12">
                    <AnimatePresence mode="wait">
                        {!revealed ? (
                            <motion.div
                                key="hidden"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.2 }}
                                onClick={() => setRevealed(true)}
                                className="w-full h-full glass-card rounded-[4rem] border-2 border-dashed border-romantic-red/30 flex flex-col items-center justify-center cursor-pointer hover:border-romantic-red transition-all group shadow-2xl"
                            >
                                <Heart size={80} className="text-romantic-red/20 group-hover:scale-110 transition-transform duration-500" />
                                <div className="mt-8 flex flex-col items-center gap-2">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Tap to Reveal the Moment</span>
                                    <Calendar size={18} className="text-romantic-red/40" />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="revealed"
                                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                className="w-full h-full glass-card rounded-[4rem] border-2 border-romantic-red bg-romantic-red/5 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(255,173,173,0.3)] relative overflow-hidden"
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="text-romantic-red mb-4"
                                >
                                    <Heart size={100} fill="currentColor" className="drop-shadow-[0_0_20px_rgba(255,173,173,0.6)]" />
                                </motion.div>

                                <div className="text-center z-10">
                                    <h2 className="text-4xl md:text-5xl font-black text-romantic mb-2">March 25</h2>
                                    <p className="text-sm font-black uppercase tracking-[0.4em] text-romantic-red opacity-80">A Special Milestone</p>
                                </div>

                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                                    className="absolute inset-0 opacity-20 pointer-events-none"
                                >
                                    <Sparkles className="absolute top-10 left-10 text-romantic-gold" />
                                    <Sparkles className="absolute bottom-10 right-10 text-romantic-red" />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="w-full space-y-6">
                    {revealed && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center"
                        >
                            <p className={`text-xl font-bold italic text-romantic leading-relaxed ${lang === 'ta' ? 'font-tamil' : ''}`}>
                                "That first kiss, on an empty road near a trash can—the most beautiful moment in the most unexpected place. It was the beginning of my favorite story: Us."
                            </p>
                        </motion.div>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => router.push("/story/date-gen")}
                        className="w-full bg-romantic-red text-white py-5 rounded-3xl font-black text-xl shadow-xl flex items-center justify-center gap-4 group"
                    >
                        <span>{content[lang].cta_anniversary}</span>
                        <RotateCcw size={22} className="rotate-90 group-hover:rotate-180 transition-transform duration-500" />
                    </motion.button>
                </div>
            </StoryCard>
        </CinematicContainer>
    );
}
