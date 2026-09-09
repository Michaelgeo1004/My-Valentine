"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { logInsight, sendTrackBeacon, useOnRealUnmount } from "@/utils/insights";
import { Mail, MailOpen, Heart, Star, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";

const lettersData = {
    en: [
        { title: "To my Muhh", date: "Jan 22, 2021", text: "From the very first day, I knew you were different. Your kindness and your stubbornness—just like mine—made me realize how rare you were. Those 5 years were just the beginning of a love that still hasn't ended." },
        { title: "The Dubai Note", date: "2023 Reflection", text: "Every morning in Dubai, despite the heat and the distance, I wake up with one thought of you. You are my North Star, guiding me back home." },
        { title: "College Days", date: "Loyola Memory", text: "I still remember the thrill of chasing your bus. That 1000/100 ego of mine? It never stood a chance against your beautiful smile. I'd chase that bus forever if it meant seeing you." },
        { title: "The Blood Art", date: "Emotional Soul", text: "That piece of art I gave you... it wasn't just colors on a page. It was my heartbeat, my soul, the deepest parts of me showing you how much you mean to me. It's a bond that will always be ours." },
        { title: "The Promise", date: "Forever", text: "You are, and always will be, one of my truest priorities—never the least. I did the things I did for us, and I still mean every one of them. You were my world, and you still are." }
    ],
    ta: [
        { title: "என் முஹ்-விடம்", date: "ஜனவரி 22, 2021", text: "முதல் நாளிலேயே நீ வித்தியாசமானவள் என்று எனக்குத் தெரியும். உன் கருணையும், உன் பிடிவாதமும்—என்னுடையதைப் போலவே—நீ எவ்வளவு அரிதானவள் என்பதை உணரச் செய்தது. அந்த 5 ஆண்டுகள் இன்னும் முடியாத ஒரு காதலின் தொடக்கம் மட்டுமே." },
        { title: "துபாய் குறிப்பு", date: "2023 பிரதிபலிப்பு", text: "துபாயில் ஒவ்வொரு காலையும், வெப்பத்தையும் தூரத்தையும் பொருட்படுத்தாமல், நான் உன்னை நினைத்தே எழுகிறேன். நீ என் நட்சத்திரம், என்னை வீட்டிற்கு வழிநடத்துகிறாய்." },
        { title: "கல்லூரி நாட்கள்", date: "லயோலா நினைவு", text: "உன் பேருந்தைத் துரத்திய அதிர்வுகள் இன்னும் எனக்கு ஞாபகம் இருக்கிறது. அந்த 1000/100 ஈகோ? உன் அழகான புன்னகைக்கு முன்னால் அதற்கு ஒரு வாய்ப்பும் இல்லை." },
        { title: "இரத்தக் கலை", date: "உணர்ச்சிப்பூர்வமான ஆன்மா", text: "நான் உனக்குக் கொடுத்த அந்தக் கலைப்படைப்பு... அது வெறும் காகிதத்தில் உள்ள வண்ணங்கள் அல்ல. அது என் இதயத்துடிப்பு, என் ஆன்மா, நீ எனக்கு எவ்வளவு அர்த்தமாக இருக்கிறாய் என்பதைக் காட்டும் என் ஆழமான பகுதிகள். இது என்றென்றும் நம்முடையதாகவே இருக்கும் ஒரு பிணைப்பு." },
        { title: "சத்தியம்", date: "என்றென்றும்", text: "நீ இருக்கிறாய், இன்னும் இருப்பாய், என் உண்மையான முன்னுரிமைகளில் ஒருவளாக—ஒருபோதும் குறைந்தவளாக இல்லை. நான் செய்த சிலவற்றை நமக்காகவே செய்தேன், இன்னும் அவை ஒவ்வொன்றையும் நான் நம்புகிறேன். நீயே என் உலகமாக இருந்தாய், இன்னும் இருக்கிறாய்." }
    ]
};

export default function LettersPage() {
    const { lang } = useAppContext();
    const router = useRouter();
    const [openLetter, setOpenLetter] = useState<number | null>(null);
    const [favorited, setFavorited] = useState<number[]>([]);
    const openedTitlesRef = useRef<string[]>([]);

    useEffect(() => {
        logInsight('lastPage', 'Letters from the Heart');
    }, []);

    // Reports which envelopes were opened and which were favorited, tagged to
    // THIS page on leave.
    useOnRealUnmount(() => {
        if (openedTitlesRef.current.length > 0 || favorited.length > 0) {
            sendTrackBeacon({
                path: '/story/letters',
                event: 'letters_leave',
                lettersOpened: openedTitlesRef.current.join('; '),
                lettersFavorited: favorited.map(i => lettersData[lang][i].title).join('; '),
            });
        }
    });

    const handleOpenLetter = (index: number) => {
        if (openLetter !== index) {
            setOpenLetter(index);
            logInsight('hugCount', 1); // Opening a letter is an affection point
            const title = lettersData[lang][index].title;
            if (!openedTitlesRef.current.includes(title)) {
                openedTitlesRef.current.push(title);
            }
        } else {
            setOpenLetter(null);
        }
    };

    const toggleFavorite = (index: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setFavorited(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
    };

    return (
        <CinematicContainer>
            <StoryCard className="max-w-xl">
                <h1 className="text-3xl md:text-5xl font-black mb-2 text-romantic text-center">
                    {content[lang].letters_title}
                </h1>
                <p className="text-sm md:text-base font-medium opacity-60 italic mb-10 text-center">
                    {content[lang].letters_desc}
                </p>

                <div className="space-y-6 mb-12">
                    {lettersData[lang].map((letter, i) => (
                        <div key={i} className="relative">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                onClick={() => handleOpenLetter(i)}
                                className={`glass-card p-6 rounded-3xl border-white/10 flex items-center justify-between cursor-pointer transition-all duration-500 ${openLetter === i ? 'bg-romantic-red/5 border-romantic-red/40 translate-y-2' : ''}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-4 rounded-full ${openLetter === i ? 'bg-romantic-red text-white' : 'bg-white/5 opacity-50'}`}>
                                        {openLetter === i ? <MailOpen size={24} /> : <Mail size={24} />}
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-black text-lg text-romantic">{letter.title}</h3>
                                        <p className="text-[10px] uppercase tracking-widest opacity-40">{letter.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={(e) => toggleFavorite(i, e)}
                                        aria-label="Favorite this letter"
                                        className="p-2 rounded-full hover:bg-white/10 transition-colors"
                                    >
                                        <Star size={18} className={favorited.includes(i) ? 'text-romantic-gold fill-current' : 'text-foreground/20'} />
                                    </button>
                                    <Heart size={20} className={`text-romantic-red transition-all duration-500 ${openLetter === i ? 'fill-current scale-125' : 'opacity-20'}`} />
                                </div>
                            </motion.div>

                            <AnimatePresence>
                                {openLetter === i && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0, rotateX: -20, originY: 0 }}
                                        animate={{ opacity: 1, height: "auto", rotateX: 0, originY: 0 }}
                                        exit={{ opacity: 0, height: 0, rotateX: -20, originY: 0 }}
                                        transition={{ type: "spring", damping: 20, stiffness: 100 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="mt-4 glass-card p-5 md:p-14 rounded-3xl border-white/20 bg-white/5 mx-2 text-left shadow-2xl relative overflow-hidden">
                                            {/* Paper Texture Overlay */}
                                            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")' }} />

                                            {/* Decorative Seal */}
                                            <div className="absolute top-4 right-4 text-romantic-red/10">
                                                <Heart size={40} className="fill-current" />
                                            </div>

                                            <p className={`text-lg md:text-xl leading-relaxed text-foreground/90 font-serif mb-8 border-l-4 border-romantic-red/20 pl-4 md:pl-6 ${lang === 'ta' ? 'font-tamil' : ''}`}>
                                                {letter.text}
                                            </p>

                                            <div className="mt-8 flex justify-end items-center gap-4 border-t border-white/5 pt-6">
                                                <div className="text-right">
                                                    <p className="font-handwriting text-2xl text-romantic-red italic">Geo</p>
                                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-30">Your Favorite Driver</p>
                                                </div>
                                                <div className="w-10 h-10 rounded-full bg-romantic-red/10 flex items-center justify-center text-romantic-red">
                                                    <Heart size={20} className="fill-current" />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => router.push("/story/capsule")}
                    className="w-full bg-romantic-red text-white py-5 rounded-3xl font-black text-xl shadow-xl flex items-center justify-center gap-4 group"
                >
                    <span>{content[lang].cta_letters}</span>
                    <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform duration-500" />
                </motion.button>
            </StoryCard>
        </CinematicContainer>
    );
}
