"use client";

import { motion } from "framer-motion";
import { Heart, Star, Sparkles, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";

const creditItems = [
    { role: "The Most Beautiful Woman", name: "Ancy (Teddie queen 🧸)" },
    { role: "The Owner of Her Heart", name: "Geo (Her Driver)" },
    { role: "5-Year Journey Location", name: "Loyola, Dubai, Tirunelveli" },
    { role: "Distance Status", name: "United by Heart" },
    { role: "Next Milestone", name: "Forever and Always" },
];

export default function CreditsPage() {
    const { lang } = useAppContext();
    const router = useRouter();

    return (
        <CinematicContainer>
            <StoryCard className="max-w-xl h-[700px] flex flex-col justify-between overflow-hidden relative">
                <div className="z-20 text-center">
                    <Heart size={48} className="text-romantic-red mx-auto mb-4 animate-bounce" />
                    <h1 className="text-3xl md:text-5xl font-black mb-2 text-romantic">
                        {content[lang].credits_title}
                    </h1>
                    <p className="text-sm md:text-base font-medium opacity-60 italic mb-8 px-6">
                        {content[lang].credits_desc}
                    </p>
                </div>

                {/* Scrolling Credits Area */}
                <div className="flex-1 relative overflow-hidden bg-black/20 rounded-3xl border border-white/10 mb-8 mx-2 py-10 shadow-inner">
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: "-120%" }}
                        transition={{ duration: 15, ease: "linear", repeat: Infinity }}
                        className="w-full flex flex-col items-center gap-12"
                    >
                        {creditItems.map((item, i) => (
                            <div key={i} className="text-center group">
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 mb-2 group-hover:opacity-60 transition-opacity">
                                    {item.role}
                                </p>
                                <h2 className={`text-2xl md:text-3xl font-black text-romantic group-hover:scale-110 transition-transform ${lang === 'ta' ? 'font-tamil' : ''}`}>
                                    {item.name}
                                </h2>
                            </div>
                        ))}

                        <div className="flex flex-col items-center gap-6 mt-12">
                            <Sparkles className="text-romantic-gold" size={32} />
                            <p className="text-center font-bold italic opacity-40 px-12 leading-relaxed">
                                "Every journey has its credits, but ours is just getting started. I love you, Ancy."
                            </p>
                        </div>
                    </motion.div>

                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </div>

                <div className="z-20 w-full space-y-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => router.push("/journey")}
                        className="w-full bg-romantic-red text-white py-5 rounded-3xl font-black text-xl shadow-xl flex items-center justify-center gap-4 group"
                    >
                        <RotateCcw size={22} className="group-hover:rotate-180 transition-transform duration-500" />
                        <span>Replay Journey</span>
                    </motion.button>

                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 text-center">
                        MADE WITH ❤️ IN DUBAI & Tirunelveli
                    </p>
                </div>

                {/* Floating Stars */}
                <motion.div
                    animate={{ opacity: [0.1, 0.4, 0.1] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="absolute inset-0 pointer-events-none"
                >
                    <Star className="absolute top-1/4 left-1/4" size={12} />
                    <Star className="absolute bottom-1/4 right-1/4" size={12} />
                </motion.div>
            </StoryCard>
        </CinematicContainer>
    );
}
