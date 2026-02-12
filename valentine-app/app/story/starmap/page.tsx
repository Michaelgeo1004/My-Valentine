"use client";

import { motion } from "framer-motion";
import { Sparkles, MapPin, Star, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";

export default function StarMapPage() {
    const { lang } = useAppContext();
    const router = useRouter();

    const constellations = [
        { x: "20", y: "30", size: 8 },
        { x: "40", y: "20", size: 6 },
        { x: "60", y: "40", size: 10 },
        { x: "30", y: "60", size: 7 },
        { x: "70", y: "70", size: 5 },
        { x: "85", y: "25", size: 9 },
    ];

    return (
        <CinematicContainer>
            <StoryCard className="max-w-2xl flex flex-col items-center">
                <h1 className="text-3xl md:text-5xl font-black mb-2 text-romantic text-center">
                    {content[lang].starmap_title}
                </h1>
                <p className="text-sm md:text-base font-medium opacity-60 italic mb-10 text-center px-6">
                    {content[lang].starmap_desc}
                </p>

                {/* Constellation Visualization */}
                <div className="relative w-full aspect-[2/1] bg-black/40 rounded-[3rem] border border-white/10 shadow-2xl mb-12 overflow-hidden flex divide-x divide-white/5">
                    {/* Dubai Sky */}
                    <div className="flex-1 relative">
                        <div className="absolute top-4 left-6 flex items-center gap-2 opacity-50">
                            <MapPin size={12} />
                            <span className="text-[10px] font-black uppercase tracking-widest">{content[lang].dubai}</span>
                        </div>

                        {constellations.map((s, i) => (
                            <motion.div
                                key={i}
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ repeat: Infinity, duration: 2 + Math.random() * 3, delay: i * 0.5 }}
                                className="absolute text-white"
                                style={{ left: `${s.x}%`, top: `${s.y}%` }}
                            >
                                <Star size={s.size} fill="currentColor" />
                            </motion.div>
                        ))}

                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 rounded-full bg-romantic-red/10 blur-[60px]" />
                        </div>
                    </div>

                    {/* Tirunelveli Sky */}
                    <div className="flex-1 relative">
                        <div className="absolute top-4 right-6 flex items-center gap-2 opacity-50 justify-end">
                            <span className="text-[10px] font-black uppercase tracking-widest">{content[lang].tirunelveli}</span>
                            <MapPin size={12} />
                        </div>

                        {constellations.map((s, i) => (
                            <motion.div
                                key={i}
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ repeat: Infinity, duration: 2 + Math.random() * 3, delay: i * 0.3 }}
                                className="absolute text-white"
                                style={{ right: `${s.x}%`, bottom: `${s.y}%` }}
                            >
                                <Star size={s.size} fill="currentColor" />
                            </motion.div>
                        ))}

                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 rounded-full bg-romantic-pink/10 blur-[60px]" />
                        </div>
                    </div>

                    {/* Central Connection Light */}
                    <motion.div
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-3/4 bg-white/20 blur-sm pointer-events-none"
                    />
                </div>

                <div className="text-center mb-10 max-w-md">
                    <p className={`text-lg md:text-xl font-bold italic text-romantic/80 leading-relaxed ${lang === 'ta' ? 'font-tamil' : ''}`}>
                        "No matter where we are, we look up at the same moon and the same stars. They witness our love every single night."
                    </p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => router.push("/story/hug")}
                    className="w-full bg-romantic-red text-white py-5 rounded-3xl font-black text-xl shadow-xl flex items-center justify-center gap-4 group"
                >
                    <span>{content[lang].cta_starmap}</span>
                    <RotateCcw size={22} className="rotate-90 group-hover:rotate-180 transition-transform duration-500" />
                </motion.button>
            </StoryCard>
        </CinematicContainer>
    );
}
