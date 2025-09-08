import { Star } from "lucide-react";
import React from "react";

function renderStars(rating: number, size: number = 4) {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const sizeClass = `w-${size} h-${size}`;

    // full stars
    for (let i = 0; i < fullStars; i++) {
        stars.push(
            <Star
                key={`full-${i}`}
                className={`${sizeClass} fill-travel-orange text-travel-orange`}
            />
        );
    }

    // half star
    if (hasHalfStar) {
        stars.push(
            <div key="half" className={`relative ${sizeClass}`}>
                {/* left side filled */}
                <Star className={`${sizeClass} text-travel-orange absolute left-0 top-0 clip-half`} />
                {/* right side gray */}
                <Star className={`${sizeClass} text-gray-300 absolute left-0 top-0`} />
            </div>
        );
    }

    // empty stars
    const total = hasHalfStar ? fullStars + 1 : fullStars;
    for (let i = total; i < 5; i++) {
        stars.push(
            <Star key={`empty-${i}`} className={`${sizeClass} text-gray-300`} />
        );
    }

    return stars;
}

export default renderStars;
