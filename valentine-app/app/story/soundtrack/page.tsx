"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Disc, Music, Play, Pause, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";

export default function SoundtrackPage() {
    const { lang } = useAppContext();
    const router = useRouter();
    const [isPlaying, setIsPlaying] = useState(true);
    const [songUrl, setSongUrl] = useState("");
    const [inputValue, setInputValue] = useState("");

    const setCustomSong = () => {
        // Detect YouTube ID or direct URL
        let finalUrl = inputValue;
        if (inputValue.includes("youtube.com") || inputValue.includes("youtu.be")) {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            const match = inputValue.match(regExp);
            if (match && match[2].length === 11) {
                finalUrl = `https://www.youtube.com/embed/${match[2]}?autoplay=1&loop=1&playlist=${match[2]}`;
            }
        }
        setSongUrl(finalUrl);
        setIsPlaying(true);
    };

    return (
        <CinematicContainer>
            <StoryCard className="max-w-xl">
                <h1 className="text-3xl md:text-5xl font-black mb-2 text-romantic text-center">
                    {content[lang].soundtrack_title}
                </h1>
                <p className="text-sm md:text-base font-medium opacity-60 italic mb-8 text-center">
                    {content[lang].soundtrack_desc}
                </p>

                {/* Custom Song Input */}
                <div className="mb-10 glass-card p-4 rounded-3xl border-romantic-red/20 bg-romantic-red/5">
                    <p className={`text-[10px] font-black uppercase tracking-widest text-romantic opacity-60 mb-3 text-center ${lang === 'ta' ? 'font-tamil' : ''}`}>
                        {content[lang as 'en' | 'ta'].soundtrack_custom_title}
                    </p>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={content[lang as 'en' | 'ta'].custom_song_placeholder}
                            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-xs focus:outline-none focus:border-romantic-red/40"
                        />
                        <button
                            onClick={setCustomSong}
                            className="bg-romantic-red text-white px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-romantic-red/80 transition-all"
                        >
                            Set
                        </button>
                    </div>
                </div>

                {/* Hidden Audio/Video Player */}
                {songUrl && (
                    <div className="hidden">
                        {songUrl.includes("youtube.com/embed") ? (
                            <iframe
                                width="0"
                                height="0"
                                src={isPlaying ? songUrl : ""}
                                allow="autoplay"
                            />
                        ) : (
                            <audio
                                autoPlay
                                loop
                                src={songUrl}
                                ref={(el) => { if (el) el.muted = !isPlaying; }}
                            />
                        )}
                    </div>
                )}

                {/* Record Player UI */}
                <div className="relative w-full aspect-square max-w-[280px] mx-auto mb-10">
                    {/* Base Plate */}
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-inner overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
                    </div>

                    {/* Rotating Vinyl */}
                    <div className="absolute inset-4 overflow-hidden rounded-full border-4 border-black/40 shadow-2xl">
                        <motion.div
                            animate={{ rotate: isPlaying ? 360 : 0 }}
                            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                            className="w-full h-full relative bg-[#111] flex items-center justify-center"
                        >
                            {/* Vinyl Grooves */}
                            <div className="absolute inset-2 rounded-full border border-white/5 opacity-40" />
                            <div className="absolute inset-6 rounded-full border border-white/5 opacity-40" />
                            <div className="absolute inset-10 rounded-full border border-white/5 opacity-40" />
                            <div className="absolute inset-14 rounded-full border border-white/5 opacity-40" />

                            {/* Center Label */}
                            <div className="w-20 h-20 rounded-full bg-romantic-red p-1 shadow-lg relative z-10">
                                <div className="w-full h-full rounded-full border-2 border-white/20 flex items-center justify-center text-white">
                                    <Music size={24} />
                                </div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-inner" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Tone Arm */}
                    <motion.div
                        animate={{ rotate: isPlaying ? 25 : 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className="absolute top-8 right-8 w-2 h-32 bg-white/30 rounded-full origin-top z-20"
                    >
                        <div className="absolute -bottom-2 -left-3 w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center">
                            <div className="w-2 h-4 bg-white/60 rounded-sm" />
                        </div>
                    </motion.div>

                    {/* Controls Overlay */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-12 h-12 rounded-full bg-romantic-red text-white flex items-center justify-center shadow-lg"
                        >
                            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                        </motion.button>
                    </div>
                </div>

                <div className="text-center mb-8 px-4 h-24 flex flex-col justify-center">
                    <p className={`text-sm md:text-base font-bold italic text-romantic transition-opacity duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-40'}`}>
                        {content[lang].soundtrack_instruction}
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-2">
                        <motion.div
                            animate={{ opacity: isPlaying ? [1, 0.4, 1] : 0.2 }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="w-2 h-2 rounded-full bg-romantic-red"
                        />
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-30">
                            {isPlaying ? "Now Playing: Our Unstoppable Story" : "Paused: Connection Waiting"}
                        </span>
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => router.push("/story/adventure")}
                    className="w-full glass-card py-5 rounded-3xl font-black text-romantic-red hover:bg-romantic-red hover:text-white transition-all flex items-center justify-center gap-4 group shadow-xl"
                >
                    <span className="text-lg">{content[lang].cta_soundtrack}</span>
                    <RotateCcw size={20} className="rotate-90 group-hover:rotate-180 transition-transform duration-500" />
                </motion.button>
            </StoryCard>
        </CinematicContainer>
    );
}
