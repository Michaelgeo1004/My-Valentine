"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { logInsight } from "@/utils/insights";
import { Heart, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";

import { reasonsList } from "@/constants/reasons";

export default function ReasonsDeckPage() {
    const { lang } = useAppContext();
    const router = useRouter();
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        logInsight('lastPage', '100 Reasons Deck');
    }, []);

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setIndex((prevIndex) => (prevIndex + 1) % reasonsList[lang].length);
        logInsight('hugCount', 0.5); // Discovering reasons is high affection
    };

    return (
        <CinematicContainer>
            <StoryCard className="max-w-2xl min-h-[600px] flex flex-col items-center justify-between">
                <div className="text-center w-full">
                    <h1 className="text-3xl md:text-5xl font-black mb-2 text-romantic">
                        {content[lang].reasons_title}
                    </h1>
                    <p className="text-sm md:text-base font-medium opacity-60 italic mb-4">
                        {content[lang].reasons_desc}
                    </p>
                    <div className="flex justify-center gap-2 mb-8">
                        <button
                            onClick={() => {
                                setIndex(Math.floor(Math.random() * reasonsList[lang].length));
                                logInsight('hugCount', 0.2);
                            }}
                            className="text-[10px] font-black uppercase tracking-widest bg-romantic-red/10 text-romantic-red px-3 py-1 rounded-full border border-romantic-red/20 active:scale-95 transition-transform"
                        >
                            🎲 Shuffle
                        </button>
                    </div>
                </div>

                {/* Card Stack Container */}
                <div className="relative w-full flex-1 flex items-center justify-center">
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
                            className="absolute w-72 h-48 md:w-96 md:h-60 glass-card rounded-[2.5rem] border-white/20 p-8 flex items-center justify-center text-center shadow-2xl cursor-grab active:cursor-grabbing bg-white/10 backdrop-blur-3xl"
                        >
                            <div className="pointer-events-none">
                                <Heart size={32} className="text-romantic-red mx-auto mb-6 fill-romantic-red/20 opacity-40 animate-pulse" />
                                <p className={`text-xl md:text-2xl font-black leading-tight tracking-tight text-romantic ${lang === 'ta' ? 'font-tamil' : ''}`}>
                                    {reasonsList[lang as 'en' | 'ta'][index]}
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Background Card Deco */}
                    <div className="absolute w-72 h-48 md:w-96 md:h-60 glass-card rounded-[2.5rem] border-white/5 -rotate-3 scale-95 opacity-20 -z-10 translate-y-2" />
                    <div className="absolute w-72 h-48 md:w-96 md:h-60 glass-card rounded-[2.5rem] border-white/5 rotate-3 scale-90 opacity-10 -z-20 translate-y-4" />
                </div>

                <div className="w-full mt-12">
                    <div className="flex justify-between items-center mb-4 px-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30">
                            {content[lang].reason_label} {index + 1} {content[lang].of} {reasonsList[lang].length}
                        </p>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30">
                            {Math.round(((index + 1) / reasonsList[lang].length) * 100)}% Complete
                        </p>
                    </div>
                    {index === reasonsList[lang].length - 1 ? (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={() => router.push("/story/garden")}
                            className="w-full bg-romantic-red text-white py-5 rounded-3xl font-black text-xl shadow-xl flex items-center justify-center gap-4 group"
                        >
                            <span>{content[lang].cta_reasons}</span>
                            <RotateCcw size={22} className="rotate-90 group-hover:rotate-180 transition-transform duration-500" />
                        </motion.button>
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
                                Swipe or Shuffle to explore
                            </p>
                        </div>
                    )}
                </div>
            </StoryCard>
        </CinematicContainer>
    );
}
