"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StoryCardProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export const StoryCard = ({ children, className = "", delay = 0 }: StoryCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 1,
                delay,
                ease: [0.22, 1, 0.36, 1]
            }}
            className={`glass-card p-6 md:p-14 rounded-[2.5rem] md:rounded-[4rem] text-center max-w-[90vw] md:max-w-xl w-full relative z-20 backdrop-blur-3xl shadow-[0_32px_128px_rgba(0,0,0,0.1)] border-white/20 ${className}`}
        >
            {children}
        </motion.div>
    );
};
