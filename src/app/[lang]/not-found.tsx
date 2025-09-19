'use client'
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const NotFound = () => {
    const location = usePathname();

    useEffect(() => {
        console.error(
            "404 Error: User attempted to access non-existent route:",
            location,
        );
    }, [location]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 p-12 max-w-lg mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    PAGE NOT FOUND
                </div>
                
                <div className="text-8xl mb-6">🧐</div>
                
                <h1 className="text-6xl font-black text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
                    404
                </h1>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Lost in Space?
                </h2>
                
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                    The page you're looking for seems to have wandered off into the digital wilderness. Let's get you back on track!
                </p>
                
                <div className="space-y-4">
                    <a 
                        href="/" 
                        className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        🏠 Return to Home
                    </a>
                    
                    <p className="text-sm text-gray-500">
                        Or use the navigation menu to explore our amazing destinations
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
