"use client";

import { motion } from "framer-motion";

export const FloatingPetal = ({ delay }: { delay: number }) => {
    const randomX = typeof window !== 'undefined' ? Math.random() * 100 : 50;
    return (
        <motion.div
            initial={{ y: "-10vh", x: `${randomX}vw`, opacity: 0, rotate: 0 }}
            animate={{
                y: "110vh",
                opacity: [0, 0.4, 0.4, 0],
                rotate: 360,
                x: [`${randomX}vw`, `${randomX + (Math.random() * 40 - 20)}vw`]
            }}
            transition={{
                duration: 18 + Math.random() * 10,
                repeat: Infinity,
                delay,
                ease: "easeInOut"
            }}
            className="absolute pointer-events-none text-romantic-pink/40 text-2xl z-0"
        >
            🌸
        </motion.div>
    );
};
