"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

// Rendered once from ClientLayout, outside app/template.tsx's per-page transition
// wrapper. That wrapper keeps a persistent (non-"none") transform on itself even
// at rest, which turns it into a containing block for any `position: fixed`
// descendant — so a copy of this bar rendered per-page (as it used to be, inside
// CinematicContainer) would stick to the bottom of that page's own content
// instead of the browser viewport once a page's content is taller than one
// screen, making it disappear until you scrolled the rest of the way down.
export const GlobalFooter = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1 }}
            className="fixed bottom-4 md:bottom-8 flex flex-nowrap justify-center items-center gap-1.5 sm:gap-3 md:gap-8 text-[8px] sm:text-[9px] md:text-xs font-bold uppercase tracking-[0.1em] sm:tracking-widest px-3 text-center z-50 pointer-events-none whitespace-nowrap left-0 right-0"
        >
            <div className="flex items-center gap-1 sm:gap-2 group cursor-help pointer-events-auto shrink-0">
                <MapPin size={12} className="text-romantic-red group-hover:animate-bounce shrink-0" /> Dubai
            </div>
            <div className="block h-px w-3 sm:w-8 md:w-12 bg-romantic-red/30 shrink-0" />
            <div className="flex items-center gap-2 shrink-0">
                5+ Years Journey
            </div>
            <div className="block h-px w-3 sm:w-8 md:w-12 bg-romantic-red/30 shrink-0" />
            <div className="flex items-center gap-1 sm:gap-2 group cursor-help pointer-events-auto shrink-0">
                <MapPin size={12} className="text-romantic-red group-hover:animate-bounce shrink-0" /> India
            </div>
        </motion.div>
    );
};
