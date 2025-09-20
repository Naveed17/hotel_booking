import { Waves, Car, Utensils, Dumbbell, Wifi, Coffee } from "lucide-react";
import React from "react";

export function getFeatureIcon(feature: string, size: string = "w-4 h-4") {
    switch (feature.toLowerCase()) {
        case "private beach":
            return {
                icon: <Waves className={`${size} text-yellow-600`} />,
                bg: "bg-yellow-100",
            };
        case "valet parking":
        case "parking":
            return {
                icon: <Car className={`${size} text-blue-600`} />,
                bg: "bg-blue-100",
            };
        case "5 restaurants":
        case "restaurants":
        case "restaurant":
            return {
                icon: <Utensils className={`${size} text-red-600`} />,
                bg: "bg-red-100",
            };
        case "fitness center":
        case "gym":
            return {
                icon: <Dumbbell className={`${size} text-green-600`} />,
                bg: "bg-green-100",
            };
        case "airport shuttle":
            return {
                icon: <Car className={`${size} text-purple-600`} />,
                bg: "bg-purple-100",
            };
        case "bar":
            return {
                icon: <Utensils className={`${size} text-pink-600`} />,
                bg: "bg-pink-100",
            };
        case "wifi":
            return {
                icon: <Wifi className={`${size} text-blue-600`} />,
                bg: "bg-blue-100",
            };
        case "pool":
            return {
                icon: <Waves className={`${size} text-cyan-600`} />,
                bg: "bg-cyan-100",
            };
        case "room service":
            return {
                icon: <Coffee className={`${size} text-orange-600`} />,
                bg: "bg-orange-100",
            };
        default:
            return {
                icon: <Waves className={`${size} text-gray-500`} />, // fallback
                bg: "bg-gray-100",
            };
    }
}
