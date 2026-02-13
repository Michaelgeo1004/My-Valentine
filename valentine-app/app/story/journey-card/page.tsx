"use client";

import { motion } from "framer-motion";
import { Star, Heart, Calendar, Map, RotateCcw, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";

const milestones = [
    {
        date: "2019 - 2023",
        title: { en: "The Loyola Chapter", ta: "லயோலா அத்தியாயம்" },
        desc: { en: "Where our hearts first started beating to the same rhythm. Every shared class and stolen glance built the foundation of us.", ta: "நம் இதயங்கள் ஒரே தாளத்தில் துடிக்கத் தொடங்கிய இடம். ஒவ்வொரு வகுப்பும், ஒவ்வொரு பார்வையும் நம் காதலின் அஸ்திவாரமானது." },
        icon: Star,
        color: "from-romantic-gold/20 to-transparent"
    },
    {
        date: "Aug 2022",
        title: { en: "The Electric Spark", ta: "முதல் கை தீண்டல்" },
        desc: { en: "That moment our hands first met—a surge of magic that changed everything forever.", ta: "நம் கைகள் முதன்முதலில் தொட்டுக்கொண்ட அந்தத் தருணம்—எல்லாம் மாறப்போவதை உணர்த்திய மாயாஜாலம்." },
        icon: Heart,
        color: "from-romantic-pink/30 to-transparent"
    },
    {
        date: "Nov 27, 2022",
        title: { en: "The Sacred Promise", ta: "நீ எனக்கான நாள்" },
        desc: { en: "The day the world faded away and it was just us. You became my home.", ta: "உலகமே மறைந்து நாம் மட்டும் எஞ்சிய நாள். நீயே என் உலகம் என்று நான் உணர்ந்த நாள்." },
        icon: Heart,
        color: "from-romantic-red/20 to-transparent"
    },
    {
        date: "Mar 25, 2023",
        title: { en: "The First Kiss", ta: "முதல் முத்தம்" },
        desc: { en: "An empty road, a racing heart, and the sweetest silence I've ever known.", ta: "ஒரு வெறிச்சோடிய சாலை, துடிக்கும் இதயம், மற்றும் நான் அனுபவித்த மிக இனிமையான அமைதி." },
        icon: Sparkles,
        color: "from-romantic-gold/20 to-transparent"
    },
    {
        date: "May 2023",
        title: { en: "The Thovalai Soul-Trip", ta: "தோவளை பயணம்" },
        desc: { en: "Long roads, deep conversations, and the realization that every mile is better with you.", ta: "நீண்ட சாலைகள், ஆழமான உரையாடல்கள், மற்றும் ஒவ்வொரு மைலும் உன்னுடன் இருப்பதே சிறப்பு என்பதை உணர்ந்த பயணம்." },
        icon: Map,
        color: "from-romantic-pink/20 to-transparent"
    },
    {
        date: "Nov 22, 2024",
        title: { en: "The Circle of Love", ta: "மோதிரம் & நம்பிக்கை" },
        desc: { en: "A ring of gold, a heart of hope. A commitment to forever and beyond.", ta: "தங்க மோதிரம், நம்பிக்கையான இதயம். என்றென்றும் உன்னுடன் இருக்க நான் கொண்ட உறுதி." },
        icon: Heart,
        color: "from-romantic-red/30 to-transparent"
    },
    {
        date: "Present Day",
        title: { en: "The Beautiful Distance", ta: "இந்த அழகான தூரம்" },
        desc: { en: "Miles apart but spirit-bound. Every heartbeat brings us closer to our forever.", ta: "மைல்கள் தள்ளி இருந்தாலும் ஆத்மார்த்தமாக இணைந்திருக்கிறோம். ஒவ்வொரு துடிப்பும் நம்மை ஒன்றிணைக்கிறது." },
        icon: Map,
        color: "from-romantic-gold/30 to-transparent"
    }
];

export default function JourneyCardPage() {
    const { lang } = useAppContext();
    const router = useRouter();

    return (
        <CinematicContainer>
            <StoryCard className="max-w-4xl min-h-[800px] flex flex-col items-center">
                {/* Header Section */}
                <div className="text-center mb-16 relative z-10 w-full">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="absolute inset-x-0 -top-20 h-64 bg-romantic-red/10 blur-[100px] rounded-full"
                    />
                    <h1 className="text-4xl md:text-7xl font-black mb-6 text-romantic tracking-tight">
                        {content[lang].milestone_title}
                    </h1>
                    <p className={`text-sm md:text-xl font-medium opacity-60 italic max-w-2xl mx-auto px-6 leading-relaxed ${lang === 'ta' ? 'font-tamil' : ''}`}>
                        {content[lang].milestone_desc}
                    </p>
                </div>

                {/* Vertical Cinematic Timeline */}
                <div className="relative w-full max-w-3xl px-4 md:px-0 mb-20">

                    {/* The Living Path (Vertical Line) */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 overflow-hidden">
                        <div className="absolute inset-0 bg-white/10" />
                        <motion.div
                            initial={{ top: "-100%" }}
                            animate={{ top: "100%" }}
                            transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                            className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-romantic-red to-transparent shadow-[0_0_20px_rgba(255,77,77,0.8)]"
                        />
                    </div>

                    {/* Timeline Items */}
                    <div className="space-y-12 md:space-y-24 relative z-10">
                        {milestones.map((m, i) => (
                            <motion.div
                                key={m.date}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50, y: 20 }}
                                whileInView={{ opacity: 1, x: 0, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start md:items-center gap-8 md:gap-0`}
                            >
                                {/* Event Content Card */}
                                <div className={`w-full md:w-[45%] ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                    <motion.div
                                        whileHover={{ scale: 1.02, y: -5 }}
                                        className={`glass-card p-6 md:p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden group shadow-2xl bg-white/5 backdrop-blur-xl`}
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br ${m.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                                        <div className="relative z-10">
                                            <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] text-romantic-red opacity-80 mb-2 block">
                                                {m.date}
                                            </span>
                                            <h3 className={`text-xl md:text-3xl font-black text-romantic mb-4 tracking-tighter ${lang === 'ta' ? 'font-tamil' : ''}`}>
                                                {/* @ts-ignore */}
                                                {m.title[lang]}
                                            </h3>
                                            <p className={`text-sm md:text-base text-gray-400 font-medium leading-relaxed italic ${lang === 'ta' ? 'font-tamil' : ''}`}>
                                                {/* @ts-ignore */}
                                                {m.desc[lang]}
                                            </p>
                                        </div>

                                        {/* Corner Decoration */}
                                        <m.icon size={24} className="absolute bottom-4 right-4 text-romantic-red/10 group-hover:text-romantic-red/40 transition-colors" />
                                    </motion.div>
                                </div>

                                {/* Center Marker */}
                                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                                    <motion.div
                                        whileInView={{ scale: [0, 1.2, 1], rotate: [0, 90, 0] }}
                                        viewport={{ once: true }}
                                        className="w-12 h-12 rounded-full glass-card border-2 border-romantic-red flex items-center justify-center bg-white shadow-[0_0_20px_rgba(255,77,77,0.3)] z-20 group"
                                    >
                                        <Heart size={20} className="text-romantic-red fill-current group-hover:scale-125 transition-transform" />

                                        {/* Radial Pulse */}
                                        <motion.div
                                            animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                            className="absolute inset-0 rounded-full bg-romantic-red/30 -z-10"
                                        />
                                    </motion.div>
                                </div>

                                {/* Empty space for alternating layout */}
                                <div className="hidden md:block w-[45%]" />
                            </motion.div>
                        ))}
                    </div>

                    {/* End Marker */}
                    <div className="absolute left-8 md:left-1/2 bottom-0 -translate-x-1/2 flex flex-col items-center gap-4">
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-1 h-20 bg-gradient-to-b from-romantic-red to-transparent rounded-full"
                        />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30 text-center">To Be Continued...</span>
                    </div>
                </div>

                {/* Final Call to Action */}
                <div className="w-full mt-24 relative z-20">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-center mb-10 px-8"
                    >
                        <p className="text-xl md:text-3xl font-black text-romantic italic">
                            "Our story isn't just a series of dates... it's a map of my soul."
                        </p>
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push("/story/anniversary")}
                        className="w-full bg-romantic-red text-white py-6 md:py-8 rounded-[2.5rem] font-black text-xl md:text-2xl shadow-2xl flex items-center justify-center gap-4 group overflow-hidden relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <Sparkles size={28} className="group-hover:rotate-180 transition-transform duration-700" />
                        <span>{content[lang].cta_milestones}</span>
                        <RotateCcw size={28} className="rotate-90 group-hover:rotate-180 transition-transform duration-700" />
                    </motion.button>
                </div>
            </StoryCard>
        </CinematicContainer>
    );
}
