import { Star } from "lucide-react";
import React from "react";

function renderStars(rating: number) {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // full stars
    for (let i = 0; i < fullStars; i++) {
        stars.push(
            <Star
                key={`full-${i}`}
                className="w-4 h-4 fill-travel-orange text-travel-orange"
            />
        );
    }

    // half star
    if (hasHalfStar) {
        stars.push(
            <div key="half" className="relative w-4 h-4">
                {/* left side filled */}
                <Star className="w-4 h-4 text-travel-orange absolute left-0 top-0 clip-half" />
                {/* right side gray */}
                <Star className="w-4 h-4 text-gray-300 absolute left-0 top-0" />
            </div>
        );
    }

    // empty stars (if you want always 5)
    const total = hasHalfStar ? fullStars + 1 : fullStars;
    for (let i = total; i < 5; i++) {
        stars.push(
            <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
        );
    }

    return stars;
}
export default renderStars;
