'use client';
import { MainSearch } from '@components/main';
import React, { useState } from 'react'
import { motion } from 'framer-motion';

const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 1.2, ease: "easeInOut" }
    }
};


const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: any) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            delay: custom * 0.3,
            ease: "easeOut"
        }
    })
};
function Hero() {

    return (
        <motion.section
            className="relative h-[634px] bg-cover bg-center bg-no-repeat flex items-center justify-center"
            style={{
                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.20)), linear-gradient(180deg, rgba(0, 0, 0, 0.00) 46.98%, rgba(0, 0, 0, 0.77) 92.61%), url('https://api.builder.io/api/v1/image/assets/TEMP/8dcf4684796d62a910be9c54b0c2c595edef1e5a?width=2880')`
            }}
            variants={sectionVariants as any}
            initial="hidden"
            animate="visible"
        >
            <div className="container mx-auto px-4">
                {/* Hero Title with staggered animation */}
                <div className="text-center mb-8">
                    <h1 className="text-white text-4xl md:text-6xl font-black text-center max-w-4xl mx-auto mb-8 leading-tight">
                        <motion.span
                            className="inline-block"
                            variants={titleVariants as any}
                            initial="hidden"
                            animate="visible"
                            custom={1}
                        >
                            Discover the
                        </motion.span>
                        <br />
                        <motion.span
                            className="inline-block"
                            variants={titleVariants as any}
                            initial="hidden"
                            animate="visible"
                            custom={2}
                        >
                            World's Hidden Treasures
                        </motion.span>
                    </h1>
                </div>

                {/* Search Form with delayed appearance */}
                <MainSearch />
            </div>
        </motion.section>
    )
}

export default Hero

