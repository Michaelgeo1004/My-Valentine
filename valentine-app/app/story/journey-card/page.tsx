"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { Star, Heart, Calendar, Map, ArrowRight, Sparkles, Moon, Droplet, BookOpen, TrainFront, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { content } from "@/constants/content";
import { CinematicContainer } from "@/components/CinematicContainer";
import { StoryCard } from "@/components/StoryCard";
import { sendTrackBeacon, useOnRealUnmount } from "@/utils/insights";

const milestones = [
    {
        date: "Jan 22, 2021",
        title: { en: "Where It All Began", ta: "எல்லாம் தொடங்கிய நாள்" },
        desc: { en: "Two strangers crossed paths in a lab on an ordinary day, over a shy hello, with no idea it would become the beginning of everything.", ta: "ஒரு ஆய்வகத்தில், ஒரு சாதாரண நாளில், ஒரு தயக்கமான வணக்கத்துடன் இரு அந்நியர்கள் சந்தித்தனர், அது எல்லாவற்றின் தொடக்கமாக மாறும் என்று தெரியாமல்." },
        icon: Calendar,
        color: "from-romantic-pink/20 to-transparent"
    },
    {
        date: "2019 - 2023",
        title: { en: "The Loyola Chapter", ta: "லயோலா அத்தியாயம்" },
        desc: { en: "Where our hearts first started beating to the same rhythm. Every shared class and stolen glance built the foundation of us.", ta: "நம் இதயங்கள் ஒரே தாளத்தில் துடிக்கத் தொடங்கிய இடம். ஒவ்வொரு வகுப்பும், ஒவ்வொரு பார்வையும் நம் காதலின் அஸ்திவாரமானது." },
        icon: Star,
        color: "from-romantic-gold/20 to-transparent"
    },
    {
        date: "Jun 11, 2022",
        title: { en: "The Electric Spark", ta: "முதல் கை தீண்டல்" },
        desc: { en: "That moment our hands touched for the first time—just a brush of fingers, but it rewired everything I thought I knew about magic.", ta: "நம் கைகள் முதன்முதலில் தொட்டுக்கொண்ட அந்தத் தருணம்—ஒரு சிறிய தீண்டல் மட்டுமே, ஆனால் அது மாயாஜாலம் பற்றி நான் அறிந்த அனைத்தையும் மாற்றியது." },
        icon: Heart,
        color: "from-romantic-pink/30 to-transparent"
    },
    {
        date: "Aug 7, 2022",
        title: { en: "Her Shoulder, My Peace", ta: "அவள் தோளில், என் அமைதி" },
        desc: { en: "Sitting together in a Chennai park, I laid my head on her shoulder, and for a while the whole city went quiet.", ta: "சென்னையின் ஒரு பூங்காவில் ஒன்றாக அமர்ந்திருந்தோம், நான் அவள் தோளில் தலை சாய்த்தேன், அந்த நேரத்தில் நகரமே அமைதியானது." },
        icon: Moon,
        color: "from-romantic-pink/20 to-transparent"
    },
    {
        date: "Nov 27, 2022",
        title: { en: "The Sacred Promise", ta: "நீ எனக்கான நாள்" },
        desc: { en: "The day the world faded away and it was just us. You became my home.", ta: "உலகமே மறைந்து நாம் மட்டும் எஞ்சிய நாள். நீயே என் உலகம் என்று நான் உணர்ந்த நாள்." },
        icon: Heart,
        color: "from-romantic-red/20 to-transparent"
    },
    {
        date: "Mar 12, 2023",
        title: { en: "A Portrait in Red", ta: "சிவப்பில் ஒரு உருவப்படம்" },
        desc: { en: "For her birthday, I gave a piece of myself, quite literally, to paint her portrait in the one color that mattered—proof that some love goes deeper than skin.", ta: "அவள் பிறந்தநாளுக்கு, என்னிடமிருந்து ஒரு துளியை, உண்மையிலேயே, அவள் உருவப்படத்தை வரைய கொடுத்தேன்—சில காதல்கள் தோலை விட ஆழமானவை என்பதற்கு சான்று." },
        icon: Droplet,
        color: "from-romantic-red/30 to-transparent"
    },
    {
        date: "Mar 25, 2023",
        title: { en: "The First Kiss", ta: "முதல் முத்தம்" },
        desc: { en: "At Nexus Mall, she gave me a gift, then guided my hand gently over her heart so I could feel it racing just for me. Hours later, past midnight, beside a roadside bin on an ordinary street, our first kiss—and in that instant, the most ordinary place in the world became the one I'd remember forever.", ta: "நெக்ஸஸ் மாலில், அவள் எனக்கு ஒரு பரிசு கொடுத்தாள், பின்பு என் கையை மெதுவாக தன் இதயத்தின் மேல் வைத்தாள், அவளது இதயம் என்னைக் கண்டு துடிப்பதை என்னால் உணர முடிந்தது. மணிநேரங்களுக்குப் பிறகு, நள்ளிரவைக் கடந்து, ஒரு சாதாரண தெருவில் ஒரு குப்பைத் தொட்டிக்கு அருகில், நமது முதல் முத்தம்—அந்த நொடியில், உலகின் மிகச் சாதாரண இடம், நான் என்றென்றும் நினைவில் வைக்கும் இடமாக மாறியது." },
        icon: Sparkles,
        color: "from-romantic-gold/20 to-transparent"
    },
    {
        date: "May 5, 2023",
        title: { en: "A Journey to Her Village", ta: "அவள் கிராமத்திற்கான பயணம்" },
        desc: { en: "Long roads, deep conversations, and a journey to her village—and the only photograph we have of us together, a rare moment she let me capture on camera.", ta: "நீண்ட சாலைகள், ஆழமான உரையாடல்கள், அவள் கிராமத்திற்கான பயணம்—நம் இருவரின் ஒரே புகைப்படம், அவள் என்னை புகைப்படம் எடுக்க அனுமதித்த அரிய தருணம்." },
        icon: Map,
        color: "from-romantic-pink/20 to-transparent"
    },
    {
        date: "May 9, 2023",
        title: { en: "A Quiet Reverence", ta: "ஒரு அமைதியான பணிவு" },
        desc: { en: "In a quiet corner of the college library, I knelt down and touched her feet—a small act of devotion that said more than words ever could.", ta: "கல்லூரி நூலகத்தின் அமைதியான மூலையில், நான் குனிந்து அவள் காலைத் தொட்டேன்—வார்த்தைகளை விட அதிகம் சொன்ன ஒரு சிறிய பக்தி செயல்." },
        icon: BookOpen,
        color: "from-romantic-gold/20 to-transparent"
    },
    {
        date: "Jul 31, 2023",
        title: { en: "Across the City, For Her", ta: "அவளுக்காக, நகரம் முழுவதும்" },
        desc: { en: "Took the local train from Tambaram to Egmore, then the superfast back to Tambaram with her by my side. Some distances are worth traveling twice.", ta: "தாம்பரத்திலிருந்து எழும்பூருக்கு லோக்கல் ரயிலில் சென்று, பின்பு அவளுடன் சூப்பர்ஃபாஸ்ட் ரயிலில் தாம்பரத்திற்கு திரும்பினேன். சில தூரங்கள் இரண்டு முறை பயணிக்கத் தகுதியானவை." },
        icon: TrainFront,
        color: "from-romantic-red/20 to-transparent"
    },
    {
        date: "May 28, 2024",
        title: { en: "A Day Only We Understand", ta: "நாங்கள் மட்டும் புரிந்துகொள்ளும் ஒரு நாள்" },
        desc: { en: "Some days don't need to be explained—they just need to be remembered.", ta: "சில நாட்களுக்கு விளக்கம் தேவையில்லை—அவை நினைவில் வைக்கப்பட வேண்டும், அவ்வளவே." },
        icon: Lock,
        color: "from-romantic-pink/30 to-transparent"
    },
    {
        date: "Nov 22, 2024",
        title: { en: "The Circle of Love", ta: "மோதிரம் & நம்பிக்கை" },
        desc: { en: "At a bus stand, of all places, right before I flew to Dubai—she looked at me and placed a ring in my hand. Not the setting anyone plans for, but the promise was real.", ta: "ஒரு பேருந்து நிலையத்தில், நான் துபாய்க்குப் பறக்கும் சற்று முன்பு—அவள் என்னைப் பார்த்து ஒரு மோதிரத்தை என் கையில் வைத்தாள். யாரும் திட்டமிடும் இடம் இல்லை, ஆனால் அந்த வாக்குறுதி உண்மையானது." },
        icon: Heart,
        color: "from-romantic-red/30 to-transparent"
    },
    {
        date: "Jan 30, 2026",
        title: { en: "Until Our Hands Meet Again", ta: "நம் கைகள் மீண்டும் சந்திக்கும் வரை" },
        desc: { en: "The last time our hands touched in person. Life pulled us apart, but this hand still remembers hers.", ta: "நேரடியாக நம் கைகள் தொட்ட கடைசி முறை. வாழ்க்கை நம்மைப் பிரித்தது, ஆனால் இந்தக் கை இன்னும் அவளுடையதை நினைவில் வைத்திருக்கிறது." },
        icon: Heart,
        color: "from-romantic-gold/20 to-transparent"
    },
    {
        date: "Present Day",
        title: { en: "The Beautiful Distance", ta: "இந்த அழகான தூரம்" },
        desc: { en: "Miles apart but spirit-bound. Every heartbeat brings us closer to our forever.", ta: "மைல்கள் தள்ளி இருந்தாலும் ஆத்மார்த்தமாக இணைந்திருக்கிறோம். ஒவ்வொரு துடிப்பும் நம்மை ஒன்றிணைக்கிறது." },
        icon: Map,
        color: "from-romantic-gold/30 to-transparent"
    }
];

export default function JourneyCardPage() {
    const { lang } = useAppContext();
    const router = useRouter();
    const seenIndicesRef = useRef<Set<number>>(new Set());
    const seenMilestonesRef = useRef<string[]>([]);

    // Reports every milestone she actually scrolled to, in order, tagged to
    // THIS page on leave — instead of letting a summary value surface later
    // as a stray field on whatever page comes next.
    useOnRealUnmount(() => {
        if (seenMilestonesRef.current.length > 0) {
            sendTrackBeacon({
                path: '/story/journey-card',
                event: 'journey_leave',
                milestonesSeen: seenMilestonesRef.current.join('; '),
            });
        }
    });

    return (
        <CinematicContainer>
            <StoryCard className="max-w-4xl flex flex-col items-center">
                {/* Header Section */}
                <div className="text-center mb-16 relative z-10 w-full">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="absolute inset-x-0 -top-20 h-64 bg-romantic-red/10 blur-[100px] rounded-full"
                    />
                    <h1 className="text-4xl md:text-7xl font-black mb-6 text-romantic tracking-tight">
                        {content[lang].milestone_title}
                    </h1>
                    <p className={`text-sm md:text-xl font-medium opacity-60 italic max-w-2xl mx-auto px-6 leading-relaxed ${lang === 'ta' ? 'font-tamil' : ''}`}>
                        {content[lang].milestone_desc}
                    </p>
                </div>

                {/* Vertical Cinematic Timeline */}
                <div className="relative w-full max-w-3xl px-4 md:px-0 mb-8 md:mb-12">

                    {/* The Living Path (Vertical Line) */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 overflow-hidden">
                        <div className="absolute inset-0 bg-white/10" />
                        <motion.div
                            initial={{ top: "-100%" }}
                            animate={{ top: "100%" }}
                            transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                            className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-romantic-red to-transparent shadow-[0_0_20px_rgba(255,77,77,0.8)]"
                        />
                    </div>

                    {/* Timeline Items — zigzag left/right of the center line at
                        every width, not just desktop, since a single-side rail
                        read as flat/boring on mobile. */}
                    <div className="space-y-6 md:space-y-24 relative z-10 pb-28 md:pb-32">
                        {milestones.map((m, i) => (
                            <div key={m.date} className="relative">
                                <motion.div
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50, y: 20 }}
                                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    onViewportEnter={() => {
                                        // `viewport.once` should already prevent a second fire per element, but
                                        // guard anyway — dev-mode double-invoke elsewhere taught us not to trust that alone.
                                        if (!seenIndicesRef.current.has(i)) {
                                            seenIndicesRef.current.add(i);
                                            seenMilestonesRef.current.push(`${m.date} — ${m.title.en}`);
                                        }
                                    }}
                                    className={`flex ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center gap-0`}
                                >
                                    {/* Event Content Card */}
                                    <div className={`w-[46%] ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                        <motion.div
                                            whileHover={{ scale: 1.02, y: -5 }}
                                            className={`glass-card p-3 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-white/10 relative overflow-hidden group shadow-2xl bg-white/5 backdrop-blur-xl`}
                                        >
                                            <div className={`absolute inset-0 bg-gradient-to-br ${m.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                                            <div className="relative z-10">
                                                <span className="text-[7px] md:text-[12px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-romantic-red opacity-80 mb-1 md:mb-2 block">
                                                    {m.date}
                                                </span>
                                                <h3 className={`text-xs md:text-3xl font-black text-romantic mb-1 md:mb-4 tracking-tight md:tracking-tighter leading-tight ${lang === 'ta' ? 'font-tamil' : ''}`}>
                                                    {/* @ts-ignore */}
                                                    {m.title[lang]}
                                                </h3>
                                                <p className={`text-[9px] md:text-base text-gray-400 font-medium leading-snug md:leading-relaxed italic ${lang === 'ta' ? 'font-tamil' : ''}`}>
                                                    {/* @ts-ignore */}
                                                    {m.desc[lang]}
                                                </p>
                                            </div>

                                            {/* Corner Decoration */}
                                            <m.icon size={16} className="hidden md:block absolute bottom-4 right-4 text-romantic-red/10 group-hover:text-romantic-red/40 transition-colors" />
                                        </motion.div>
                                    </div>

                                    {/* Empty space for alternating layout */}
                                    <div className="w-[8%] md:w-[45%]" />
                                </motion.div>

                                {/* Center Marker — sits on this plain, un-animated
                                    wrapper (not the motion.div above) so its position
                                    stays locked to the timeline instead of drifting
                                    with the content's own enter-animation transform. */}
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                                    <motion.div
                                        whileInView={{ scale: [0, 1.2, 1], rotate: [0, 90, 0] }}
                                        viewport={{ once: true }}
                                        className="w-7 h-7 md:w-12 md:h-12 rounded-full glass-card border-2 border-romantic-red flex items-center justify-center bg-white shadow-[0_0_20px_rgba(255,77,77,0.3)] z-20 group"
                                    >
                                        <Heart size={12} className="text-romantic-red fill-current group-hover:scale-125 transition-transform md:hidden" />
                                        <Heart size={20} className="hidden md:block text-romantic-red fill-current group-hover:scale-125 transition-transform" />

                                        {/* Radial Pulse */}
                                        <motion.div
                                            animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                            className="absolute inset-0 rounded-full bg-romantic-red/30 -z-10"
                                        />
                                    </motion.div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* End Marker — centered with flexbox across the full width
                        instead of a left-8 + -translate-x-1/2 trick, which pushed
                        this wide, letter-spaced text half off the left edge on
                        mobile. */}
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4">
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-1 h-20 bg-gradient-to-b from-romantic-red to-transparent rounded-full"
                        />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30 text-center">To Be Continued...</span>
                    </div>
                </div>

                {/* Final Call to Action */}
                <div className="w-full mt-8 md:mt-16 relative z-20">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-center mb-10 px-8"
                    >
                        <p className="text-xl md:text-3xl font-black text-romantic italic">
                            "Our story isn't just a series of dates... it's a map of my soul."
                        </p>
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push("/story/anniversary")}
                        className="w-full bg-romantic-red text-white py-6 md:py-8 rounded-[2.5rem] font-black text-base md:text-2xl shadow-2xl flex items-center justify-center gap-3 md:gap-4 group overflow-hidden relative whitespace-nowrap px-4"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <Sparkles size={22} className="shrink-0 group-hover:rotate-180 transition-transform duration-700" />
                        <span>{content[lang].cta_milestones}</span>
                        <ArrowRight size={22} className="shrink-0 group-hover:translate-x-1 transition-transform duration-700" />
                    </motion.button>
                </div>
            </StoryCard>
        </CinematicContainer>
    );
}
