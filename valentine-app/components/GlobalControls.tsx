"use client";

import { motion } from "framer-motion";
import { Sun, Moon, Palette } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const THEME_ORDER = ["light", "dark", "rainbow"] as const;
const THEME_ICONS = { light: Sun, dark: Moon, rainbow: Palette };

export const GlobalControls = () => {
    const { theme, setTheme } = useAppContext();

    const cycleTheme = () => {
        const currentIndex = THEME_ORDER.indexOf(theme);
        const next = THEME_ORDER[(currentIndex + 1) % THEME_ORDER.length];
        setTheme(next);
    };

    const CurrentIcon = THEME_ICONS[theme];

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-4 right-4 md:top-8 md:right-8 flex flex-col items-end gap-3 z-50"
        >
            {/* Mobile: single cycling button, keeps the corner light */}
            <button
                onClick={cycleTheme}
                className="md:hidden w-11 h-11 rounded-2xl flex items-center justify-center border border-white/20 bg-romantic-red text-white shadow-xl shadow-[0_0_15px_rgba(255,77,77,0.4)] transition-transform active:scale-90"
                title={`${theme} mode — tap to change`}
            >
                <CurrentIcon size={20} strokeWidth={2.5} />
            </button>

            {/* Desktop: full picker */}
            <div className="hidden md:flex glass-card p-2 rounded-2xl flex-col gap-2 shadow-xl border-white/20">
                {THEME_ORDER.map((id) => {
                    const Icon = THEME_ICONS[id];
                    return (
                        <button
                            key={id}
                            onClick={() => setTheme(id)}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${theme === id
                                ? "bg-romantic-red text-white shadow-[0_0_15px_rgba(255,77,77,0.4)] scale-110"
                                : "hover:bg-romantic-pink/20 text-foreground/70"
                                }`}
                            title={`${id} mode`}
                        >
                            <Icon size={20} strokeWidth={2.5} />
                        </button>
                    );
                })}
            </div>
        </motion.div>
    );
};
