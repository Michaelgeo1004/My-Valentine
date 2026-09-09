"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { logInsight } from "@/utils/insights";
import { Heart, ArrowRight, Sparkles, Star, Flame, Gem } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";
import { TypedText } from "@/components/TypedText";

import { reasonsList } from "@/constants/reasons";

// A small burst of hearts from the card's center each time a new reason is
// revealed — a tiny payoff for the "aha" moment, not a full-screen effect.
const ReasonBurst = ({ burstKey }: { burstKey: number }) => (
    <div className="absolute inset-0 pointer-events-none overflow-visible" key={burstKey}>
        {[...Array(7)].map((_, i) => {
            const angle = (i / 7) * Math.PI * 2;
            return (
                <motion.div
                    key={i}
                    initial={{ x: "-50%", y: "-50%", scale: 0, opacity: 1 }}
                    animate={{
                        x: `calc(-50% + ${Math.cos(angle) * 90}px)`,
                        y: `calc(-50% + ${Math.sin(angle) * 90}px)`,
                        scale: 1,
                        opacity: 0
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2 text-romantic-red"
                >
                    <Heart size={14} fill="currentColor" />
                </motion.div>
            );
        })}
    </div>
);

// Cycled by card index (not randomized) so the same reason always shows the
// same icon — variety across the deck without it feeling arbitrary language
// to language, since it never depends on the reason's own text.
const CARD_ICONS = [
    { Icon: Heart, className: "text-romantic-red fill-romantic-red/20" },
    { Icon: Sparkles, className: "text-romantic-gold fill-romantic-gold/20" },
    { Icon: Star, className: "text-romantic-pink fill-romantic-pink/20" },
    { Icon: Flame, className: "text-orange-400 fill-orange-400/20" },
    { Icon: Gem, className: "text-amber-400 fill-amber-400/20" },
];

export default function ReasonsDeckPage() {
    const { lang } = useAppContext();
    const router = useRouter();
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [burstKey, setBurstKey] = useState(0);

    useEffect(() => {
        logInsight('lastPage', '100 Reasons Deck');
    }, []);

    const total = reasonsList[lang].length;
    const isMilestone = (index + 1) % 25 === 0 && index !== total - 1;
    const isFinale = index === total - 1;

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setIndex((prevIndex) => (prevIndex + 1) % reasonsList[lang].length);
        setBurstKey((k) => k + 1);
        logInsight('hugCount', 0.5); // Discovering reasons is high affection
    };

    return (
        <CinematicContainer>
            <StoryCard className="max-w-2xl flex flex-col items-center justify-between">
                <div className="text-center w-full">
                    <h1 className="text-3xl md:text-5xl font-black mb-2 text-romantic">
                        {content[lang].reasons_title}
                    </h1>
                    <p className="text-sm md:text-base font-medium opacity-60 italic mb-4">
                        {content[lang].reasons_desc}
                    </p>
                    {/* TEMP dev shortcut to skip ahead to the next page while this page's
                        design is still being iterated on — remove once finalized. */}
                    <div className="flex justify-center gap-2 mb-8">
                        <button
                            onClick={() => router.push("/story/garden")}
                            className="text-[10px] font-black uppercase tracking-widest bg-romantic-red/10 text-romantic-red px-3 py-1 rounded-full border border-romantic-red/20 active:scale-95 transition-transform"
                        >
                            Next Page (temp)
                        </button>
                    </div>
                </div>

                {/* Card Stack Container */}
                <div className="relative w-full min-h-[200px] md:min-h-[250px] flex items-center justify-center">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={index}
                            custom={direction}
                            variants={{
                                enter: (direction: number) => ({
                                    x: direction > 0 ? 1000 : -1000,
                                    opacity: 0,
                                    scale: 0.5,
                                    rotate: direction > 0 ? 45 : -45
                                }),
                                center: {
                                    zIndex: 1,
                                    x: 0,
                                    opacity: 1,
                                    scale: 1,
                                    rotate: 0
                                },
                                exit: (direction: number) => ({
                                    zIndex: 0,
                                    x: direction < 0 ? 1000 : -1000,
                                    opacity: 0,
                                    scale: 0.5,
                                    rotate: direction < 0 ? 45 : -45
                                })
                            }}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 },
                                rotate: { type: "spring", stiffness: 200, damping: 20 }
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = Math.abs(offset.x) * velocity.x;
                                if (swipe < -10000) {
                                    paginate(1);
                                } else if (swipe > 10000) {
                                    paginate(-1);
                                }
                            }}
                            className={`absolute w-72 h-48 md:w-96 md:h-60 glass-card rounded-[2.5rem] p-8 flex items-center justify-center text-center cursor-grab active:cursor-grabbing bg-white/10 backdrop-blur-3xl ${
                                isFinale
                                    ? "border-2! border-romantic-gold/50!"
                                    : isMilestone
                                        ? "border-2! border-romantic-gold/30!"
                                        : "border-white/20 shadow-2xl"
                            }`}
                            style={
                                isFinale
                                    ? { boxShadow: "0 8px 32px rgba(0,0,0,0.1), 0 0 60px rgba(255,215,0,0.3)" }
                                    : isMilestone
                                        ? { boxShadow: "0 8px 32px rgba(0,0,0,0.1), 0 0 40px rgba(255,215,0,0.2)" }
                                        : undefined
                            }
                        >
                            {isMilestone && (
                                <div className="absolute -top-3 right-6 flex items-center gap-1 bg-romantic-gold text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                                    <Sparkles size={10} /> Milestone
                                </div>
                            )}
                            <div className="pointer-events-none">
                                {isFinale ? (
                                    <motion.div
                                        animate={{ scale: [1, 1.15, 1] }}
                                        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                                        className="mx-auto mb-6 w-fit"
                                    >
                                        <Heart size={40} className="text-romantic-red fill-romantic-red filter drop-shadow-[0_0_16px_rgba(255,77,77,0.5)]" />
                                    </motion.div>
                                ) : (
                                    (() => {
                                        const { Icon, className } = CARD_ICONS[index % CARD_ICONS.length];
                                        return <Icon size={32} className={`${className} mx-auto mb-6 opacity-40 animate-pulse`} />;
                                    })()
                                )}
                                <TypedText
                                    key={reasonsList[lang as 'en' | 'ta'][index]}
                                    text={reasonsList[lang as 'en' | 'ta'][index]}
                                    className={`text-xl md:text-2xl font-black leading-tight tracking-tight text-romantic ${lang === 'ta' ? 'font-tamil' : ''}`}
                                />
                                {isMilestone && (
                                    <p className={`text-[10px] md:text-xs font-bold italic opacity-50 mt-3 ${lang === 'ta' ? 'font-tamil' : ''}`}>
                                        {content[lang].reasons_milestone}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <ReasonBurst burstKey={burstKey} />

                    {/* Background Card Deco */}
                    <div className="absolute w-72 h-48 md:w-96 md:h-60 glass-card rounded-[2.5rem] border-white/5 -rotate-3 scale-95 opacity-20 -z-10 translate-y-2" />
                    <div className="absolute w-72 h-48 md:w-96 md:h-60 glass-card rounded-[2.5rem] border-white/5 rotate-3 scale-90 opacity-10 -z-20 translate-y-4" />
                </div>

                <div className="w-full mt-6">
                    <div className="flex justify-between items-center mb-4 px-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30">
                            {content[lang].reason_label} {index + 1} {content[lang].of} {reasonsList[lang].length}
                        </p>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30">
                            {Math.round(((index + 1) / reasonsList[lang].length) * 100)}% Complete
                        </p>
                    </div>
                    {isFinale ? (
                        <div className="flex flex-col gap-4">
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.7 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className={`text-sm md:text-base font-bold italic text-romantic text-center ${lang === 'ta' ? 'font-tamil' : ''}`}
                            >
                                {content[lang].reasons_finale}
                            </motion.p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                onClick={() => router.push("/story/garden")}
                                className="w-full bg-romantic-red text-white py-5 rounded-3xl font-black text-xl shadow-xl flex items-center justify-center gap-4 group"
                            >
                                <span>{content[lang].cta_reasons}</span>
                                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform duration-500" />
                            </motion.button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((index + 1) / reasonsList[lang].length) * 100}%` }}
                                    className="bg-romantic-red h-full shadow-[0_0_10px_rgba(255,77,77,0.5)]"
                                />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 text-center animate-pulse pt-2">
                                Swipe to explore
                            </p>
                        </div>
                    )}
                </div>
            </StoryCard>
        </CinematicContainer>
    );
}
