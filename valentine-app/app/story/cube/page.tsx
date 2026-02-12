"use client";

import { motion } from "framer-motion";
import { Heart, MapPin, Sparkles, Bus, Sun, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";
import { useState } from "react";

export default function MemoryCubePage() {
    const { lang } = useAppContext();
    const router = useRouter();
    const [rotation, setRotation] = useState({ x: -20, y: 40 });

    const handlePan = (event: any, info: any) => {
        setRotation({
            x: rotation.x - info.delta.y * 0.5,
            y: rotation.y + info.delta.x * 0.5
        });
    };

    const faces = [
        { icon: Heart, color: "text-romantic-red", label: "Love" },
        { icon: MapPin, color: "text-blue-400", label: "Distance" },
        { icon: Sparkles, color: "text-romantic-gold", label: "Ego" },
        { icon: Bus, color: "text-romantic-pink", label: "Chase" },
        { icon: Sun, color: "text-orange-400", label: "Waiting" },
        { icon: () => <span className="text-4xl">🍁</span>, color: "", label: "Muhh" },
    ];

    return (
        <CinematicContainer>
            <div className="w-full h-full flex items-center justify-center">
                <StoryCard className="max-w-xl">
                    <h1 className="text-3xl md:text-5xl font-black mb-4 text-romantic">
                        {content[lang].cube_title}
                    </h1>
                    <p className="text-sm md:text-base font-medium opacity-60 italic mb-12">
                        {content[lang].cube_desc}
                    </p>

                    {/* 3D Cube Container */}
                    <div className="relative h-64 md:h-80 w-full flex items-center justify-center perspective-[1000px] mb-12 cursor-grab active:cursor-grabbing">
                        <motion.div
                            onPan={handlePan}
                            animate={{
                                rotateX: rotation.x,
                                rotateY: rotation.y
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="relative w-32 h-32 md:w-40 md:h-40 preserve-3d touch-none"
                        >
                            {/* Cube Faces */}
                            <div className="absolute inset-0 flex items-center justify-center glass-card border-white/20 translate-z-[80px] md:translate-z-[100px] shadow-2xl overflow-hidden">
                                <Heart size={48} className="text-romantic-red fill-current" />
                                <div className="absolute top-2 right-2 text-xl opacity-40">🧸</div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center glass-card border-white/20 -translate-z-[80px] md:-translate-z-[100px] rotate-y-180 shadow-2xl">
                                <MapPin size={48} className="text-blue-400 fill-current" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center glass-card border-white/20 translate-x-[80px] md:translate-x-[100px] rotate-y-90 shadow-2xl">
                                <Sparkles size={48} className="text-romantic-gold fill-current" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center glass-card border-white/20 -translate-x-[80px] md:-translate-x-[100px] -rotate-y-90 shadow-2xl">
                                <Bus size={48} className="text-romantic-pink fill-current" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center glass-card border-white/20 -translate-y-[80px] md:-translate-y-[100px] rotate-x-90 shadow-2xl">
                                <Sun size={48} className="text-orange-400 fill-current" />
                            </div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center glass-card border-white/20 translate-y-[80px] md:translate-y-[100px] -rotate-x-90 shadow-2xl p-4">
                                <span className="text-4xl text-orange-400 mb-2">🍁</span>
                                <span className={`text-[10px] font-black uppercase tracking-widest text-romantic text-center ${lang === 'ta' ? 'font-tamil' : ''}`}>
                                    {content[lang as 'en' | 'ta'].cube_muhh_emoji}
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => router.push("/story/reasons")}
                        className="w-full glass-card py-5 rounded-3xl font-black text-romantic-red hover:bg-romantic-red hover:text-white transition-all flex items-center justify-center gap-4 group shadow-xl"
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
