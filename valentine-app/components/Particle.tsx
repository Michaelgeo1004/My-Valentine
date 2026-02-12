"use client";

import { motion } from "framer-motion";

export const Particle = ({ delay, icon: Icon, color }: { delay: number; icon: any; color: string }) => {
    const randomX = typeof window !== 'undefined' ? Math.random() * 100 : 50;
    const duration = 15 + Math.random() * 20;

    return (
        <motion.div
            initial={{ y: "110vh", x: `${randomX}vw`, opacity: 0, scale: 0.5, rotate: 0 }}
            animate={{
                y: "-10vh",
                opacity: [0, 0.4, 0.4, 0],
                rotate: 360,
                x: [`${randomX}vw`, `${randomX + (Math.random() * 20 - 10)}vw`]
            }}
            transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "linear"
            }}
            className={`absolute pointer-events-none ${color}`}
        >
            <Icon fill="currentColor" size={Math.random() * 16 + 12} />
        </motion.div>
    );
};
