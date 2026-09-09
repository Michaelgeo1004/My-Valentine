"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { MapPin, Sun, Moon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";

// One PQRST heartbeat complex: flat -> P bump -> flat -> sharp QRS spike -> flat -> T bump -> flat.
// Each complex advances exactly 100 units in x and returns to baseline (net 0 in y), so it tiles cleanly.
const ECG_COMPLEX = "l15,0 l7,-6 l7,6 l11,0 l5,4 l5,-18 l5,30 l5,-16 l15,0 l7,-8 l8,8 l10,0";
const ECG_PATH = `M0,20 ${ECG_COMPLEX} ${ECG_COMPLEX} ${ECG_COMPLEX} ${ECG_COMPLEX}`;

export default function WorldPage() {
    const { lang } = useAppContext();
    const router = useRouter();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const isDaytime = (timeZone: string) => {
        const hour = parseInt(currentTime.toLocaleString('en-US', { hour: '2-digit', hour12: false, timeZone }), 10);
        return hour >= 6 && hour < 18;
    };
    const dubaiIsDay = isDaytime('Asia/Dubai');
    const indiaIsDay = isDaytime('Asia/Kolkata');

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
                            {dubaiIsDay ? <Sun size={100} /> : <Moon size={100} />}
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
                            {indiaIsDay ? <Sun size={100} /> : <Moon size={100} />}
                        </div>
                    </motion.div>
                </div>

                {/* Heartbeat Pulse connecting the two cities */}
                <div className="relative mb-8">
                    <div className="flex items-center justify-between mb-2 px-1">
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-romantic-red/70">🇦🇪 {content[lang].dubai}</span>
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-romantic-red/70">{content[lang].tirunelveli} 🇮🇳</span>
                    </div>
                    <svg viewBox="0 0 400 40" preserveAspectRatio="none" className="w-full h-10 overflow-visible">
                        <path
                            d={ECG_PATH}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                            className="text-romantic-pink/25"
                        />
                        <defs>
                            <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="var(--romantic-red)" stopOpacity="0" />
                                <stop offset="50%" stopColor="var(--romantic-red)" />
                                <stop offset="100%" stopColor="var(--romantic-pink)" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <motion.path
                            d={ECG_PATH}
                            fill="none"
                            stroke="url(#pulseGradient)"
                            strokeWidth="2"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, pathOffset: 0 }}
                            animate={{ pathLength: [0, 0.28, 0], pathOffset: [0, 0.8, 1] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                        />
                    </svg>
                    <div className="text-center mt-2">
                        <span className="inline-block bg-white/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[10px] font-black uppercase tracking-tighter text-romantic shadow-md">
                            2,845 KM OF LOVE
                        </span>
                    </div>
                </div>

                <div className="text-center mb-10">
                    <motion.h4 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl md:text-2xl font-black text-romantic mb-2">{content[lang].togetherness}</motion.h4>
                    <p className="opacity-60 font-medium italic text-sm md:text-base mb-4">{content[lang].connected}</p>
                    <p className="text-base md:text-lg font-bold text-romantic italic max-w-xs mx-auto leading-relaxed">
                        &quot;{content[lang].distance_quote}&quot;
                    </p>
                </div>

                {/*
                  Saved for reuse elsewhere — the curved Dubai-to-India flight path with the plane
                  animating along the arc. Removed from this page (redundant next to the ECG pulse
                  above), but the curve itself was good, so keeping it here rather than deleting.
                  Needs `Plane` imported from lucide-react to use again.

                  <div className="relative w-full aspect-[16/9] bg-white/5 rounded-[2rem] border border-white/10 overflow-hidden p-8 shadow-inner mb-10">
                      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                          style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '30px 30px' }}
                      />

                      <div className="relative h-full flex flex-col justify-between text-left">
                          <div className="flex justify-between items-center z-10 shrink-0">
                              <div>
                                  <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Origin</p>
                                  <h4 className="font-black text-romantic-red text-lg md:text-xl">DUBAI</h4>
                              </div>
                              <div className="text-right">
                                  <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Destination</p>
                                  <h4 className="font-black text-romantic-red text-lg md:text-xl">INDIA</h4>
                              </div>
                          </div>

                          <div className="flex-1 relative flex items-center justify-center -my-4">
                              <svg width="100%" height="150" viewBox="0 0 400 150" className="overflow-visible scale-110 md:scale-125">
                                  <motion.path
                                      d="M 40 100 C 120 20, 280 20, 360 100"
                                      fill="transparent"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeDasharray="4 6"
                                      className="opacity-10"
                                  />
                                  <motion.path
                                      d="M 40 100 C 120 20, 280 20, 360 100"
                                      fill="transparent"
                                      stroke="url(#pathGradientJourney)"
                                      strokeWidth="3"
                                      initial={{ pathLength: 0 }}
                                      animate={{ pathLength: 1 }}
                                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                  />
                                  <defs>
                                      <linearGradient id="pathGradientJourney" x1="0%" y1="0%" x2="100%" y2="0%">
                                          <stop offset="0%" stopColor="var(--romantic-red)" />
                                          <stop offset="100%" stopColor="var(--romantic-pink)" />
                                      </linearGradient>
                                  </defs>

                                  <motion.g
                                      animate={{ opacity: [0, 1, 1, 0] }}
                                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                  >
                                      <motion.g
                                          style={{ offsetPath: "path('M 40 100 C 120 20, 280 20, 360 100')", offsetRotate: "auto" }}
                                          animate={{ offsetDistance: ["0%", "100%"] }}
                                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                      >
                                          <Plane size={24} className="text-romantic-red fill-current rotate-45" />
                                          <motion.circle
                                              r="12"
                                              fill="currentColor"
                                              className="text-romantic-red/20"
                                              animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
                                              transition={{ repeat: Infinity, duration: 1.5 }}
                                          />
                                      </motion.g>
                                  </motion.g>
                              </svg>
                          </div>
                      </div>
                  </div>
                */}

                <motion.button
                    onClick={() => router.push("/story/cube")}
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255,173,173,0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full md:w-auto mx-auto bg-romantic-red text-white px-12 py-5 rounded-2xl font-black text-xl shadow-2xl flex items-center justify-center gap-3 transition-all"
                >
                    {content[lang].start_journey} <span className="text-2xl leading-none">🇮🇳</span>
                </motion.button>
            </StoryCard>
        </CinematicContainer>
    );
}
