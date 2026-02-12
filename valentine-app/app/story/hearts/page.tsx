"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Heart, Star, Sparkles, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";

interface FallingHeart {
    id: number;
    x: number;
    delay: number;
    scale: number;
    speed: number;
}

const heartMessages = {
    en: ["I Love You!", "Miss You ❤️", "Only You", "Forever!", "You're My Best Friend", "My World 🌍", "Always Yours", "Muhh! 🍁"],
    ta: ["நான் உன்னை காதலிக்கிறேன்!", "உன்னை மிஸ் பண்ணுகிறேன் ❤️", "நீ மட்டுமே", "என்றென்றும்!", "நீ என் உயிர் நண்பன்", "என் உலகம் 🌍", "எப்போதும் உன்னுடையவன்", "முஹ்! 🍁"]
};

export default function HeartsGamePage() {
    const { lang } = useAppContext();
    const router = useRouter();
    const [hearts, setHearts] = useState<FallingHeart[]>([]);
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState("");
    const nextId = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const newHeart = {
                id: nextId.current++,
                x: Math.random() * 80 + 10, // 10% to 90%
                delay: 0,
                scale: Math.random() * 0.5 + 0.5,
                speed: Math.random() * 2 + 3
            };
            setHearts(prev => [...prev, newHeart]);
        }, 1200);

        return () => clearInterval(interval);
    }, []);

    const catchHeart = (id: number) => {
        setScore(prev => prev + 1);
        setHearts(prev => prev.filter(h => h.id !== id));
        setMessage(heartMessages[lang][Math.floor(Math.random() * heartMessages[lang].length)]);

        // Auto-clear message after 1s
        setTimeout(() => setMessage(""), 1500);
    };

    return (
        <CinematicContainer>
            <StoryCard className="max-w-xl h-[600px] flex flex-col relative overflow-hidden">
                <div className="z-20 relative">
                    <h1 className="text-3xl md:text-5xl font-black mb-2 text-romantic text-center">
                        {content[lang].hearts_title}
                    </h1>
                    <p className="text-sm md:text-base font-medium opacity-60 italic mb-4 text-center">
                        {content[lang].hearts_desc}
                    </p>
                    <div className="flex justify-center gap-4 mb-2">
                        <div className="glass-card px-4 py-1 rounded-full border-white/20 flex items-center gap-2">
                            <Star size={14} className="text-romantic-gold fill-current" />
                            <span className="text-xs font-black uppercase tracking-widest">{score} Caught</span>
                        </div>
                    </div>
                </div>

                {/* Game Area */}
                <div className="flex-1 relative w-full overflow-hidden bg-white/5 rounded-3xl border border-white/10 mt-4 outline-none">
                    <AnimatePresence>
                        {hearts.map(heart => (
                            <motion.div
                                key={heart.id}
                                initial={{ y: -50, x: `${heart.x}%`, opacity: 0 }}
                                animate={{ y: 600, opacity: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ duration: heart.speed, ease: "linear" }}
                                onAnimationComplete={() => {
                                    setHearts(prev => prev.filter(h => h.id !== heart.id));
                                }}
                                className="absolute top-0 cursor-pointer"
                                style={{ scale: heart.scale }}
                                onClick={() => catchHeart(heart.id)}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.8 }}
                                    className="text-romantic-red drop-shadow-[0_0_10px_rgba(255,173,173,0.5)]"
                                >
                                    <Heart size={40} fill="currentColor" />
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
