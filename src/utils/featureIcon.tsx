import { Waves, Car, Utensils, Dumbbell } from "lucide-react";
import React from "react";

export function getFeatureIcon(feature: string) {
    switch (feature.toLowerCase()) {
        case "private beach":
            return {
                icon: <Waves className="w-4 h-4 text-yellow-600" />,
                bg: "bg-yellow-100",
            };
        case "valet parking":
            return {
                icon: <Car className="w-4 h-4 text-blue-600" />,
                bg: "bg-blue-100",
            };
        case "5 restaurants":
        case "restaurants":
            return {
                icon: <Utensils className="w-4 h-4 text-red-600" />,
                bg: "bg-red-100",
            };
        case "fitness center":
            return {
                icon: <Dumbbell className="w-4 h-4 text-green-600" />,
                bg: "bg-green-100",
            };
        case "airport shuttle":
            return {
                icon: <Car className="w-4 h-4 text-purple-600" />,
                bg: "bg-purple-100",
            };
        case "bar":
            return {
                icon: <Utensils className="w-4 h-4 text-pink-600" />,
                bg: "bg-pink-100",
            };
        default:
            return {
                icon: <Waves className="w-4 h-4 text-gray-500" />, // fallback
                bg: "bg-gray-100",
            };
    }
}
