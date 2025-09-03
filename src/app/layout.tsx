import * as React from 'react'
import 'nprogress/nprogress.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@src/css/app.css'
import { Urbanist } from 'next/font/google'
import AppProvider from '@lib/appProvider'
import { fetchAppData } from '@src/actions';
import { Metadata } from 'next/types';



// Load English font
const FontUrbanist = Urbanist({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
})
export const generateMetadata = async (): Promise<Metadata> => {
  const { data }: any = await fetchAppData();
  const meta_data = data?.app;
  if (!meta_data) {
    return {
      title: '404',
      description: '404',
    };
  }
  const {
    agency_name,
    meta_title,
    domain,
    meta_description,
    logo,
    favicon,
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
      icon: favicon,
      shortcut: logo,
      apple: logo,
    },
    keywords: 'some keyword',
    title: meta_title,
    authors: [],
    robots: '',
    applicationName: agency_name,
    creator: agency_name,
    publisher: agency_name,
    generator: 'Next.js',
    referrer: 'origin-when-cross-origin',
    description: meta_description,
    openGraph: {
      title: domain,
      description: meta_description,
      url: process.env.NEXT_PUBLIC_SITE_URL!,
      siteName: domain,
      images: [
        {
          url: logo,
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
  };
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {



  const fontClass = FontUrbanist.className

  return (
    <html lang="en" dir="ltr">
      <body className={`${fontClass}`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
