"use client";

import { useState, useEffect, useMemo } from "react";

// Reveals `text` grapheme-by-grapheme, like it's being said in the moment,
// instead of just appearing all at once. Uses Intl.Segmenter so Tamil's
// combining vowel signs are revealed as whole visual characters, not split
// mid-glyph. Pass `key={text}` at the call site to reset this on text change —
// remounting is simpler than syncing an effect to it.
export const TypedText = ({
    text,
    className,
    speedMs = 48
}: {
    text: string;
    className?: string;
    speedMs?: number;
}) => {
    const segments = useMemo(() => {
        if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
            const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
            return [...segmenter.segment(text)].map((s) => s.segment);
        }
        return Array.from(text);
    }, [text]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCount((c) => {
                if (c >= segments.length) {
                    clearInterval(timer);
                    return c;
                }
                return c + 1;
            });
        }, speedMs);
        return () => clearInterval(timer);
    }, [segments, speedMs]);

    return (
        <p className={className}>
            {segments.slice(0, count).join("")}
            {count < segments.length && <span className="opacity-40 animate-pulse">▍</span>}
        </p>
    );
};
