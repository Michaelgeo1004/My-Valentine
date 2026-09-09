"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Heart, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { hugMessages } from "@/constants/hugMessages";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";
import { logInsight } from "@/utils/insights";

const HOLD_DURATION_MS = 900;

export default function HugPage() {
    const { lang } = useAppContext();
    const router = useRouter();
    const [isHolding, setIsHolding] = useState(false);
    const [isHugged, setIsHugged] = useState(false);
    const [ripples, setRipples] = useState<number[]>([]);
    const [msgIndex, setMsgIndex] = useState(0);
    const holdTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const messages = hugMessages[lang as 'en' | 'ta'];

    useEffect(() => {
        logInsight('lastPage', 'Hug');
    }, []);

    const completeHug = () => {
        setIsHugged(true);
        setRipples(prev => [...prev, Date.now()]);
        setMsgIndex(prev => (prev + 1) % messages.length);
        logInsight('hugCount', 1);

        // Auto-reset after a while
        setTimeout(() => {
            setIsHugged(false);
        }, 3000); // Slightly longer to read messages
    };

    // The description says "hold to send a hug" — so the button now actually
    // requires holding it, with the glow building up during the hold, instead
    // of firing the full effect the instant you touch it.
    const beginHold = () => {
        setIsHolding(true);
        holdTimeout.current = setTimeout(() => {
            holdTimeout.current = null;
            setIsHolding(false);
            completeHug();
        }, HOLD_DURATION_MS);
    };

    const cancelHold = () => {
        if (holdTimeout.current) {
            clearTimeout(holdTimeout.current);
            holdTimeout.current = null;
        }
        setIsHolding(false);
    };

    return (
        <CinematicContainer>
            <StoryCard className="max-w-xl flex flex-col items-center">
                <h1 className="text-3xl md:text-5xl font-black mb-2 text-romantic text-center">
                    {content[lang].hug_title}
                </h1>
                <p className="text-sm md:text-base font-medium opacity-60 italic mb-12 text-center px-6">
                    {content[lang].hug_desc}
                </p>

                {/* Hug Button with Ripple Effect */}
                <div className="relative w-full aspect-square max-w-[300px] flex items-center justify-center mb-12">
                    {/* Ripples */}
                    <AnimatePresence>
                        {ripples.map(id => (
                            <motion.div
                                key={id}
                                initial={{ scale: 0.5, opacity: 0.8 }}
                                animate={{ scale: 4, opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 2, ease: "easeOut" }}
                                onAnimationComplete={() => setRipples(prev => prev.filter(r => r !== id))}
                                className="absolute inset-0 rounded-full border-2 border-romantic-red/40 pointer-events-none"
                            />
                        ))}
                    </AnimatePresence>

                    {/* Intensifying Glow Backdrop */}
                    <AnimatePresence>
                        {isHugged && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 0.4, scale: 1.5 }}
                                exit={{ opacity: 0, scale: 2 }}
                                className="absolute inset-0 bg-romantic-red rounded-full blur-3xl -z-10"
                            />
                        )}
                    </AnimatePresence>

                    {/* Main Heart Button */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 1.15 }} // Scale UP when tapping for "hugging" feel
                        onMouseDown={beginHold}
                        onMouseUp={cancelHold}
                        onMouseLeave={cancelHold}
                        onTouchStart={beginHold}
                        onTouchEnd={cancelHold}
                        onTouchCancel={cancelHold}
                        onContextMenu={(e) => e.preventDefault()}
                        className={`relative w-48 h-48 md:w-56 md:h-56 rounded-full glass-card border-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-700 shadow-2xl overflow-hidden select-none touch-none ${isHugged ? 'border-romantic-red bg-romantic-red/20 rotate-3' : 'border-white/10 hover:border-romantic-red/40'}`}
                        style={{ WebkitTouchCallout: "none", WebkitUserSelect: "none" }}
                    >
                        {/* Charging glow — grows over the hold duration so releasing
                            early visibly fails to fill it, matching "hold to hug". */}
                        <AnimatePresence>
                            {isHolding && (
                                <motion.div
                                    key="charging"
                                    initial={{ scale: 0, opacity: 0.7 }}
                                    animate={{ scale: 1.4, opacity: 0.9 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ duration: HOLD_DURATION_MS / 1000, ease: "linear" }}
                                    className="absolute inset-0 rounded-full bg-romantic-red/40 blur-xl"
                                />
                            )}
                        </AnimatePresence>

                        <Heart
                            size={80}
                            className={`relative transition-all duration-700 ${isHugged ? 'text-romantic-red fill-current scale-125 drop-shadow-[0_0_20px_rgba(255,77,77,0.8)]' : isHolding ? 'text-romantic-red/70 scale-110' : 'text-white/20'}`}
                        />
                        <span className={`relative text-[10px] font-black uppercase tracking-[0.3em] mt-4 transition-all duration-700 ${isHugged ? 'text-romantic-red opacity-100' : 'opacity-30'} ${lang === 'ta' ? 'font-tamil' : ''}`}>
                            {isHugged ? content[lang].hug_hugging_label : content[lang].hug_long_press_label}
                        </span>

                        {/* Haptic Visual Feedback Bar */}
                        <div className="absolute bottom-10 w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                animate={isHugged ? { x: ["-100%", "100%"] } : { x: "-100%" }}
                                transition={{ repeat: Infinity, duration: 1 }}
                                className="w-full h-full bg-romantic-red shadow-lg"
                            />
                        </div>
                    </motion.div>

                    {/* Dubai Marker */}
                    <div className="absolute top-0 left-0 flex flex-col items-center gap-1 opacity-40">
                        <span className="text-[10px] font-black uppercase tracking-widest">{content[lang].dubai}</span>
                        <div className="w-1 h-8 bg-white/20 rounded-full" />
                    </div>
                    {/* India Marker */}
                    <div className="absolute bottom-0 right-0 flex flex-col items-center gap-1 opacity-40">
                        <div className="w-1 h-8 bg-white/20 rounded-full" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{content[lang].tirunelveli}</span>
                    </div>
                </div>

                <div className="w-full space-y-6">
                    <AnimatePresence mode="wait">
                        {isHugged && (
                            <motion.div
                                key={msgIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-center h-12 flex items-center justify-center"
                            >
                                <p className={`text-xl font-black text-romantic-red italic px-4 leading-tight ${lang === 'ta' ? 'font-tamil' : ''}`}>
                                    "{messages[msgIndex]}"
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => router.push("/story/poetry")}
                        className="w-full bg-romantic-red text-white py-5 rounded-3xl font-black text-xl shadow-xl flex items-center justify-center gap-4 group"
                    >
                        <span>{content[lang].cta_hug}</span>
                        <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform duration-500" />
                    </motion.button>
                </div>
            </StoryCard>
        </CinematicContainer>
    );
}
