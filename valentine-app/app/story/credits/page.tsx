"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import { Heart, Star, ArrowRight, Share2, Clapperboard } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";

const creditItems = [
    { role: "The Protagonist", name: "Ancy 🧸" },
    { role: "Executive Producer", name: "Geo 🍁" },
    { role: "Filming Locations", name: "Dubai & India" },
    { role: "Musical Influence", name: "Our Dubai-India Playlist" },
    { role: "Special Thanks", name: "Destiny & Love" },
    { role: "Production Length", name: "Forever and Always" },
];

export default function CreditsPage() {
    const { lang, theme } = useAppContext();
    const router = useRouter();
    const [score, setScore] = useState(0);
    const [slideIndex, setSlideIndex] = useState(0);

    // Slide Sequence: 
    // 0: Intro, 1-N: Credits, N+1: Score, N+2: Vow Part 1, N+3: Vow Part 2, N+4: Action Hub
    const totalSlides = creditItems.length + 4;

    const progressSlide = useMemo(() => () => {
        setSlideIndex(prev => {
            if (prev < totalSlides) return prev + 1;
            return prev;
        });
    }, [totalSlides]);

    useEffect(() => {
        const raw = localStorage.getItem('_v_heartbeat');
        if (raw) {
            const data = JSON.parse(raw);
            setScore(data.hugCount || 0);
        }
    }, []);

    useEffect(() => {
        const getDuration = (index: number) => {
            if (index === 0) return 4000; // Intro (Slightly longer)
            if (index === 1) return 5000; // THE PROTAGONIST (Ancy 🧸) - Give her more time!
            if (index <= creditItems.length) return 3500; // Other Credits (Slower)
            if (index === creditItems.length + 1) return 6000; // Score Reveal
            if (index === creditItems.length + 2) return 18000; // Eternal Vow Part 1 (Journey) - Extended for readability
            if (index === creditItems.length + 3) return 20000; // Eternal Vow Part 2 (The Promise) - Extended for detailed thrill
            return null;
        };

        const duration = getDuration(slideIndex);
        if (!duration) return;

        const timer = setTimeout(progressSlide, duration);
        return () => clearTimeout(timer);
    }, [slideIndex, progressSlide]);

    const themeStyles = useMemo(() => {
        switch (theme) {
            case "light":
                return {
                    bg: "bg-[#fffafa]",
                    nebula1: "from-romantic-pink/30",
                    nebula2: "from-romantic-red/5",
                    textPrimary: "text-romantic-red",
                    textSecondary: "text-romantic-red/60",
                    textRole: "text-romantic-red/30",
                    starColor: "text-romantic-red/20",
                    fireworkColors: ["#ff4d4d", "#ff85a2", "#ffb3c6"],
                };
            case "rainbow":
                return {
                    bg: "bg-[#050510]",
                    nebula1: "from-purple-500/20",
                    nebula2: "from-cyan-400/10",
                    textPrimary: "text-white",
                    textSecondary: "text-cyan-300",
                    textRole: "text-purple-400/60",
                    starColor: "text-cyan-300/30",
                    fireworkColors: ["#a855f7", "#22d3ee", "#f472b6", "#fbbf24"],
                };
            default: // Dark
                return {
                    bg: "bg-[#020205]",
                    nebula1: "from-romantic-red/15",
                    nebula2: "from-romantic-gold/10",
                    textPrimary: "text-white",
                    textSecondary: "text-romantic-gold/70",
                    textRole: "text-romantic-gold/40",
                    starColor: "text-romantic-gold/30",
                    fireworkColors: ["#ffd700", "#ff4d4d"],
                };
        }
    }, [theme]);

    const stars = useMemo(() => {
        return Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            duration: 2 + Math.random() * 4,
            scale: 0.3 + Math.random() * 0.4
        }));
    }, []);

    const shareOurStory = () => {
        const raw = localStorage.getItem('_v_heartbeat');
        if (!raw) return;
        const data = JSON.parse(raw);
        const adventures = data.selections?.length > 0 ? `\n📍 Adventures: ${data.selections.join(", ")}` : "";
        const dateIdea = data.dateResult ? `\n🎁 Date Idea: ${data.dateResult}` : "";
        const loveMeter = `\n💖 Our Affection Score: ${Math.floor(score)}`;
        const message = `Hey Geo! 🧸 I just finished our Valentine's Journey! \n\nHere is our record: ${adventures}${dateIdea}${loveMeter}\n\nThank you for putting your whole heart into this. ❤️`;
        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/?text=${encoded}`, '_blank');
    };

    return (
        <CinematicContainer showParticles={false}>
            {/* High-End Background with Ken Burns Zoom */}
            <div className={`fixed inset-0 ${themeStyles.bg} z-0 overflow-hidden transition-colors duration-2000`}>
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                        opacity: theme === 'light' ? [0.4, 0.5, 0.4] : [0.3, 0.4, 0.3]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute inset-0 bg-gradient-radial ${themeStyles.nebula1} via-transparent to-transparent blur-[140px]`}
                />
                <motion.div
                    animate={{
                        scale: [1, 1.25, 1],
                        x: [0, -60, 0],
                        y: [0, 40, 0],
                        opacity: theme === 'light' ? [0.3, 0.4, 0.3] : [0.2, 0.3, 0.2]
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute inset-0 bg-gradient-radial ${themeStyles.nebula2} via-transparent/5 to-transparent blur-[140px] top-1/2 left-1/2`}
                />

                <Fireworks colors={themeStyles.fireworkColors} active={slideIndex >= totalSlides - 1} />
                <FloatingDecoration />

                {stars.map(star => (
                    <motion.div
                        key={star.id}
                        animate={{ opacity: [0.1, 0.6, 0.1], scale: [1, 1.4, 1] }}
                        transition={{ repeat: Infinity, duration: star.duration }}
                        className={`absolute ${themeStyles.starColor}`}
                        style={{ top: star.top, left: star.left, scale: star.scale }}
                    >
                        <Star size={4} className="fill-current" />
                    </motion.div>
                ))}
            </div>


            <div
                onClick={() => setSlideIndex(prev => (prev < totalSlides ? prev + 1 : prev))}
                className="relative w-full flex-1 flex flex-col items-center justify-center p-4 z-20 overflow-hidden cursor-pointer"
            >
                <AnimatePresence mode="wait">

                    {/* Slide 0: Intro Title */}
                    {slideIndex === 0 && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="text-center z-20 flex flex-col items-center justify-center p-6 w-full mx-auto"
                        >
                            <Clapperboard size={36} className={`mx-auto mb-6 md:mb-8 md:w-12 md:h-12 ${theme === 'light' ? 'text-romantic-red/40' : 'text-romantic-gold/40'}`} />
                            <h1 className={`text-3xl md:text-7xl font-black mb-4 tracking-[0.2em] uppercase ${themeStyles.textPrimary} drop-shadow-2xl`}>
                                {content[lang].credits_title}
                            </h1>
                            <p className={`text-xs md:text-xl font-bold ${themeStyles.textSecondary} italic tracking-widest uppercase opacity-60`}>
                                A Geo Production
                            </p>
                        </motion.div>
                    )}

                    {/* Slides 1-N: Credit Items */}
                    {slideIndex >= 1 && slideIndex <= creditItems.length && (
                        <motion.div
                            key={`credit-${slideIndex}`}
                            initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -30, filter: "blur(5px)" }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="text-center z-20 space-y-3 md:space-y-4 flex flex-col items-center justify-center p-6 w-full mx-auto"
                        >
                            <span className={`text-[8px] md:text-xs font-black uppercase tracking-[0.6em] md:tracking-[0.8em] ${themeStyles.textRole}`}>
                                {creditItems[slideIndex - 1].role}
                            </span>
                            <h2 className={`text-2xl md:text-6xl font-black ${themeStyles.textPrimary} tracking-tight ${lang === 'ta' ? 'font-tamil' : ''}`}>
                                {creditItems[slideIndex - 1].name}
                            </h2>
                        </motion.div>
                    )}

                    {/* Slide N+1: Affection Score Climax */}
                    {slideIndex === creditItems.length + 1 && (
                        <motion.div
                            key="score"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.2 }}
                            transition={{ duration: 1.5 }}
                            className="text-center z-20 flex flex-col items-center justify-center p-6 w-full mx-auto"
                        >
                            <span className={`text-[10px] md:text-xs font-black uppercase tracking-[0.6em] ${themeStyles.textRole} mb-6 md:mb-8 block`}>
                                The Proof, In Numbers
                            </span>
                            <div className="relative inline-block mb-6 md:mb-8">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                    className={`absolute inset-0 border border-dashed ${themeStyles.textSecondary} opacity-20 rounded-full scale-110`}
                                />
                                <div className={`text-5xl md:text-9xl font-black ${themeStyles.textPrimary} px-10 py-6 md:px-12 md:py-8 ${theme === 'light' ? 'drop-shadow-sm' : 'drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]'}`}>
                                    {Math.floor(score)}%
                                </div>
                            </div>
                            <h3 className={`text-lg md:text-3xl font-bold ${themeStyles.textPrimary} italic tracking-widest px-4 max-w-md`}>
                                Every hug you gave, every secret you found, every heart you caught along the way — it all still means everything to me.
                            </h3>
                        </motion.div>
                    )}

                    {/* Slide N+2: The Eternal Vow - Part 1 (The Journey Together) */}
                    {slideIndex === creditItems.length + 2 && (
                        <motion.div
                            key="eternal-vow-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, filter: "blur(10px)" }}
                            transition={{ duration: 2 }}
                            className="text-center z-20 max-w-4xl flex flex-col items-center justify-center p-6 md:p-8 w-full mx-auto"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5, duration: 2 }}
                            >
                                <Heart size={32} className="text-romantic-red mx-auto fill-romantic-red/10 animate-pulse mb-6 md:mb-8 md:w-10 md:h-10" />
                            </motion.div>

                            <div className="space-y-6 md:space-y-12 max-w-3xl">
                                <motion.p
                                    initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    transition={{ delay: 1, duration: 2 }}
                                    className={`text-base md:text-2xl font-bold italic ${themeStyles.textSecondary} leading-relaxed`}
                                >
                                    &quot;Ancy, in this infinite universe, you are still my only priority. My heart&apos;s first, and realest, choice.&quot;
                                </motion.p>

                                <motion.p
                                    initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    transition={{ delay: 5, duration: 2.5 }}
                                    className={`text-base md:text-2xl font-bold italic ${themeStyles.textSecondary} leading-relaxed`}
                                >
                                    &quot;I carry our lifetime together with me—every laugh, every quiet moment, a home I&apos;ll never stop feeling, even from far away.&quot;
                                </motion.p>

                                <motion.p
                                    initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    transition={{ delay: 10, duration: 2.5 }}
                                    className={`text-base md:text-2xl font-bold italic ${themeStyles.textSecondary} leading-relaxed`}
                                >
                                    &quot;However far our paths take us, I&apos;ll carry what we built for as long as I live—this love never really fades.&quot;
                                </motion.p>
                            </div>
                        </motion.div>
                    )}

                    {/* Slide N+3: The Eternal Vow - Part 2 (The Vow & Faith) */}
                    {slideIndex === creditItems.length + 3 && (
                        <motion.div
                            key="eternal-vow-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                            transition={{ duration: 3 }}
                            className="text-center z-20 max-w-4xl flex flex-col items-center justify-center p-6 md:p-8 w-full mx-auto"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5, duration: 2 }}
                                className="mb-4 md:mb-6"
                            >
                                <Heart size={40} className="text-romantic-red mx-auto fill-romantic-red/20 animate-pulse drop-shadow-[0_0_15px_rgba(255,77,77,0.6)] md:w-12 md:h-12" />
                            </motion.div>

                            <div className="space-y-4 md:space-y-6 max-w-4xl px-2 flex flex-col items-center justify-center">
                                <motion.p
                                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    transition={{ delay: 1, duration: 2.5 }}
                                    className={`text-base md:text-2xl font-bold italic ${themeStyles.textSecondary} leading-relaxed`}
                                >
                                    &quot;I didn&apos;t just want a future with you—for a while, I let myself believe I&apos;d have it. That dream still means everything, even now.&quot;
                                </motion.p>

                                <motion.p
                                    initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                    transition={{ delay: 5, duration: 3 }}
                                    className={`text-base md:text-2xl font-bold italic ${themeStyles.textSecondary} leading-relaxed`}
                                >
                                    &quot;This was never made for you to watch and move on from. It&apos;s for us—for how I loved you then, and how I still do now. I hope that when you see this, some part of you misses me too.&quot;
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8, filter: "blur(15px)" }}
                                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                    transition={{ delay: 10, duration: 1.5, type: "spring", bounce: 0.5 }}
                                    className="pt-2 relative w-full flex flex-col items-center"
                                >
                                    <div className={`font-bold font-cinzel ${themeStyles.textPrimary} leading-[1.1] tracking-[0.1em] drop-shadow-[0_0_40px_getCurrentColor] uppercase flex flex-col items-center gap-2`}>
                                        <span className="text-xl md:text-3xl opacity-90">YOU ARE</span>
                                        <motion.span
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 10.5, duration: 1.5 }}
                                            className="text-3xl md:text-6xl font-black block"
                                        >
                                            MY EVERYTHING
                                        </motion.span>
                                    </div>
                                    <p className={`text-[10px] md:text-sm font-bold tracking-[0.4em] md:tracking-[0.5em] ${themeStyles.textRole} mt-4 opacity-80 uppercase flex items-center justify-center gap-2`}>
                                        <span>Always, Geo 🍁</span>
                                    </p>
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={{ scaleX: 1, opacity: 1 }}
                                transition={{ delay: 12, duration: 2 }}
                                className={`h-px w-32 md:w-48 mx-auto mt-6 md:mt-12 ${theme === 'light' ? 'bg-romantic-red/30' : 'bg-white/30'}`}
                            />
                        </motion.div>
                    )}

                    {/* Slide N+4: Action Hub */}
                    {slideIndex >= totalSlides && (
                        <motion.div
                            key="action-hub"
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, type: "spring", damping: 12 }}
                            className="z-30 w-full max-w-md space-y-4 md:space-y-6 flex flex-col items-center justify-center p-6 mx-auto"
                        >
                            <div className="text-center mb-4 md:mb-12">
                                <h1 className={`text-xl md:text-2xl font-black uppercase tracking-[0.4em] ${themeStyles.textPrimary} mb-2`}>The End</h1>
                                <p className={`text-[8px] md:text-[10px] font-black tracking-[0.2em] ${themeStyles.textRole}`}>But Never Really Over</p>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: theme === 'light' ? "0 20px 40px rgba(34,197,94,0.3)" : "0 0 50px rgba(34,197,94,0.5)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={shareOurStory}
                                className="w-full bg-green-500 text-white py-5 md:py-6 rounded-2xl md:rounded-3xl font-black text-lg md:text-xl shadow-2xl flex items-center justify-center gap-3 md:gap-4 group transition-all"
                            >
                                <Share2 size={20} className="group-hover:rotate-12 transition-transform md:w-6 md:h-6" />
                                <span>Tell Geo You Finished! 🧸</span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => router.push("/world")}
                                className={`w-full ${theme === 'light' ? 'bg-romantic-red/5 border-romantic-red/10 text-romantic-red' : 'bg-white/5 border-white/20 text-white'} border py-5 md:py-6 rounded-2xl md:rounded-3xl font-black text-base md:text-lg flex items-center justify-center gap-3 md:gap-4 hover:bg-white/10 transition-all`}
                            >
                                <ArrowRight size={18} className="transition-transform duration-700 group-hover:translate-x-1 md:w-5 md:h-5" />
                                <span>Relive the Story</span>
                            </motion.button>

                            <p className={`text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] ${themeStyles.textRole} text-center mt-4 md:mt-12`}>
                                Crafted with Soul in Dubai & India
                            </p>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>

            {/* Skip Interaction Overlay */}
            {slideIndex < totalSlides && (
                <div
                    onClick={() => setSlideIndex(prev => prev + 1)}
                    className="fixed bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-40 cursor-pointer opacity-30 hover:opacity-100 transition-opacity"
                >
                    <span className={`text-[8px] font-black uppercase tracking-[0.8em] ${themeStyles.textRole}`}>
                        Tap Screen to Fast Forward
                    </span>
                </div>
            )}
        </CinematicContainer>
    );
}

function FloatingDecoration() {
    const elements = useMemo(() => {
        return Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            char: i % 2 === 0 ? "🧸" : "🍁",
            left: `${Math.random() * 100}%`,
            delay: Math.random() * 10,
            duration: 15 + Math.random() * 20,
            size: 20 + Math.random() * 30,
            rotation: Math.random() * 360,
        }));
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.15]">
            {elements.map((el) => (
                <motion.div
                    key={el.id}
                    initial={{ y: "-20vh", opacity: 0, rotate: el.rotation }}
                    animate={{
                        y: "110vh",
                        opacity: [0, 1, 1, 0],
                        rotate: el.rotation + 360
                    }}
                    transition={{
                        duration: el.duration,
                        repeat: Infinity,
                        delay: el.delay,
                        ease: "linear",
                    }}
                    className="absolute"
                    style={{ left: el.left, fontSize: el.size }}
                >
                    {el.char}
                </motion.div>
            ))}
        </div>
    );
}

function Fireworks({ colors, active }: { colors: string[], active: boolean }) {
    if (!active) return null;
    return (
        <div className="absolute inset-0 pointer-events-none z-0">
            {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        scale: [0, 1, 1.5],
                        opacity: [0, 1, 0, 1, 0],
                        x: [0, (Math.random() - 0.5) * 600],
                        y: [0, (Math.random() - 0.5) * 600],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 3,
                        repeat: Infinity,
                        delay: i * 0.8,
                    }}
                    className="absolute left-1/2 top-1/2"
                >
                    <div className="relative">
                        {Array.from({ length: 12 }).map((_, j) => (
                            <motion.div
                                key={j}
                                animate={{
                                    x: [0, Math.cos(j * 30) * 120],
                                    y: [0, Math.sin(j * 30) * 120],
                                }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className={`absolute w-1 h-1 rounded-full`}
                                style={{
                                    backgroundColor: colors[j % colors.length],
                                    boxShadow: `0 0 10px ${colors[j % colors.length]}`
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
