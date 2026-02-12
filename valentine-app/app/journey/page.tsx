"use client";

import { motion } from "framer-motion";
import { Plane, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";

export default function JourneyPage() {
    const { lang } = useAppContext();
    const router = useRouter();

    return (
        <CinematicContainer>
            <StoryCard className="max-w-2xl">
                <div className="relative w-full aspect-[16/9] bg-white/5 rounded-[2rem] border border-white/10 overflow-hidden p-8 shadow-inner mb-12">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '30px 30px' }}
                    />

                    <div className="relative h-full flex flex-col justify-between text-left">
                        <div className="flex justify-between items-center z-10 shrink-0">
                            <div>
                                <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Origin</p>
                                <h4 className="font-black text-romantic-red text-lg md:text-xl">DUBAI</h4>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Destination</p>
                                <h4 className="font-black text-romantic-red text-lg md:text-xl">INDIA</h4>
                            </div>
                        </div>

                        <div className="flex-1 relative flex items-center justify-center -my-4">
                            <svg width="100%" height="120" viewBox="0 0 400 120" className="overflow-visible scale-110 md:scale-125">
                                <motion.path
                                    d="M 40 80 Q 200 0 360 80"
                                    fill="transparent"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeDasharray="4 6"
                                    className="opacity-10"
                                />
                                <motion.path
                                    d="M 40 80 Q 200 0 360 80"
                                    fill="transparent"
                                    stroke="url(#pathGradientJourney)"
                                    strokeWidth="3"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                />
                                <defs>
                                    <linearGradient id="pathGradientJourney" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="var(--romantic-red)" />
                                        <stop offset="100%" stopColor="var(--romantic-pink)" />
                                    </linearGradient>
                                </defs>

                                <motion.g
                                    animate={{ opacity: [0, 1, 1, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <motion.g
                                        style={{ offsetPath: "path('M 40 80 Q 200 0 360 80')", offsetRotate: "auto" }}
                                        animate={{ offsetDistance: ["0%", "100%"] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <Plane size={24} className="text-romantic-red fill-current -rotate-45" />
                                        <motion.circle
                                            r="12"
                                            fill="currentColor"
                                            className="text-romantic-red/20"
                                            animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
                                            transition={{ repeat: Infinity, duration: 1.5 }}
                                        />
                                    </motion.g>
                                </motion.g>
                            </svg>
                        </div>

                        <div className="text-center shrink-0">
                            <p className="text-base md:text-lg font-bold text-romantic italic max-w-xs mx-auto leading-relaxed">
                                "{content[lang].distance_quote}"
                            </p>
                        </div>
                    </div>
                </div>

                <motion.button
                    onClick={() => router.push("/story/cube")}
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255,173,173,0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-romantic-red text-white px-12 py-5 rounded-2xl font-black text-xl shadow-2xl flex items-center justify-center gap-3 transition-all w-full md:w-auto mx-auto"
                >
                    {content[lang].start_journey} <Globe size={24} className="animate-spin-slow" />
                </motion.button>
            </StoryCard>
        </CinematicContainer>
    );
}
