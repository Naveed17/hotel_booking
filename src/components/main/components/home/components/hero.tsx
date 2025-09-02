'use client';
import { MainSearch } from '@components/main';
import React, { useState } from 'react'

function Hero() {

    return (
        <section
            className="relative h-[634px] bg-cover bg-center bg-no-repeat flex items-center justify-center"
            style={{
                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.20)), linear-gradient(180deg, rgba(0, 0, 0, 0.00) 46.98%, rgba(0, 0, 0, 0.77) 92.61%), url('https://api.builder.io/api/v1/image/assets/TEMP/8dcf4684796d62a910be9c54b0c2c595edef1e5a?width=2880')`
            }}
        >
            <div className="container mx-auto px-4">
                {/* Hero Title */}
                <div className="text-center mb-8">
                    <h1 className="text-white text-4xl md:text-6xl font-black text-center max-w-4xl mx-auto mb-8 font-urbanist leading-tight">
                        Discover the<br />World's Hidden Treasures
                    </h1>
                </div>

                {/* Search Form */}
                <MainSearch />
            </div>
        </section>
    )
}

export default Hero