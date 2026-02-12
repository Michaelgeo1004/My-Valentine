"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";

export default function LoyolaPage() {
    const { lang } = useAppContext();
    const router = useRouter();

    return (
        <CinematicContainer>
            <StoryCard className="max-w-3xl">
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="w-24 h-24 md:w-32 md:h-32 bg-white/10 backdrop-blur-xl rounded-full mb-8 flex items-center justify-center border border-white/20 shadow-inner mx-auto"
                >
                    <motion.span
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-4xl md:text-5xl font-black text-romantic-red"
                    >
                        L
                    </motion.span>
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-6xl font-black mb-6 tracking-tighter"
                >
                    {content[lang].loyola_days}
                </motion.h1>

                {/* Ego Clash Visualization - Premium Refinement */}
                <div className="relative h-48 md:h-64 flex items-center justify-center mb-12 w-full glass-card rounded-3xl overflow-hidden border-white/5 bg-black/5">
                    <div className="absolute inset-0 bg-gradient-to-r from-romantic-red/5 via-transparent to-romantic-pink/5" />

                    <motion.div
                        initial={{ x: -150, opacity: 0 }}
                        animate={{ x: -40, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100, delay: 0.8 }}
                        className="flex flex-col items-center"
                    >
                        <span className="text-5xl md:text-8xl font-black text-romantic-red drop-shadow-lg">1000</span>
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Driver's Ego</span>
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.5, 1] }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                        className="text-3xl md:text-5xl font-black text-foreground/20 px-4 md:px-8 z-10"
                    >
                        VS
                    </motion.div>

                    <motion.div
                        initial={{ x: 150, opacity: 0 }}
                        animate={{ x: 40, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100, delay: 1 }}
                        className="flex flex-col items-center"
                    >
                        <span className="text-5xl md:text-8xl font-black text-romantic-pink drop-shadow-lg">100</span>
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Ancy's Ego</span>
                    </motion.div>

                    <motion.div
                        animate={{ scale: [1, 2, 1], opacity: [0, 0.2, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="absolute inset-x-0 h-1 bg-white/20 blur-xl"
                    />
                </div>

                <div className="space-y-6 max-w-md mx-auto">
                    <h3 className="text-2xl md:text-3xl font-black text-romantic-red uppercase tracking-wider">{content[lang].ego_title}</h3>
                    <p className="text-base md:text-xl font-medium opacity-70 italic leading-relaxed">
                        {content[lang].ego_desc}
                    </p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => router.push("/story/bus-chase")}
                    className="mt-12 w-full glass-card py-5 rounded-3xl font-black text-romantic-red hover:bg-romantic-red hover:text-white transition-all duration-500 group flex items-center justify-center gap-3 overflow-hidden relative shadow-xl"
                >
                    <span className="relative z-10">{content[lang].continue_story}</span>
                    <Sparkles size={20} className="group-hover:animate-spin" />
                    <motion.div
                        className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                    />
                </motion.button>
            </StoryCard>
        </CinematicContainer>
    );
}
