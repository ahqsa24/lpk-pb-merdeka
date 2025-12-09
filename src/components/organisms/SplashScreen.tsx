import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const SplashScreen = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2500); // Slightly longer for the "Wow" effect

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-red-600"
                >
                    <div className="flex flex-col items-center gap-6">
                        {/* Logo Animation */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                duration: 1.5
                            }}
                            className="relative w-40 h-40 bg-white rounded-full p-4 shadow-2xl"
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src="/assets/Logo-Tab.png"
                                    alt="LPK PB Merdeka"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </motion.div>

                        {/* Text Animation */}
                        <div className="text-center">
                            <motion.h1
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                                className="text-4xl md:text-5xl font-extrabold text-white tracking-wider drop-shadow-md"
                            >
                                LPK PB Merdeka
                            </motion.h1>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                                className="text-red-100 text-lg md:text-xl font-medium mt-2 tracking-widest uppercase"
                            >
                                Molding Professional Brokers
                            </motion.p>
                        </div>

                        {/* Loader Line */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "200px" }}
                            transition={{ delay: 1, duration: 1.2, ease: "easeInOut" }}
                            className="h-1.5 bg-white/50 rounded-full mt-4"
                        >
                            <motion.div
                                className="h-full bg-white rounded-full"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ delay: 1, duration: 1.2, ease: "easeInOut" }}
                            />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SplashScreen;
