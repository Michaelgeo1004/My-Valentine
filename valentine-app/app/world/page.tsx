"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { MapPin, CloudSun, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";

export default function WorldPage() {
    const { lang } = useAppContext();
    const router = useRouter();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <CinematicContainer>
            <StoryCard className="max-w-2xl md:max-w-3xl">
                <h2 className="text-3xl md:text-5xl font-black text-romantic mb-6">{content[lang].our_world}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full text-left mb-8">
                    {/* Dubai Card */}
                    <motion.div
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="glass-card p-5 md:p-6 rounded-3xl border-white/10 shadow-lg relative overflow-hidden group"
                    >
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <h3 className="text-romantic font-black text-lg md:text-xl">{content[lang].dubai}</h3>
                            <MapPin className="text-romantic-red animate-bounce" size={24} />
                        </div>
                        <div className="text-3xl md:text-4xl font-black mb-2 tracking-tighter relative z-10">
                            {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Dubai' })}
                        </div>
                        <div className="text-[10px] md:text-sm font-bold opacity-60 uppercase tracking-widest relative z-10">{content[lang].dubai_label}</div>
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <CloudSun size={100} />
                        </div>
                    </motion.div>

                    {/* Tirunelveli Card */}
                    <motion.div
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="glass-card p-5 md:p-6 rounded-3xl border-white/10 shadow-lg relative overflow-hidden group"
                    >
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <h3 className="text-romantic font-black text-lg md:text-xl">{content[lang].tirunelveli}</h3>
                            <MapPin className="text-romantic-red animate-bounce" size={24} />
                        </div>
                        <div className="text-3xl md:text-4xl font-black mb-2 tracking-tighter relative z-10">
                            {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Kolkata' })}
                        </div>
                        <div className="text-[10px] md:text-sm font-bold opacity-60 uppercase tracking-widest relative z-10">{content[lang].tirunelveli_label}</div>
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Sun size={100} />
                        </div>
                    </motion.div>
                </div>

                {/* Enhanced Connecting Line */}
                <div className="relative py-4 mb-8">
                    <div className="h-1.5 w-full bg-romantic-pink/20 rounded-full overflow-hidden relative">
                        <motion.div
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                            className="absolute top-0 h-full w-40 bg-gradient-to-r from-transparent via-romantic-red to-transparent shadow-[0_0_20px_rgba(255,77,77,0.8)]"
                        />
                    </div>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[10px] font-black uppercase tracking-tighter text-romantic shadow-md">
                        2,845 KM OF LOVE
                    </div>
                </div>

                <div className="text-center">
                    <motion.h4 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl md:text-2xl font-black text-romantic mb-2">{content[lang].togetherness}</motion.h4>
                    <p className="opacity-60 font-medium italic text-sm md:text-base">{content[lang].connected}</p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => router.push("/journey")}
                        className="mt-8 opacity-40 hover:opacity-100 transition-opacity text-[10px] tracking-[0.2em] uppercase font-black border-b border-romantic-red pb-1"
                    >
                        {content[lang].continue_story}
                    </motion.button>
                </div>
            </StoryCard>
        </CinematicContainer>
    );
}
