"use client";

import { useState, useEffect } from "react";
import { AppContextProvider } from "@/context/AppContext";
import { PinCode } from "@/components/PinCode";
import { TapHearts } from "@/components/TapHearts";
import { CursorTrail } from "@/components/CursorTrail";
import { GlobalControls } from "@/components/GlobalControls";
import { GlobalFooter } from "@/components/GlobalFooter";

export default function ClientLayout({
    children,
    interClass,
    tamilClass,
}: {
    children: React.ReactNode;
    interClass: string;
    tamilClass: string;
}) {
    const [unlocked, setUnlocked] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const isUnlocked = sessionStorage.getItem("ancy_unlocked");
        if (isUnlocked === "true") {
            setUnlocked(true);
        }
    }, []);

    const handleUnlock = () => {
        setUnlocked(true);
        sessionStorage.setItem("ancy_unlocked", "true");
    };

    return (
        <AppContextProvider>
            <div className={`${interClass} ${tamilClass}`}>
                <div className="mesh-gradient fixed inset-0 -z-20" />
                <main className="relative z-10 min-h-[100dvh]">
                    {mounted && !unlocked ? (
                        <PinCode onSuccess={handleUnlock} />
                    ) : (
                        children
                    )}
                </main>
                {mounted && unlocked && <TapHearts />}
                {mounted && unlocked && <CursorTrail />}
                {mounted && unlocked && <GlobalControls />}
                {mounted && unlocked && <GlobalFooter />}
            </div>
        </AppContextProvider>
    );
}
