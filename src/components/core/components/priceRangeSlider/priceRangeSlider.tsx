import useLocale from '@hooks/useLocale';
import React, { useRef, useEffect, ChangeEvent } from 'react';

interface PriceRangeSliderProps {
    min?: number;
    max?: number;
    value: { min: number; max: number };
    onChange: (values: { min: number; max: number }) => void;
    priceRange: { min: number; max: number }
}

export default function PriceRangeSlider({
    min = 0,
    max = 1000,
    value,
    onChange,
    priceRange
}: PriceRangeSliderProps) {
    const range = useRef<HTMLDivElement>(null);
    const { locale } = useLocale();
    const dir = locale === 'ar' ? 'right' : 'left';
    const minVal = value.min;
    const maxVal = value.max;

    // Update fill bar between thumbs
    useEffect(() => {
        const minPercent = ((minVal - min) / (max - min)) * 100;
        const maxPercent = ((maxVal - min) / (max - min)) * 100;

        if (range.current) {
            range.current.style[dir] = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, maxVal, min, max, dir]);

    const onMinChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newMin = Math.min(Number(e.target.value), maxVal);
        onChange({ min: newMin, max: maxVal });
    };

    const onMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newMax = Math.max(Number(e.target.value), minVal);
        onChange({ min: minVal, max: newMax });
    };

    return (
        <div className="space-y-6">
            {/* Enhanced Price Display */}
            <div className="flex justify-between items-center">
                <div className="bg-blue-50 px-4 py-2 rounded-xl flex items-center gap-1">
                    <span className="text-sm font-bold text-blue-700">${minVal}</span>
                    <p className="text-xs text-blue-600">Min</p>
                </div>

                <div className="bg-emerald-50 px-4 py-2 rounded-xl flex items-center gap-1">
                    <span className="text-sm font-bold text-emerald-700">${maxVal}</span>
                    <p className="text-xs text-emerald-600">Max</p>
                </div>
            </div>

            {/* Enhanced Slider Track */}
            <div className="relative w-full h-4">
                {/* Background track with gradient */}
                <div className="absolute top-3 w-full h-1 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full shadow-inner" />

                {/* Enhanced Fill bar with gradient */}
                <div
                    ref={range}
                    className="absolute top-3 h-1 bg-gradient-to-r from-blue-500 to-blue-500/70 rounded-full shadow-lg z-10"
                />

                {/* Enhanced Range Inputs (Thumbs) */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={minVal}
                    onChange={onMinChange}
                    className="absolute top-1.5 w-full h-4 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:mt-0 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none"
                    style={{ zIndex: minVal > maxVal ? 25 : 20 }}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={maxVal}
                    onChange={onMaxChange}
                    className="absolute top-1.5 w-full h-4 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-600 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:mt-0 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-emerald-600 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none"
                    style={{ zIndex: maxVal < minVal ? 25 : 20 }}
                />
            </div>

            {/* Price Range Info */}
            <div className="text-center">
                <p className="text-sm text-gray-600">
                    Range: <span className="font-bold text-gray-900">${minVal} - ${maxVal}</span> per night
                </p>
            </div>
        </div>
    );
}