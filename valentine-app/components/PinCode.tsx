"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Heart, ShieldCheck, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

interface PinCodeProps {
    onSuccess: () => void;
}

export const PinCode = ({ onSuccess }: PinCodeProps) => {
    const [pin, setPin] = useState("");
    const [error, setError] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const router = useRouter();

    // The secret PIN for Ancy
    const SECRET_PIN = "2201"; // Jan 22 - The day it all started
    const GEO_PIN = "1104";    // Geo's Planning PIN

    const handleKeyPress = (num: string) => {
        if (pin.length < 4) {
            setPin(prev => prev + num);
            setError(false);
        }
    };

    const handleDelete = () => {
        setPin(prev => prev.slice(0, -1));
    };

    useEffect(() => {
        if (pin.length === 4) {
            if (pin === SECRET_PIN) {
                setIsUnlocked(true);
                setTimeout(() => {
                    onSuccess();
                }, 800);
            } else if (pin === GEO_PIN) {
                // Secret redirect for Geo
                setIsUnlocked(true);
                setTimeout(() => {
                    router.push("/geo-dashboard");
                }, 800);
            } else {
                setError(true);
                setTimeout(() => setPin(""), 500);
            }
        }
    }, [pin, onSuccess, router]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-romantic-red/10 rounded-full blur-[120px] animate-pulse" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-md px-6 text-center z-10"
            >
                <AnimatePresence mode="wait">
                    {!isUnlocked ? (
                        <motion.div
                            key="lock"
                            exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="mb-8 relative inline-block">
                                <div className="p-6 rounded-full bg-romantic-red/10 border border-romantic-red/20 shadow-2xl relative z-10">
                                    <Lock className={`w-12 h-12 text-romantic-red transition-all duration-300 ${error ? 'scale-110' : ''}`} />
                                </div>
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="absolute inset-0 bg-romantic-red rounded-full blur-2xl -z-0"
                                />
                            </div>

                            <h1 className="text-3xl font-black mb-2 tracking-tight text-romantic">Secret Entry</h1>
                            <p className="text-foreground/50 text-sm mb-10 font-medium">A personal bond needs a personal code.<br />Enter the date our journey began (DDMM).</p>

                            <div className="flex justify-center gap-4 mb-12">
                                {[0, 1, 2, 3].map((i) => (
                                    <motion.div
                                        key={i}
                                        animate={error ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                                        className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center text-2xl font-black transition-all duration-300 ${pin.length > i
                                            ? 'border-romantic-red bg-romantic-red/5 text-romantic'
                                            : 'border-white/10 bg-white/5 opacity-40'
                                            } ${error ? 'border-red-500 text-red-500' : ''}`}
                                    >
                                        {pin[i] ? <div className="w-3 h-3 bg-current rounded-full" /> : ""}
                                    </motion.div>
                                ))}
                            </div>

                            <div className="grid grid-cols-3 gap-4 max-w-[280px] mx-auto">
                                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "DEL"].map((key, i) => (
                                    <button
                                        key={i}
                                        onClick={() => key === "DEL" ? handleDelete() : key && handleKeyPress(key)}
                                        disabled={!key}
                                        className={`h-16 rounded-2xl flex items-center justify-center font-black text-xl transition-all active:scale-90 hover:bg-white/10 ${key === "DEL" ? 'text-romantic-red/60 text-sm' : 'text-foreground/80'
                                            } ${!key ? 'opacity-0 cursor-default' : 'glass-card border-white/5 shadow-lg'}`}
                                    >
                                        {key}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center"
                        >
                            <div className="p-8 rounded-full bg-green-500/10 border border-green-500/20 shadow-2xl mb-6 relative">
                                <ShieldCheck className="w-20 h-20 text-green-500" />
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                                    transition={{ duration: 1 }}
                                    className="absolute inset-0 bg-green-500 rounded-full blur-xl"
                                />
                            </div>
                            <h2 className="text-4xl font-black text-romantic mb-2">Unlocked</h2>
                            <p className="text-foreground/60 font-medium">Welcome home, My Everything.</p>
                            <div className="mt-8 flex gap-2">
                                <Sparkles className="text-romantic-red animate-pulse" size={20} />
                                <Heart className="text-romantic-red fill-current" size={20} />
                                <Sparkles className="text-romantic-red animate-pulse" size={20} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};
