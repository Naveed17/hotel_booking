import * as React from 'react'
import 'nprogress/nprogress.css';
import { locales } from '../../../next-intl'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@src/css/app.css'
import { Noto_Kufi_Arabic, Urbanist } from 'next/font/google'
import AppProvider from '@lib/appProvider'
import { fetchAppData } from '@src/actions';
import { Metadata } from 'next/types';



// Load English font
const FontUrbanist = Urbanist({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
})
const notoKufiArabic = Noto_Kufi_Arabic({
  weight: ['400', '700'], // only supported weights
  subsets: ['arabic'],
  display: 'swap',
})
export const generateMetadata = async (): Promise<Metadata> => {
  const { data }: any = await fetchAppData({ language: 'en', currency: 'usd' });
  const meta_data = data?.app;
  if (!meta_data) {
    return {
      title: '404',
      description: '404',
    };
  }
  const {
    business_name,
    home_title,
    site_url,
    meta_description,
    header_logo_img,
    favicon_img,
  } = meta_data;



  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/en',
        'ar-SA': '/ar',
      },
    },
    icons: {
      icon: favicon_img,
      shortcut: favicon_img,
      apple: favicon_img,
    },
    keywords: 'some keyword',
    title: home_title || business_name,
    authors: [],
    robots: '',
    applicationName: business_name,
    creator: business_name,
    publisher: business_name,
    generator: 'Next.js',
    referrer: 'origin-when-cross-origin',
    description: meta_description,
    openGraph: {
      title: home_title || business_name,
      description: meta_description,
      url: process.env.NEXT_PUBLIC_SITE_URL!,
      siteName: site_url || business_name,
      images: [
        {
          url: header_logo_img,
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
  };
};
export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }))
}
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: 'en' | 'ar' }>
}) {
  const { lang } = await params

  const isArabic = lang === 'ar'
  const fontClass = isArabic ? notoKufiArabic.className : FontUrbanist.className


  return (
    <html lang={lang} dir={isArabic ? 'rtl' : 'ltr'}>
      <body className={`${fontClass}`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
