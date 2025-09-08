'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { debounce } from 'lodash';
import { useHotelFilters } from '@src/context/hotelFilterContext';
import { PriceRangeSlider } from '@components/core/components';
import { Search, Star } from 'lucide-react';
import { Checkbox } from '@components/ui/checkbox';

// --- Sub Components ---
function PriceFilter({
    value,
    onChange,
    priceRange,
}: {
    value: [number, number];
    onChange: (val: [number, number]) => void;
    priceRange: { min: number; max: number };
}) {
    const [range, setRange] = useState<[number, number]>(value);

    // keep in sync with parent value
    useEffect(() => {
        setRange(value);
    }, [value]);

    // initialize only when priceRange changes
    useEffect(() => {
        if (
            priceRange.min !== Infinity &&
            priceRange.max !== -Infinity
        ) {
            // only reset if the current range is outside new bounds
            if (
                range[0] < priceRange.min ||
                range[1] > priceRange.max
            ) {
                const next: [number, number] = [
                    priceRange.min,
                    priceRange.max,
                ];
                setRange(next);
                onChange(next);
            }
        }
        // ⚡ notice: removed `range` from deps to avoid loop
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [priceRange]);

    return (
        <PriceRangeSlider
            min={priceRange.min}
            max={priceRange.max}
            value={{ min: range[0], max: range[1] }}
            onChange={(vals) => {
                const next: [number, number] = [vals.min, vals.max];
                setRange(next);
                onChange(next);
            }}
            priceRange={priceRange}
        />
    );
}

function SearchFilter({
    value,
    onChange,
}: {
    value: string;
    onChange: (val: string) => void;
}) {
    const [search, setSearch] = useState(value);
    useEffect(() => setSearch(value), [value]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedOnChange = useCallback(
        debounce((val: string) => onChange(val), 500),
        [],
    );

    return (
        <>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
                <input
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        debouncedOnChange(e.target.value);
                    }}
                    type="text"
                    placeholder="Where do you want to stay?"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                />
            </div>
        </>
    )
}
function StarsFilter({
    value,
    toggle,
}: {
    value: number[];
    toggle: (star: number) => void;
}) {
    return (

        <>

            <div className="space-y-3">
                {[5, 4, 3].map((stars) => (
                    <div key={stars} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex">
                                {[...Array(stars)].map((_, i) => (
                                    <Star key={i} className="h-3 w-3 fill-gray-300 text-gray-300" />
                                ))}
                            </div>
                            <span className="text-sm text-text-muted">({stars} Stars)</span>
                        </div>
                        <Checkbox
                            checked={value.includes(stars)}
                            onCheckedChange={(checked) => {
                                if (checked) {
                                    toggle(stars);
                                } else {
                                    toggle(stars);
                                }

                            }}
                        />

                    </div>
                ))}
            </div>
        </>
    );
}


function GuestRatingFilter({
    value,
    onChange,
}: {
    value: number;
    onChange: (val: number) => void;
}) {
    return (
        <>

            <input
                type="range"
                min={0}
                max={5}
                step={1}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="
          w-full h-1 appearance-none rounded-lg 
          bg-gradient-to-r from-[#163C8C] to-[#E5ECFF]
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-[#163C8C]
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-moz-range-thumb]:h-4
          [&::-moz-range-thumb]:w-4
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-[#163C8C]
          [&::-moz-range-thumb]:cursor-pointer
        "
                style={{
                    background: `linear-gradient(to right, #163C8C ${value * 20}%, #E5ECFF ${value * 20}%)`,
                }}
            />
            <span className="text-gray-600 text-sm block text-center">{value === 5 ? value + " Stars" : value + " + Stars"}</span>
        </>
    );
}



function AmenitiesFilter({
    value,
    toggle,
}: {
    value: string[];
    toggle: (amenity: string) => void;
}) {
    const amenities = [
        {
            icon: <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.3076 17.7214H10.3166" stroke="#112233" strokeOpacity="0.9" strokeWidth="1.71795" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1.71777 8.11815C4.08005 6.00526 7.13819 4.83716 10.3075 4.83716C13.4768 4.83716 16.535 6.00526 18.8973 8.11815" stroke="#112233" strokeOpacity="0.9" strokeWidth="1.71795" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4.29468 11.5876C5.90035 10.0138 8.05911 9.1322 10.3075 9.1322C12.5559 9.1322 14.7146 10.0138 16.3203 11.5876" stroke="#112233" strokeOpacity="0.9" strokeWidth="1.71795" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7.30127 14.6541C8.10411 13.8672 9.18349 13.4264 10.3077 13.4264C11.4319 13.4264 12.5113 13.8672 13.3141 14.6541" stroke="#112233" strokeOpacity="0.9" strokeWidth="1.71795" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            , label: "Wi-Fi"
        },
        {
            icon: <svg
                width="21"
                height="22"
                viewBox="0 0 21 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M16.3205 4.83691C15.8649 4.83691 15.4279 5.01791 15.1057 5.34009C14.7835 5.66227 14.6025 6.09923 14.6025 6.55486V16.0036"
                    stroke="#112233"
                    strokeOpacity="0.9"
                    strokeWidth="1.71795"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M1.71777 16.0036C2.23316 16.4331 2.74854 16.8626 3.86521 16.8626C6.01265 16.8626 6.01265 15.1447 8.16008 15.1447C10.3934 15.1447 10.2216 16.8626 12.455 16.8626C14.6024 16.8626 14.6024 15.1447 16.7498 15.1447C17.8665 15.1447 18.3819 15.5741 18.8973 16.0036"
                    stroke="#112233"
                    strokeOpacity="0.9"
                    strokeWidth="1.71795"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M6.0127 11.7087H14.6024"
                    stroke="#112233"
                    strokeOpacity="0.9"
                    strokeWidth="1.71795"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M6.0127 8.27283H14.6024"
                    stroke="#112233"
                    strokeOpacity="0.9"
                    strokeWidth="1.71795"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M7.73064 4.83691C7.27502 4.83691 6.83805 5.01791 6.51587 5.34009C6.19369 5.66227 6.0127 6.09923 6.0127 6.55486V16.0036"
                    stroke="#112233"
                    strokeOpacity="0.9"
                    strokeWidth="1.71795"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>, label: "Pool"
        },
        {
            icon: <svg
                width="21"
                height="22"
                viewBox="0 0 21 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M8.53561 13.8561C8.45892 13.5589 8.30398 13.2876 8.08689 13.0705C7.86981 12.8534 7.59853 12.6985 7.30126 12.6218L2.03145 11.2629C1.94155 11.2374 1.86242 11.1832 1.80607 11.1087C1.74972 11.0341 1.71924 10.9432 1.71924 10.8497C1.71924 10.7563 1.74972 10.6654 1.80607 10.5908C1.86242 10.5162 1.94155 10.4621 2.03145 10.4366L7.30126 9.0768C7.59842 9.00018 7.86964 8.84537 8.08671 8.62845C8.30378 8.41153 8.45879 8.14042 8.53561 7.84331L9.89451 2.57351C9.91977 2.48324 9.97386 2.40372 10.0485 2.34707C10.1232 2.29043 10.2144 2.25977 10.3081 2.25977C10.4018 2.25977 10.493 2.29043 10.5677 2.34707C10.6423 2.40372 10.6964 2.48324 10.7217 2.57351L12.0797 7.84331C12.1564 8.14058 12.3114 8.41187 12.5284 8.62895C12.7455 8.84603 13.0168 9.00097 13.3141 9.07766L18.5839 10.4357C18.6745 10.4607 18.7544 10.5147 18.8114 10.5895C18.8683 10.6643 18.8992 10.7557 18.8992 10.8497C18.8992 10.9437 18.8683 11.0351 18.8114 11.1099C18.7544 11.1847 18.6745 11.2388 18.5839 11.2637L13.3141 12.6218C13.0168 12.6985 12.7455 12.8534 12.5284 13.0705C12.3114 13.2876 12.1564 13.5589 12.0797 13.8561L10.7208 19.1259C10.6956 19.2162 10.6415 19.2957 10.5668 19.3524C10.4921 19.409 10.401 19.4397 10.3072 19.4397C10.2135 19.4397 10.1224 19.409 10.0477 19.3524C9.973 19.2957 9.91891 19.2162 9.89365 19.1259L8.53561 13.8561Z"
                    stroke="#112233"
                    strokeOpacity="0.9"
                    strokeWidth="1.71795"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>, label: "Spa"
        },
        {
            icon: <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.1143 11.5094C15.4366 11.8317 15.8736 12.0127 16.3293 12.0127C16.7851 12.0127 17.2221 11.8317 17.5444 11.5094C17.8666 11.1872 18.0476 10.7501 18.0476 10.2944C18.0476 9.8387 17.8666 9.40165 17.5444 9.0794L16.0257 7.5616C16.3479 7.88372 16.7849 8.06465 17.2406 8.06457C17.4662 8.06453 17.6896 8.02005 17.898 7.93368C18.1064 7.8473 18.2958 7.72073 18.4553 7.56117C18.6148 7.40161 18.7413 7.2122 18.8276 7.00374C18.9139 6.79529 18.9583 6.57188 18.9583 6.34627C18.9582 6.12066 18.9138 5.89727 18.8274 5.68885C18.741 5.48043 18.6144 5.29106 18.4549 5.13156L16.0257 2.70238C15.7036 2.38013 15.2666 2.19906 14.811 2.19897C14.3553 2.19889 13.9183 2.37982 13.5961 2.70195C13.2738 3.02408 13.0928 3.46102 13.0927 3.91666C13.0926 4.3723 13.2735 4.80931 13.5957 5.13156L12.0778 3.61289C11.9183 3.45333 11.7289 3.32676 11.5204 3.24041C11.3119 3.15406 11.0885 3.10961 10.8628 3.10961C10.6372 3.10961 10.4137 3.15406 10.2053 3.24041C9.99679 3.32676 9.80737 3.45333 9.64781 3.61289C9.48825 3.77245 9.36168 3.96187 9.27533 4.17035C9.18898 4.37882 9.14453 4.60226 9.14453 4.82791C9.14453 5.05356 9.18898 5.277 9.27533 5.48547C9.36168 5.69395 9.48825 5.88337 9.64781 6.04293L15.1143 11.5094Z" stroke="#112233" strokeOpacity="0.9" strokeWidth="1.71795" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2.14746 19.0099L3.35003 17.8074" stroke="#112233" strokeOpacity="0.9" strokeWidth="1.71795" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17.2654 3.89202L18.4679 2.68945" stroke="#112233" strokeOpacity="0.9" strokeWidth="1.71795" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4.58932 18.9971C4.91145 19.3194 5.3484 19.5004 5.80404 19.5005C6.02965 19.5006 6.25306 19.4562 6.46151 19.3699C6.66996 19.2836 6.85937 19.157 7.01893 18.9975C7.17849 18.838 7.30507 18.6487 7.39144 18.4402C7.47782 18.2318 7.52229 18.0084 7.52233 17.7828C7.52237 17.5572 7.47798 17.3338 7.39167 17.1254C7.30537 16.9169 7.17886 16.7275 7.01936 16.5679L8.53717 18.0866C8.85941 18.4088 9.29647 18.5899 9.75219 18.5899C10.2079 18.5899 10.645 18.4088 10.9672 18.0866C11.2894 17.7644 11.4705 17.3273 11.4705 16.8716C11.4705 16.4159 11.2894 15.9788 10.9672 15.6566L5.50069 10.19C5.34113 10.0305 5.15171 9.90392 4.94324 9.81756C4.73476 9.73121 4.51132 9.68677 4.28567 9.68677C4.06002 9.68677 3.83658 9.73121 3.62811 9.81756C3.41964 9.90392 3.23021 10.0305 3.07065 10.19C2.9111 10.3496 2.78453 10.539 2.69817 10.7475C2.61182 10.956 2.56738 11.1794 2.56738 11.4051C2.56738 11.6307 2.61182 11.8542 2.69817 12.0626C2.78453 12.2711 2.9111 12.4605 3.07065 12.6201L4.58932 14.1379C4.26708 13.8158 3.83007 13.6348 3.37443 13.6349C2.91879 13.635 2.48184 13.8161 2.15971 14.1383C1.83758 14.4606 1.65666 14.8976 1.65674 15.3532C1.65682 15.8089 1.8379 16.2458 2.16014 16.5679L4.58932 18.9971Z" stroke="#112233" strokeOpacity="0.9" strokeWidth="1.71795" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8.24609 12.9113L12.3692 8.78821" stroke="#112233" strokeOpacity="0.9" strokeWidth="1.71795" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            , label: "Gym"
        },
        {
            icon: <svg
                width="21"
                height="22"
                viewBox="0 0 21 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M13.7435 2.25989L11.7679 4.23553C11.2957 4.71723 11.0312 5.36486 11.0312 6.03937C11.0312 6.71389 11.2957 7.36152 11.7679 7.84322L13.314 9.38937C13.7957 9.86154 14.4434 10.126 15.1179 10.126C15.7924 10.126 16.44 9.86154 16.9217 9.38937L18.8974 7.41373"
                    stroke="#112233"
                    strokeOpacity="0.9"
                    strokeWidth="1.71795"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M12.8845 13.4266L2.83454 3.37659C2.49171 3.71249 2.21935 4.11343 2.03342 4.55592C1.84748 4.9984 1.75171 5.47354 1.75171 5.95351C1.75171 6.43348 1.84748 6.90862 2.03342 7.3511C2.21935 7.79359 2.49171 8.19453 2.83454 8.53043L9.10506 14.8009C9.70634 15.4022 10.823 15.4022 11.5102 14.8009L12.8845 13.4266ZM12.8845 13.4266L18.8974 19.4394"
                    stroke="#112233"
                    strokeOpacity="0.9"
                    strokeWidth="1.71795"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M1.80396 19.2676L7.30139 13.8561"
                    stroke="#112233"
                    strokeOpacity="0.9"
                    strokeWidth="1.71795"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M16.3204 4.83679L10.3076 10.8496"
                    stroke="#112233"
                    strokeOpacity="0.9"
                    strokeWidth="1.71795"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>, label: "Restaurant"
        },
        {
            icon: <svg
                width="21"
                height="22"
                viewBox="0 0 21 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M18.8973 10.8498C18.6651 8.73385 17.6602 6.77803 16.075 5.35729C14.4899 3.93656 12.4362 3.15088 10.3075 3.15088C8.17887 3.15088 6.12513 3.93656 4.54 5.35729C2.95487 6.77803 1.94991 8.73385 1.71777 10.8498H18.8973Z"
                    stroke="#112233"
                    strokeOpacity="0.9"
                    strokeWidth="1.71795"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M10.3076 10.8497V17.7215C10.3076 18.1772 10.4886 18.6141 10.8108 18.9363C11.133 19.2585 11.5699 19.4395 12.0256 19.4395C12.4812 19.4395 12.9182 19.2585 13.2403 18.9363C13.5625 18.6141 13.7435 18.1772 13.7435 17.7215"
                    stroke="#112233"
                    strokeOpacity="0.9"
                    strokeWidth="1.71795"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M10.3076 2.26001V3.11898"
                    stroke="#112233"
                    strokeOpacity="0.9"
                    strokeWidth="1.71795"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>, label: "Beach Access"
        },
        {
            icon: <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g clipPath="url(#clip0_503_1925)">
                    <path
                        d="M10.3076 10.3652H10.3166"
                        stroke="#112233"
                        strokeOpacity="0.9"
                        strokeWidth="1.71795"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M13.7436 5.21141V3.49346C13.7436 3.03783 13.5626 2.60087 13.2404 2.27869C12.9183 1.95651 12.4813 1.77551 12.0257 1.77551H8.58977C8.13415 1.77551 7.69718 1.95651 7.375 2.27869C7.05282 2.60087 6.87183 3.03783 6.87183 3.49346V5.21141"
                        stroke="#112233"
                        strokeOpacity="0.9"
                        strokeWidth="1.71795"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M18.8973 11.2242C16.3485 12.907 13.3616 13.804 10.3075 13.804C7.25339 13.804 4.26653 12.907 1.71777 11.2242"
                        stroke="#112233"
                        strokeOpacity="0.9"
                        strokeWidth="1.71795"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M17.1793 5.21143H3.43572C2.48693 5.21143 1.71777 5.98058 1.71777 6.92937V15.5191C1.71777 16.4679 2.48693 17.2371 3.43572 17.2371H17.1793C18.1281 17.2371 18.8973 16.4679 18.8973 15.5191V6.92937C18.8973 5.98058 18.1281 5.21143 17.1793 5.21143Z"
                        stroke="#112233"
                        strokeOpacity="0.9"
                        strokeWidth="1.71795"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_503_1925">
                        <rect
                            width="20.6154"
                            height="20.6154"
                            fill="white"
                            transform="translate(0 0.0576172)"
                        />
                    </clipPath>
                </defs>
            </svg>, label: "Business Center"
        },
    ];
    return (
        <>
            <div className="space-y-3">
                {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-lg">{amenity.icon}</span>
                            <span className="text-sm text-text-muted">{amenity.label}</span>
                        </div>
                        <Checkbox
                            checked={value.includes(amenity.label)}
                            onCheckedChange={(checked) => {
                                if (checked) {
                                    toggle(amenity.label);
                                } else {
                                    toggle(amenity.label);
                                }
                            }}
                        />

                    </div>
                ))}
            </div>
        </>
    );
}

// --- Main Component ---
export default function HotelFilters({
    dict,

}: {
    dict: any;

}) {


    const {
        filters,
        setPriceRange,
        toggleStar,
        setGuestRating,
        toggleAmenity,
        resetFilters,
        setSearch,
        applyFilter,
        isLoading,
        priceRange,
        data,
    } = useHotelFilters();





    // Debounce price updates to avoid spamming API
    const debouncedSetPriceRange = useMemo(() => {
        const fn = debounce((min: number, max: number) => setPriceRange(min, max), 250);
        return fn;
    }, [setPriceRange]);

    useEffect(() => () => debouncedSetPriceRange.cancel(), [debouncedSetPriceRange]);



    const clearAll = useCallback(() => resetFilters(), [resetFilters]);

    const filterItems = useMemo(
        () => [
            {
                id: 'search',
                label: 'Search Hotel',
                content: (
                    <SearchFilter
                        value={filters.search || ''}
                        onChange={(val) => setSearch(val)}
                    />
                ),
            },
            {
                id: 'price',
                label: 'Price Range (per night)',
                content: (
                    <PriceFilter
                        value={[
                            filters.price?.min ?? 0,
                            filters.price?.max ?? 1000,
                        ]}
                        onChange={([min, max]) => debouncedSetPriceRange(min, max)}
                        priceRange={priceRange}
                    />
                ),
            },
            {
                id: 'stars',
                label: 'Hotel Stars',
                content: <StarsFilter value={filters.stars || []} toggle={toggleStar} />,
            },
            {
                id: 'guestRating',
                label: 'Guest Rating',
                content: (
                    <GuestRatingFilter
                        value={filters.guestRating ?? 0}
                        onChange={setGuestRating}
                    />
                ),
            },
            {
                id: 'amenities',
                label: 'Amenities',
                content: (
                    <AmenitiesFilter
                        value={filters.amenities || []}
                        toggle={toggleAmenity}
                    />
                ),
            },
        ],
        [filters, debouncedSetPriceRange, toggleStar, setGuestRating, toggleAmenity],
    );

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24 animate-slideDown">

            <h2 className="text-lg font-bold text-text-primary mb-6">Advanced Search</h2>

            {/* Filters */}
            <div className="animate-fadeIn">
                {(
                    filterItems.map((filter) => (
                        <div key={filter.id}>

                            <label className="block text-sm font-semibold text-text-primary mb-3">{filter.label}</label>

                            <AnimatePresence>

                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden px-3 pb-6"
                                >
                                    {filter.content}
                                </motion.div>

                            </AnimatePresence>
                        </div>
                    ))
                )}
            </div>
            <div className="space-y-3">
                <button onClick={() => clearAll()} className="w-full py-3 bg-gray-100 text-brand-blue rounded-lg font-medium hover:bg-gray-200 transition-colors">
                    Reset Filters
                </button>
                <button disabled={isLoading} onClick={() => applyFilter()} className="w-full py-3 bg-travel-blue text-white rounded-lg font-medium hover:bg-travel-blue/90 transition-colors">
                    Apply
                </button>
            </div>
        </div>
    );
}
