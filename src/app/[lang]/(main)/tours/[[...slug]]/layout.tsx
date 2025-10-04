import { ToursMain } from '@components/main/components/modules/components/tours/listing';
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
        <div className='w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 pt-40'>
            <ToursMain>
                {children}
            </ToursMain>
        </div>
    );
}