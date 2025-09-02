import * as React from 'react'
import 'nprogress/nprogress.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@src/css/app.css'
import { Urbanist } from 'next/font/google'
import AppProvider from '@lib/appProvider'



// Load English font
const FontUrbanist = Urbanist({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
})


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
