'use client';

import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        console.error('error caught:', error);
    }, [error]);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50 text-center px-4">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 p-12 max-w-md mx-auto">
                <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    SYSTEM ERROR
                </div>
                
                <div className="text-6xl mb-6">⚠️</div>
                
                <h1 className="text-3xl font-black text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-red-600 bg-clip-text text-transparent">
                    Oops! Something Went Wrong
                </h1>
                
                <p className="text-gray-600 mb-8 leading-relaxed">
                    {error.message || 'An unexpected error occurred. Don\'t worry, our team has been notified and we\'re working on a fix.'}
                </p>
                
                <button
                    className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                    onClick={reset}
                >
                    🔄 Try Again
                </button>
                
                <p className="text-sm text-gray-500 mt-6">
                    If the problem persists, please contact our support team
                </p>
            </div>
        </div>
    );
}
