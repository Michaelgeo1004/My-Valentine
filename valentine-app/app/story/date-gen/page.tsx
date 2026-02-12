"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Coffee, Film, Music, Utensils, Sparkles, RotateCcw, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";

const dateIdeas = {
    en: [
        { text: "Virtual Movie Night & Popcorn 🍿", icon: Film },
        { text: "Late Night Video Call Coffee Date ☕", icon: Coffee },
        { text: "Sync-listening to Our Favorite Album 🎵", icon: Music },
        { text: "Cooking the Same Recipe Together 🥘", icon: Utensils },
        { text: "Planning Our Next Reunion Trip ✈️", icon: Sparkles },
    ],
    ta: [
        { text: "மெய்நிகர் திரைப்பட இரவு & பாப்கார்ன் 🍿", icon: Film },
        { text: "இரவு நேர வீடியோ கால் காபி தேதி ☕", icon: Coffee },
        { text: "நமக்கு பிடித்த ஆல்பத்தை ஒன்றாக கேட்பது 🎵", icon: Music },
        { text: "ஒரே செய்முறையை ஒன்றாக சமைப்பது 🥘", icon: Utensils },
        { text: "நமது அடுத்த சந்திப்பு பயணத்தைத் திட்டமிடுவது ✈️", icon: Sparkles },
    ]
};

export default function DateGenPage() {
    const { lang } = useAppContext();
    const router = useRouter();
    const [currentDate, setCurrentDate] = useState<any>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const generateDate = () => {
        setIsGenerating(true);
        setCurrentDate(null);

        setTimeout(() => {
            const random = dateIdeas[lang][Math.floor(Math.random() * dateIdeas[lang].length)];
            setCurrentDate(random);
            setIsGenerating(false);
        }, 1200);
    };

    return (
        <CinematicContainer>
            <StoryCard className="max-w-xl">
                <h1 className="text-3xl md:text-5xl font-black mb-2 text-romantic text-center">
                    {content[lang].date_title}
                </h1>
                <p className="text-sm md:text-base font-medium opacity-60 italic mb-12 text-center px-6">
                    {content[lang].date_desc}
                </p>

                <div className="relative h-64 w-full flex items-center justify-center mb-12">
                    <AnimatePresence mode="wait">
                        {isGenerating ? (
                            <motion.div
                                key="generating"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                                exit={{ opacity: 0, scale: 1.2 }}
                                className="flex flex-col items-center gap-4"
                            >
                                <div className="w-24 h-24 rounded-full border-4 border-dashed border-romantic-red animate-spin flex items-center justify-center">
                                    <Heart size={32} className="text-romantic-red" />
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest opacity-40">Scheduling Love...</span>
                            </motion.div>
                        ) : currentDate ? (
                            <motion.div
                                key="date"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass-card p-10 rounded-[3rem] border-romantic-red/30 bg-romantic-red/5 flex flex-col items-center gap-6 shadow-2xl w-full"
                            >
                                <div className="p-6 rounded-full bg-romantic-red text-white">
                                    <currentDate.icon size={48} />
                                </div>
                                <h2 className={`text-2xl md:text-3xl font-black text-center text-romantic ${lang === 'ta' ? 'font-tamil' : ''}`}>
                                    {currentDate.text}
                                </h2>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="idle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center opacity-10"
                            >
                                <Utensils size={100} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="space-y-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={generateDate}
                        disabled={isGenerating}
                        className="w-full bg-romantic-pink text-white py-5 rounded-3xl font-black text-xl shadow-xl flex items-center justify-center gap-4 group disabled:opacity-50"
                    >
                        <Sparkles size={24} className={isGenerating ? "animate-spin" : ""} />
                        <span>{lang === 'ta' ? 'தேதியைத் திட்டமிடுங்கள்' : 'Plan Our Date'}</span>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => router.push("/story/credits")}
                        className="w-full glass-card py-5 rounded-3xl font-black text-romantic-red flex items-center justify-center gap-4 hover:bg-white/5 transition-all"
                    >
                        <span>{content[lang].cta_dategen}</span>
                        <RotateCcw size={20} className="rotate-90" />
                    </motion.button>
                </div>
            </StoryCard>
        </CinematicContainer>
    );
}
