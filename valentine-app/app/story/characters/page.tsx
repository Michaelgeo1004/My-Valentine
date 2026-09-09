"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Car, Heart, Sparkles, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";
import { useState, useEffect, useMemo } from "react";
import { logInsight, sendTrackBeacon, useOnRealUnmount } from "@/utils/insights";

const FloatingIcon = ({ delay, icon: Icon, color }: { delay: number, icon: any, color: string }) => (
    <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: -20, opacity: [0, 0.3, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay, ease: "easeInOut" }}
        className={`absolute pointer-events-none select-none ${color}`}
    >
        <Icon size={24} />
    </motion.div>
);

export default function CharactersPage() {
    const { lang } = useAppContext();
    const router = useRouter();
    const [isJoining, setIsJoining] = useState(false);

    useEffect(() => {
        logInsight('lastPage', 'The Characters');
    }, []);

    // Reports whether she triggered the reunion animation, tagged to THIS page on leave.
    useOnRealUnmount(() => {
        sendTrackBeacon({ path: '/story/characters', event: 'characters_leave', charactersJoined: isJoining });
    });

    return (
        <CinematicContainer>
            <StoryCard className="max-w-2xl flex flex-col justify-between overflow-hidden">
                <div className="w-full relative z-10">
                    <h1 className="text-3xl md:text-5xl font-black mb-2 text-romantic text-center">
                        {content[lang].char_title}
                    </h1>
                    <p className="text-sm md:text-base font-medium opacity-60 italic mb-12 text-center">
                        {content[lang].char_desc}
                    </p>
                </div>

                {/* Animated Characters Scene - Reverted to Standard Style */}
                <div className="relative h-64 md:h-80 w-full bg-white/5 rounded-[3rem] border border-white/10 mb-4 overflow-hidden flex items-center justify-between px-6 md:px-16">

                    {/* Subtle Background Elements */}
                    <div className="absolute inset-0 pointer-events-none opacity-20">
                        <div className="absolute top-1/4 left-1/4"><FloatingIcon delay={0} icon={Sparkles} color="text-romantic-gold" /></div>
                        <div className="absolute bottom-1/4 right-1/4"><FloatingIcon delay={2} icon={Heart} color="text-romantic-red" /></div>
                    </div>

                    {/* Driver (Geo) */}
                    <div className="relative z-20">
                        <motion.div
                            animate={isJoining
                                ? {
                                    scale: 1.1,
                                    rotate: [0, -5, 5, 0]
                                }
                                : { scale: 1 }
                            }
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex flex-col items-center gap-4 cursor-pointer group"
                            onClick={() => !isJoining && setIsJoining(true)}
                        >
                            <div className="relative">
                                {/* Monogram reads as an actual portrait of him, rather
                                    than a literal job icon — "Driver" lives on as a
                                    small nickname badge instead of the whole avatar. */}
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-romantic-red flex items-center justify-center text-white shadow-xl relative z-10">
                                    <span className="font-handwriting text-4xl md:text-5xl">G</span>
                                    {isJoining && (
                                        <motion.div
                                            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
                                            transition={{ repeat: Infinity, duration: 1.5 }}
                                            className="absolute inset-0 bg-white rounded-full blur-xl"
                                        />
                                    )}
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-background border-2 border-romantic-red flex items-center justify-center shadow-md z-20">
                                    <Car size={13} className="text-romantic-red" />
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity">
                                    {isJoining ? "Coming to You!" : "The Driver (Geo)"}
                                </span>
                                <span className={`text-[9px] italic opacity-30 text-center max-w-[110px] leading-tight ${lang === 'ta' ? 'font-tamil' : ''}`}>
                                    {content[lang].char_geo_caption}
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Connection Heart — the focal point once they "join", so it
                        gets its own glow instead of the driver sliding over it. */}
                    <div className="flex-1 flex flex-col items-center px-4 relative z-10">
                        <div className="relative">
                            {isJoining && (
                                <motion.div
                                    animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    className="absolute inset-0 bg-romantic-red rounded-full blur-lg -z-10"
                                />
                            )}
                            <motion.div
                                animate={{
                                    scale: isJoining ? [1, 1.5, 1.2] : [1, 1.2, 1],
                                    opacity: isJoining ? 1 : 0.4
                                }}
                                transition={{ duration: 1.5, repeat: isJoining ? 0 : Infinity }}
                            >
                                <Heart size={44} className="text-romantic-red fill-current drop-shadow-[0_0_10px_rgba(255,77,77,0.3)]" />
                            </motion.div>
                        </div>
                        <div className="w-full h-px bg-white/10 mt-6 relative overflow-hidden">
                            <motion.div
                                animate={isJoining ? { x: "100%" } : { left: ["-100%", "100%"] }}
                                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                className="absolute top-1/2 -translate-y-1/2 w-12 h-2 bg-romantic-red/20 blur-sm rounded-full"
                            />
                        </div>
                    </div>

                    {/* Muhh (Ancy) — kept still like the driver rather than bouncing
                        on its own infinite loop, so the two avatars never drift out
                        of alignment relative to each other. */}
                    <motion.div
                        animate={isJoining ? { scale: 1.05 } : { scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-center gap-4 relative z-20"
                    >
                        <div className="relative">
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-romantic-pink flex items-center justify-center text-white shadow-xl relative z-10">
                                <span className="font-handwriting text-4xl md:text-5xl">A</span>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-background border-2 border-romantic-pink flex items-center justify-center shadow-md z-20 text-sm">
                                🍁
                            </div>

                            <AnimatePresence>
                                {isJoining && (
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{
                                            scale: [1, 1.5, 0],
                                            opacity: [0, 1, 0],
                                            y: [-20, -100]
                                        }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        className="absolute -top-6 left-1/2 -translate-x-1/2"
                                    >
                                        <Heart size={24} className="text-romantic-red fill-current" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Muhh (Ancy)</span>
                            <span className={`text-[9px] italic opacity-30 text-center max-w-[110px] leading-tight ${lang === 'ta' ? 'font-tamil' : ''}`}>
                                {content[lang].char_ancy_caption}
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* Reward message once he's "arrived" — gives the tap an emotional
                    payoff beyond just the animation itself. */}
                <div className="h-8 flex items-center justify-center mb-4">
                    <AnimatePresence>
                        {isJoining && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 0.8, y: 0 }}
                                exit={{ opacity: 0 }}
                                className={`text-sm md:text-base font-bold italic text-romantic text-center ${lang === 'ta' ? 'font-tamil' : ''}`}
                            >
                                {content[lang].char_joined_message}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>

                <div className="text-center mb-10 px-8 relative z-10">
                    <p className={`text-xl md:text-2xl font-bold italic text-romantic leading-relaxed ${lang === 'ta' ? 'font-tamil' : ''}`}>
                        {lang === 'en'
                            ? '"Her Driver for 5 years, and forever in my heart. Every mile of that journey was for her."'
                            : '"5 ஆண்டுகளாக அவளது டிரைவர், என்றென்றும் என் இதயத்தில். அந்தப் பயணத்தின் ஒவ்வொரு மைலும் அவளுக்காகவே அமைந்தது."'
                        }
                    </p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push("/story/journey-card")}
                    className="w-full bg-romantic-red text-white py-5 rounded-3xl font-black text-xl shadow-xl flex items-center justify-center gap-4 group"
                >
                    <Sparkles size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                    <span>{content[lang].cta_characters}</span>
                    <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform duration-500" />
                </motion.button>
            </StoryCard>
        </CinematicContainer>
    );
}
