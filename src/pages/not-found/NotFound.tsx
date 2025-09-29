import  { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

// NotFound - single-file React + Tailwind + GSAP + Framer Motion
// Default export a component you can drop into a route like: <Route path="*" element={<NotFound />} />

export default function NotFound() {
    const navigate = useNavigate();
    const orbRef = useRef<HTMLDivElement | null>(null);
    const ringRef = useRef<HTMLDivElement | null>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        // GSAP setup: subtle infinite float + rotation
        if (!orbRef.current || !ringRef.current) return;

        // Master timeline for coordinated infinite animations
        tl.current = gsap.timeline({ repeat: -1, defaults: { ease: "sine.inOut" } });

        tl.current
            .to(orbRef.current, { y: -18, duration: 2 })
            .to(orbRef.current, { y: 0, duration: 2 })
            .to(ringRef.current, { rotation: 360, duration: 8 }, "-=_4") // continuous slow rotation
            .to(orbRef.current, { x: 10, duration: 2 }, "-=_2")
            .to(orbRef.current, { x: -10, duration: 2 });

        // micro floating for other decorative elements (staggered)
        gsap.to(".float-dot", { y: -10, repeat: -1, yoyo: true, duration: 3, stagger: 0.3 });

        return () => {
            tl.current?.kill();
            gsap.killTweensOf(".float-dot");
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-rose-900 flex items-center justify-center p-6">
            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left: Visual */}
                <div className="relative flex items-center justify-center">
                    <div
                        ref={ringRef}
                        className="absolute -inset-6 rounded-full blur-3xl opacity-40 bg-gradient-to-r from-pink-400 to-indigo-400"
                        aria-hidden
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center"
                    >
                        {/* Central orb */}
                        <div
                            ref={orbRef}
                            className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-tr from-white/90 to-indigo-200/60 shadow-2xl flex items-center justify-center"
                            style={{ backdropFilter: "blur(6px)" }}
                            aria-hidden
                        >
                            <svg viewBox="0 0 200 80" width="160" height="60" role="img" aria-hidden>
                                <g>
                                    <text
                                        x="50%"
                                        y="50%"
                                        dominantBaseline="middle"
                                        textAnchor="middle"
                                        fontSize="38"
                                        fontWeight={800}
                                        fill="url(#g)"
                                        style={{ fontFamily: 'Inter, ui-sans-serif, system-ui' }}
                                    >
                                        404
                                    </text>
                                    <defs>
                                        <linearGradient id="g" x1="0" x2="1">
                                            <stop offset="0" stopColor="#4f46e5" />
                                            <stop offset="1" stopColor="#ec4899" />
                                        </linearGradient>
                                    </defs>
                                </g>
                            </svg>
                        </div>

                        {/* Decorative floating dots */}
                        <div className="pointer-events-none">
                            <div className="float-dot absolute -top-6 -left-6 w-4 h-4 rounded-full bg-white/80 shadow-lg" />
                            <div className="float-dot absolute top-10 right-6 w-3 h-3 rounded-full bg-white/70 shadow-md" />
                            <div className="float-dot absolute bottom-6 left-10 w-5 h-5 rounded-full bg-white/50 shadow" />
                        </div>
                    </motion.div>
                </div>

                {/* Right: Text + actions */}
                <div className="text-white flex flex-col gap-6">
                    <motion.h1
                        initial={{ x: 60, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 80, damping: 12 }}
                        className="text-4xl md:text-5xl font-extrabold leading-tight"
                    >
                        Oops — page not found
                    </motion.h1>

                    <motion.p
                        initial={{ x: 80, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.08, duration: 0.45 }}
                        className="text-lg text-slate-200 max-w-md"
                    >
                        The page you are looking for doesn't exist or has been moved. Try returning to the home page — we’ll get you back on track.
                    </motion.p>

                    <div className="flex items-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate("/")}
                            className="inline-flex items-center gap-3 bg-white text-slate-900 px-5 py-3 rounded-2xl font-medium shadow-lg hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/30"
                        >
                            {/* Home icon (simple) */}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                                <path d="M3 10.5L12 4l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10.5z" fill="currentColor" />
                            </svg>
                            Back to Home
                        </motion.button>

                        <motion.a
                            whileHover={{ scale: 1.02 }}
                            href="/contact"
                            className="text-sm text-white/90 underline underline-offset-4"
                        >
                            Contact support
                        </motion.a>
                    </div>

                    <div className="mt-6 text-sm text-white/60">
                        <p>Or try searching for what you need from the main menu.</p>
                    </div>

                    {/* subtle infinite hint bar */}
                    <div className="mt-8">
                        <div className="relative w-full max-w-sm h-2 bg-white/6 rounded-full overflow-hidden">
                            <div
                                className="absolute h-full left-0 top-0 rounded-full"
                                style={{ width: "40%", background: "linear-gradient(90deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02))" }}
                            >
                                {/* animated strip via CSS */}
                                <div className="animate-loading h-full w-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Inline styles for tiny animation utilities (Tailwind + small keyframes) */}
            <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(20%); }
          100% { transform: translateX(120%); }
        }

        .animate-loading {
          background: linear-gradient(90deg, rgba(255,255,255,0.18), rgba(255,255,255,0.02));
          animation: loading 3s linear infinite;
        }
      `}</style>
        </div>
    );
}
