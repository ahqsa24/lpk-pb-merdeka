import React from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, width = "fit-content" }) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ width }}
        >
            {children}
        </motion.div>
    );
};
