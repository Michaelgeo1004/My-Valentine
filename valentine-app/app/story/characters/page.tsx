"use client";

import { motion } from "framer-motion";
import { Car, Heart, Sparkles, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";

export default function CharactersPage() {
    const { lang } = useAppContext();
    const router = useRouter();

    return (
        <CinematicContainer>
            <StoryCard className="max-w-xl">
                <h1 className="text-3xl md:text-5xl font-black mb-2 text-romantic text-center">
                    {content[lang].char_title}
                </h1>
                <p className="text-sm md:text-base font-medium opacity-60 italic mb-12 text-center">
                    {content[lang].char_desc}
                </p>

                {/* Animated Characters Scene */}
                <div className="relative h-64 w-full bg-white/5 rounded-[3rem] border border-white/10 mb-12 overflow-hidden flex items-center justify-between px-12">
                    {/* Driver (Geo) */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-2"
                    >
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-romantic-red flex items-center justify-center text-white shadow-lg">
                            <Car size={32} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Your Driver (Geo)</span>
                    </motion.div>

                    {/* Connection Heart */}
                    <div className="flex-1 flex flex-col items-center">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="relative"
                        >
                            <Heart size={40} className="text-romantic-red fill-current" />
                            <motion.div
                                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="absolute inset-0 bg-romantic-red/20 rounded-full"
                            />
                        </motion.div>
                        <div className="w-full h-px bg-white/10 mt-4 relative">
                            <motion.div
                                animate={{ left: ["0%", "100%"] }}
                                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white/20 blur-md rounded-full"
                            />
                        </div>
                    </div>

                    {/* Muhh (Ancy) */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.5 }}
                        className="flex flex-col items-center gap-2"
                    >
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-romantic-pink flex items-center justify-center text-white shadow-lg text-3xl">
                            🍁
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Muhh (Ancy)</span>
                    </motion.div>
                </div>

                <div className="text-center mb-10">
                    <p className={`text-lg md:text-xl font-bold italic text-romantic leading-relaxed ${lang === 'ta' ? 'font-tamil' : ''}`}>
                        {lang === 'en'
                            ? '"Her Driver for 5 years, and for the rest of our lives. Every mile of this journey was for us."'
                            : '"5 ஆண்டுகளாக அவளது டிரைவர், இனி வாழ்நாள் முழுவதும். இந்தப் பயணத்தின் ஒவ்வொரு மைலும் நமக்காகவே அமைந்தது."'
                        }
                    </p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => router.push("/story/journey-card")}
                    className="w-full bg-romantic-red text-white py-5 rounded-3xl font-black text-xl shadow-xl flex items-center justify-center gap-4 group"
                >
                    <Sparkles size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                    <span>{content[lang].cta_characters}</span>
                    <RotateCcw size={22} className="rotate-90 group-hover:rotate-180 transition-transform duration-500" />
                </motion.button>
            </StoryCard>
        </CinematicContainer>
    );
}
