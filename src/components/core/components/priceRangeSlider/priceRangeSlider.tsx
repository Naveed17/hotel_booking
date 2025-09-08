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
        const newMin = Math.min(Number(e.target.value), maxVal - 1);
        onChange({ min: newMin, max: maxVal });
    };

    const onMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newMax = Math.max(Number(e.target.value), minVal + 1);
        onChange({ min: minVal, max: newMax });
    };

    return (
        <>
            <div className="flex justify-between text-gray-500 text-sm font-semibold text-text-secondary mb-3">
                <span>${min}</span>
                <span>${max}</span>
            </div>

            {/* Slider Track */}
            <div className="relative w-full h-6">
                {/* Background track */}
                <div className="absolute top-2 w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full z-0" />

                {/* Fill bar with blue gradient */}
                <div
                    ref={range}
                    className="absolute top-2 h-1 bg-travel-blue rounded-full z-10"

                />

                {/* Range Inputs (Thumbs) */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={minVal}
                    onChange={onMinChange}
                    className="range-thumb z-30"
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={maxVal}
                    onChange={onMaxChange}
                    className="range-thumb z-20"
                />
            </div>



        </>
    );
}