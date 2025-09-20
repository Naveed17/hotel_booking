'use client';
import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@lib/redux/store";
import { setAppData } from "@lib/redux/appData";
import useCurrency from "@hooks/useCurrency";
import useLocale from "@hooks/useLocale";

interface LoadingContextType {
    loading: boolean;
    setLoading: (v: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
    loading: false,
    setLoading: () => { },
});

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [fadeClass, setFadeClass] = useState("opacity-0");
    const { currency } = useCurrency();
    const { locale } = useLocale()
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                await dispatch(setAppData({ currency, language: locale }));
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [dispatch, currency, locale]);
    // Handle fade-in and fade-out
    useEffect(() => {
        if (loading) {
            setShowOverlay(true);
            setTimeout(() => setFadeClass("opacity-100"), 10);
        } else {
            setFadeClass("opacity-0");
            const timeout = setTimeout(() => setShowOverlay(false), 500);
            return () => clearTimeout(timeout);
        }
    }, [loading]);

    // Detect route changes using pathname
    useEffect(() => {
        setLoading(false); // Reset loading when route actually changes
    }, [pathname]);

    // Alternative approach: Listen to browser navigation events
    useEffect(() => {
        const handleStart = () => {
            console.log('Navigation started'); // Debug log
            setLoading(true);
        };

        const handleComplete = () => {
            console.log('Navigation completed'); // Debug log
            setLoading(false);
        };

        // Listen to popstate for browser back/forward
        window.addEventListener('beforeunload', handleStart);
        window.addEventListener('popstate', handleComplete);

        // For programmatic navigation, you'll need to call setLoading manually
        // or use the custom hook approach below

        return () => {
            window.removeEventListener('beforeunload', handleStart);
            window.removeEventListener('popstate', handleComplete);
        };
    }, []);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
            {showOverlay && (
                <div
                    className={`fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-500 ${fadeClass}`}
                >
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 p-8 flex flex-col items-center m-3 gap-6">
                        {/* Enhanced Spinner */}
                        <div className="relative">
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full animate-pulse"></div>
                            </div>
                        </div>

                        {/* Loading Text */}
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                                LOADING
                            </div>
                            <p className="text-gray-600 font-medium">Please wait while we prepare your experience...</p>
                        </div>
                    </div>
                </div>
            )}
        </LoadingContext.Provider>
    );
};