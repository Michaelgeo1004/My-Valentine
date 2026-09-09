"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Quote, Heart, Star, ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";
import { useState, useEffect, useRef } from "react";
import { logInsight, sendTrackBeacon, useOnRealUnmount } from "@/utils/insights";

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
        ta: "காத்திருப்பு கசக்கும் என்பார்கள்,\nஆனால் உனக்காக காத்திருப்பது,\nதித்திக்கும் ஒரு அனுபவம்.\nஉன் நினைவே ஒரு திருவிழா.",
        en: "They say waiting is bitter,\nBut waiting for you is a sweet experience.\nEvery thought of you still feels like a festival of its own.",
        ref: "The Waiting"
    },
    {
        ta: "இருவேறு உலகங்களில் நாம்,\nஒரே கனவை காண்கிறோம்.\nகடல் கடந்தாலும் நம் காதல்,\nகரைகளை அறியாத அலை போல.",
        en: "In two different worlds we are,\nDreaming the same dream.\nThough we cross seas, our love\nIs like a wave that knows no shores.",
        ref: "Distance and Love"
    },
    {
        ta: "உன்னோடு கழித்த அந்த நொடிகள்,\nஎன் வாழ்க்கையின் பொக்கிஷங்கள்.\nஉன் ஒவ்வொரு நினைவும்,\nஇன்னும் என் உயிரின் வரப்பிரசாதம்.",
        en: "The moments spent with you,\nAre the treasures of my life.\nEvery memory of you,\nIs still the greatest blessing of my soul.",
        ref: "Our Time"
    },
    {
        ta: "நாம் இருவரும் இணைந்தாலே,\nஇந்த உலகம் முழுமையடைகிறது.\nநீ இல்லாத பொழுதுகளில் கூட,\nஉன் அன்பு என்னை வழிநடத்துகிறது.",
        en: "Only when we are together,\nDoes this world become complete.\nEven in moments when you aren't here,\nYour love guides me forward.",
        ref: "Completeness"
    },
    {
        ta: "இருள் சூழும் நேரங்களில் கூட,\nநான் உன் அருகில் இருப்பேன்.\nஎந்த கடினமான நேரமும்,\nஎன் அன்பை அசைக்காது.",
        en: "Even in the darkest hours,\nI will be right beside you.\nNo hardship, however great,\nCan shake my love for you.",
        ref: "Every Storm"
    },
    {
        ta: "கஷ்டம் வரும் ஒவ்வொரு நேரமும்,\nநான் உன் அருகில் இருப்பதாக நினை.\nஉன் தோளில் சாய்ந்திருப்பது நான்தான்,\nஎன்றென்றும் உன் பக்கம் இருப்பேன்.",
        en: "Whenever hardship comes your way,\nJust think I am right there beside you.\nIt's me you're leaning on,\nI will stand by you, always.",
        ref: "By Your Side"
    }
];

const BATCH_SIZE = 5;

export default function PoetryPage() {
    const { lang } = useAppContext();
    const router = useRouter();
    const [revealed, setRevealed] = useState<number[]>([]);
    const [favorited, setFavorited] = useState<number[]>([]);
    const [currentBatch, setCurrentBatch] = useState<any[]>([]);
    const revealedRefsRef = useRef<string[]>([]);

    useEffect(() => {
        // Poetry Rotation Logic: show BATCH_SIZE poems per visit, cycling
        // through the full pool so a return visit sees a different set.
        const totalBatches = Math.ceil(poems.length / BATCH_SIZE);
        const rawIndex = localStorage.getItem('_v_poetry_batch');
        const batchIndex = rawIndex ? parseInt(rawIndex) : 0;

        const startIndex = (batchIndex * BATCH_SIZE) % poems.length;
        setCurrentBatch(poems.slice(startIndex, startIndex + BATCH_SIZE));

        // Prepare next batch for the next visit
        localStorage.setItem('_v_poetry_batch', ((batchIndex + 1) % totalBatches).toString());

        logInsight('lastPage', 'Poetry - Soul Reveal');
    }, []);

    // Reports which poems were revealed and which were favorited, tagged to
    // THIS page on leave.
    useOnRealUnmount(() => {
        if (revealedRefsRef.current.length > 0 || favorited.length > 0) {
            sendTrackBeacon({
                path: '/story/poetry',
                event: 'poetry_leave',
                poemsRevealed: revealedRefsRef.current.join('; '),
                poemsFavorited: favorited.map(i => currentBatch[i]?.ref).filter(Boolean).join('; '),
            });
        }
    });

    const toggleReveal = (index: number) => {
        setRevealed(prev => {
            if (prev.includes(index)) {
                return prev.filter(i => i !== index);
            }
            logInsight('hugCount', 1.5);
            const ref = currentBatch[index]?.ref;
            if (ref && !revealedRefsRef.current.includes(ref)) {
                revealedRefsRef.current.push(ref);
            }
            return [...prev, index];
        });
    };

    const toggleFavorite = (index: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setFavorited(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
    };

    return (
        <CinematicContainer>
            <StoryCard className="max-w-2xl relative z-10 font-sans">
                <div className="text-center mb-6">
                    <h1 className="text-3xl md:text-5xl font-black mb-2 text-romantic text-center">
                        {content[lang].poetry_title}
                    </h1>
                    <p className="text-sm md:text-base font-medium opacity-60 italic mb-4 text-center px-6">
                        {content[lang].poetry_desc}
                    </p>
                    <p className={`text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-30 ${lang === 'ta' ? 'font-tamil' : ''}`}>
                        {content[lang].poetry_tap_hint}
                    </p>
                </div>

                <div className="space-y-4 w-full text-left mb-10">
                    {currentBatch.map((poem, i) => {
                        const isRevealed = revealed.includes(i);
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="w-full"
                            >
                                {/* Collapsed prompt — compact and teased with the poem's
                                    memory tag, instead of a full-height blurred card. */}
                                <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    onClick={() => toggleReveal(i)}
                                    className={`glass-card p-5 rounded-3xl border-white/10 flex items-center gap-4 cursor-pointer transition-colors duration-500 ${isRevealed ? 'bg-romantic-red/5 border-romantic-red/20' : 'hover:bg-white/5'}`}
                                >
                                    <motion.div
                                        animate={isRevealed ? {} : { y: [0, -4, 0] }}
                                        transition={{ repeat: isRevealed ? 0 : Infinity, duration: 2.5 }}
                                    >
                                        <Heart size={28} className={`shrink-0 transition-colors duration-500 ${isRevealed ? 'text-romantic-red fill-current' : 'text-romantic-red/40'}`} />
                                    </motion.div>
                                    <p className={`text-xs md:text-sm font-bold italic text-romantic/80 flex-1 ${lang === 'ta' ? 'font-tamil' : ''}`}>
                                        {content[lang].poetry_teaser_prefix} &quot;{poem.ref}&quot;
                                    </p>
                                    <button
                                        onClick={(e) => toggleFavorite(i, e)}
                                        aria-label="Favorite this poem"
                                        className="p-2 rounded-full hover:bg-white/10 transition-colors shrink-0"
                                    >
                                        <Star size={16} className={favorited.includes(i) ? 'text-romantic-gold fill-current' : 'text-foreground/20'} />
                                    </button>
                                </motion.div>

                                {/* Expanded poem */}
                                <AnimatePresence>
                                    {isRevealed && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ type: "spring", damping: 20, stiffness: 100 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="mt-3 p-8 rounded-3xl bg-white/5 border border-white/10 shadow-lg text-center">
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

                                                <div className="mt-6 flex justify-end items-center gap-3">
                                                    <p className="font-handwriting text-xl text-romantic-red italic">Geo</p>
                                                    <div className="w-8 h-8 rounded-full bg-romantic-red/10 flex items-center justify-center text-romantic-red">
                                                        <Heart size={16} className="fill-current" />
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="w-full space-y-4">
                    <AnimatePresence>
                        {revealed.length >= currentBatch.length && currentBatch.length > 0 && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 0.7, y: 0 }}
                                exit={{ opacity: 0 }}
                                className={`text-sm md:text-base font-bold italic text-romantic text-center ${lang === 'ta' ? 'font-tamil' : ''}`}
                            >
                                {content[lang].poetry_more_waiting}
                            </motion.p>
                        )}
                    </AnimatePresence>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push("/story/characters")}
                        className="w-full py-5 rounded-3xl font-black text-xl shadow-xl flex items-center justify-center gap-4 group bg-romantic-red text-white"
                    >
                        <span>{content[lang].cta_poetry}</span>
                        <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform duration-500" />
                    </motion.button>
                </div>
            </StoryCard>
        </CinematicContainer>
    );
}
