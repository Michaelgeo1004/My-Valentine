"use client";

import { motion } from "framer-motion";
import { MapPin, Sparkles, Sun, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";

export default function PanagudiPage() {
    const { lang } = useAppContext();
    const router = useRouter();

    return (
        <CinematicContainer>
            <StoryCard className="max-w-3xl overflow-hidden">
                {/* Sunset Ambient Background for the card specifically */}
                <div className="absolute inset-0 bg-gradient-to-b from-orange-400/10 via-romantic-pink/5 to-transparent opacity-60 pointer-events-none" />

                <h1 className="relative z-10 text-3xl md:text-6xl font-black text-center mb-6 tracking-tighter">
                    {content[lang].panagudi_wait}
                </h1>
                <p className="relative z-10 text-base md:text-xl font-medium opacity-60 italic mb-12 text-center max-w-sm mx-auto">
                    {content[lang].panagudi_desc}
                </p>

                {/* Cinematic Bus Stop Scene */}
                <div className="relative h-64 w-full glass-card border-white/5 rounded-[2.5rem] overflow-hidden bg-black/20 flex items-center justify-center">
                    {/* Ground */}
                    <div className="absolute bottom-0 w-full h-8 bg-white/5" />

                    {/* Bench Silhouette */}
                    <div className="absolute bottom-10 w-44 h-2 bg-white/10 rounded-full" />
                    <div className="absolute bottom-10 left-[calc(50%-18px)] w-1 h-10 bg-white/10" />
                    <div className="absolute bottom-10 left-[calc(50%+14px)] w-1 h-10 bg-white/10" />

                    {/* Waiting Shadow (Geo) */}
                    <motion.div
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                            scale: [0.98, 1.02, 0.98]
                        }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="absolute bottom-12 z-20"
                    >
                        <div className="relative">
                            <MapPin size={64} className="text-romantic-red drop-shadow-[0_0_25px_rgba(255,77,77,0.4)]" />
                            <motion.div
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute -top-4 -right-4"
                            >
                                <Heart size={20} className="text-romantic-red/60" fill="currentColor" />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Atmospheric Particles (Fireflies/Stars) */}
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: [0, 0.6, 0],
                                y: [0, -40, 0]
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 3 + Math.random() * 5,
                                delay: i * 0.8
                            }}
                            className="absolute text-yellow-200/40"
                            style={{
                                top: `${20 + Math.random() * 50}%`,
                                left: `${10 + Math.random() * 80}%`
                            }}
                        >
                            <Sparkles size={8 + Math.random() * 8} />
                        </motion.div>
                    ))}

                    {/* Distant Trees silhouettes */}
                    <div className="absolute bottom-8 left-8 w-16 h-28 bg-white/5 blur-2xl rounded-t-full" />
                    <div className="absolute bottom-8 right-12 w-20 h-32 bg-white/5 blur-3xl rounded-t-full" />
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => router.push("/story/more")}
                    className="relative z-10 mt-12 w-full glass-card py-5 rounded-3xl font-black text-romantic-red hover:bg-romantic-red hover:text-white transition-all flex items-center justify-center gap-4 group shadow-xl"
                >
                    <span className="text-lg">{content[lang].continue_story}</span>
                    <Sun size={20} className="group-hover:rotate-180 transition-transform duration-700" />
                </motion.button>
            </StoryCard>
        </CinematicContainer>
    );
}
