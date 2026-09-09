"use client";

import { ReactNode } from "react";
import { Heart } from "lucide-react";
import { Particle } from "./Particle";
import { MapleLeaf } from "./MapleLeaf";
import { FloatingPetal } from "./FloatingPetal";
import { FloatingMemories } from "./FloatingMemories";

interface CinematicContainerProps {
    children: ReactNode;
    showParticles?: boolean;
    align?: "center" | "top";
}

export const CinematicContainer = ({ children, showParticles = true, align = "center" }: CinematicContainerProps) => {
    return (
        <div className={`relative min-h-[100dvh] w-full flex flex-col items-center p-4 pb-24 md:pb-28 overflow-hidden ${align === "top" ? "justify-start pt-24 md:pt-28" : "justify-center"}`}>
            {/* Shared Background Particles & Memories */}
            {showParticles && (
                <>
                    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                        {[...Array(14)].map((_, i) => (
                            <MapleLeaf key={`leaf-${i}`} delay={i * 2.2} />
                        ))}
                    </div>
                    <FloatingMemories />
                </>
            )}

            {/* Page Content */}
            {children}
        </div>
    );
};
