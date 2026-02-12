"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Sparkles, RotateCcw, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";
import { useState } from "react";

export default function TimeCapsulePage() {
  const { lang } = useAppContext();
  const router = useRouter();
  const [isLocked, setIsLocked] = useState(true);

  return (
    <CinematicContainer>
      <StoryCard className="max-w-xl flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-black mb-2 text-romantic text-center">
          {content[lang].capsule_title}
        </h1>
        <p className="text-sm md:text-base font-medium opacity-60 italic mb-12 text-center px-6">
          {content[lang].capsule_desc}
        </p>

        {/* Futuristic Locked Capsule UI */}
        <div className="relative w-full aspect-square max-w-[280px] flex items-center justify-center mb-12 group">
          <motion.div
            animate={{
              rotate: isLocked ? [0, 5, -5, 0] : 0,
              scale: isLocked ? [1, 1.02, 1] : 1.1
            }}
            transition={{ repeat: Infinity, duration: 4 }}
            className={`w-full h-full rounded-[4rem] flex items-center justify-center transition-all duration-700 shadow-2xl ${isLocked ? 'bg-white/5 border border-white/10 backdrop-blur-3xl' : 'bg-romantic-red/10 border-romantic-red/40 backdrop-blur-3xl scale-110'}`}
          >
            <div className="relative">
              <AnimatePresence mode="wait">
                {isLocked ? (
                  <motion.div
                    key="locked"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2, rotate: 180 }}
                    onClick={() => setIsLocked(false)}
                    className="cursor-pointer text-romantic-red flex flex-col items-center gap-4"
                  >
                    <Lock size={80} className="drop-shadow-[0_0_15px_rgba(255,173,173,0.5)]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Tap to Seal Forever</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="unlocked"
                    initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    className="text-romantic-gold flex flex-col items-center gap-4"
                  >
                    <Unlock size={80} className="drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Sealed with Love</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Floating Particles around capsule */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                className="absolute inset-0 -m-8 pointer-events-none"
              >
                <Sparkles size={20} className="absolute top-0 left-1/2 text-romantic-gold/40" />
                <Sparkles size={16} className="absolute bottom-0 right-1/4 text-romantic-red/30" />
                <Sparkles size={14} className="absolute top-1/2 right-0 text-white/20" />
              </motion.div>
            </div>
          </motion.div>

          {/* Futuristic Data Stream Overlay (Subtle) */}
          <div className="absolute inset-0 overflow-hidden rounded-[4rem] pointer-events-none opacity-20">
            <div className="absolute inset-0 bg-gradient-to-t from-romantic-red/20 to-transparent" />
            <div className="absolute top-0 left-0 w-full h-px bg-white/40 animate-scanline" />
          </div>
        </div>

        <div className="w-full space-y-6">
          {!isLocked && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center p-6 glass-card rounded-3xl border-romantic-gold/20 mb-8"
            >
              <div className="flex items-center justify-center gap-3 mb-2 text-romantic-gold">
                <Shield size={18} />
                <h3 className="font-black tracking-widest text-xs uppercase">Future Promise Encrypted</h3>
              </div>
              <p className={`text-lg italic text-romantic ${lang === 'ta' ? 'font-tamil' : ''}`}>
                "The best is yet to come. March 25th holds a special key."
              </p>
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => router.push("/story/starmap")}
            className="w-full bg-romantic-red text-white py-5 rounded-3xl font-black text-xl shadow-xl flex items-center justify-center gap-4 group"
          >
            <span>{content[lang].cta_capsule}</span>
            <RotateCcw size={22} className="rotate-90 group-hover:rotate-180 transition-transform duration-500" />
          </motion.button>
        </div>
      </StoryCard>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes scanline {
          from { top: 0; }
          to { top: 100%; }
        }
        .animate-scanline {
          animation: scanline 3s linear infinite;
        }
      ` }} />
    </CinematicContainer>
  );
}
