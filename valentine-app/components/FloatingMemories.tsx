"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, Star } from "lucide-react";

const memoryIcons = [
    { icon: Heart, color: "text-romantic-red" },
    { icon: Sparkles, color: "text-romantic-gold" },
    { icon: Star, color: "text-romantic-pink" },
];

export const FloatingMemories = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
            {[...Array(15)].map((_, i) => {
                const config = {
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    scale: 0.5 + Math.random() * 2,
                    duration: 10 + Math.random() * 20,
                    delay: Math.random() * 5,
                    rotation: Math.random() * 360,
                };

                const Item = memoryIcons[i % memoryIcons.length].icon;
                const color = memoryIcons[i % memoryIcons.length].color;

                return (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: `${config.x}vw`, y: `110vh`, scale: config.scale, rotate: 0 }}
                        animate={{
                            opacity: [0, 0.5, 0],
                            y: "-10vh",
                            rotate: config.rotation + 360,
                            x: [`${config.x}vw`, `${config.x + (Math.random() * 20 - 10)}vw`]
                        }}
                        transition={{
                            duration: config.duration,
                            repeat: Infinity,
                            delay: config.delay,
                            ease: "linear"
                        }}
                        className={`absolute ${color} blur-[1px] md:blur-sm`}
                    >
                        <Item fill="currentColor" size={24} />
                    </motion.div>
                );
            })}
        </div>
    );
};
