"use client";

import React, { useState } from "react";
import {
    useFloating,
    offset,
    flip,
    shift,
    autoUpdate,
    useClick,
    useDismiss,
    useRole,
    useInteractions,
} from "@floating-ui/react";
import { useUser } from "@hooks/use-user";
import { useRouter } from "next/navigation";
import { authClient } from "@lib/auth/client";

export default function UserDropdown() {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const { user, checkSession } = useUser();
    const [loading, setLoading] = useState(false);

    // Floating UI setup
    const { refs, floatingStyles, context } = useFloating({
        open,
        onOpenChange: setOpen,
        placement: "bottom-start",
        middleware: [offset(6), flip(), shift()],
        whileElementsMounted: autoUpdate,
    });

    // Floating UI interactions
    const click = useClick(context);
    const dismiss = useDismiss(context); // ✅ handles outside click + escape
    const role = useRole(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([
        click,
        dismiss,
        role,
    ]);

    const handleSignOut = React.useCallback(async (): Promise<void> => {
        try {
            setLoading(true);
            const { error } = await authClient.signOut();

            if (error) {
                setLoading(false);
                return;
            }
            await checkSession?.();
            router.refresh();
        } catch (err) {
        } finally {
            setLoading(false);
        }
    }, [checkSession, router]);

    return (
        <div className="relative inline-block text-left">
            {/* Avatar Button */}
            <button
                ref={refs.setReference}
                onClick={() => setOpen((prev) => !prev)}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 p-0.5 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                {...getReferenceProps()}
            >
                <div className="w-full h-full rounded-full bg-white p-0.5">
                    <img
                        src="https://i.pravatar.cc/100"
                        alt="User Avatar"
                        className="w-full h-full object-cover rounded-full"
                    />
                </div>
            </button>

            {/* Dropdown Menu */}
            {open && (
                <div
                    ref={refs.setFloating}
                    style={floatingStyles}
                    className="bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-xl z-50 min-w-[280px] overflow-hidden"
                    {...getFloatingProps()}
                >
                    {/* User Profile Section */}
                    <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 p-0.5">
                                <div className="w-full h-full rounded-full bg-white p-0.5">
                                    <img
                                        src="https://i.pravatar.cc/100"
                                        alt="User Avatar"
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">
                                    {(user as any)?.email?.split('@')[0] || 'User'}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    {(user as any)?.email || 'user@example.com'}
                                </p>
                                <div className="inline-flex items-center gap-1 mt-1">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span className="text-xs text-blue-600 font-medium">Active</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                        <button
                            onClick={() => {
                                router.push('/dashboard');
                                setOpen(false);
                            }}
                            className="flex items-center w-full px-2 py-1 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors group"
                        >
                            <div className="w-9 h-9 bg-gray-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center mr-3 transition-colors">
                                <svg className="w-4 h-4 text-gray-600 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                                </svg>
                            </div>
                            <span className="font-medium">Dashboard</span>
                        </button>

                        <button
                            onClick={() => {
                                router.push('/dashboard/bookings');
                                setOpen(false);
                            }}
                            className="flex items-center w-full px-2 py-1 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors group"
                        >
                            <div className="w-9 h-9 bg-gray-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center mr-3 transition-colors">
                                <svg className="w-4 h-4 text-gray-600 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <span className="font-medium">My Bookings</span>
                        </button>

                        <button
                            onClick={() => {
                                router.push('/dashboard/system');
                                setOpen(false);
                            }}
                            className="flex items-center w-full px-2 py-1 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors group"
                        >
                            <div className="w-9 h-9 bg-gray-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center mr-3 transition-colors">
                                <svg className="w-4 h-4 text-gray-600 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <span className="font-medium">Settings</span>
                        </button>

                        <div className="border-t border-gray-100 my-2"></div>

                        <button
                            onClick={handleSignOut}
                            disabled={loading}
                            className="flex items-center w-full px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors group disabled:opacity-50"
                        >
                            <div className="w-9 h-9 bg-red-50 group-hover:bg-red-100 rounded-lg flex items-center justify-center mr-3 transition-colors">
                                {loading ? (
                                    <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                )}
                            </div>
                            <span className="font-medium">{loading ? 'Signing out...' : 'Sign Out'}</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
