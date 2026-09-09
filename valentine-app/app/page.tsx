"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";
import { HeartExplosion } from "@/components/HeartExplosion";

export default function Home() {
  const [accepted, setAccepted] = useState(false);
  const { lang } = useAppContext();
  const router = useRouter();

  const handleYes = () => {
    setAccepted(true);
    setTimeout(() => router.push("/world"), 2800);
  };

  return (
    <CinematicContainer>
      {accepted && <HeartExplosion />}

      <StoryCard className="relative overflow-hidden group max-w-2xl px-8 py-12 md:px-16 md:py-20">
        {/* Shimmer Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-tr from-romantic-red/5 via-transparent to-romantic-gold/5 pointer-events-none" />

        <AnimatePresence mode="wait">
          {!accepted ? (
            <motion.div key="question" exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }}>
              <div className="relative mb-8 flex justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    filter: ["drop-shadow(0 0 0px transparent)", "drop-shadow(0 0 15px rgba(255,145,145,0.3))", "drop-shadow(0 0 0px transparent)"]
                  }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="relative"
                >
                  <Heart className="text-romantic-red drop-shadow-[0_0_10px_rgba(255,77,77,0.4)]" fill="currentColor" size={80} />
                  <motion.div
                    animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                    className="absolute -top-3 -right-3 text-romantic-gold"
                  >
                    <Sparkles size={32} />
                  </motion.div>
                </motion.div>
              </div>

              <motion.h1
                initial={{ opacity: 0, filter: "blur(15px)", y: 15 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className={`text-3xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight leading-[1.1] ${lang === 'ta' ? 'font-tamil' : ''}`}
              >
                <span className="bg-gradient-to-b from-romantic via-romantic-red to-romantic-red bg-clip-text text-transparent">
                  {content[lang].question}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                className="text-base md:text-lg font-medium mb-10 italic"
              >
                {content[lang].subtext}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex items-center justify-center relative"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255,77,77,0.3)", y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleYes}
                  className="bg-romantic-red text-white px-10 py-4 rounded-2xl font-black text-xl md:text-2xl shadow-xl relative overflow-hidden group/btn z-20"
                >
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500" />
                  <span className="relative z-10">{content[lang].continue_story}</span>
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="celebration"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="py-6"
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6 text-romantic drop-shadow-sm">
                {content[lang].accepted}
              </h2>
              <p className={`text-xl md:text-2xl font-bold text-foreground/80 italic leading-relaxed ${lang === 'ta' ? 'font-tamil' : ''}`}>
                {content[lang].driver_text}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </StoryCard>
    </CinematicContainer>
  );
}
