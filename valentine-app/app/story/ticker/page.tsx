"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Clock, Heart, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";

export default function TickerPage() {
    const { lang } = useAppContext();
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState({
        years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const start = new Date("2021-01-22T00:00:00");

            let diff = now.getTime() - start.getTime();

            const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
            diff -= years * (1000 * 60 * 60 * 24 * 365.25);

            const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44));
            diff -= months * (1000 * 60 * 60 * 24 * 30.44);

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            diff -= days * (1000 * 60 * 60 * 24);

            const hours = Math.floor(diff / (1000 * 60 * 60));
            diff -= hours * (1000 * 60 * 60);

            const minutes = Math.floor(diff / (1000 * 60));
            diff -= minutes * (1000 * 60);

            const seconds = Math.floor(diff / 1000);

            setTimeLeft({ years, months, days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const timeItems = [
        { label: content[lang].years, value: timeLeft.years },
        { label: content[lang].months, value: timeLeft.months },
        { label: content[lang].days, value: timeLeft.days },
        { label: content[lang].hours, value: timeLeft.hours },
        { label: content[lang].minutes, value: timeLeft.minutes },
        { label: content[lang].seconds, value: timeLeft.seconds },
    ];

    return (
        <CinematicContainer>
            <StoryCard className="max-w-xl">
                <div className="text-center mb-8">
                    <Clock size={48} className="text-romantic-red mx-auto mb-4 animate-pulse opacity-50" />
                    <h1 className="text-3xl md:text-5xl font-black mb-2 text-romantic">
                        {content[lang].ticker_title}
                    </h1>
                    <p className="text-sm md:text-base font-medium opacity-60 italic px-4">
                        {content[lang].ticker_desc}
                    </p>
                </div>

                {/* Ticker Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                    {timeItems.map((item, i) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-6 rounded-3xl border-white/10 flex flex-col items-center justify-center shadow-xl"
                        >
                            <motion.span
                                key={item.value}
                                initial={{ scale: 1.2, color: "var(--romantic-red)" }}
                                animate={{ scale: 1, color: "inherit" }}
                                className="text-4xl md:text-5xl font-black text-romantic"
                            >
                                {item.value}
                            </motion.span>
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-40 mt-1">
                                {item.label}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* Life Milestones */}
                <div className="mb-12">
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] opacity-40 mb-6 text-center">Milestones of Us</h3>
                    <div className="space-y-4">
                        {[
                            { label: "Days since our first kiss", val: Math.floor((new Date().getTime() - new Date("2021-03-25").getTime()) / (1000 * 60 * 60 * 24)) },
                            { label: "Dreams shared in distance", val: "∞" },
                            { label: "Miles traveled in thoughts", val: "2,845,000+" }
                        ].map((m, i) => (
                            <div key={i} className="flex justify-between items-center p-4 glass-card rounded-2xl border-white/5">
                                <span className="text-[10px] md:text-sm font-bold opacity-60 truncate">{m.label}</span>
                                <span className="text-romantic font-black">{m.val}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full">
                    <motion.div
                        animate={{ scale: [1, 1.05, 1], rotate: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="bg-romantic-red/5 border border-romantic-red/20 p-6 rounded-3xl mb-8 flex items-center justify-center gap-4"
                    >
                        <Heart className="text-romantic-red fill-current" />
                        <p className="text-sm md:text-lg font-black italic text-romantic">
                            "Every second is a treasure."
                        </p>
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => router.push("/story/letters")}
                        className="w-full bg-romantic-red text-white py-5 rounded-3xl font-black text-xl shadow-xl flex items-center justify-center gap-4 group"
                    >
                        <span>{content[lang].cta_letters}</span>
                        <RotateCcw size={22} className="rotate-90 group-hover:rotate-180 transition-transform duration-500" />
                    </motion.button>
                </div>
            </StoryCard>
        </CinematicContainer>
    );
}
