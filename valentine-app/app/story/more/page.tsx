"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";

export default function MoreMemoriesPage() {
    const router = useRouter();
    const { lang } = useAppContext();

    return (
        <CinematicContainer>
            <StoryCard>
                <div className="relative mb-10 flex justify-center">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                    >
                        <Heart size={80} className="text-romantic-red opacity-20" fill="currentColor" />
                    </motion.div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles size={40} className="text-romantic-gold animate-pulse" />
                    </div>
                </div>

                <h2 className="text-3xl md:text-5xl font-black mb-6 text-romantic">
                    {lang === 'ta' ? 'இன்னும் பல நினைவுகள் விரைவில்...' : 'More Memories Coming Soon...'}
                </h2>
                <p className="text-lg opacity-60 italic mb-12">
                    {lang === 'ta'
                        ? 'நமது 5 ஆண்டு பயணத்தின் இன்னும் பல அழகிய தருணங்களை இங்கே சேர்ப்போம்.'
                        : "We'll be adding many more beautiful moments from our 5-year journey here soon."}
                </p>

                <div className="flex flex-col gap-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => router.push("/")}
                        className="w-full glass-card py-4 rounded-2xl font-black text-romantic-red hover:bg-romantic-red hover:text-white transition-all flex items-center justify-center gap-3"
                    >
                        <Home size={20} /> {lang === 'ta' ? 'முகப்புக்குச் செல்லவும்' : 'Back to Home'}
                    </motion.button>
                </div>
            </StoryCard>
        </CinematicContainer>
    );
}
