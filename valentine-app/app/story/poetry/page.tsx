"use client";

import { motion } from "framer-motion";
import { Quote, Heart, RotateCcw, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";

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
    }
];

export default function PoetryPage() {
    const { lang } = useAppContext();
    const router = useRouter();

    return (
        <CinematicContainer>
            <StoryCard className="max-w-2xl">
                <h1 className="text-3xl md:text-5xl font-black mb-2 text-romantic text-center">
                    {content[lang].poetry_title}
                </h1>
                <p className="text-sm md:text-base font-medium opacity-60 italic mb-12 text-center">
                    {content[lang].poetry_desc}
                </p>

                <div className="space-y-12 mb-12">
                    {poems.map((poem, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.2 }}
                            className="relative glass-card p-8 md:p-12 rounded-[3rem] border-white/10 bg-white/5 text-center"
                        >
                            <Quote size={40} className="absolute -top-6 -left-4 text-romantic-red/30" />

                            <h2 className="text-2xl md:text-3xl font-tamil font-black leading-relaxed mb-6 text-romantic">
                                {poem.ta}
                            </h2>

                            <div className="w-12 h-px bg-white/10 mx-auto mb-6" />

                            <p className="text-sm md:text-base italic opacity-60 font-medium">
                                {poem.en}
                            </p>

                            <div className="mt-8 flex items-center justify-center gap-2 opacity-30">
                                <Sparkles size={14} className="text-romantic-gold" />
                                <span className="text-[10px] font-black uppercase tracking-widest">{poem.ref}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => router.push("/story/characters")}
                    className="w-full bg-romantic-red text-white py-5 rounded-3xl font-black text-xl shadow-xl flex items-center justify-center gap-4 group"
                >
                    <span>{content[lang].cta_poetry}</span>
                    <RotateCcw size={22} className="rotate-90 group-hover:rotate-180 transition-transform duration-500" />
                </motion.button>
            </StoryCard>
        </CinematicContainer>
    );
}
