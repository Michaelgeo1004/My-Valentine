"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CheckCircle2, Circle, Plane, Camera, Coffee, Heart, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";

import { adventuresList } from "@/constants/adventures";

export default function AdventurePage() {
    const { lang } = useAppContext();
    const router = useRouter();
    const [completed, setCompleted] = useState<number[]>([]);

    const toggleItem = (index: number) => {
        setCompleted(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    return (
        <CinematicContainer>
            <StoryCard className="max-w-xl">
                <h1 className="text-3xl md:text-5xl font-black mb-2 text-romantic text-center">
                    {content[lang].adventure_title}
                </h1>
                <p className="text-sm md:text-base font-medium opacity-60 italic mb-10 text-center px-6">
                    {content[lang].adventure_desc}
                </p>

                <div className="space-y-4 w-full text-left mb-10 h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                    {adventuresList[lang as 'en' | 'ta'].map((item: any, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => toggleItem(i)}
                            className={`glass-card p-4 rounded-2xl border-white/10 flex items-center justify-between cursor-pointer transition-all duration-300 ${completed.includes(i) ? 'bg-romantic-red/10 border-romantic-red/40 translate-x-3 scale-105' : 'hover:bg-white/5'}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${completed.includes(i) ? 'bg-romantic-red text-white' : 'bg-white/5 text-foreground/40'}`}>
                                    {/* @ts-ignore */}
                                    <item.icon size={20} />
                                </div>
                                <span className={`font-bold transition-all ${completed.includes(i) ? 'text-romantic-red scale-105' : 'text-foreground/70'} ${lang === 'ta' ? 'font-tamil text-sm' : 'text-base'}`}>
                                    {item.text}
                                </span>
                            </div>
                            {completed.includes(i) ? (
                                <CheckCircle2 size={24} className="text-romantic-red" />
                            ) : (
                                <Circle size={24} className="text-foreground/10" />
                            )}
                        </motion.div>
                    ))}
                </div>

                <div className="w-full">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => router.push("/story/hearts")}
                        className="w-full bg-romantic-red text-white py-5 rounded-3xl font-black text-xl shadow-xl flex items-center justify-center gap-4 group"
                    >
                        <span>{content[lang].cta_adventure}</span>
                        <RotateCcw size={22} className="rotate-90 group-hover:rotate-180 transition-transform duration-500" />
                    </motion.button>

                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 text-center mt-6">
                        TAP ITEMS TO "ADVENTURE" TOGETHER
                    </p>
                </div>
            </StoryCard>
        </CinematicContainer>
    );
}
