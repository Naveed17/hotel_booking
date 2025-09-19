
import { HotelsMain } from '@components/main/components/modules';
import { HotelFiltersProvider } from '@src/context/hotelFilterContext';
import { getDictionary } from '@src/get-dictionary';

import * as React from 'react'
export default async function Layout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: 'en' | 'ar'; slug: string[] }>;


}) {
    const { lang, slug } = await params;
    const dict = await getDictionary(lang)
    return (

        <div className='w-full h-full bg-bg-page pt-40'>
            <HotelFiltersProvider slug={slug || null}>
                <HotelsMain dict={dict} slug={slug}>
                    {children}
                </HotelsMain>
            </HotelFiltersProvider>
        </div>



    );
}
