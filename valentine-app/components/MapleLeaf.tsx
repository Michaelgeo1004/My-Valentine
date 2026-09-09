"use client";

import { motion } from "framer-motion";

export const MapleLeaf = ({ delay }: { delay: number }) => {
    const randomX = typeof window !== 'undefined' ? Math.random() * 100 : 50;
    // Size varies per leaf — small ones read as "farther away", big ones as
    // "closer", which sells the falling-leaves depth a lot more than a
    // uniform size ever could.
    const randomScale = 0.45 + Math.random() * 0.85;
    return (
        <motion.div
            initial={{ y: "-10vh", x: `${randomX}vw`, opacity: 0, rotate: 0, scale: randomScale }}
            animate={{
                y: "110vh",
                opacity: [0, 0.5, 0.5, 0],
                rotate: 720,
                x: [`${randomX}vw`, `${randomX + (Math.random() * 40 - 20)}vw`]
            }}
            transition={{
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                delay,
                ease: "easeInOut"
            }}
            className="absolute pointer-events-none text-orange-400 font-bold text-2xl z-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
        >
            🍁
        </motion.div>
    );
};
