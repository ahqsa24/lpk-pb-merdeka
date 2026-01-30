import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';

const SplashScreen = () => {
    const [isVisible, setIsVisible] = useState(true);
    const { theme } = useTheme();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000); // 3 seconds for a perfect cinematic feel

        return () => clearTimeout(timer);
    }, []);

    const isLight = theme === 'light';

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.1,
                        filter: "blur(20px)",
                    }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden transition-colors duration-700 ${isLight ? 'bg-red-600' : 'bg-zinc-950'
                        }`}
                >
                    {/* Background Ambient Glow */}
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] ${isLight ? 'bg-white/20' : 'bg-red-600/20'
                                }`}
                        />
                    </div>

                    <div className="relative flex flex-col items-center">
                        {/* Logo with Glass Effect */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="relative mb-10"
                        >
                            {/* Outer Decorative Ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className={`absolute inset-0 -m-4 border-t-2 border-b-2 rounded-full ${isLight ? 'border-white/40' : 'border-red-500/30'
                                    }`}
                            />

                            <div className="relative w-44 h-44 bg-white/10 backdrop-blur-xl rounded-full p-6 shadow-2xl border border-white/20 flex items-center justify-center overflow-hidden group">
                                {/* Light Sweep Effect */}
                                <motion.div
                                    animate={{ left: ['-100%', '200%'] }}
                                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                    className="absolute top-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                                />

                                <div className="relative w-full h-full">
                                    <Image
                                        src={isLight ? "/assets/LPK-White.png" : "/assets/Logo-Tab.png"}
                                        alt="LPK PB Merdeka"
                                        fill
                                        className="object-contain p-2"
                                        priority
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Text Content */}
                        <div className="text-center overflow-hidden text-white">
                            <motion.h1
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                className="text-5xl md:text-6xl font-black tracking-tighter"
                            >
                                LPK PB <span className={isLight ? 'text-white/90 underline decoration-white/30 underline-offset-8' : 'text-red-600'}>MERDEKA</span>
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8, duration: 1 }}
                                className="mt-4 flex items-center justify-center gap-4"
                            >
                                <div className={`h-[1px] w-8 ${isLight ? 'bg-white/30' : 'bg-zinc-700'}`} />
                                <p className={`text-sm font-bold uppercase tracking-[0.5em] ${isLight ? 'text-white/80' : 'text-zinc-400'
                                    }`}>
                                    Professional Brokerage
                                </p>
                                <div className={`h-[1px] w-8 ${isLight ? 'bg-white/30' : 'bg-zinc-700'}`} />
                            </motion.div>
                        </div>

                        {/* Minimalist Loader */}
                        <div className={`mt-16 relative w-48 h-1 rounded-full overflow-hidden ${isLight ? 'bg-white/20' : 'bg-zinc-900'
                            }`}>
                            <motion.div
                                initial={{ left: "-100%" }}
                                animate={{ left: "100%" }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className={`absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent to-transparent ${isLight ? 'via-white' : 'via-red-600'
                                    }`}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SplashScreen;
