"use client";

import { motion } from "framer-motion";
import { Sun, Moon, Palette } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export const GlobalControls = () => {
    const { theme, setTheme, lang, setLang } = useAppContext();

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-4 right-4 md:top-8 md:right-8 flex flex-col items-end gap-3 z-50"
        >
            {/* Theme Switcher */}
            <div className="glass-card p-1.5 md:p-2 rounded-2xl flex flex-row md:flex-col gap-2 shadow-xl border-white/20">
                {[
                    { id: "light", icon: Sun },
                    { id: "dark", icon: Moon },
                    { id: "rainbow", icon: Palette }
                ].map((t) => {
                    const Icon = t.icon;
                    return (
                        <button
                            key={t.id}
                            onClick={() => setTheme(t.id as any)}
                            className={`w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${theme === t.id
                                ? "bg-romantic-red text-white shadow-[0_0_15px_rgba(255,77,77,0.4)] scale-110"
                                : "hover:bg-romantic-pink/20 text-foreground/70"
                                }`}
                            title={`${t.id} mode`}
                        >
                            <Icon size={20} strokeWidth={2.5} />
                        </button>
                    );
                })}
            </div>

            {/* Language Switcher hidden as per user request */}
            {/* 
            <div className="glass-card p-1 rounded-full flex gap-1 shadow-xl border-white/10">
                {["en", "ta"].map((l) => (
                    <button
                        key={l}
                        onClick={() => setLang(l as "en" | "ta")}
                        className={`px-4 py-1.5 rounded-full text-[9px] md:text-[10px] font-black tracking-widest transition-all duration-300 ${lang === l
                            ? "bg-romantic-red text-white shadow-lg"
                            : "hover:bg-romantic-pink/20 text-foreground/50"
                            }`}
                    >
                        {l === "en" ? "EN" : "தமிழ்"}
                    </button>
                ))}
            </div>
            */}
        </motion.div>
    );
};
