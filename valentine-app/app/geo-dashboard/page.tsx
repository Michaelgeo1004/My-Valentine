"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, Heart, Calendar, ArrowLeft, RefreshCw, Trash2, Sparkles } from "lucide-react";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";

export default function GeoDashboard() {
    const router = useRouter();
    const [data, setData] = useState<any>(null);
    const [lastUpdated, setLastUpdated] = useState<string>("");

    const loadData = () => {
        const raw = localStorage.getItem('_v_heartbeat');
        if (raw) {
            const parsed = JSON.parse(raw);
            setData(parsed);
            setLastUpdated(new Date().toLocaleTimeString());
        }
    };

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 5000); // Live refresh every 5s
        return () => clearInterval(interval);
    }, []);

    const clearLog = () => {
        if (confirm("Clear all captured insights?")) {
            localStorage.removeItem('_v_heartbeat');
            setData(null);
        }
    };

    return (
        <CinematicContainer>
            <StoryCard className="max-w-2xl border-romantic-red/30 shadow-[0_0_50px_rgba(255,77,77,0.1)]">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-2xl bg-romantic-red/10 text-romantic-red shadow-inner">
                            <ShieldAlert size={28} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-romantic uppercase tracking-tighter">Geo's Planning Room</h1>
                            <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                Live Insights View • Refreshed {lastUpdated}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => router.push("/")}
                        className="p-3 rounded-full hover:bg-white/5 transition-colors text-foreground/40"
                    >
                        <ArrowLeft size={20} />
                    </button>
                </div>

                {!data ? (
                    <div className="text-center py-20 opacity-40 flex flex-col items-center gap-4">
                        <RefreshCw size={48} className="animate-spin-slow opacity-20" />
                        <p className="font-bold italic">No choices captured yet... <br /> Waiting for Ancy to start her journey.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Love Meter / Hug Count */}
                        <div className="glass-card p-6 rounded-[2.5rem] border-romantic-red/20 bg-romantic-red/5 text-center relative overflow-hidden">
                            <div className="absolute inset-0 opacity-5 pointer-events-none">
                                <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
                            </div>

                            <Heart className="text-romantic-red mx-auto mb-3 fill-current animate-pulse" size={40} />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-romantic-red/60 mb-1">Affection Score</h3>
                            <div className="text-5xl font-black text-romantic mb-4 tabular-nums">
                                {Math.floor(data.hugCount || 0)}
                            </div>

                            {/* Progress bar for "Love Level" */}
                            <div className="max-w-[200px] mx-auto h-2 bg-white/5 rounded-full overflow-hidden mb-2">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min((data.hugCount || 0) * 2, 100)}%` }}
                                    className="h-full bg-romantic-red shadow-[0_0_15px_rgba(255,77,77,0.5)]"
                                />
                            </div>
                            <p className="text-[9px] font-bold opacity-30 italic">Determined by her interactions, hugs, and reveals.</p>
                        </div>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="glass-card p-4 rounded-3xl border-white/5 bg-white/5 flex flex-col items-center text-center">
                                <Calendar className="text-romantic-red mb-2" size={20} />
                                <span className="text-[10px] uppercase font-black opacity-40 tracking-widest">Selections</span>
                                <span className="text-xl font-black text-romantic">{data.selections?.length || 0}/5</span>
                            </div>
                            <div className="glass-card p-4 rounded-3xl border-white/5 bg-white/5 flex flex-col items-center text-center">
                                <ShieldAlert className={data.capsuleSealed ? "text-romantic-gold mb-2" : "text-foreground/20 mb-2"} size={20} />
                                <span className="text-[10px] uppercase font-black opacity-40 tracking-widest">Time Capsule</span>
                                <span className={`text-[10px] font-black mt-1 ${data.capsuleSealed ? 'text-romantic-gold' : 'opacity-20'}`}>
                                    {data.capsuleSealed ? 'SEALED FOREVER' : 'STILL OPEN'}
                                </span>
                            </div>
                        </div>

                        {/* Journey Tracking */}
                        <div className="glass-card p-6 rounded-3xl border-white/10 bg-white/5">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="text-romantic-gold" size={16} />
                                    <h3 className="text-[10px] font-black uppercase tracking-widest opacity-60">Journey Progress</h3>
                                </div>
                                <span className="px-2 py-0.5 rounded-md bg-white/5 text-[9px] font-black text-foreground/40 border border-white/5 uppercase">
                                    Last Page: {data.lastPage || "Initial"}
                                </span>
                            </div>

                            {data.dateResult && (
                                <div className="p-4 rounded-2xl bg-romantic-red/5 border border-romantic-red/10 text-center mb-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Date Result</p>
                                    <p className="text-sm font-black text-romantic-red italic">"{data.dateResult}"</p>
                                </div>
                            )}

                            {data.selections && data.selections.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Adventure List</p>
                                    <div className="grid grid-cols-1 gap-2">
                                        {data.selections.slice(0, 4).map((item: string, i: number) => (
                                            <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 text-[9px] font-bold">
                                                <Heart size={10} className="text-romantic-red fill-current" />
                                                {item}
                                            </div>
                                        ))}
                                        {data.selections.length > 4 && (
                                            <div className="text-[9px] font-bold opacity-30 italic text-center">
                                                + {data.selections.length - 4} more adventures...
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="text-center pt-2">
                            <span className="text-[8px] font-black opacity-20 uppercase tracking-[0.3em]">
                                Verified Insights • Sync Active • {new Date(data.lastUpdated || data.timestamp).toLocaleTimeString()}
                            </span>
                        </div>

                        {/* Admin Tools */}
                        <div className="flex justify-center pt-4">
                            <button
                                onClick={clearLog}
                                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-500/40 hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={14} />
                                Purge Log Data
                            </button>
                        </div>
                    </div>
                )}

                <div className="mt-12 text-center">
                    <p className="text-[9px] font-medium opacity-20 italic">
                        This view is for Geo's eyes only. <br /> Use this data to plan the most perfect reunion ever. ❤️
                    </p>
                </div>
            </StoryCard>
        </CinematicContainer>
    );
}
