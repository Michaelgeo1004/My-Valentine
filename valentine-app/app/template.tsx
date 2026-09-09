"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { getHeartbeatSnapshot } from "@/utils/insights";

const LAST_PAGE_KEY = "_v_track_last_page";
const LAST_TIME_KEY = "_v_track_last_time";
const HIDDEN_MS_KEY = "_v_track_hidden_ms";
const HIDDEN_SINCE_KEY = "_v_track_hidden_since";

function sendTrack(payload: Record<string, unknown>) {
    fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
    }).catch(() => {});
}

// Wall-clock time since `enteredAt` minus any stretch the tab spent hidden/backgrounded,
// so a page left open in the background doesn't inflate "time spent" on it.
function activeDurationSince(enteredAt: number): number {
    const now = Date.now();
    let hiddenMs = parseInt(sessionStorage.getItem(HIDDEN_MS_KEY) || "0", 10);
    const hiddenSince = sessionStorage.getItem(HIDDEN_SINCE_KEY);
    if (hiddenSince) hiddenMs += now - parseInt(hiddenSince, 10);
    return Math.max(0, now - enteredAt - hiddenMs);
}

function resetVisibilityTracking() {
    sessionStorage.setItem(HIDDEN_MS_KEY, "0");
    sessionStorage.removeItem(HIDDEN_SINCE_KEY);
}

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const lastSentForRef = useRef<string | null>(null);

    // Pauses the "time on page" clock while the tab is hidden/backgrounded (mounted once,
    // since this component persists across client-side navigation — only key={pathname}
    // below remounts on route change).
    useEffect(() => {
        const onVisibility = () => {
            if (document.hidden) {
                sessionStorage.setItem(HIDDEN_SINCE_KEY, String(Date.now()));
            } else {
                const since = sessionStorage.getItem(HIDDEN_SINCE_KEY);
                if (since) {
                    const prevHidden = parseInt(sessionStorage.getItem(HIDDEN_MS_KEY) || "0", 10);
                    sessionStorage.setItem(HIDDEN_MS_KEY, String(prevHidden + (Date.now() - parseInt(since, 10))));
                    sessionStorage.removeItem(HIDDEN_SINCE_KEY);
                }
            }
        };
        document.addEventListener("visibilitychange", onVisibility);
        return () => document.removeEventListener("visibilitychange", onVisibility);
    }, []);

    useEffect(() => {
        // Skips React Strict Mode's dev-only double effect invocation for the same path —
        // harmless fetch either way, but keeps the Sheet free of duplicate rows locally.
        if (lastSentForRef.current === pathname) return;
        lastSentForRef.current = pathname;

        try {
            const now = Date.now();
            const previousPage = sessionStorage.getItem(LAST_PAGE_KEY);
            const previousTime = sessionStorage.getItem(LAST_TIME_KEY);

            // A raw browser refresh re-fires this effect with the same pathname as
            // last recorded — that's a reload, not a real navigation. Let the existing
            // entry timer keep running underneath instead of reporting the page as its
            // own "previous page" (which produced a confusing self-referential row).
            if (previousPage === pathname) return;

            const previousPageDurationMs = previousPage && previousTime ? activeDurationSince(parseInt(previousTime, 10)) : null;

            sendTrack({
                path: pathname,
                referrer: document.referrer || "",
                previousPage,
                previousPageDurationMs,
                metadata: getHeartbeatSnapshot(),
            });

            sessionStorage.setItem(LAST_PAGE_KEY, pathname);
            sessionStorage.setItem(LAST_TIME_KEY, String(now));
            resetVisibilityTracking();
        } catch {
            // tracking must never affect the story experience
        }
    }, [pathname]);

    useEffect(() => {
        const flushOnExit = () => {
            try {
                const lastPage = sessionStorage.getItem(LAST_PAGE_KEY);
                const lastTime = sessionStorage.getItem(LAST_TIME_KEY);
                if (!lastPage || !lastTime) return;

                const payload = JSON.stringify({
                    path: lastPage,
                    referrer: "",
                    event: "exit",
                    previousPage: lastPage,
                    previousPageDurationMs: activeDurationSince(parseInt(lastTime, 10)),
                    metadata: getHeartbeatSnapshot(),
                });
                navigator.sendBeacon("/api/track", new Blob([payload], { type: "application/json" }));
            } catch {
                // best-effort only, must never throw during unload
            }
        };

        window.addEventListener("pagehide", flushOnExit);
        return () => window.removeEventListener("pagehide", flushOnExit);
    }, []);

    return (
        <motion.div
            key={pathname}
            initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full flex flex-col items-center justify-center"
        >
            {children}
        </motion.div>
    );
}
