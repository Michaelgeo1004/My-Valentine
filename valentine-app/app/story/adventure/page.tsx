"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { CheckCircle2, Circle, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";

import { adventuresList } from "@/constants/adventures";
import { logInsight } from "@/utils/insights";

export default function AdventurePage() {
    const { lang } = useAppContext();
    const router = useRouter();
    const [completed, setCompleted] = useState<number[]>([]);

    useEffect(() => {
        if (completed.length > 0) {
            const selectedItems = completed.map(i => adventuresList[lang as 'en' | 'ta'][i].text);
            logInsight('selections', selectedItems);
        }
        logInsight('lastPage', 'Adventure');
    }, [completed, lang]);

    const toggleItem = (index: number) => {
        setCompleted(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    const isReady = completed.length >= 5;

    const shareWithGeo = () => {
        const selectedTexts = completed.map(i => adventuresList[lang as 'en' | 'ta'][i].text);
        const message = `Hey Geo! 🧸 I've picked these 5+ adventures for our reunion: \n\n${selectedTexts.join("\n")}\n\nCan't wait! ❤️`;
        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/?text=${encoded}`, '_blank');
    };

    return (
        <CinematicContainer>
            <StoryCard className="max-w-xl">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl md:text-5xl font-black text-romantic">
                        {content[lang].adventure_title}
                    </h1>
                    <div className={`px-4 py-2 rounded-full font-black text-sm border-2 transition-all ${isReady ? 'bg-romantic-red border-romantic-red text-white' : 'bg-romantic-red/5 border-romantic-red/20 text-romantic-red'}`}>
                        {completed.length} / 5
                    </div>
                </div>

                <p className="text-sm md:text-base font-medium opacity-60 italic mb-8 text-center px-6">
                    {content[lang].adventure_desc}
                </p>

                <div className="space-y-4 w-full text-left mb-10 h-[380px] overflow-y-auto pr-2 scrollbar-hide">
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

                <div className="w-full space-y-4">
                    {isReady && (
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={shareWithGeo}
                            className="w-full bg-green-500/20 text-green-500 border border-green-500/30 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-green-500 hover:text-white transition-all group shadow-lg"
                        >
                            <span>Share my Choices with Geo 📲</span>
                        </motion.button>
                    )}

                    <motion.button
                        whileHover={isReady ? { scale: 1.05 } : {}}
                        disabled={!isReady}
                        onClick={() => router.push("/story/hearts")}
                        className={`w-full py-5 rounded-3xl font-black text-xl shadow-xl flex items-center justify-center gap-4 group transition-all ${isReady ? 'bg-romantic-red text-white cursor-pointer hover:shadow-romantic-red/40' : 'bg-white/5 text-white/20 border border-white/10 cursor-not-allowed opacity-50'}`}
                    >
                        <span>{content[lang].cta_adventure}</span>
                        <RotateCcw size={22} className={`rotate-90 transition-transform duration-500 ${isReady ? 'group-hover:rotate-180' : ''}`} />
                    </motion.button>

                    <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-center mt-6 transition-colors ${isReady ? 'text-romantic-red opacity-100' : 'opacity-30'}`}>
                        {isReady ? "JOURNEY READY!" : "SELECT AT LEAST 5 TO CONTINUE"}
                    </p>
                </div>
            </StoryCard>
        </CinematicContainer>
    );
}
