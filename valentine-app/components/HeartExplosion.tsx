"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export const HeartExplosion = () => {
    return (
        <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
            {[...Array(40)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: "50vw",
                        y: "50vh",
                        scale: 0,
                        opacity: 1
                    }}
                    animate={{
                        x: `${50 + (Math.random() * 200 - 100)}vw`,
                        y: `${50 + (Math.random() * 200 - 100)}vh`,
                        scale: Math.random() * 3 + 1,
                        opacity: 0,
                        rotate: Math.random() * 360
                    }}
                    transition={{
                        duration: 1.5,
                        ease: "easeOut",
                        delay: Math.random() * 0.2
                    }}
                    className="absolute text-romantic-red"
                >
                    <Heart fill="currentColor" size={40} />
                </motion.div>
            ))}
        </div>
    );
};
