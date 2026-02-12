"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sparkles, Heart, RotateCcw, Quote } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";

const compliments = {
    en: [
        "You are the most beautiful person I know, inside and out.",
        "Your laugh is my favorite song.",
        "Even after 5 years, you still take my breath away.",
        "You make every ordinary moment feel extraordinary.",
        "The world is better because you're in it, Ancy.",
        "My ego is 1000/100, but my love for you is infinity/100.",
        "You're the maple leaf in my winter garden.",
        "Distance only makes my heart grow fonder of you.",
        "You are my 'Teddie queen' 🧸👑 forever.",
        "Every mile I drive is for you, my driver's pride.",
        "You are my most priority, never the least."
    ],
    ta: [
        "உள்ளேயும் வெளியேயும் எனக்குத் தெரிந்த மிக அழகான நபர் நீதான்.",
        "உன் சிரிப்பு எனக்கு மிகவும் பிடித்த பாடல்.",
        "5 வருடங்களுக்குப் பிறகும், நீ இன்னும் என்னை வியக்க வைக்கிறாய்.",
        "ஒவ்வொரு சாதாரண தருணத்தையும் நீ அசாதாரணமாக உணர வைக்கிறாய்.",
        "நீ இருப்பதால் தான் இந்த உலகம் அழகாக இருக்கிறது, ஆன்சி.",
        "எனது ஈகோ 1000/100, ஆனால் உன் மீதான என் காதல் முடிவிலி/100.",
        "என் குளிர்கால தோட்டத்தின் மேப்பிள் இலை நீ.",
        "தூரம் உன் மீதான என் அன்பை இன்னும் அதிகமாக்குகிறது.",
        "நீ என்றும் என் 'Teddie queen' 🧸👑.",
        "நான் ஓட்டும் ஒவ்வொரு மைலும் உனக்காகவே.",
        "நீ என் முதல் முன்னுரிமை, என்றும் கடைசி அல்ல."
    ]
};

export default function OraclePage() {
    const { lang } = useAppContext();
    const router = useRouter();
    const [currentCompliment, setCurrentCompliment] = useState("");
    const [isConsulting, setIsConsulting] = useState(false);

    const consultOracle = () => {
        setIsConsulting(true);
        setCurrentCompliment("");

        setTimeout(() => {
            const random = compliments[lang as 'en' | 'ta'][Math.floor(Math.random() * compliments[lang as 'en' | 'ta'].length)];
            setCurrentCompliment(random);
            setIsConsulting(false);
        }, 800);
    };

    return (
        <CinematicContainer>
            <StoryCard className="max-w-xl">
                <h1 className="text-3xl md:text-5xl font-black mb-2 text-romantic text-center">
                    {content[lang].oracle_title}
                </h1>
                <p className="text-sm md:text-base font-medium opacity-60 italic mb-4 text-center">
                    {content[lang].oracle_desc}
                </p>
                <div className="bg-romantic-red/5 border border-romantic-red/20 p-4 rounded-2xl mb-8">
                    <p className={`text-xs md:text-sm font-bold text-center text-romantic leading-relaxed ${lang === 'ta' ? 'font-tamil' : ''}`}>
                        {content[lang as 'en' | 'ta'].oracle_instruction}
                    </p>
                </div>

                <div className="relative h-64 w-full flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {isConsulting ? (
                            <motion.div
                                key="consulting"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: [1, 1.1, 1] }}
                                exit={{ opacity: 0, scale: 1.2 }}
                                transition={{ repeat: Infinity, duration: 1 }}
                                className="flex flex-col items-center gap-4"
                            >
                                <Sparkles size={64} className="text-romantic-gold animate-spin-slow" />
                                <p className="text-xs font-black uppercase tracking-widest opacity-40">Connecting with the heart...</p>
                            </motion.div>
                        ) : currentCompliment ? (
                            <motion.div
                                key="compliment"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass-card p-10 rounded-[3rem] border-romantic-red/30 bg-romantic-red/5 backdrop-blur-3xl relative"
                            >
                                <Quote size={32} className="absolute -top-4 -left-4 text-romantic-red/20" />
                                <p className={`text-xl md:text-2xl font-black text-center leading-relaxed text-romantic ${lang === 'ta' ? 'font-tamil' : ''}`}>
                                    "{currentCompliment}"
                                </p>
                                <div className="flex justify-center mt-6">
                                    <Heart size={20} className="text-romantic-red fill-current" />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="idle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center gap-6"
                                onClick={consultOracle}
                            >
                                <motion.div
                                    animate={{
                                        scale: [1, 1.05, 1],
                                        rotate: [0, 5, -5, 0]
                                    }}
                                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                    className="text-romantic-gold cursor-pointer hover:drop-shadow-[0_0_20px_rgba(255,215,0,0.5)] transition-all"
                                >
                                    <Sparkles size={120} />
                                </motion.div>
                                <div className="px-6 py-2 rounded-full border border-romantic-gold/20 bg-romantic-gold/5">
                                    <p className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-romantic-gold text-center ${lang === 'ta' ? 'font-tamil' : ''}`}>
                                        {content[lang as 'en' | 'ta'].oracle_usage}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="space-y-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={consultOracle}
                        disabled={isConsulting}
                        className="w-full bg-romantic-gold text-black py-5 rounded-3xl font-black text-xl shadow-xl flex items-center justify-center gap-4 group disabled:opacity-50"
                    >
                        <Sparkles size={24} className={isConsulting ? "animate-spin" : ""} />
                        <span>{content[lang].oracle_cta}</span>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => router.push("/story/letters")}
                        className="w-full glass-card py-5 rounded-3xl font-black text-romantic-red flex items-center justify-center gap-4 hover:bg-white/5 transition-all"
                    >
                        <span>{content[lang].cta_oracle}</span>
                        <RotateCcw size={20} className="rotate-90" />
                    </motion.button>
                </div>
            </StoryCard>
        </CinematicContainer>
    );
}
