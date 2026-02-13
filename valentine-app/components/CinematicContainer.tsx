"use client";

import { ReactNode } from "react";
import { Heart } from "lucide-react";
import { Particle } from "./Particle";
import { MapleLeaf } from "./MapleLeaf";
import { GlobalControls } from "./GlobalControls";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { FloatingMemories } from "./FloatingMemories";

interface CinematicContainerProps {
    children: ReactNode;
    showParticles?: boolean;
}

export const CinematicContainer = ({ children, showParticles = true }: CinematicContainerProps) => {
    return (
        <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center p-4 overflow-hidden">
            {/* Shared Background Particles & Memories */}
            {showParticles && (
                <>
                    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                        {[...Array(12)].map((_, i) => (
                            <Particle key={`heart-${i}`} delay={i * 2} icon={Heart} color="text-romantic-red" />
                        ))}
                        {[...Array(8)].map((_, i) => (
                            <MapleLeaf key={`leaf-${i}`} delay={i * 3} />
                        ))}
                    </div>
                    <FloatingMemories />
                </>
            )}

            {/* Persistent Controls */}
            <GlobalControls />

            {/* Page Content */}
            {children}

            {/* Global Meta Info */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1 }}
                className="fixed bottom-4 md:bottom-8 flex flex-wrap justify-center items-center gap-3 md:gap-8 text-[9px] md:text-xs font-bold uppercase tracking-widest px-4 text-center z-50 pointer-events-none"
            >
                <div className="flex items-center gap-2 group cursor-help pointer-events-auto">
                    <MapPin size={14} className="text-romantic-red group-hover:animate-bounce shrink-0" /> Dubai
                </div>
                <div className="hidden sm:block h-px w-8 md:w-12 bg-romantic-red/30" />
                <div className="flex items-center gap-2 group cursor-help pointer-events-auto">
                    <MapPin size={14} className="text-romantic-red group-hover:animate-bounce shrink-0" /> India
                </div>
                <div className="hidden sm:block h-px w-8 md:w-12 bg-romantic-red/30" />
                <div className="w-full sm:w-auto flex justify-center items-center gap-2">
                    5+ Years Journey
                </div>
            </motion.div>
        </div>
    );
};
