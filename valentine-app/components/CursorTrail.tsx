"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface TrailLeaf {
    id: number;
    x: number;
    y: number;
    rotation: number;
    scale: number;
}

const MIN_INTERVAL_MS = 45;
const MIN_DISTANCE_PX = 18;

export const CursorTrail = () => {
    const [leaves, setLeaves] = useState<TrailLeaf[]>([]);
    const nextId = useRef(0);
    const lastEmit = useRef({ time: 0, x: -1000, y: -1000 });

    useEffect(() => {
        const spawn = (x: number, y: number) => {
            const now = Date.now();
            const dx = x - lastEmit.current.x;
            const dy = y - lastEmit.current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (now - lastEmit.current.time < MIN_INTERVAL_MS || distance < MIN_DISTANCE_PX) return;
            lastEmit.current = { time: now, x, y };

            const id = nextId.current++;
            setLeaves(prev => [...prev, {
                id,
                x,
                y,
                rotation: Math.random() * 360,
                scale: 0.6 + Math.random() * 0.5,
            }]);

            setTimeout(() => {
                setLeaves(prev => prev.filter(l => l.id !== id));
            }, 1000);
        };

        const handleMouseMove = (e: MouseEvent) => spawn(e.clientX, e.clientY);
        const handleTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0];
            if (touch) spawn(touch.clientX, touch.clientY);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("touchmove", handleTouchMove);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("touchmove", handleTouchMove);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[199] pointer-events-none overflow-hidden">
            {leaves.map(leaf => (
                <motion.div
                    key={leaf.id}
                    initial={{ opacity: 0.9, scale: leaf.scale, x: leaf.x - 12, y: leaf.y - 12, rotate: leaf.rotation }}
                    animate={{ opacity: 0, scale: leaf.scale * 0.5, y: leaf.y - 12 + 16 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    onAnimationComplete={() => setLeaves(prev => prev.filter(l => l.id !== leaf.id))}
                    className="absolute text-xl leading-none"
                    style={{ left: 0, top: 0 }}
                >
                    🍁
                </motion.div>
            ))}
        </div>
    );
};
