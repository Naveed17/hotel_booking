"use client";

import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useMemo,
    useEffect,
} from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { hotels_filter, hotels_search } from "@src/actions";

// ===== Types =====
export type PriceRange = { min: number; max: number };
export type HotelFilters = {
    search: string;
    price: PriceRange;
    stars: number[];
    guestRating: number | null;
    amenities: string[];
    quickFilter: string;
    sort: string;
    suppliers: string[];
};
export type HotelFiltersContextValue = {
    filters: HotelFilters;
    setSearch: (search: string) => void;
    setFilters: React.Dispatch<React.SetStateAction<HotelFilters>>;
    setPriceRange: (min: number, max: number) => void;
    toggleStar: (star: number) => void;
    setGuestRating: (rating: number | null) => void;
    toggleAmenity: (amenity: string) => void;
    resetFilters: () => void;
    applyFilter: () => void;
    data: any[] | undefined;
    isLoading: boolean;
    total: number;
    setQuickFilter: (filter: string) => void;
    setSort: (sort: string) => void;
    priceRange: PriceRange;
    hotels_suppliers: Record<string, number>[] | any;
    toggleSupplier: (supplier: string) => void;
    showFilters: boolean;
    setShowFilters: (show: boolean) => void;
};

export interface HotelFiltersProviderProps {
    children: ReactNode;
    slug: string[];
}

// ===== Initial State =====
const initialFilters: HotelFilters = {
    search: "",
    price: { min: 0, max: 0 },
    stars: [],
    guestRating: null,
    amenities: [],
    quickFilter: '',
    sort: "",
    suppliers: [],
};

// ===== Context =====
const HotelFiltersContext = createContext<
    HotelFiltersContextValue | undefined
>(undefined);

// ===== Hook =====
export const useHotelFilters = (): HotelFiltersContextValue => {
    const context = useContext(HotelFiltersContext);
    if (!context) {
        throw new Error("useHotelFilters must be used within a HotelFiltersProvider");
    }
    return context;
};

// ===== Provider =====
export const HotelFiltersProvider: React.FC<HotelFiltersProviderProps> = ({
    children,
    slug,
}) => {
    const [filters, setFilters] = useState<HotelFilters>(initialFilters);
    const [useFilter, setUseFilter] = useState(false);
    const [showFilters, setShowFilters] = useState(true);

    // ===== Initial Hotels (search) =====
    const {
        data: initialHotels,
        isLoading: isInitialLoading,
        refetch,
    } = useQuery({
        queryKey: ["hotels", slug],
        queryFn: () => hotels_search(slug),
        select: (res) => ({
            data: res?.response ?? [],     // normalize to "data"
            total: res?.total ?? res?.response?.length ?? 0, // normalize to "total"
        }),
    });

    type HotelsResponse = {
        data: any[];
        total: number;
    };
    function getSuppliersWithQty(response: HotelsResponse) {
        if (!response?.data) return [];

        return Object.entries(
            response.data.reduce((acc, item) => {
                acc[item.supplier_name] = (acc[item.supplier_name] || 0) + 1;
                return acc;
            }, {} as Record<string, number>)
        ).map(([name, qty]) => ({ name, qty }));
    }



    const hotels_suppliers = useMemo(() => getSuppliersWithQty(initialHotels as any), [initialHotels]);

    // ===== Filtered Hotels =====
    const { mutate, data: filteredHotels, isPending } = useMutation({
        mutationFn: hotels_filter,
        onSuccess: (res) => {
            return {
                data: res?.data ?? [],
                total: res?.total_records ?? res?.data?.length ?? 0,
            };
        },
    });


    const setSearch = useMemo(() => (search: string) =>
        setFilters((prev) => ({ ...prev, search })), []);

    const setPriceRange = useMemo(() => (min: number, max: number) =>
        setFilters((prev) => ({ ...prev, price: { min, max } })), []);

    const toggleStar = useMemo(() => (star: number) =>
        setFilters((prev) => ({
            ...prev,
            stars: prev.stars.includes(star)
                ? prev.stars.filter((s) => s !== star)
                : [...prev.stars, star],
        })), []);

    const setGuestRating = useMemo(() => (rating: number | null) =>
        setFilters((prev) => ({ ...prev, guestRating: rating })), []);

    const toggleAmenity = useMemo(() => (amenity: string) =>
        setFilters((prev) => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter((a) => a !== amenity)
                : [...prev.amenities, amenity],
        })), []);
    
    const toggleSupplier = useMemo(() => (supplier: string) =>
        setFilters((prev) => ({
            ...prev,
            suppliers: prev.suppliers.includes(supplier)
                ? prev.suppliers.filter((a) => a !== supplier)
                : [...prev.suppliers, supplier],
        })), []);




    const applyFilter = useMemo(() => () => {
        setUseFilter(true);
        mutate({ slug, filter: filters });
    }, [mutate, slug, filters]);

    const applyFilterWith = useMemo(() => (newFilters: HotelFilters) => {
        setUseFilter(true);
        mutate({ slug, filter: newFilters });
    }, [mutate, slug]);

    const setQuickFilter = useMemo(() => (quickFilter: string) => {
        setFilters((prev) => {
            const newFilters = { ...prev, quickFilter };
            applyFilterWith(newFilters);
            return newFilters;
        });
    }, [applyFilterWith]);

    const setSort = useMemo(() => (sort: string) => {
        setFilters((prev) => {
            const newFilters = { ...prev, sort };
            applyFilterWith(newFilters);
            return newFilters;
        });
    }, [applyFilterWith]);
    const priceRange = useMemo(() => {
        const hotelsData = initialHotels?.data ?? [];
        const prices = hotelsData.map((h: any) => Number(h?.actual_price)).filter(Number.isFinite);
        
        if (prices.length === 0) {
            return { min: 0, max: 1000 };
        }
        
        return {
            min: Math.min(...prices),
            max: Math.max(...prices),
        };
    }, [initialHotels?.data]);
    const resetFilters = useMemo(() => () => {
        setUseFilter(false);
        setFilters({
            ...initialFilters,
            price: priceRange,
        });
        refetch();
    }, [priceRange, refetch]);
    const contextValue: HotelFiltersContextValue = useMemo(
        () => ({
            filters,
            setSearch,
            setFilters,
            setPriceRange,
            toggleStar,
            setGuestRating,
            toggleAmenity,
            resetFilters,
            applyFilter,
            setQuickFilter,
            setSort,
            priceRange,
            data: useFilter ? filteredHotels?.data ?? [] : initialHotels?.data ?? [],
            total: useFilter ? filteredHotels?.total ?? 0 : initialHotels?.total ?? 0,
            isLoading: isPending || isInitialLoading,
            hotels_suppliers,
            toggleSupplier,
            showFilters,
            setShowFilters
        }),
        [
            filters,
            setSearch,
            setPriceRange,
            toggleStar,
            setGuestRating,
            toggleAmenity,
            resetFilters,
            applyFilter,
            setQuickFilter,
            setSort,
            toggleSupplier,
            filteredHotels,
            useFilter,
            initialHotels,
            isPending,
            isInitialLoading,
            showFilters,
            priceRange,
            hotels_suppliers
        ]
    );

    return (
        <HotelFiltersContext.Provider value={contextValue}>
            {children}
        </HotelFiltersContext.Provider>
    );
};
