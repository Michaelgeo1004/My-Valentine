"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { FlaskConical, Moon, BookOpen, Sparkles, ArrowRight, Heart, LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";
import { logInsight, sendTrackBeacon, useOnRealUnmount } from "@/utils/insights";

interface DateIdea {
    text: string;
    icon: LucideIcon;
}

const dateIdeas: Record<string, DateIdea[]> = {
    en: [
        { text: "Where It All Began, In a Lab 🔬", icon: FlaskConical },
        { text: "Her Shoulder, My Peace 🌙", icon: Moon },
        { text: "The First Kiss, At Midnight ✨", icon: Sparkles },
        { text: "A Quiet Reverence, In the Library 📖", icon: BookOpen },
        { text: "The Ring, At a Bus Stand 💍", icon: Heart },
    ],
    ta: [
        { text: "எல்லாம் தொடங்கிய நாள், ஒரு ஆய்வகத்தில் 🔬", icon: FlaskConical },
        { text: "அவள் தோளில், என் அமைதி 🌙", icon: Moon },
        { text: "முதல் முத்தம், நள்ளிரவில் ✨", icon: Sparkles },
        { text: "ஒரு அமைதியான பணிவு, நூலகத்தில் 📖", icon: BookOpen },
        { text: "மோதிரம், பேருந்து நிலையத்தில் 💍", icon: Heart },
    ]
};

export default function DateGenPage() {
    const { lang } = useAppContext();
    const router = useRouter();
    const [rouletteIndex, setRouletteIndex] = useState(0);
    const [status, setStatus] = useState<"idle" | "spinning" | "winner">("idle");
    const finalResultRef = useRef<string | null>(null);

    useEffect(() => {
        logInsight('lastPage', 'Memory Roulette');
    }, []);

    // Reports the winning date idea tagged to THIS page on leave, instead of
    // letting it echo on every future row via the generic cross-page snapshot.
    useOnRealUnmount(() => {
        if (finalResultRef.current) {
            sendTrackBeacon({ path: '/story/date-gen', event: 'dategen_leave', dateResult: finalResultRef.current });
        }
    });

    const startRoulette = () => {
        setStatus("spinning");
        let cycles = 0;
        const maxCycles = 15 + Math.floor(Math.random() * 10);

        const interval = setInterval(() => {
            setRouletteIndex((prev) => (prev + 1) % dateIdeas[lang].length);
            cycles++;

            if (cycles >= maxCycles) {
                clearInterval(interval);
                setStatus("winner");
                const result = dateIdeas[lang][(rouletteIndex + cycles) % dateIdeas[lang].length].text;
                finalResultRef.current = result;
                logInsight('dateResult', result);
            }
        }, 100);
    };

    const currentIdea = dateIdeas[lang][rouletteIndex];

    return (
        <CinematicContainer>
            <StoryCard className="max-w-2xl flex flex-col justify-between">
                <div className="w-full">
                    <h1 className="text-3xl md:text-5xl font-black mb-2 text-romantic text-center">
                        {content[lang].date_title}
                    </h1>
                    <p className="text-sm md:text-base font-medium opacity-60 italic mb-12 text-center px-6">
                        {content[lang].date_desc}
                    </p>
                </div>

                <div className="relative h-64 md:h-80 w-full flex items-center justify-center mb-12">
                    <AnimatePresence mode="wait">
                        {status === "idle" ? (
                            <motion.div
                                key="idle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center opacity-20 group cursor-pointer"
                                onClick={startRoulette}
                            >
                                <Heart size={120} className="group-hover:scale-110 transition-transform" />
                                <span className="mt-4 text-[10px] font-black uppercase tracking-[0.4em]">Tap to Start Roulette</span>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="active"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-full flex flex-col items-center gap-8"
                            >
                                <div className="relative">
                                    <motion.div
                                        animate={status === "spinning" ? { rotate: 360 } : { rotate: 0 }}
                                        transition={status === "spinning" ? { repeat: Infinity, duration: 0.5, ease: "linear" } : { duration: 0.5 }}
                                        className="w-40 h-40 rounded-full border-4 border-dashed border-romantic-red flex items-center justify-center"
                                    >
                                        <div className="p-8 rounded-full bg-romantic-red/10 text-romantic-red">
                                            <currentIdea.icon size={64} className={status === "spinning" ? "animate-pulse" : ""} />
                                        </div>
                                    </motion.div>

                                    {status === "winner" && (
                                        <motion.div
                                            initial={{ scale: 0, rotate: -20 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            className="absolute -top-4 -right-4 bg-romantic-gold text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2"
                                        >
                                            <Sparkles size={12} />
                                            Perfect Match
                                        </motion.div>
                                    )}
                                </div>

                                <motion.div
                                    key={rouletteIndex}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className={`text-center space-y-4 px-8 ${status === "winner" ? "bg-romantic-red/5 p-8 rounded-[3rem] border border-romantic-red/20 shadow-xl" : ""}`}
                                >
                                    <h2 className={`text-2xl md:text-4xl font-black text-romantic ${lang === 'ta' ? 'font-tamil' : ''}`}>
                                        {currentIdea.text}
                                    </h2>
                                    {status === "spinning" && (
                                        <div className="flex justify-center gap-1">
                                            {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 bg-romantic-red/40 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />)}
                                        </div>
                                    )}
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="space-y-4 w-full">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={startRoulette}
                        disabled={status === "spinning"}
                        className="w-full bg-romantic-pink text-white py-5 rounded-3xl font-black text-xl shadow-xl flex items-center justify-center gap-4 group disabled:opacity-50"
                    >
                        <Heart size={24} className={status === "spinning" ? "animate-ping" : "group-hover:scale-125 transition-transform"} />
                        <span>{status === "winner" ? (lang === 'ta' ? 'மீண்டும் சுழற்று' : 'Spin Again') : (lang === 'ta' ? 'ஒரு நினைவைத் தேடுங்கள்' : 'Find a Memory')}</span>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => router.push("/story/credits")}
                        className="w-full glass-card py-5 rounded-3xl font-black text-romantic-red flex items-center justify-center gap-4 hover:bg-white/5 transition-all"
                    >
                        <span>{content[lang].cta_dategen}</span>
                        <ArrowRight size={20} />
                    </motion.button>
                </div>
            </StoryCard>
        </CinematicContainer>
    );
}
