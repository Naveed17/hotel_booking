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
    keywords: [
      'TravelNext',
      'travel booking',
      'hotel booking',
      'flight booking',
      'tour booking',
      'next.js travel app',
      'travel platform',
      'vacation booking',
      'trip planning',
      'travel deals',
      'accommodation booking',
      'airline tickets',
      'travel packages',
      'holiday booking',
      'travel website',
      'online travel booking',
      'travel reservation system',
      'next generation travel'
    ].join(', '),
    title: {
      default: 'TravelNext - Next Generation Travel Booking Platform',
      template: '%s | TravelNext'
    },
    authors: [{ name: 'TravelNext Team' }],
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    applicationName: 'TravelNext',
    creator: 'TravelNext',
    publisher: 'TravelNext',
    generator: 'Next.js',
    referrer: 'origin-when-cross-origin',
    description: 'TravelNext - Book hotels, flights, and tours with ease. Next generation travel booking platform built with Next.js. Find the best deals on accommodations, flights, and vacation packages worldwide.',
    openGraph: {
      title: 'TravelNext - Next Generation Travel Booking Platform',
      description: 'Book hotels, flights, and tours with TravelNext. Find the best travel deals and plan your perfect vacation with our advanced booking platform.',
      url: process.env.NEXT_PUBLIC_SITE_URL!,
      siteName: 'TravelNext',
      images: [
        {
          url: header_logo_img || '/images/travelnext-og.jpg',
          width: 1200,
          height: 630,
          alt: 'TravelNext - Travel Booking Platform'
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'TravelNext - Next Generation Travel Booking',
      description: 'Book hotels, flights, and tours with ease. Your next adventure starts here.',
      images: [header_logo_img || '/images/travelnext-twitter.jpg'],
      creator: '@TravelNext',
      site: '@TravelNext'
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      yahoo: 'your-yahoo-verification-code'
    },
    category: 'travel',
    classification: 'Travel & Tourism'
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
