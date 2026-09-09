"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
import { Heart, Star, Sparkles, ArrowRight } from "lucide-react";
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
    pxPerSecond: number;
    isGolden?: boolean;
}

// How far past the visible bottom a heart travels before it's removed. Kept
// small on purpose — the old value (100px) left uncaught hearts clickable
// well after they'd been clipped out of view by the board's overflow-hidden,
// which is what made tapping near the bottom feel like it caught "anything".
const EXIT_OVERSHOOT = 24;

const MILESTONE_SCORE = 25;

export default function HeartsGamePage() {
    const { lang } = useAppContext();
    const router = useRouter();
    const [hearts, setHearts] = useState<FallingHeart[]>([]);
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState("");
    const [showMilestone, setShowMilestone] = useState(false);
    const milestoneShown = useRef(false);
    // Guards against catching the same heart twice: removing a heart from
    // `hearts` is async (state update + re-render), so a fast repeat tap on
    // the same spot could land on the same still-on-screen heart again
    // before React had a chance to remove it. Marking the id here, synchronously,
    // on the very first click closes that window.
    const caughtIds = useRef<Set<number>>(new Set());
    const nextId = useRef(0);
    const gameAreaRef = useRef<HTMLDivElement>(null);
    const [areaHeight, setAreaHeight] = useState(400);

    useEffect(() => {
        const updateHeight = () => {
            if (gameAreaRef.current) setAreaHeight(gameAreaRef.current.offsetHeight);
        };
        updateHeight();
        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, []);

    // A mix of generic sweetness and callbacks to the actual story (their
    // nicknames, the anniversary date, the distance) — the last entry in each
    // list is reserved for golden-heart catches, see catchHeart below.
    const heartMessages = useMemo(() => ({
        en: ["I Love You!", "Miss You ❤️", "Only You", "Since Jan 22, 2021 💫", "You're My Best Friend", "2,845 KM, Still Home 🏡", "Always Your Driver 🚗", "Muhh! 🍁", "GOLDEN LOVE! ✨"],
        ta: ["நான் உன்னை காதலிக்கிறேன்!", "உன்னை மிஸ் பண்ணுகிறேன் ❤️", "நீ மட்டுமே", "ஜன. 22, 2021 முதல் 💫", "நீ என் உயிர் நண்பன்", "2,845 KM, இன்னும் வீடு 🏡", "எப்போதும் உன் டிரைவர் 🚗", "முஹ்! 🍁", "தங்கக் காதல்! ✨"]
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
                // Speed in px/second, not a fixed duration — so a taller board
                // (this page's height varies by device) doesn't change how fast
                // hearts actually fall. Golden hearts move faster: rarer and
                // worth more, but you have to be quicker to catch one.
                pxPerSecond: isGolden ? 130 + Math.random() * 60 : 80 + Math.random() * 40,
                isGolden
            };
            setHearts(prev => [...prev, newHeart]);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const catchHeart = (heart: FallingHeart) => {
        if (caughtIds.current.has(heart.id)) return;
        caughtIds.current.add(heart.id);

        setScore(prev => {
            const newScore = prev + (heart.isGolden ? 5 : 1);
            logInsight('hugCount', heart.isGolden ? 5 : 1); // Reuse hugCount for general heart affection
            if (!milestoneShown.current && newScore >= MILESTONE_SCORE) {
                milestoneShown.current = true;
                setShowMilestone(true);
                setTimeout(() => setShowMilestone(false), 3500);
            }
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
            <StoryCard className="max-w-2xl h-[82dvh] min-h-[500px] max-h-[760px] flex flex-col relative overflow-hidden">
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

                    {/* Milestone — kept outside the game area so it never covers the
                        falling hearts, same reasoning as the garden page's milestone. */}
                    <div className="h-6 flex items-center justify-center">
                        <AnimatePresence>
                            {showMilestone && (
                                <motion.p
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    className={`text-xs md:text-sm font-bold italic text-romantic ${lang === 'ta' ? 'font-tamil' : ''}`}
                                >
                                    {content[lang].hearts_milestone}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Game Area */}
                <div ref={gameAreaRef} className="flex-1 relative w-full overflow-hidden bg-white/5 rounded-[2rem] border border-white/10 mt-6 shadow-inner">
                    <AnimatePresence>
                        {hearts.map(heart => (
                            <motion.div
                                key={heart.id}
                                initial={{ y: -100, opacity: 0 }}
                                animate={{ y: areaHeight + EXIT_OVERSHOOT, opacity: 1 }}
                                exit={{ opacity: 0, scale: 2, filter: "blur(10px)" }}
                                transition={{ duration: (areaHeight + 100 + EXIT_OVERSHOOT) / heart.pxPerSecond, ease: "linear" }}
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
                        <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform duration-500" />
                    </motion.button>

                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 text-center mt-6">
                        TAP THE HEARTS TO SEE SECRETS
                    </p>
                </div>
            </StoryCard>
        </CinematicContainer>
    );
}
