"use client";

import { motion } from "framer-motion";
import { Star, Heart, Calendar, Map, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";

const milestones = [
    {
        year: "2019-23",
        event: { en: "College Life", ta: "கல்லூரி வாழ்க்கை" },
        icon: Star
    },
    {
        year: "Jan 22",
        event: { en: "First Meet (2021)", ta: "முதல் சந்திப்பு (2021)" },
        icon: Heart
    },
    {
        year: "Jun 11",
        event: { en: "First Hand Touch (2022)", ta: "முதல் கை தீண்டல் (2022)" },
        icon: Heart
    },
    {
        year: "Aug 07",
        event: { en: "Shoulder Lean - Chennai Park (2022)", ta: "சென்னை பார்க் - உன் தோளில் சாய்ந்த தருணம் (2022)" },
        icon: Heart
    },
    {
        year: "Nov 27",
        event: { en: "You Became Mine (2022)", ta: "நீ என் வாழ்க்கையான நாள் (2022)" },
        icon: Heart
    },
    {
        year: "Mar 25",
        event: { en: "First Kiss - Empty Road (2023)", ta: "முதல் முத்தம் - ஒரு காலி சாலையில் (2023)" },
        icon: Heart
    },
    {
        year: "May 05",
        event: { en: "Thovalai to Nanguneri Journey (2023)", ta: "தோவளை டூ நாங்குநேரி பயணம் (2023)" },
        icon: Map
    },
    {
        year: "Jul 31",
        event: { en: "Tambaram Train Chase (2023)", ta: "தாம்பரம் ரயில் துரத்தல் (2023)" },
        icon: Map
    },
    {
        year: "May 28",
        event: { en: "Loyola Chapel Moment (2024)", ta: "லயோலா தேவாலய தருணம் (2024)" },
        icon: Star
    },
    {
        year: "Nov 22",
        event: { en: "The Ring & The Hope (2024)", ta: "மோதிரம் மற்றும் நம்பிக்கை (2024)" },
        icon: Heart
    },
    {
        year: "Jan 30",
        event: { en: "The Last Touch (2026)", ta: "கடைசி தொடுதல் (2026)" },
        icon: Heart
    },
];

export default function JourneyCardPage() {
    const { lang } = useAppContext();
    const router = useRouter();

    return (
        <CinematicContainer>
            <StoryCard className="max-w-2xl">
                <h1 className="text-3xl md:text-5xl font-black mb-2 text-romantic text-center">
                    {content[lang].milestone_title}
                </h1>
                <p className="text-sm md:text-base font-medium opacity-60 italic mb-12 text-center px-6">
                    {content[lang].milestone_desc}
                </p>

                {/* Milestone Timeline List */}
                <div className="space-y-4 mb-12">
                    {milestones.map((m, i) => (
                        <motion.div
                            key={m.year}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.15 }}
                            className="glass-card p-6 rounded-3xl border-white/10 flex items-center justify-between group hover:bg-white/5 transition-all"
                        >
                            <div className="flex items-center gap-6">
                                <div className="text-2xl font-black text-romantic-red opacity-50 group-hover:opacity-100 transition-opacity">
                                    {m.year}
                                </div>
                                <div className="w-px h-8 bg-white/10" />
                                <div className="text-left font-bold text-lg opacity-80 group-hover:opacity-100 flex-1">
                                    {/* @ts-ignore */}
                                    {m.event[lang]}
                                </div>
                            </div>
                            <div className="p-3 rounded-2xl bg-white/5">
                                <m.icon size={20} className="text-romantic-gold" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="w-full">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => router.push("/story/anniversary")}
                        className="w-full bg-romantic-red text-white py-5 rounded-3xl font-black text-xl shadow-xl flex items-center justify-center gap-4 group"
                    >
                        <span>{content[lang].cta_milestones}</span>
                        <RotateCcw size={22} className="rotate-90 group-hover:rotate-180 transition-transform duration-500" />
                    </motion.button>
                </div>
            </StoryCard>
        </CinematicContainer>
    );
}
