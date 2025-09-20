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
        <div className="relative inline-block text-left leading-0">
            {/* Enhanced Avatar Button */}
            <button
                ref={refs.setReference}
                onClick={() => setOpen((prev) => !prev)}
                className="w-12 h-12 rounded-full border-2 border-white shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-110 hover:shadow-xl"
                {...getReferenceProps()}
            >
                <img
                    src="https://i.pravatar.cc/100"
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            {/* Enhanced Dropdown */}
            {open && (
                <div
                    ref={refs.setFloating}
                    style={floatingStyles}
                    className="bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-2xl z-50 min-w-[220px] overflow-hidden"
                    {...getFloatingProps()}
                >
                    {/* User Info Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 text-white">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <span className="text-sm font-bold">👤</span>
                            </div>
                            <div>
                                <p className="font-semibold text-sm">{(user as any)?.email || 'User'}</p>
                                <p className="text-xs text-blue-100">Premium Member</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-2">
                        <button
                            onClick={() => router.push('/dashboard/settings')}
                            className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all duration-300 group"
                        >
                            <div className="w-8 h-8 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center mr-3 transition-colors">
                                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <p className="font-medium">Account Settings</p>
                                <p className="text-xs text-gray-500">Manage your profile</p>
                            </div>
                        </button>

                        <div className="border-t border-gray-100 my-2"></div>

                        <button
                            onClick={handleSignOut}
                            disabled={loading}
                            className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 group disabled:opacity-50"
                        >
                            <div className="w-8 h-8 bg-red-100 group-hover:bg-red-200 rounded-lg flex items-center justify-center mr-3 transition-colors">
                                {loading ? (
                                    <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                )}
                            </div>
                            <div className="text-left">
                                <p className="font-medium">{loading ? 'Signing out...' : 'Sign Out'}</p>
                                <p className="text-xs text-red-400">End your session</p>
                            </div>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
