"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Quote, Heart, RotateCcw, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";
import { useState, useMemo, useEffect } from "react";
import { logInsight } from "@/utils/insights";

const poems = [
    {
        ta: "உன் பார்வை படும் இடங்களில் எல்லாம்,\nஎன் உலகம் அழகாகிறது.\nஉன் குரல் கேட்கும் பொழுது,\nஎன் இதயம் அமைதி கொள்கிறது.",
        en: "Wherever your gaze falls,\nMy world becomes beautiful.\nWhenever your voice is heard,\nMy heart finds peace.",
        ref: "Loyola Memory"
    },
    {
        ta: "தூரங்கள் பிரித்தாலும்,\nநமது நினைவுகள் நம்மை இணைக்கும்.\nஒவ்வொரு நொடியும் உன் நினைப்புடன்,\nஎன் வாழ்க்கை நகர்கிறது.",
        en: "Though distances divide us,\nOur memories will connect us.\nWith your thoughts every second,\nMy life moves forward.",
        ref: "Dubai - Tirunelveli"
    },
    {
        ta: "காத்திருப்பு கசக்கும் என்பார்கள்,\nஆனால் உனக்காக காத்திருப்பது,\nதித்திக்கும் ஒரு அனுபவம்.\nநம் சந்திப்பு ஒரு திருவிழா.",
        en: "They say waiting is bitter,\nBut waiting for you is a sweet experience.\nOur meeting will be a festival of its own.",
        ref: "The Reunion"
    },
    {
        ta: "இருவேறு உலகங்களில் நாம்,\nஒரே கனவை காண்கிறோம்.\nகடல் கடந்தாலும் நம் காதல்,\nகரைகளை அறியாத அலை போல.",
        en: "In two different worlds we are,\nDreaming the same dream.\nThough we cross seas, our love\nIs like a wave that knows no shores.",
        ref: "Distance and Love"
    },
    {
        ta: "உன்னோடு கழித்த அந்த நொடிகள்,\nஎன் வாழ்க்கையின் பொக்கிஷங்கள்.\nமீண்டும் உன்னை சந்திக்கும் நேரம்,\nஎன் உயிரின் வரப்பிரசாதம்.",
        en: "The moments spent with you,\nAre the treasures of my life.\nThe time I meet you again,\nIs the greatest blessing of my soul.",
        ref: "Our Time"
    },
    {
        ta: "நாம் இருவரும் இணைந்தாலே,\nஇந்த உலகம் முழுமையடைகிறது.\nநீ இல்லாத பொழுதுகளில் கூட,\nஉன் அன்பு என்னை வழிநடத்துகிறது.",
        en: "Only when we are together,\nDoes this world become complete.\nEven in moments when you aren't here,\nYour love guides me forward.",
        ref: "Completeness"
    }
];

const FloatingPetal = ({ delay }: { delay: number }) => {
    const randomVals = useMemo(() => ({
        xInitial: Math.random() * 400 - 200,
        xFinal: Math.random() * 600 - 300,
        duration: 8 + Math.random() * 8,
        scale: 0.5 + Math.random() * 1.5,
        rotateDir: Math.random() > 0.5 ? 360 : -360
    }), []);

    return (
        <motion.div
            initial={{ y: -50, x: randomVals.xInitial, rotate: 0, opacity: 0 }}
            animate={{
                y: 1000,
                x: randomVals.xFinal,
                rotate: randomVals.rotateDir * 2,
                opacity: [0, 0.6, 0]
            }}
            transition={{ duration: randomVals.duration, repeat: Infinity, delay, ease: "linear" }}
            className="absolute top-0 left-1/2 pointer-events-none text-romantic-pink/40 select-none z-0"
            style={{ scale: randomVals.scale }}
        >
            🌸
        </motion.div>
    );
};

const BokehGlow = ({ delay, color }: { delay: number, color: string }) => {
    const randomVals = useMemo(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: 200 + Math.random() * 400
    }), []);

    return (
        <motion.div
            animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.2, 1]
            }}
            transition={{ duration: 7 + Math.random() * 5, delay, repeat: Infinity }}
            className={`absolute rounded-full blur-[100px] pointer-events-none -z-10 ${color}`}
            style={{
                top: randomVals.top,
                left: randomVals.left,
                width: randomVals.size,
                height: randomVals.size
            }}
        />
    );
};

export default function PoetryPage() {
    const { lang } = useAppContext();
    const router = useRouter();
    const [revealed, setRevealed] = useState<number[]>([]);
    const [currentBatch, setCurrentBatch] = useState<any[]>([]);

    useEffect(() => {
        // Poetry Rotation Logic: Show only 2 poems per visit, cycle through the 6
        const rawIndex = localStorage.getItem('_v_poetry_batch');
        const batchIndex = rawIndex ? parseInt(rawIndex) : 0;

        // Split 6 poems into batches of 2: [0,1], [2,3], [4,5]
        const startIndex = (batchIndex * 2) % poems.length;
        setCurrentBatch(poems.slice(startIndex, startIndex + 2));

        // Prepare next batch for the next visit
        localStorage.setItem('_v_poetry_batch', ((batchIndex + 1) % 3).toString());

        logInsight('lastPage', 'Poetry - Soul Reveal');
    }, []);

    const toggleReveal = (index: number) => {
        if (!revealed.includes(index)) {
            setRevealed([...revealed, index]);
            logInsight('hugCount', 1.5);
        }
    };

    return (
        <CinematicContainer>
            {/* Subtle background atmosphere - consistent with other pages */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden h-full w-full">
                {Array.from({ length: 8 }).map((_, i) => <FloatingPetal key={i} delay={i * 2} />)}
            </div>

            <StoryCard className="max-w-2xl relative z-10 font-sans">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-5xl font-black mb-2 text-romantic text-center">
                        {content[lang].poetry_title}
                    </h1>
                    <p className="text-sm md:text-base font-medium opacity-60 italic mb-8 text-center px-6">
                        {content[lang].poetry_desc}
                    </p>
                </div>

                <div className="space-y-6 w-full text-left mb-10 overflow-y-auto pr-2 scrollbar-hide">
                    {currentBatch.map((poem, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative group w-full"
                        >
                            {/* The Poetry Content */}
                            <motion.div
                                className={`relative p-8 rounded-3xl transition-all duration-1000 overflow-hidden border border-white/5 cursor-pointer ${revealed.includes(i) ? 'bg-white/5 shadow-lg' : 'bg-transparent'}`}
                                onClick={() => toggleReveal(i)}
                            >
                                <div className={`transition-all duration-1000 text-center ${revealed.includes(i) ? 'blur-0 opacity-100 scale-100' : 'blur-xl opacity-0 scale-95'}`}>
                                    <Quote size={24} className="mx-auto mb-4 text-romantic-red/30" />

                                    <h2 className={`text-xl md:text-2xl font-black leading-relaxed mb-6 text-romantic ${lang === 'ta' ? 'font-tamil' : ''}`}>
                                        {poem.ta}
                                    </h2>

                                    <div className="flex items-center justify-center gap-4 mb-6">
                                        <div className="h-px w-8 bg-romantic-red/20" />
                                        <Heart size={14} className="text-romantic-red/40" />
                                        <div className="h-px w-8 bg-romantic-red/20" />
                                    </div>

                                    <p className="text-sm md:text-base italic opacity-70 font-medium font-serif leading-relaxed px-4">
                                        {poem.en}
                                    </p>

                                    <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-center gap-3">
                                        <Sparkles size={14} className="text-romantic-gold/50" />
                                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">{poem.ref}</span>
                                    </div>
                                </div>

                                {/* Misty Overlay */}
                                <AnimatePresence>
                                    {!revealed.includes(i) && (
                                        <motion.div
                                            initial={{ opacity: 1 }}
                                            exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
                                            className="absolute inset-0 z-20 flex flex-col items-center justify-center glass-card border-white/10 group-hover:bg-white/[0.05] transition-colors"
                                        >
                                            <motion.div
                                                animate={{ y: [0, -5, 0] }}
                                                transition={{ repeat: Infinity, duration: 2.5 }}
                                                className="flex flex-col items-center gap-3"
                                            >
                                                <Heart size={32} className="text-romantic-red fill-romantic-red/5" />
                                                <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40">Reveal my heart</span>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                <div className="w-full space-y-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push("/story/characters")}
                        className="w-full py-5 rounded-3xl font-black text-xl shadow-xl flex items-center justify-center gap-4 group bg-romantic-red text-white"
                    >
                        <span>{content[lang].cta_poetry}</span>
                        <RotateCcw size={22} className="rotate-90 group-hover:rotate-180 transition-transform duration-500" />
                    </motion.button>
                </div>
            </StoryCard>
        </CinematicContainer>
    );
}
