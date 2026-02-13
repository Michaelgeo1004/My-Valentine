"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
import { Heart, Star, Sparkles, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";
import { logInsight } from "@/utils/insights";

interface FallingHeart {
    id: number;
    x: number;
    delay: number;
    scale: number;
    speed: number;
    isGolden?: boolean;
}

export default function HeartsGamePage() {
    const { lang } = useAppContext();
    const router = useRouter();
    const [hearts, setHearts] = useState<FallingHeart[]>([]);
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState("");
    const nextId = useRef(0);

    const heartMessages = useMemo(() => ({
        en: ["I Love You!", "Miss You ❤️", "Only You", "Forever!", "You're My Best Friend", "My World 🌍", "Always Yours", "Muhh! 🍁", "GOLDEN LOVE! ✨"],
        ta: ["நான் உன்னை காதலிக்கிறேன்!", "உன்னை மிஸ் பண்ணுகிறேன் ❤️", "நீ மட்டுமே", "என்றென்றும்!", "நீ என் உயிர் நண்பன்", "என் உலகம் 🌍", "எப்போதும் உன்னுடையவன்", "முஹ்! 🍁", "தங்கக் காதல்! ✨"]
    }), []);

    useEffect(() => {
        logInsight('lastPage', 'Hearts Game');
        const interval = setInterval(() => {
            const isGolden = Math.random() > 0.85; // 15% chance for a golden heart
            const newHeart: FallingHeart = {
                id: nextId.current++,
                x: Math.random() * 90 + 5, // 5% to 95% for full width
                delay: 0,
                scale: isGolden ? Math.random() * 0.4 + 1.0 : Math.random() * 0.5 + 0.5,
                speed: isGolden ? Math.random() * 1.5 + 2.5 : Math.random() * 2 + 3,
                isGolden
            };
            setHearts(prev => [...prev, newHeart]);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const catchHeart = (heart: FallingHeart) => {
        setScore(prev => {
            const newScore = prev + (heart.isGolden ? 5 : 1);
            logInsight('hugCount', heart.isGolden ? 5 : 1); // Reuse hugCount for general heart affection
            return newScore;
        });
        setHearts(prev => prev.filter(h => h.id !== heart.id));

        const messages = heartMessages[lang as keyof typeof heartMessages] || heartMessages.en;
        if (heart.isGolden) {
            setMessage(messages[messages.length - 1]);
        } else {
            setMessage(messages[Math.floor(Math.random() * (messages.length - 1))]);
        }

        // Auto-clear message
        setTimeout(() => setMessage(""), 1500);
    };

    return (
        <CinematicContainer>
            <StoryCard className="max-w-2xl h-[650px] flex flex-col relative overflow-hidden">
                <div className="z-20 relative px-4 text-center">
                    <h1 className="text-3xl md:text-5xl font-black mb-2 text-romantic">
                        {content[lang].hearts_title}
                    </h1>
                    <p className="text-sm md:text-base font-medium opacity-60 italic mb-4">
                        {content[lang].hearts_desc}
                    </p>
                    <div className="flex justify-center gap-4 mb-2">
                        <div className="glass-card px-4 py-2 rounded-full border-white/20 flex items-center gap-3">
                            <Star size={18} className="text-romantic-gold fill-current animate-spin-slow" />
                            <span className="text-sm font-black uppercase tracking-widest text-romantic">{score} Hearts Caught</span>
                        </div>
                    </div>
                </div>

                {/* Game Area */}
                <div className="flex-1 relative w-full overflow-hidden bg-white/5 rounded-[2rem] border border-white/10 mt-6 shadow-inner">
                    <AnimatePresence>
                        {hearts.map(heart => (
                            <motion.div
                                key={heart.id}
                                initial={{ y: -100, opacity: 0 }}
                                animate={{ y: 700, opacity: 1 }}
                                exit={{ opacity: 0, scale: 2, filter: "blur(10px)" }}
                                transition={{ duration: heart.speed, ease: "linear" }}
                                onAnimationComplete={() => {
                                    setHearts(prev => prev.filter(h => h.id !== heart.id));
                                }}
                                className="absolute cursor-pointer z-10"
                                style={{
                                    left: `${heart.x}%`,
                                    scale: heart.scale
                                }}
                                onClick={() => catchHeart(heart)}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.8 }}
                                    className={`${heart.isGolden ? 'text-romantic-gold' : 'text-romantic-red'} drop-shadow-[0_0_15px_currentColor]`}
                                >
                                    <Heart size={heart.isGolden ? 50 : 40} fill="currentColor" />
                                    {heart.isGolden && (
                                        <motion.div
                                            animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 1] }}
                                            transition={{ repeat: Infinity, duration: 1 }}
                                            className="absolute inset-0 flex items-center justify-center"
                                        >
                                            <Sparkles className="text-white w-full h-full opacity-50" />
                                        </motion.div>
                                    )}
                                </motion.div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Pop-up Message */}
                    <AnimatePresence>
                        {message && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 1.5 }}
                                className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center justify-center"
                            >
                                <div className="glass-card px-8 py-4 rounded-3xl border-romantic-red/40 bg-romantic-red/10 backdrop-blur-3xl shadow-2xl">
                                    <Sparkles className="text-romantic-gold mx-auto mb-2" size={32} />
                                    <h2 className={`text-2xl md:text-3xl font-black text-romantic-red text-center ${lang === 'ta' ? 'font-tamil' : ''}`}>
                                        {message}
                                    </h2>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-8 z-20 relative">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => router.push("/story/ticker")}
                        className="w-full bg-romantic-red text-white py-5 rounded-3xl font-black text-xl shadow-xl flex items-center justify-center gap-4 group"
                    >
                        <span>{content[lang].cta_hearts}</span>
                        <RotateCcw size={22} className="rotate-90 group-hover:rotate-180 transition-transform duration-500" />
                    </motion.button>

                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 text-center mt-6">
                        TAP THE HEARTS TO SEE SECRETS
                    </p>
                </div>
            </StoryCard>
        </CinematicContainer>
    );
}
