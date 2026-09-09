"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

type Variant = "red" | "pink";

interface TapHeart {
    id: number;
    x: number;
    y: number;
    variant: Variant;
    rotate: number;
    drift: number;
}

const VARIANTS: Variant[] = ["red", "pink"];

const isInteractiveTarget = (el: Element | null): boolean => {
    if (!el) return false;
    return !!el.closest('button, a, input, textarea, select, [role="button"], [role="link"], [data-no-tap-heart]');
};

export const TapHearts = () => {
    const [hearts, setHearts] = useState<TapHeart[]>([]);
    const nextId = useRef(0);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (isInteractiveTarget(e.target as Element)) return;

            const id = nextId.current++;
            setHearts(prev => [...prev, {
                id,
                x: e.clientX,
                y: e.clientY,
                variant: VARIANTS[Math.floor(Math.random() * VARIANTS.length)],
                rotate: (Math.random() - 0.5) * 40,
                drift: (Math.random() - 0.5) * 60,
            }]);

            // Guaranteed cleanup even if onAnimationComplete never fires
            // (e.g. rAF-driven animations stall while the tab is backgrounded).
            setTimeout(() => {
                setHearts(prev => prev.filter(p => p.id !== id));
            }, 1200);
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    return (
        <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden">
            {hearts.map(h => (
                <div
                    key={h.id}
                    style={{ position: "absolute", left: h.x, top: h.y, transform: "translate(-50%, -50%)" }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.4, y: 0, x: 0, rotate: 0 }}
                        animate={{ opacity: [0, 1, 1, 0], scale: [0.4, 1.3, 1, 0.9], y: -70, x: h.drift, rotate: h.rotate }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        onAnimationComplete={() => setHearts(prev => prev.filter(p => p.id !== h.id))}
                        className={h.variant === "red" ? "text-romantic-red" : "text-romantic-pink"}
                    >
                        <Heart fill="currentColor" size={60} className="drop-shadow-[0_0_10px_rgba(255,77,77,0.4)]" />
                    </motion.div>
                </div>
            ))}
        </div>
    );
};
