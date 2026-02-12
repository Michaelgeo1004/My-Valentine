"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Heart, Send, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";

export default function HugPage() {
    const { lang } = useAppContext();
    const router = useRouter();
    const [isHugged, setIsHugged] = useState(false);
    const [ripples, setRipples] = useState<number[]>([]);

    const startHug = () => {
        setIsHugged(true);
        setRipples(prev => [...prev, Date.now()]);

        // Auto-reset after a while
        setTimeout(() => {
            setIsHugged(false);
        }, 2000);
    };

    return (
        <CinematicContainer>
            <StoryCard className="max-w-xl flex flex-col items-center">
                <h1 className="text-3xl md:text-5xl font-black mb-2 text-romantic text-center">
                    {content[lang].hug_title}
                </h1>
                <p className="text-sm md:text-base font-medium opacity-60 italic mb-12 text-center px-6">
                    {content[lang].hug_desc}
                </p>

                {/* Hug Button with Ripple Effect */}
                <div className="relative w-full aspect-square max-w-[300px] flex items-center justify-center mb-12">
                    {/* Ripples */}
                    <AnimatePresence>
                        {ripples.map(id => (
                            <motion.div
                                key={id}
                                initial={{ scale: 0.5, opacity: 0.8 }}
                                animate={{ scale: 4, opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 2, ease: "easeOut" }}
                                onAnimationComplete={() => setRipples(prev => prev.filter(r => r !== id))}
                                className="absolute inset-0 rounded-full border-2 border-romantic-red/40 pointer-events-none"
                            />
                        ))}
                    </AnimatePresence>

                    {/* Main Heart Button */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9, backgroundColor: "rgba(255,173,173,0.2)" }}
                        onMouseDown={startHug}
                        onTouchStart={startHug}
                        className={`w-48 h-48 md:w-56 md:h-56 rounded-full glass-card border-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-700 ${isHugged ? 'border-romantic-red bg-romantic-red/10 animate-pulse' : 'border-white/10'}`}
                    >
                        <Heart
                            size={80}
                            className={`transition-all duration-700 ${isHugged ? 'text-romantic-red fill-current scale-110' : 'text-white/20'}`}
                        />
                        <span className={`text-[10px] font-black uppercase tracking-[0.3em] mt-4 transition-all duration-700 ${isHugged ? 'text-romantic-red opacity-100' : 'opacity-30'}`}>
                            {isHugged ? "Hugging Ancy..." : "Long Press to Hug"}
                        </span>
                    </motion.div>

                    {/* City Markers */}
                    <div className="absolute top-0 left-0 flex flex-col items-center gap-1 opacity-40">
                        <span className="text-[10px] font-black uppercase tracking-widest">{content[lang].dubai}</span>
                        <div className="w-1 h-8 bg-white/20 rounded-full" />
                    </div>
                    <div className="absolute bottom-0 right-0 flex flex-col items-center gap-1 opacity-40">
                        <div className="w-1 h-8 bg-white/20 rounded-full" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{content[lang].tirunelveli}</span>
                    </div>
                </div>

                <div className="w-full space-y-6">
                    <AnimatePresence>
                        {isHugged && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="text-center"
                            >
                                <p className={`text-xl font-black text-romantic-red italic ${lang === 'ta' ? 'font-tamil' : ''}`}>
                                    "Feel it? That's me, right there with you."
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => router.push("/story/poetry")}
                        className="w-full bg-romantic-red text-white py-5 rounded-3xl font-black text-xl shadow-xl flex items-center justify-center gap-4 group"
                    >
                        <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                        <span>{content[lang].cta_hug}</span>
                        <RotateCcw size={22} className="rotate-90 group-hover:rotate-180 transition-transform duration-500" />
                    </motion.button>
                </div>
            </StoryCard>
        </CinematicContainer>
    );
}
