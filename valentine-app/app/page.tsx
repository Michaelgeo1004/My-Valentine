"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";

export default function Home() {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const { lang } = useAppContext();
  const router = useRouter();

  const moveNoButton = (e: React.MouseEvent) => {
    const btn = e.currentTarget.getBoundingClientRect();
    const cursorX = e.clientX;
    const cursorY = e.clientY;

    const btnCenterX = btn.left + btn.width / 2;
    const btnCenterY = btn.top + btn.height / 2;

    const deltaX = btnCenterX - cursorX;
    const deltaY = btnCenterY - cursorY;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    const fleeDistance = 80;
    const jitterDistance = 150;

    if (distance < fleeDistance) {
      const angle = Math.atan2(deltaY, deltaX);
      const pushFactor = (fleeDistance - distance) * 3;

      const newX = noButtonPos.x + Math.cos(angle) * pushFactor;
      const newY = noButtonPos.y + Math.sin(angle) * pushFactor;

      const boundedX = Math.max(-150, Math.min(150, newX));
      const boundedY = Math.max(-150, Math.min(150, newY));

      setNoButtonPos({ x: boundedX, y: boundedY });
    } else if (distance < jitterDistance) {
      const jitterX = (Math.random() - 0.5) * 6;
      const jitterY = (Math.random() - 0.5) * 6;
      setNoButtonPos(prev => ({
        x: prev.x * 0.9 + jitterX,
        y: prev.y * 0.9 + jitterY
      }));
    } else {
      if (Math.abs(noButtonPos.x) > 0.1 || Math.abs(noButtonPos.y) > 0.1) {
        setNoButtonPos(prev => ({
          x: prev.x * 0.85,
          y: prev.y * 0.85
        }));
      }
    }
  };

  return (
    <CinematicContainer>
      <StoryCard className="relative overflow-hidden group max-w-2xl px-8 py-12 md:px-16 md:py-20">
        {/* Shimmer Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-tr from-romantic-red/5 via-transparent to-romantic-gold/5 pointer-events-none" />

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
          className="flex flex-col md:flex-row items-center justify-center gap-6 relative"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255,77,77,0.3)", y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/accepted")}
            className="bg-romantic-red text-white px-10 py-4 rounded-2xl font-black text-xl md:text-2xl shadow-xl relative overflow-hidden group/btn z-20"
          >
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500" />
            <span className="relative z-10">{content[lang].yes}</span>
          </motion.button>

          <div onMouseMove={moveNoButton} className="relative p-2 flex items-center justify-center min-w-[120px]">
            <motion.button
              animate={{ x: noButtonPos.x, y: noButtonPos.y, rotate: noButtonPos.x / 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="glass-card px-6 py-3 rounded-xl font-bold opacity-30 backdrop-blur-sm pointer-events-none text-sm transition-opacity"
            >
              {content[lang].no}
            </motion.button>
          </div>
        </motion.div>
      </StoryCard>
    </CinematicContainer>
  );
}
