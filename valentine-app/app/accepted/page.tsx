"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";
import { HeartExplosion } from "@/components/HeartExplosion";

export default function AcceptedPage() {
    const { lang } = useAppContext();
    const router = useRouter();

    return (
        <CinematicContainer>
            <HeartExplosion />
            <StoryCard>
                <motion.h2 className="text-4xl md:text-6xl font-black mb-6 text-romantic drop-shadow-sm text-center">
                    {content[lang].accepted}
                </motion.h2>
                <p className="text-xl md:text-2xl font-bold mb-12 text-foreground/80 italic leading-relaxed text-center">
                    {content[lang].driver_text}
                </p>
                <motion.button
                    onClick={() => router.push("/world")}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(255,173,173,0.3)" }}
                    className="bg-romantic-red text-white px-12 py-5 rounded-2xl font-black text-xl shadow-2xl"
                >
                    {content[lang].cta}
                </motion.button>
            </StoryCard>
        </CinematicContainer>
    );
}
