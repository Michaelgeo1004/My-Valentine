"use client";

import { motion } from "framer-motion";
import { Heart, MapPin, Sparkles, Bus, Sun, RotateCcw, GraduationCap, Coffee } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";
import { useState, useEffect } from "react";
import { logInsight } from "@/utils/insights";

export default function MemoryCubePage() {
    const { lang } = useAppContext();
    const router = useRouter();
    const [rotation, setRotation] = useState({ x: -20, y: 40 });

    useEffect(() => {
        logInsight('lastPage', 'Memory Cube');
    }, []);

    const handlePan = (event: any, info: any) => {
        setRotation({
            x: rotation.x - info.delta.y * 0.5,
            y: rotation.y + info.delta.x * 0.5
        });
        logInsight('hugCount', 0.05); // Tiny affection points for interacting with memories
    };


    return (
        <CinematicContainer>
            <div className="w-full h-full flex items-center justify-center">
                <StoryCard className="max-w-xl">
                    <h1 className="text-3xl md:text-5xl font-black mb-4 text-romantic text-center">
                        {content[lang].our_world}
                    </h1>
                    <p className="text-sm md:text-base font-medium opacity-60 italic mb-8 text-center px-6">
                        {content[lang].cube_desc}
                    </p>

                    {/* 3D Cube Container */}
                    <div className="relative h-64 md:h-80 w-full flex items-center justify-center perspective-[1200px] mb-10 cursor-grab active:cursor-grabbing">
                        <motion.div
                            onPan={handlePan}
                            animate={{
                                rotateX: rotation.x,
                                rotateY: rotation.y
                            }}
                            transition={{ type: "spring", stiffness: 150, damping: 15 }}
                            className="relative w-32 h-32 md:w-48 md:h-48 preserve-3d touch-none"
                        >
                            {/* Cube Faces */}
                            <div className="absolute inset-0 flex items-center justify-center cube-face translate-z-[64px] md:translate-z-[96px] shadow-2xl overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-romantic-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Heart size={64} className="text-romantic-red fill-current filter drop-shadow-[0_0_10px_rgba(255,77,77,0.3)]" />
                                <div className="absolute top-3 right-3 text-2xl opacity-60">🧸</div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center cube-face -translate-z-[64px] md:-translate-z-[96px] rotate-y-180 shadow-2xl">
                                <span className="text-7xl filter drop-shadow-[0_0_15px_rgba(255,215,0,0.4)]">💍</span>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center cube-face translate-x-[64px] md:translate-x-[96px] rotate-y-90 shadow-2xl">
                                <GraduationCap size={64} className="text-blue-400 fill-current filter drop-shadow-[0_0_10px_rgba(96,165,250,0.3)]" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center cube-face -translate-x-[64px] md:-translate-x-[96px] -rotate-y-90 shadow-2xl">
                                <Bus size={64} className="text-romantic-pink fill-current filter drop-shadow-[0_0_10px_rgba(255,173,173,0.3)]" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center cube-face -translate-y-[64px] md:-translate-y-[96px] rotate-x-90 shadow-2xl">
                                <span className="text-7xl filter drop-shadow-[0_0_15px_rgba(255,173,173,0.4)]">🧸</span>
                            </div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center cube-face translate-y-[64px] md:translate-y-[96px] -rotate-x-90 p-4 shadow-2xl">
                                <span className="text-6xl text-orange-400 mb-2 filter drop-shadow-[0_0_10px_rgba(251,146,60,0.3)]">🍁</span>
                                <span className={`text-[10px] md:text-sm font-black uppercase tracking-widest text-romantic text-center ${lang === 'ta' ? 'font-tamil' : ''}`}>
                                    {content[lang as 'en' | 'ta'].cube_muhh_emoji}
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => router.push("/story/reasons")}
                        className="w-full bg-romantic-red text-white py-5 rounded-3xl font-black text-xl shadow-xl flex items-center justify-center gap-4 group"
                    >
                        <span className="text-lg">{content[lang].cta_cube}</span>
                        <RotateCcw size={20} className="rotate-90 group-hover:rotate-180 transition-transform duration-500" />
                    </motion.button>
                </StoryCard>
            </div>

            <style jsx global>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .translate-z-100 {
          transform: translateZ(100px);
        }
        .-translate-z-100 {
          transform: translateZ(-100px);
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .rotate-y-90 {
          transform: rotateY(90deg);
        }
        .-rotate-y-90 {
          transform: rotateY(-90deg);
        }
        .rotate-x-90 {
          transform: rotateX(90deg);
        }
        .-rotate-x-90 {
          transform: rotateX(-90deg);
        }
      `}</style>
        </CinematicContainer>
    );
}
