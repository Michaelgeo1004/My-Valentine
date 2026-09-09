"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Sparkles, ArrowRight, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";
import { TypedText } from "@/components/TypedText";
import { logInsight, sendTrackBeacon, useOnRealUnmount } from "@/utils/insights";

export default function TimeCapsulePage() {
  const { lang } = useAppContext();
  const router = useRouter();
  const [status, setStatus] = useState<"locked" | "decoding" | "sealed">("locked");
  const [progress, setProgress] = useState(0);
  // Pulled from what she actually picked on the adventure page (stored via
  // logInsight('selections', ...) there) so the sealed reveal is a real promise
  // from this specific journey, not a fixed line — falls back to a generic
  // quote if she reached this page without picking any adventures.
  const [promise, setPromise] = useState<string | null>(null);

  useEffect(() => {
    logInsight('lastPage', 'Time Capsule');
    try {
      const raw = localStorage.getItem('_v_heartbeat');
      const selections: string[] = raw ? JSON.parse(raw).selections || [] : [];
      if (selections.length > 0) {
        setPromise(selections[Math.floor(Math.random() * selections.length)]);
      }
    } catch {
      // localStorage unavailable or malformed — fall back to the static quote
    }
  }, []);

  // Reports whether/what she sealed tagged to THIS page on leave, instead of
  // letting it echo on every future row via the generic cross-page snapshot.
  useOnRealUnmount(() => {
    sendTrackBeacon({
      path: '/story/capsule',
      event: 'capsule_leave',
      capsuleSealed: status === "sealed",
      capsulePromise: promise || '',
    });
  });

  const handleSeal = () => {
    setStatus("decoding");
    logInsight('capsuleSealed', true);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => setStatus("sealed"), 500);
      }
      setProgress(p);
    }, 200);
  };

  return (
    <CinematicContainer>
      <StoryCard className="max-w-2xl flex flex-col items-center justify-between">
        <div className="w-full">
          <h1 className="text-3xl md:text-5xl font-black mb-2 text-romantic text-center">
            {content[lang].capsule_title}
          </h1>
          <p className="text-sm md:text-base font-medium opacity-60 italic mb-12 text-center px-6">
            {content[lang].capsule_desc}
          </p>
        </div>

        {/* Futuristic Locked Capsule UI */}
        <div className="relative w-full aspect-square max-w-[300px] flex items-center justify-center mb-12">
          {/* Outer Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="absolute inset-0 border border-white/5 rounded-[4rem] scale-110"
          />

          <motion.div
            animate={{
              rotate: status === "locked" ? [0, 2, -2, 0] : 0,
              scale: status === "sealed" ? 1.1 : 1,
              filter: status === "decoding" ? ["blur(0px)", "blur(2px)", "blur(0px)"] : "blur(0px)"
            }}
            transition={{ repeat: Infinity, duration: 4 }}
            className={`w-full h-full rounded-[4rem] flex flex-col items-center justify-center transition-all duration-700 shadow-2xl relative overflow-hidden ${status === 'locked' ? 'bg-white/5 border border-white/10 backdrop-blur-3xl group cursor-pointer hover:bg-white/10' : status === 'decoding' ? 'bg-romantic-red/5 border-romantic-red/20' : 'bg-romantic-red/10 border-romantic-gold/40 backdrop-blur-3xl shadow-[0_0_50px_rgba(255,215,0,0.2)]'}`}
            onClick={() => status === "locked" && handleSeal()}
          >
            <div className="relative z-10">
              <AnimatePresence mode="wait">
                {status === "locked" ? (
                  <motion.div
                    key="locked"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2, rotate: 180 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <Lock size={80} className="text-romantic-red drop-shadow-[0_0_15px_rgba(255,173,173,0.5)]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">{content[lang].capsule_tap_label}</span>
                  </motion.div>
                ) : status === "decoding" ? (
                  <motion.div
                    key="decoding"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-6 w-full px-8"
                  >
                    <div className="relative">
                      <Heart size={60} className="text-romantic-gold fill-current animate-pulse" />
                      <motion.div
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.5 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <Sparkles size={30} className="text-white" />
                      </motion.div>
                    </div>
                    <div className="w-full space-y-2">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-romantic-gold">
                        <span>{content[lang].capsule_sealing_label}</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-romantic-gold"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="sealed"
                    initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    className="text-romantic-gold flex flex-col items-center gap-4"
                  >
                    <div className="relative">
                      <Unlock size={80} className="drop-shadow-[0_0_20px_rgba(255,215,0,0.6)]" />
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute inset-0 bg-romantic-gold rounded-full -z-10"
                      />
                    </div>
                    <span className="text-xs font-black uppercase tracking-[0.4em]">{content[lang].capsule_sealed_label}</span>
                    <div className="flex gap-1">
                      {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 bg-romantic-gold rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Futuristic Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
              <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            </div>
          </motion.div>
        </div>

        <div className="w-full space-y-6">
          {status === "sealed" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center p-6 glass-card rounded-3xl border-romantic-gold/20 mb-8"
            >
              <div className="flex items-center justify-center gap-3 mb-2 text-romantic-gold">
                <Heart size={18} className="fill-current" />
                <h3 className="font-black tracking-widest text-xs uppercase">{content[lang].capsule_promise_heading}</h3>
              </div>
              {promise ? (
                <>
                  <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-50 mb-2">
                    {content[lang].capsule_promise_label}
                  </p>
                  <TypedText
                    key={promise}
                    text={`"${promise}"`}
                    className={`text-lg italic text-romantic ${lang === 'ta' ? 'font-tamil' : ''}`}
                  />
                </>
              ) : (
                <p className={`text-lg italic text-romantic ${lang === 'ta' ? 'font-tamil' : ''}`}>
                  "{content[lang].capsule_fallback_quote}"
                </p>
              )}
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => router.push("/story/starmap")}
            className="w-full bg-romantic-red text-white py-5 rounded-3xl font-black text-xl shadow-xl flex items-center justify-center gap-4 group"
          >
            <span>{content[lang].cta_capsule}</span>
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform duration-500" />
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
