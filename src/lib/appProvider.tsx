"use client";

import React, { useMemo } from "react";
import { StoreProvider } from "@lib/redux/providers";
import ThemeProvider from '@theme/theme';
import { buildProvidersTree } from "./buildProvidersTree";
import { LoadingProvider } from '@src/context/LoadingContext';
import { QueryClientProvider } from "./react-query";
import { UserProvider } from "@src/context/user-context";
export default function AppProvider({ children }: { children?: React.ReactNode }) {
    const ProvidersTree = useMemo(() => buildProvidersTree([
        [StoreProvider],
        [QueryClientProvider],
        [UserProvider],
        [ThemeProvider],
        [LoadingProvider],

    ]), [])
    return (
        <>

            <ProvidersTree>
                {children}
            </ProvidersTree>
        </>
    );
}
