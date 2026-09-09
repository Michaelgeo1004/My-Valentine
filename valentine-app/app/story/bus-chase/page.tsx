"use client";

import { motion } from "framer-motion";
import { Bus, MousePointer2, Heart, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";

export default function BusChasePage() {
    const { lang } = useAppContext();
    const router = useRouter();

    return (
        <CinematicContainer>
            <StoryCard className="max-w-3xl">
                <h1 className="text-3xl md:text-6xl font-black text-center mb-6 tracking-tighter">
                    {content[lang].bus_chase}
                </h1>
                <p className="text-base md:text-xl font-medium opacity-60 italic mb-12 text-center max-w-md mx-auto">
                    {content[lang].bus_desc}
                </p>

                {/* Cinematic Bus Chase Scene */}
                <div className="w-full h-48 md:h-64 relative glass-card rounded-[2rem] border-white/5 bg-black/10 overflow-hidden flex items-end">
                    {/* Road Lines */}
                    <div className="absolute w-full h-2 bottom-6 flex gap-6 overflow-hidden opacity-10">
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{ x: [-100, 100] }}
                                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                                className="w-12 h-1 bg-white shrink-0"
                            />
                        ))}
                    </div>

                    {/* Perspective Lines for depth */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{
                            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, currentColor 40px, currentColor 41px)',
                            transform: 'perspective(500px) rotateX(60deg) scale(2)',
                            transformOrigin: 'bottom'
                        }}
                    />

                    {/* The College Bus - Premium Animation */}
                    <motion.div
                        animate={{
                            y: [0, -6, 0],
                            rotate: [0, -1, 1, 0]
                        }}
                        transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
                        className="absolute left-[55%] bottom-10 z-20"
                    >
                        <Bus size={80} className="text-romantic-pink drop-shadow-[0_10px_20px_rgba(255,173,173,0.3)]" />
                        <div className="absolute -top-4 -right-4">
                            <motion.div
                                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                <Heart size={24} fill="currentColor" className="text-romantic-red" />
                            </motion.div>
                        </div>
                        {/* Bus Windows Glow */}
                        <div className="absolute top-6 left-4 right-4 h-4 bg-white/20 blur-sm rounded-sm" />
                    </motion.div>

                    {/* Geo's Pursuit - Parallax Sentiment */}
                    <motion.div
                        animate={{
                            x: [-60, -20, -60],
                            y: [0, -3, 0],
                            scale: [1, 1.05, 1]
                        }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                        className="absolute left-[25%] bottom-12 z-10"
                    >
                        <div className="relative">
                            <MousePointer2 size={40} className="text-romantic-red fill-current -rotate-45 drop-shadow-[0_5px_15px_rgba(255,77,77,0.4)]" />
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[12px] font-black uppercase tracking-widest text-romantic-red whitespace-nowrap">
                                Geo is Chasing...
                            </span>
                            {/* Heart Trail */}
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1.5, 2.5], x: -40 - (i * 20), y: -10 }}
                                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.6 }}
                                    className="absolute left-0 top-0 text-romantic-red"
                                >
                                    <Heart size={12} fill="currentColor" />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Blurred Foreground items for depth */}
                    <div className="absolute left-4 bottom-4 w-12 h-12 bg-white/5 blur-xl rounded-full" />
                    <div className="absolute right-20 bottom-8 w-8 h-8 bg-romantic-red/5 blur-xl rounded-full" />
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push("/story/panagudi")}
                    className="mt-12 w-full glass-card py-5 rounded-3xl font-black text-romantic-red hover:bg-romantic-red hover:text-white transition-all flex items-center justify-center gap-4 group"
                >
                    <span className="text-lg">{content[lang].continue_story}</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-500" />
                </motion.button>
            </StoryCard>
        </CinematicContainer>
    );
}
