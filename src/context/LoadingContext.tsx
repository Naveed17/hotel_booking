'use client';
import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@lib/redux/store";
import { setAppData } from "@lib/redux/appData";

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
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                await dispatch(setAppData());
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [dispatch]);
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
                    className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-500 ${fadeClass}`}
                >
                    <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
                </div>
            )}
        </LoadingContext.Provider>
    );
};