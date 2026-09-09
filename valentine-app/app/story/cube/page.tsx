"use client";

import { motion, useMotionValue, animate as animateValue } from "framer-motion";
import { Heart, Car, ArrowRight, GraduationCap, Move3d } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";
import { useState, useEffect, useRef } from "react";
import { logInsight, sendTrackBeacon, useOnRealUnmount } from "@/utils/insights";

// The 6 faces, each identified by the outward-facing normal of its static CSS
// transform (e.g. the right face is translate-x + rotate-y-90, so it points
// toward +X). Used to work out which face is currently facing the viewer, so
// we can caption it — the cube itself is never forced to snap to these.
const CUBE_FACES = [
    { normal: [0, 0, 1] as const, id: "heart" as const, icon: "❤️" },
    { normal: [0, 0, -1] as const, id: "ring" as const, icon: "💍" },
    { normal: [1, 0, 0] as const, id: "cap" as const, icon: "🎓" },
    { normal: [-1, 0, 0] as const, id: "car" as const, icon: "🚗" },
    { normal: [0, -1, 0] as const, id: "teddy" as const, icon: "🧸" },
    { normal: [0, 1, 0] as const, id: "muhh" as const, icon: "🍁" },
];
type FaceId = typeof CUBE_FACES[number]["id"];

const FACE_NAMES: Record<FaceId, string> = {
    heart: "Heart (Love)",
    ring: "Ring (Promise)",
    cap: "Graduation Cap",
    car: "Car (Journeys)",
    teddy: "Teddy Bear (Comfort)",
    muhh: "Muhh (Pet Name)",
};

// How far toward the viewer (+Z) a face's normal points once the cube is
// rotated by (rxDeg, ryDeg). Whichever face scores highest is facing forward.
function faceForwardness(normal: readonly [number, number, number], rxDeg: number, ryDeg: number) {
    const rx = (rxDeg * Math.PI) / 180;
    const ry = (ryDeg * Math.PI) / 180;
    const [nx, ny, nz] = normal;
    return nx * -Math.sin(ry) + ny * Math.cos(ry) * Math.sin(rx) + nz * Math.cos(ry) * Math.cos(rx);
}

function nearestFace(rx: number, ry: number) {
    return CUBE_FACES.reduce((best, face) =>
        faceForwardness(face.normal, rx, ry) > faceForwardness(best.normal, rx, ry) ? face : best
    );
}

export default function MemoryCubePage() {
    const { lang } = useAppContext();
    const router = useRouter();

    // Plain motion values instead of React state: onPan writes to these directly
    // every tick with zero animation overhead, so dragging never re-renders the
    // page (title, quote, button) — that per-tick re-render was the real cause
    // of the cube feeling laggy on mobile, not the transition easing itself.
    const rotateX = useMotionValue(-20);
    const rotateY = useMotionValue(40);
    const [activeFace, setActiveFace] = useState<FaceId>("heart");
    const activeFaceRef = useRef<FaceId>("heart");

    // Play-by-play of every face she actually viewed and how long each held her
    // attention, in order — a dataset of what she did, not just a summary.
    const faceSequenceRef = useRef<{ face: FaceId; ms: number }[]>([]);
    const faceEnteredAtRef = useRef<number>(Date.now());

    // Reports the full sequence tagged to THIS page on leave, instead of
    // letting a summary value surface later as a stray field on whatever
    // page comes next.
    const flushFaceSequence = () => {
        const now = Date.now();
        faceSequenceRef.current.push({ face: activeFaceRef.current, ms: now - faceEnteredAtRef.current });
        faceEnteredAtRef.current = now;

        const sequence = faceSequenceRef.current
            .map(({ face, ms }) => `${FACE_NAMES[face]} (${Math.round(ms / 1000)}s)`)
            .join('; ');

        sendTrackBeacon({ path: '/story/cube', event: 'cube_leave', cubeFaceSequence: sequence });
    };

    useEffect(() => {
        logInsight('lastPage', 'Memory Cube');
        rotateX.set(-70);
        rotateY.set(-10);
        animateValue(rotateX, -20, { type: "spring", stiffness: 100, damping: 15 });
        animateValue(rotateY, 40, { type: "spring", stiffness: 100, damping: 15 });
        faceEnteredAtRef.current = Date.now();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useOnRealUnmount(flushFaceSequence);

    const syncActiveFace = () => {
        const face = nearestFace(rotateX.get(), rotateY.get());
        if (face.id !== activeFaceRef.current) {
            const now = Date.now();
            // Capped so a long spinning-drag session can't grow this unbounded.
            faceSequenceRef.current = [...faceSequenceRef.current.slice(-49), { face: activeFaceRef.current, ms: now - faceEnteredAtRef.current }];
            faceEnteredAtRef.current = now;

            activeFaceRef.current = face.id;
            setActiveFace(face.id);
        }
    };

    const handlePan = (event: any, info: any) => {
        rotateX.set(rotateX.get() - info.delta.y * 0.5);
        rotateY.set(rotateY.get() + info.delta.x * 0.5);
        syncActiveFace();
        logInsight('hugCount', 0.05); // Tiny affection points for interacting with memories
    };

    const faceContent: Record<FaceId, { label: string; quote: string }> = {
        heart: { label: content[lang].cube_face_heart, quote: content[lang].cube_quote_heart },
        ring: { label: content[lang].cube_face_ring, quote: content[lang].cube_quote_ring },
        cap: { label: content[lang].cube_face_cap, quote: content[lang].cube_quote_cap },
        car: { label: content[lang].cube_face_car, quote: content[lang].cube_quote_car },
        teddy: { label: content[lang].cube_face_teddy, quote: content[lang].cube_quote_teddy },
        muhh: { label: content[lang as 'en' | 'ta'].cube_face_muhh, quote: content[lang].cube_quote_muhh },
    };
    const activeIcon = CUBE_FACES.find((f) => f.id === activeFace)!.icon;

    return (
        <CinematicContainer>
            <div className="w-full h-full flex items-center justify-center">
                <StoryCard className="max-w-xl">
                    <h1 className={`text-3xl md:text-5xl font-black mb-4 text-romantic text-center ${lang === 'ta' ? 'font-tamil' : ''}`}>
                        {content[lang].cube_title}
                    </h1>
                    <p className="text-sm md:text-base font-medium opacity-60 italic mb-8 text-center px-6">
                        {content[lang].cube_desc}
                    </p>

                    {/* 3D Cube Container */}
                    <div className="relative h-64 md:h-80 w-full flex items-center justify-center perspective-[1200px] mb-6 cursor-grab active:cursor-grabbing">
                        <motion.div
                            onPan={handlePan}
                            onPanEnd={syncActiveFace}
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            style={{ rotateX, rotateY, willChange: "transform" }}
                            className="relative w-32 h-32 md:w-48 md:h-48 preserve-3d touch-none"
                        >
                            {/* Cube Faces */}
                            <div className="absolute inset-0 flex items-center justify-center cube-face translate-z-[64px] md:translate-z-[96px] shadow-2xl overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-romantic-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Heart size={64} className="text-romantic-red fill-current filter drop-shadow-[0_0_10px_rgba(255,77,77,0.3)]" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center cube-face -translate-z-[64px] md:-translate-z-[96px] rotate-y-180 shadow-2xl">
                                <span className="text-7xl filter drop-shadow-[0_0_15px_rgba(255,215,0,0.4)]">💍</span>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center cube-face translate-x-[64px] md:translate-x-[96px] rotate-y-90 shadow-2xl">
                                {/* Always black (a real cap color) in every theme; the white glow keeps
                                    the silhouette visible against the dark theme's dark cube face instead
                                    of the fill blending into the background. */}
                                <GraduationCap size={64} className="text-black fill-current filter drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center cube-face -translate-x-[64px] md:-translate-x-[96px] -rotate-y-90 shadow-2xl">
                                <Car size={64} className="text-slate-500 fill-current filter drop-shadow-[0_0_10px_rgba(148,163,184,0.5)]" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center cube-face -translate-y-[64px] md:-translate-y-[96px] rotate-x-90 shadow-2xl">
                                <span className="text-7xl filter drop-shadow-[0_0_15px_rgba(255,173,173,0.4)]">🧸</span>
                            </div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center cube-face translate-y-[64px] md:translate-y-[96px] -rotate-x-90 p-4 shadow-2xl">
                                <span className="text-6xl text-orange-400 mb-2 filter drop-shadow-[0_0_10px_rgba(251,146,60,0.3)]">🍁</span>
                                <span className={`text-[10px] md:text-sm font-black uppercase tracking-widest text-romantic text-center ${lang === 'ta' ? 'font-tamil' : ''}`}>
                                    {content[lang as 'en' | 'ta'].cube_muhh_emoji}
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                        className="flex items-center justify-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-romantic-red/60 mb-3"
                    >
                        <Move3d size={12} />
                        <span>Drag to explore our memories</span>
                    </motion.div>

                    {/* Live caption: whichever face is currently facing forward */}
                    <motion.div
                        key={activeFace}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                        className="min-h-[76px] flex flex-col items-center justify-center text-center px-4 mb-8"
                    >
                        <div className={`flex items-center gap-1.5 text-[10px] md:text-xs font-black uppercase tracking-widest text-romantic mb-1.5 ${lang === 'ta' ? 'font-tamil' : ''}`}>
                            <span className="text-base">{activeIcon}</span>
                            <span>{faceContent[activeFace].label}</span>
                        </div>
                        <p className={`text-sm md:text-base font-bold italic text-foreground/70 leading-relaxed max-w-sm ${lang === 'ta' ? 'font-tamil' : ''}`}>
                            &quot;{faceContent[activeFace].quote}&quot;
                        </p>
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => router.push("/story/reasons")}
                        className="w-full bg-romantic-red text-white py-5 rounded-3xl font-black text-xl shadow-xl flex items-center justify-center gap-4 group"
                    >
                        <span className="text-lg">{content[lang].cta_cube}</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-500" />
                    </motion.button>
                </StoryCard>
            </div>
        </CinematicContainer>
    );
}
