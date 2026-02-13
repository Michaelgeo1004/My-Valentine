"use client";

import { motion } from "framer-motion";
import { Sparkles, MapPin, Star, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";
import { useEffect } from "react";
import { logInsight } from "@/utils/insights";

export default function StarMapPage() {
    const { lang } = useAppContext();
    const router = useRouter();

    useEffect(() => {
        logInsight('lastPage', 'Star Map');
    }, []);

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
                <div className="relative w-full aspect-[16/9] md:aspect-[2/1] bg-[#02040a] rounded-[3rem] border border-white/10 shadow-2xl mb-12 overflow-hidden">
                    {/* Parallax Starfield Background */}
                    <div className="absolute inset-0 z-0">
                        {Array.from({ length: 50 }).map((_, i) => (
                            <motion.div
                                key={`bg-star-${i}`}
                                animate={{ opacity: [0.1, 0.4, 0.1] }}
                                transition={{ repeat: Infinity, duration: 3 + Math.random() * 5, delay: Math.random() * 5 }}
                                className="absolute w-px h-px bg-white rounded-full"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                }}
                            />
                        ))}
                    </div>

                    <div className="relative w-full h-full flex divide-x divide-white/5 z-10">
                        {/* Dubai Sky */}
                        <div className="flex-1 relative">
                            <div className="absolute top-4 left-6 flex items-center gap-2 opacity-30 z-20">
                                <MapPin size={12} className="text-romantic-red" />
                                <span className="text-[10px] font-black uppercase tracking-widest">{content[lang].dubai}</span>
                            </div>

                            {constellations.map((s, i) => (
                                <motion.div
                                    key={`dubai-star-${i}`}
                                    animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 + Math.random() * 2, delay: i * 0.2 }}
                                    className="absolute text-white"
                                    style={{ left: `${s.x}%`, top: `${s.y}%` }}
                                >
                                    <Star size={s.size} fill="currentColor" className="drop-shadow-[0_0_5px_white]" />
                                </motion.div>
                            ))}
                        </div>

                        {/* India Sky */}
                        <div className="flex-1 relative">
                            <div className="absolute top-4 right-6 flex items-center gap-2 opacity-30 justify-end z-20">
                                <span className="text-[10px] font-black uppercase tracking-widest">{content[lang].tirunelveli}</span>
                                <MapPin size={12} className="text-romantic-pink" />
                            </div>

                            {constellations.map((s, i) => (
                                <motion.div
                                    key={`india-star-${i}`}
                                    animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 + Math.random() * 3, delay: i * 0.4 }}
                                    className="absolute text-white"
                                    style={{ right: `${s.x}%`, bottom: `${s.y}%` }}
                                >
                                    <Star size={s.size} fill="currentColor" className="drop-shadow-[0_0_5px_white]" />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Constellation Lines SVG */}
                    <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-20">
                        <motion.path
                            d="M 50 20 L 100 80 L 150 40 L 200 120 L 300 30 L 380 90"
                            stroke="white"
                            strokeWidth="0.5"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.circle cx="200" cy="75" r="120" stroke="white" strokeWidth="0.2" fill="none" className="opacity-10" />
                    </svg>

                    {/* Central Connection Light */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div
                            animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.2, 1] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className="w-[400px] h-px bg-gradient-to-r from-transparent via-romantic-red to-transparent blur-md"
                        />
                    </div>
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
