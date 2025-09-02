'use client'
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { AppStore, store } from "@lib/redux/store";
import dynamic from 'next/dynamic';
import PersistGateProvider from './persistGateProvider';


function StoreProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore>(store)

    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = store;
    }

    return (
        <Provider store={storeRef.current}>
            <PersistGateProvider store={storeRef.current}>
                {children}
            </PersistGateProvider>
        </Provider>
    )
}

export default StoreProvider;
