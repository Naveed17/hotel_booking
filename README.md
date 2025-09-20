# Project Summary

This document contains an overview of the project files.

### src\@types\common.tsx

```tsx
import type { ReactNode, CSSProperties } from 'react'

export interface CommonProps {
    id?: string
    className?: string
    children?: ReactNode
    style?: CSSProperties
}
export type WithProps = CommonProps

// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace TypeAttributes {
    type Size = 'lg' | 'md' | 'sm' | 'xs'
    type Shape = 'round' | 'circle' | 'none'
    type Status = 'success' | 'warning' | 'danger' | 'info'
...
```

### src\@types\theme.ts

```tsx
export type Mode = "light" | "dark";

export type Theme = {
  mode: Mode;
  direction: "ltr" | "rtl";
};
export type Direction = "ltr" | "rtl";

...
```

### src\actions\actions.ts

```tsx
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const getDestinations = async (city: string) => {
  try {
    const response = await fetch(
      `${siteUrl}/api/mock/locations?city=${encodeURIComponent(city)}`,
      {
        method: "GET",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json().catch(() => null);
...
```

### src\actions\index.ts

```tsx
export * from "./server-actions";
export * from "./actions";

...
```

### src\actions\server-actions.ts

```tsx
"use server";
import { createSession, getSession, logout } from "@lib/auth/session";
import { siteUrl } from "./actions";

export const fetchAppData = async (payload: {
  language: string;
  currency: string;
}) => {
  try {
    const response = await fetch(`${siteUrl}/api/mock/app`, {
      method: "POST",
      body: JSON.stringify({
        language: payload?.language,
        currency: payload?.currency,
      }),
...
```

### src\app\api\dictionary\route.ts

```tsx
// app/api/dictionary/route.ts
import { getDictionary } from "@src/get-dictionary";
import { NextResponse } from "next/server";

const supportedLangs = ["en", "ar", "ch", "fr", "ge", "ru", "tr"] as const;
type SupportedLang = (typeof supportedLangs)[number];
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang");

  if (!lang || !supportedLangs.includes(lang as SupportedLang)) {
    return NextResponse.json(
      { error: "Invalid lang parameter" },
      { status: 400 }
    );
...
```

### src\app\api\hotels\filter\route.ts

```tsx
// app/api/hotels/route.ts
import { hotels_search } from "@src/actions";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type CacheValue = { data: any[]; ts: number };
const CACHE_TTL_MS = 1000 * 60 * 5;
const CACHE_MAX_ENTRIES = 200;
const hotelsCache = new Map<string, CacheValue>();

function cacheGet(key: string): any[] | null {
  const entry = hotelsCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL_MS) {
...
```

### src\app\api\mock\app\route.ts

```tsx
import { NextResponse } from "next/server";

export async function POST() {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const mockAppData = {
    status: true,
    data: {
      app: {
        business_name: "Travel Website",
        home_title: "Travel Website - Premium Hotel Booking",
        site_url: "https://hotel-booking-alpha-murex.vercel.app",
        meta_description:
          "Book premium hotels worldwide with Travel Website. Find the best deals on luxury accommodations.",
        header_logo_img:
...
```

### src\app\api\mock\auth\forgot\route.ts

```tsx
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get('email');

  await new Promise(resolve => setTimeout(resolve, 150));

  if (!email) {
    return NextResponse.json({
      status: false,
      message: "Email is required"
    }, { status: 400 });
  }

...
```

### src\app\api\mock\auth\login\route.ts

```tsx
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  await new Promise((resolve) => setTimeout(resolve, 200));

  if (!email || !password) {
    return NextResponse.json(
      {
        status: false,
        message: "Email and password are required",
      },
...
```

### src\app\api\mock\auth\signup\route.ts

```tsx
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');
  const name = formData.get('name');

  await new Promise(resolve => setTimeout(resolve, 250));

  if (!email || !password || !name) {
    return NextResponse.json({
      status: false,
      message: "Name, email and password are required"
    }, { status: 400 });
...
```

### src\app\api\mock\countries\route.ts

```tsx
import { NextResponse } from 'next/server';

export async function POST() {
  await new Promise(resolve => setTimeout(resolve, 100));

  const mockCountries = {
    status: true,
    data: [
      { id: 1, name: "United States", code: "US", currency: "USD" },
      { id: 2, name: "United Arab Emirates", code: "AE", currency: "AED" },
      { id: 3, name: "United Kingdom", code: "GB", currency: "GBP" },
      { id: 4, name: "Canada", code: "CA", currency: "CAD" },
      { id: 5, name: "Australia", code: "AU", currency: "AUD" },
      { id: 6, name: "Germany", code: "DE", currency: "EUR" },
      { id: 7, name: "France", code: "FR", currency: "EUR" },
...
```

### src\app\api\mock\hotels\route.ts

```tsx
import { NextResponse } from 'next/server';

export async function POST() {
  await new Promise(resolve => setTimeout(resolve, 200));

  const mockHotels = {
    status: true,
    response: [
      {
        hotel_id: "1",
        img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
        name: "Grand Palace Hotel",
        location: "Dubai Marina",
        address: "Dubai Marina Walk, Dubai, UAE",
        stars: "5",
...
```

### src\app\api\mock\locations\route.ts

```tsx
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city') || '';

  await new Promise(resolve => setTimeout(resolve, 150));

  const mockLocations = [
    {
      id: "1",
      city: "Dubai",
      country: "United Arab Emirates",
      country_code: "AE",
      latitude: "25.276987",
...
```

### src\app\api\mock\newsletter\route.ts

```tsx
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get('email');
  const name = formData.get('name');

  await new Promise(resolve => setTimeout(resolve, 100));

  if (!email) {
    return NextResponse.json({
      status: false,
      message: "Email is required"
    }, { status: 400 });
  }
...
```

### src\app\manifest.ts

```tsx
import type { MetadataRoute } from "next";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const base_url = process.env.NEXT_PUBLIC_SITE_URL;

  return {
    name: "demo.com",
    short_name: "demo",
    description: "desc",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
...
```

### src\app\robots.ts

```tsx
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
...
```

### src\app\sitemap.ts

```tsx
import type { MetadataRoute } from "next";

// Utility to escape XML special characters
const escapeXml = (unsafe: string): string =>
  unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
...
```

### src\app\[lang]\(main)\flights\booking\confirmation\page.tsx

```tsx
import { FlightBookingComplete } from '@components/main/components/modules/components/flights';

export default function FlightBookingConfirmationPage() {
    return <FlightBookingComplete />;
}
...
```

### src\app\[lang]\(main)\flights\booking\page.tsx

```tsx
import { FlightBooking } from '@components/main/components/modules/components/flights';

export default function FlightBookingPage() {
    return <FlightBooking />;
}
...
```

### src\app\[lang]\(main)\flights\[[...slug]]\page.tsx

```tsx
import { FlightsListing } from '@components/main/components/modules/components/flights';

export default function FlightsPage() {
    return <FlightsListing />;
}
...
```

### src\app\[lang]\(main)\hotels\[id]\booking\complete\page.tsx

```tsx
import { getDictionary } from "@src/get-dictionary";
import { BookingComplete } from "@components/main/components/modules";
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ id: string; lang: 'en' | 'ar' }>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id } = await params;

  return {
    title: `Booking Confirmed - Hotel ${id}`,
    description: `Your hotel booking has been confirmed`,
  };
...
```

### src\app\[lang]\(main)\hotels\[id]\booking\page.tsx

```tsx
import { getDictionary } from "@src/get-dictionary";
import { HotelBooking } from "@components/main/components/modules";
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ id: string; lang: 'en' | 'ar' }>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id } = await params;

  return {
    title: `Book Hotel: ${id}`,
    description: `Complete your booking for hotel ${id}`,
  };
...
```

### src\app\[lang]\(main)\hotels\[id]\page.tsx

```tsx
import { getDictionary } from "@src/get-dictionary";
import { HotelDetails } from "@components/main/components/modules";
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ id: string; lang: 'en' | 'ar' }>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id } = await params;

  return {
    title: `Hotel Details: ${id}`,
    description: `View details for hotel ${id}`,
  };
...
```

### src\app\[lang]\(main)\hotels\[[...slug]]\layout.tsx

```tsx

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
...
```

### src\app\[lang]\(main)\hotels\[[...slug]]\page.tsx

```tsx
import * as React from 'react';
import type { Metadata } from 'next';
import { getDictionary } from '@src/get-dictionary';
import { HotelsList } from '@components/main/components/modules';


interface Props {
  params: Promise<{ slug: string[]; lang: 'en' | 'ar' }>; // params is now a Promise
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params;

  return {
    title: `Flight Details: ${slug?.[1]} - ${slug?.[2]}`,
...
```

### src\app\[lang]\(main)\layout.tsx

```tsx
import Main from '@components/main/layout'
import { getDictionary } from '@src/get-dictionary';
import React from 'react'
const MainLayout = async ({ children, params }: { children: React.ReactNode; params: Promise<{ lang: 'en' | 'ar' }> }) => {
    const { lang } = await params
    const dict = await getDictionary(lang)
    return (
        <Main dictionary={dict}>
            <main>{children}</main>
        </Main>
    )
}
export default MainLayout

...
```

### src\app\[lang]\(main)\not-found.tsx

```tsx
'use client'
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const NotFound = () => {
    const location = usePathname();

    useEffect(() => {
        console.error(
            "404 Error: User attempted to access non-existent route:",
            location,
        );
    }, [location]);

    return (
...
```

### src\app\[lang]\(main)\page.tsx

```tsx
import { FeaturedDestinations, Hero, FeaturedHotels, FeaturedFlights, WhyUs, Newsletter, Testimonials } from "@components/main";

export default function Page(): React.JSX.Element {
    return <>
        {/* Hero Section */}
        <Hero />
        {/* Featured Destinations */}
        <FeaturedDestinations />
        {/* Featured Hotels */}
        <FeaturedHotels />
        {/* Featured Flights */}
        <FeaturedFlights />
        {/* Why Us Section */}
        <WhyUs />
        {/* Testimonials */}
...
```

### src\app\[lang]\(main)\tours\[id]\booking\complete\page.tsx

```tsx
import * as React from 'react';
import type { Metadata } from 'next';
import { TourBookingComplete } from '@components/main/components/modules/components/tours/booking';

interface Props {
  params: Promise<{ id: string; lang: 'en' | 'ar' }>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id } = await params;

  return {
    title: `Booking Confirmed | IATA`,
    description: `Your tour booking has been confirmed. Check your booking details and prepare for an amazing experience.`,
  };
...
```

### src\app\[lang]\(main)\tours\[id]\booking\page.tsx

```tsx
import * as React from 'react';
import type { Metadata } from 'next';
import { TourBooking } from '@components/main/components/modules/components/tours/booking';

interface Props {
  params: Promise<{ id: string; lang: 'en' | 'ar' }>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id } = await params;

  return {
    title: `Book Tour | IATA`,
    description: `Complete your tour booking and secure your amazing experience.`,
  };
...
```

### src\app\[lang]\(main)\tours\[id]\page.tsx

```tsx
import * as React from 'react';
import type { Metadata } from 'next';
import { TourDetails } from '@components/main/components/modules/components/tours/details';

interface Props {
  params: Promise<{ id: string; lang: 'en' | 'ar' }>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id } = await params;

  return {
    title: `Tour Details | IATA`,
    description: `Discover amazing tour experiences and book your perfect adventure.`,
  };
...
```

### src\app\[lang]\(main)\tours\[[...slug]]\layout.tsx

```tsx
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
...
```

### src\app\[lang]\(main)\tours\[[...slug]]\page.tsx

```tsx
import * as React from 'react';
import type { Metadata } from 'next';
import { getDictionary } from '@src/get-dictionary';
import { ToursWrapper } from '@components/main/components/modules/components/tours/listing';

interface Props {
  params: Promise<{ slug: string[]; lang: 'en' | 'ar' }>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params;

  return {
    title: `Tours in ${slug?.[0]?.charAt(0).toUpperCase() + slug?.[0]?.slice(1)} | IATA`,
    description: `Discover amazing tours and experiences in ${slug?.[0]}. Book guided tours, cultural experiences, and adventures.`,
...
```

### src\app\[lang]\auth\forget-password\page.tsx

```tsx
import * as React from 'react';
import type { Metadata } from 'next';
import { config } from '@src/config';
import ForgetPasswordForm from '@components/auth/forget-password-form';
import { GuestGuard } from '@lib/auth/guest-guard';
export const metadata = { title: `Forget password | Auth | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (

    <GuestGuard>
      <ForgetPasswordForm />
    </GuestGuard>

  );
...
```

### src\app\[lang]\auth\layout.tsx

```tsx
import Layout from '@components/auth/layout';
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Layout>
            {children}
        </Layout>
    )
}
export default AuthLayout
...
```

### src\app\[lang]\auth\sign-in\page.tsx

```tsx
import * as React from 'react';
import type { Metadata } from 'next';
import { config } from '@src/config';
import SignInForm from '@components/auth/sign-in-form';
import { GuestGuard } from '@lib/auth/guest-guard';

export const metadata = { title: `Sign in | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (

    <GuestGuard>
      <SignInForm />
    </GuestGuard>

...
```

### src\app\[lang]\auth\signup\page.tsx

```tsx
import * as React from 'react';
import type { Metadata } from 'next';
import { config } from '@src/config';
import SignupForm from '@components/auth/signup-form';
import { GuestGuard } from '@lib/auth/guest-guard';

export const metadata = { title: `Signup | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
    return (
        <GuestGuard>
            <SignupForm />
        </GuestGuard>
    );
}
...
```

### src\app\[lang]\dashboard\admin\page.tsx

```tsx
'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Building, MapPin, Plane, BarChart3, Settings } from 'lucide-react';

import StatsCard from '@src/components/dashboard/shared/widgets/StatsCard';

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
...
```

### src\app\[lang]\dashboard\agent\page.tsx

```tsx
'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, DollarSign, TrendingUp } from 'lucide-react';

import StatsCard from '@src/components/dashboard/shared/widgets/StatsCard';

const AgentDashboard = () => {
  return (
    <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900">Agent Dashboard</h1>
...
```

### src\app\[lang]\dashboard\analytics\page.tsx

```tsx
'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, DollarSign, Building, MapPin, Plane } from 'lucide-react';
import { useDashboard } from '@src/context/dashboardContext';
import StatsCard from '@src/components/dashboard/shared/widgets/StatsCard';

const AnalyticsPage = () => {
  const { user } = useDashboard();

  if (!user || (user.role !== 'admin' && user.role !== 'super-admin')) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Access denied. Admin privileges required.</p>
      </div>
...
```

### src\app\[lang]\dashboard\bookings\page.tsx

```tsx
'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, DollarSign, TrendingUp, Building, MapPin, Plane } from 'lucide-react';
import { useDashboard } from '@src/context/dashboardContext';
import StatsCard from '@src/components/dashboard/shared/widgets/StatsCard';

const BookingsPage = () => {
  const { user } = useDashboard();

  if (!user) return null;

  const renderCustomerView = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
...
```

### src\app\[lang]\dashboard\customer\page.tsx

```tsx
'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Star, TrendingUp } from 'lucide-react';

import StatsCard from '@src/components/dashboard/shared/widgets/StatsCard';

const CustomerDashboard = () => {
  return (
    <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
...
```

### src\app\[lang]\dashboard\flights\page.tsx

```tsx
'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Users, DollarSign, MapPin, Calendar, Clock } from 'lucide-react';
import { useDashboard } from '@src/context/dashboardContext';
import StatsCard from '@src/components/dashboard/shared/widgets/StatsCard';

const FlightsPage = () => {
  const { user } = useDashboard();

  if (!user) return null;

  const renderCustomerView = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
...
```

### src\app\[lang]\dashboard\hotels\page.tsx

```tsx
'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Building, Users, DollarSign, TrendingUp, Calendar, MapPin, Star } from 'lucide-react';
import { useDashboard } from '@src/context/dashboardContext';
import StatsCard from '@src/components/dashboard/shared/widgets/StatsCard';

const HotelsPage = () => {
  const { user } = useDashboard();

  if (!user) return null;

  const renderCustomerView = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
...
```

### src\app\[lang]\dashboard\layout.tsx

```tsx
import React from 'react';
import { DashboardLayout } from '@components/dashboard/layouts';
import { AuthGuard } from '@lib/auth/auth-guard';
interface DashboardRootLayoutProps {
  children: React.ReactNode;
}

const DashboardRootLayout = ({ children }: DashboardRootLayoutProps) => {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>;
    </AuthGuard>
  )
};

...
```

### src\app\[lang]\dashboard\modules\settings\page.tsx

```tsx
import React from 'react';

import ModuleManager from '@src/components/dashboard/modules/ModuleManager';

const ModuleSettingsPage = () => {
  return <ModuleManager />;
};

export default ModuleSettingsPage;
...
```

### src\app\[lang]\dashboard\page.tsx

```tsx
'use client'
import React, { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDashboard } from '@src/context/dashboardContext';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const DashboardRedirect = () => {
  const { user } = useDashboard();
  const router = useRouter();
  const params = useParams();
  const lang = params?.lang as string || 'en';

  useEffect(() => {
    if (user?.role) {
...
```

### src\app\[lang]\dashboard\super-admin\page.tsx

```tsx
'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Server, Database, Activity, AlertTriangle, CheckCircle } from 'lucide-react';

import StatsCard from '@src/components/dashboard/shared/widgets/StatsCard';

const SuperAdminDashboard = () => {
  return (
    <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
...
```

### src\app\[lang]\dashboard\system\page.tsx

```tsx
'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Server, Database, Activity, AlertTriangle, CheckCircle, Settings, Lock } from 'lucide-react';
import { useDashboard } from '@src/context/dashboardContext';
import StatsCard from '@src/components/dashboard/shared/widgets/StatsCard';

const SystemPage = () => {
  const { user } = useDashboard();

  if (!user || user.role !== 'super-admin') {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Access denied. Super Admin privileges required.</p>
      </div>
...
```

### src\app\[lang]\dashboard\tours\page.tsx

```tsx
'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, DollarSign, Clock, Calendar, Star } from 'lucide-react';
import { useDashboard } from '@src/context/dashboardContext';
import StatsCard from '@src/components/dashboard/shared/widgets/StatsCard';

const ToursPage = () => {
  const { user } = useDashboard();

  if (!user) return null;

  const renderCustomerView = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
...
```

### src\app\[lang]\dashboard\users\page.tsx

```tsx
'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, Shield, Activity, Search, Filter, Edit, Trash2, Eye, ChevronUp, ChevronDown, X } from 'lucide-react';
import { useDashboard } from '@src/context/dashboardContext';
import StatsCard from '@src/components/dashboard/shared/widgets/StatsCard';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose } from '@src/components/drawer';
import Select from '@src/components/core/select';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface User {
  id: number;
  name: string;
...
```

### src\app\[lang]\error.tsx

```tsx
'use client';

import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        console.error('error caught:', error);
    }, [error]);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50 text-center px-4">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 p-12 max-w-md mx-auto">
                <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    SYSTEM ERROR
...
```

### src\app\[lang]\layout.tsx

```tsx
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



...
```

### src\app\[lang]\not-found.tsx

```tsx
'use client'
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const NotFound = () => {
    const location = usePathname();

    useEffect(() => {
        console.error(
            "404 Error: User attempted to access non-existent route:",
            location,
        );
    }, [location]);

    return (
...
```

### src\components\auth\forget-password-form.tsx

```tsx
"use client";

import React, { useCallback, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { authClient } from "@lib/auth/client";
import { useRouter } from "next/navigation";
import { Alert } from "@components/core/alert";

// ✅ Zod schema for validation
const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
...
```

### src\components\auth\layout.tsx

```tsx
import { ImageWithFallback } from "@components/ImageWithFallback";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Enhanced Left Side - Branding */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden p-4">
        <div className="w-full h-full rounded-2xl overflow-hidden relative">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
...
```

### src\components\auth\sign-in-form.tsx

```tsx
'use client';
import React, { useCallback, useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useUser } from "@hooks/use-user";
import { authClient } from "@lib/auth/client";
import { useRouter } from "next/navigation";
import { Alert } from "@components/core/alert";

// Validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
...
```

### src\components\auth\signup-form.tsx

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import Select from '@components/core/select';
import { Eye, EyeOff } from 'lucide-react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import Link from 'next/link';
import useCountries from '@src/hooks/useCountries'
import { useMutation } from '@tanstack/react-query';
import { sign_up } from '@src/actions';
// --- Zod Schema ---
const SignUpSchema = z.object({
...
```

### src\components\core\alert.tsx

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-red-500/50 text-red-600 bg-red-50 [&>svg]:text-red-600",
        success:
          "border-green-500/50 text-green-600 bg-green-50 [&>svg]:text-green-600",
      },
    },
...
```

### src\components\core\checkbox.tsx

```tsx
import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={`peer h-4 w-4 shrink-0 rounded-sm border border-gray-300 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground ${className}`}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <Check className="h-4 w-4" />
...
```

### src\components\core\components\cards\components\featuredCard\featuredCard.tsx

```tsx
'use client'
import React from 'react'
import {
    Heart,
    MapPin,
    Star,
    Users,
    Calendar,
    Compass,
    TrendingUp
} from "lucide-react";
import ImageBlur from '@src/utils/blurImage';

function FeaturedCard({ ...props }: any): React.JSX.Element {
    const { destination } = props;
...
```

### src\components\core\components\cards\components\featuredCard\index.ts

```tsx
export { default as FeaturedCard } from "./featuredCard";

...
```

### src\components\core\components\cards\components\hotelCard\hotelCard.tsx

```tsx
import React from 'react';
import Link from 'next/link';
import {
    Heart,
    MapPin,
    Star,
    Wifi,
    Car,
    Coffee,
    Waves,
    Award,
    Clock
} from "lucide-react";
import ImageBlur from '@src/utils/blurImage';
import { getFeatureIcon } from '@src/utils/featureIcon';
...
```

### src\components\core\components\cards\components\hotelCard\index.ts

```tsx
export { default as HotelCard } from "./hotelCard";

...
```

### src\components\core\components\cards\components\hotelCardLoading\hotelCardLoading.tsx

```tsx
import React from "react";

const HotelCardLoading = ({ viewMode }: { viewMode: "grid" | "list" }) => {
    return (
        <div
            className={`bg-white rounded border border-gray-200 overflow-hidden animate-pulse ${viewMode === "list" ? "flex flex-col sm:flex-row" : ""
                }`}
        >
            {/* Image placeholder */}
            <div
                className={`bg-gray-200 ${viewMode === "list"
                    ? "sm:w-80 flex-shrink-0 h-48 sm:h-full"
                    : "h-60 sm:h-72 lg:h-80"
                    }`}
            />
...
```

### src\components\core\components\cards\components\hotelCardLoading\index.ts

```tsx
export { default as HotelCardLoading } from "./hotelCardLoading";

...
```

### src\components\core\components\cards\components\index.ts

```tsx
export * from "./featuredCard";
export * from "./hotelCard";
export * from "./testimonialCard";
export * from "./hotelCardLoading";

...
```

### src\components\core\components\cards\components\testimonialCard\index.ts

```tsx
export { default as TestimonialCard } from "./testimonialCard";

...
```

### src\components\core\components\cards\components\testimonialCard\testimonialCard.tsx

```tsx
'use client';
import { Star, Quote, MapPin, Calendar } from "lucide-react";
import React from "react";

const TestimonialCard = ({ ...props }): React.JSX.Element => {
    const { testimonial } = props;
    const rating = Math.round(Number(testimonial.rating));

    return (
        <article className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
            {/* Quote decoration */}
            <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center">
                <Quote className="w-6 h-6 text-pink-600" />
            </div>

...
```

### src\components\core\components\cards\index.ts

```tsx
export * from "./components";

...
```

### src\components\core\components\index.ts

```tsx
export * from "./cards";
export * from "./priceRangeSlider";

...
```

### src\components\core\components\priceRangeSlider\index.ts

```tsx
export { default as PriceRangeSlider } from "./priceRangeSlider";

...
```

### src\components\core\components\priceRangeSlider\priceRangeSlider.tsx

```tsx
import useLocale from '@hooks/useLocale';
import React, { useRef, useEffect, ChangeEvent } from 'react';

interface PriceRangeSliderProps {
    min?: number;
    max?: number;
    value: { min: number; max: number };
    onChange: (values: { min: number; max: number }) => void;
    priceRange: { min: number; max: number }
}

export default function PriceRangeSlider({
    min = 0,
    max = 1000,
    value,
...
```

### src\components\core\container.tsx

```tsx
import classNames from 'classnames'
import { CommonProps } from '@src/@types/common'
import type { ElementType, Ref } from 'react'

interface ContainerProps extends CommonProps {
    asElement?: ElementType
    ref?: Ref<HTMLElement>
}

const Container = (props: ContainerProps) => {
    const {
        className,
        children,
        asElement: Component = 'div',
        ref,
...
```

### src\components\core\logo.tsx

```tsx
'use client'
import classNames from 'classnames'
import type { CommonProps } from '@src/@types/common'
import { APP_NAME } from '@src/constants/app.constant'

interface LogoProps extends CommonProps {
    type?: 'full' | 'streamline'
    mode?: 'light' | 'dark'
    imgClass?: string
    logoWidth?: number | string
    style?: React.CSSProperties
    className?: string
}

const Logo = (props: LogoProps) => {
...
```

### src\components\core\select.tsx

```tsx
import React from 'react';
import ReactSelect, { Props as SelectProps, StylesConfig } from 'react-select';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps extends Omit<SelectProps<Option>, 'styles'> {
  className?: string;
  height?: string;
}

const customStyles = (height?: string): StylesConfig<Option> => ({
  control: (provided, state) => ({
...
```

### src\components\core\spinner.tsx

```tsx
import React from 'react';

interface SpinnerProps {
    className?: string;
    size?: number;
    color?: string;
    enableTheme?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ className = '', size = 20, color = 'currentColor', enableTheme = true }) => {
    return (
        <svg
            className={`animate-spin ${className}`}
            width={size}
            height={size}
...
```

### src\components\dashboard\layouts\DashboardLayout.tsx

```tsx
import React from 'react';
import { DashboardProvider } from '@src/context/dashboardContext';
import Sidebar from './Sidebar';
import Header from './Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="lg:pl-64 relative">
...
```

### src\components\dashboard\layouts\Header.tsx

```tsx
'use client'
import React, { useState } from 'react';
import { Bell, Search, Menu, LogOut, User, ChevronDown, X } from 'lucide-react';
import { useDashboard } from '@src/context/dashboardContext';
import { useUser } from '@hooks/use-user';
import { useParams, useRouter } from 'next/navigation';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from '@src/components/drawer';
import Link from 'next/link';
import { LayoutDashboard, Building, MapPin, Plane, Users, Settings, BookOpen, BarChart3, Shield } from 'lucide-react';
import Container from '@components/core/container';

const Header = () => {
  const { user, modules } = useDashboard();
  const { logout, isLoading } = useUser();
  const router = useRouter();
...
```

### src\components\dashboard\layouts\index.ts

```tsx
export { default as DashboardLayout } from './DashboardLayout';
export { default as Sidebar } from './Sidebar';
export { default as Header } from './Header';
...
```

### src\components\dashboard\layouts\Sidebar.tsx

```tsx
'use client'
import React from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building,
  MapPin,
  Plane,
  Users,
  Settings,
  BookOpen,
  BarChart3,
  Shield
} from 'lucide-react';
...
```

### src\components\dashboard\modules\index.ts

```tsx
export { default as ModuleManager } from './ModuleManager';
...
```

### src\components\dashboard\modules\ModuleManager.tsx

```tsx
'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Building, MapPin, Plane, Users, ToggleLeft } from 'lucide-react';
import { useDashboard } from '@src/context/dashboardContext';
import { ModuleId } from '@src/types/dashboard';

const ModuleManager = () => {
  const { modules, toggleModule, user } = useDashboard();

  if (!user || (user.role !== 'admin' && user.role !== 'super-admin')) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Access denied. Admin privileges required.</p>
      </div>
...
```

### src\components\dashboard\shared\widgets\index.ts

```tsx
export { default as StatsCard } from './StatsCard';
...
```

### src\components\dashboard\shared\widgets\StatsCard.tsx

```tsx
'use client'
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
}

const StatsCard = ({
  title,
...
```

### src\components\DatePicker.tsx

```tsx
import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerProps {
  placeholder: string;
  value: string;
  onChange: (date: string) => void;
  className?: string;
}

export function DatePicker({ placeholder, value, onChange, className }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

...
```

### src\components\drawer.tsx

```tsx
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import cn from "@src/utils/classNames";

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
Drawer.displayName = "Drawer";
...
```

### src\components\GuestSelector.tsx

```tsx
import { useState, useRef, useEffect } from 'react';
import { Users, ChevronDown, Plus, Minus } from 'lucide-react';

interface GuestSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function GuestSelector({ value, onChange }: GuestSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
...
```

### src\components\hotelMap.tsx

```tsx
"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useHotelFilters } from "@src/context/hotelFilterContext";
import { formatPrice } from "@src/utils/formatNumber";

export default function HotelsMap() {
    const { data: hotels } = useHotelFilters(); // 🔹 fetch hotels dynamically

    // Custom Price Marker
    const getMarkerIcon = (price: number, currency: string) =>
        new L.DivIcon({
            html: `<div style="
        background:#fff;
...
```

### src\components\ImageWithFallback.tsx

```tsx
'use client'
import React, { useState } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  const { src, alt, style, className, ...rest } = props

...
```

### src\components\main\components\home\components\featuredDestination.tsx

```tsx
'use client'
import React from 'react'
import { useAppSelector } from '@lib/redux/store';
import { FeaturedCard } from '@components/core/components';
import Container from '@components/core/container';


function FeaturedDestination() {
    const { data } = useAppSelector((state) => state?.appData);
    const featured_tours = data?.featured_tours || [];
    return (
        <section id="destinations" className="py-20 bg-gradient-to-br from-emerald-50 to-green-50">
            <Container>
                {/* Enhanced Section Header */}
                <div className="text-center mb-16">
...
```

### src\components\main\components\home\components\featuredFlights.tsx

```tsx
'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Plane, Star, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

// Mock featured flights data
const featuredFlights = [
    {
        id: 1,
        airline: "Emirates",
        logo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=100",
        route: "New York → Dubai",
        departure: "JFK",
        arrival: "DXB",
...
```

### src\components\main\components\home\components\featuredHotels.tsx

```tsx
'use client'
import { HotelCard } from '@components/core/components'
import Container from '@components/core/container';
import { useAppSelector } from '@lib/redux/store';
import { useParams } from 'next/navigation';
import React from 'react'

function FeaturedHotels() {
    const params = useParams();
    const lang = params?.lang as string || 'en';
    const { data } = useAppSelector((state) => state?.appData);
    const featured_hotels = data?.featured_hotels || [];
    return (

        <section id="hotels" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
...
```

### src\components\main\components\home\components\hero.tsx

```tsx
'use client';
import { HotelSearch } from '@components/main/components/modules';
import { ToursMainSearch } from '@components/main/components/modules/components/tours/mainSearch';
import { FlightsMainSearch } from '@components/main/components/modules/components/flights/mainSearch';
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import { Building2, MapPin, Plane } from 'lucide-react';

const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.5, ease: "easeInOut" }
    }
};
...
```

### src\components\main\components\home\components\index.ts

```tsx
export { default as Hero } from "./hero";
export { default as FeaturedDestinations } from "./featuredDestination";
export { default as FeaturedHotels } from "./featuredHotels";
export { default as FeaturedFlights } from "./featuredFlights";
export { default as WhyUs } from "./whyUs";
export { default as Testimonials } from "./testimonial";

...
```

### src\components\main\components\home\components\testimonial.tsx

```tsx
"use client"

import { TestimonialCard } from "@components/core/components/cards";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Container from "@components/core/container";
import { useAppSelector } from "@lib/redux/store";
...
```

### src\components\main\components\home\components\whyUs.tsx

```tsx
'use client'
import Container from "@components/core/container";
import { useAppSelector } from "@lib/redux/store";
import { useRouter } from "next/navigation";
import { Shield, Award, Users, Zap, Heart, ArrowRight } from "lucide-react";

const WhyUs = (): React.JSX.Element => {
    const whyChooseUsFeatures = useAppSelector((state) => state?.appData.data?.our_services);
    const router = useRouter();

    const getFeatureIcon = (index: number) => {
        const icons = [Shield, Award, Users, Zap, Heart];
        const Icon = icons[index % icons.length];
        return <Icon className="w-8 h-8" />;
    };
...
```

### src\components\main\components\home\index.ts

```tsx
export * from "./components";

...
```

### src\components\main\components\index.ts

```tsx
export * from "./home";
export { default as Newsletter } from "./newsLetter";

...
```

### src\components\main\components\localeCurrencySelectors.tsx

```tsx
"use client";
import { useMemo, useState } from "react";
import { useFloating, offset, flip, shift, useClick, useDismiss, useInteractions } from "@floating-ui/react";
import { ChevronDown } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@lib/redux/store";
import { setLocale, setCurrency } from "@lib/redux/base";
import useLocale from "@hooks/useLocale";
import useCurrency from "@hooks/useCurrency";
import useDirection from '@hooks/useDirection'
import { useChangeLocale } from "@src/utils/changeLocale";
function Dropdown({ label, items, value, onChange }: {
    label: string;
    items: Record<string, string>[]
    value: string;
    onChange: (val: string) => void;
...
```

### src\components\main\components\modules\components\flights\booking\flightBooking.tsx

```tsx
'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
    Plane,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { DatePicker } from '@components/DatePicker'

const bookingSchema = z.object({
    passengers: z.array(z.object({
        firstName: z.string().min(1, 'First name is required'),
...
```

### src\components\main\components\modules\components\flights\booking\flightBookingComplete.tsx

```tsx
'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
    CheckCircle,
    Plane,
    Calendar,
    Users,
    MapPin,
    Clock,
    Download,
    Mail,
    Phone
} from 'lucide-react'
import { useRouter } from 'next/navigation';
...
```

### src\components\main\components\modules\components\flights\booking\index.ts

```tsx
export { default as FlightBooking } from './flightBooking';
export { default as FlightBookingComplete } from './flightBookingComplete';
...
```

### src\components\main\components\modules\components\flights\index.ts

```tsx
export * from './mainSearch';
export * from './listing';
export * from './booking';
...
```

### src\components\main\components\modules\components\flights\listing\flightsListing.tsx

```tsx
'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Plane,
    Clock,
    Users,
    Wifi,
    Coffee,
    Monitor,
    Filter,
    ArrowUpDown,
    Star,
    X,
    MapPin,
...
```

### src\components\main\components\modules\components\flights\listing\index.ts

```tsx
export { default as FlightsListing } from './flightsListing';
...
```

### src\components\main\components\modules\components\flights\mainSearch\index.ts

```tsx
export { default as FlightsMainSearch } from './mainSearch';
...
```

### src\components\main\components\modules\components\flights\mainSearch\mainSearch.tsx

```tsx
'use client';
import React, { useState, useRef, useMemo, useEffect } from 'react'
import { DatePicker } from "@components/DatePicker";
import { GuestSelector } from "@components/GuestSelector";
import {
    ChevronDown,
    MapPin,
    Search,
    SearchX,
    Plane,
    ArrowRightLeft
} from "lucide-react";
import { getDestinations } from '@src/actions';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
...
```

### src\components\main\components\modules\components\hotels\booking\bookingComplete.tsx

```tsx
'use client';
import { useEffect, useState } from 'react';
import Container from '@components/core/container';
import ImageBlur from '@src/utils/blurImage';
import renderStars from '@src/utils/renderStars';
import { CheckCircle, MapPin, Calendar, Users, Download, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { generateReceipt } from '@src/utils/generateReceipt';

interface Hotel {
  hotel_id: string;
  img: string;
  name: string;
  location: string;
...
```

### src\components\main\components\modules\components\hotels\booking\hotelBooking.tsx

```tsx
'use client';
import { useEffect, useState } from 'react';
import Container from '@components/core/container';
import ImageBlur from '@src/utils/blurImage';
import renderStars from '@src/utils/renderStars';
import { MapPin, Calendar, Users, CreditCard, Shield, CheckCircle } from 'lucide-react';
import { DatePicker } from '@components/DatePicker';
import { GuestSelector } from '@components/GuestSelector';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

interface Hotel {
  hotel_id: string;
  img: string;
  name: string;
...
```

### src\components\main\components\modules\components\hotels\booking\index.ts

```tsx
export { default as HotelBooking } from './hotelBooking';
export { default as BookingComplete } from './bookingComplete';
...
```

### src\components\main\components\modules\components\hotels\details\hotelDetails.tsx

```tsx
'use client';
import { useEffect, useState } from 'react';
import Container from '@components/core/container';
import ImageBlur from '@src/utils/blurImage';
import renderStars from '@src/utils/renderStars';
import { getFeatureIcon } from '@src/utils/featureIcon';
import { MapPin, Heart, Share2 } from 'lucide-react';
import { DatePicker } from '@components/DatePicker';
import { GuestSelector } from '@components/GuestSelector';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Hotel {
  hotel_id: string;
  img: string;
...
```

### src\components\main\components\modules\components\hotels\details\index.ts

```tsx
export { default as HotelDetails } from './hotelDetails';
...
```

### src\components\main\components\modules\components\hotels\index.ts

```tsx
export * from "./listing";
export * from "./details";
export * from "./booking";
export * from "./mainSearch";

...
```

### src\components\main\components\modules\components\hotels\listing\components\filter.tsx

```tsx
'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { debounce } from 'lodash';
import { useHotelFilters } from '@src/context/hotelFilterContext';
import { PriceRangeSlider } from '@components/core/components';
import { Search, Star } from 'lucide-react';
import { Checkbox } from '@components/core/checkbox';
import { useUser } from '@hooks/use-user';

// --- Sub Components ---
function PriceFilter({
    value,
    onChange,
    priceRange,
...
```

### src\components\main\components\modules\components\hotels\listing\components\index.ts

```tsx
export { default as HotelsMain } from "./main";
export { default as HotelsList } from "./wrapper";

...
```

### src\components\main\components\modules\components\hotels\listing\components\main.tsx

```tsx
'use client';
import Container from '@components/core/container';
import { useHotelFilters } from '@src/context/hotelFilterContext';
import Filter from './filter';
import { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
const filterChips = [

    {
        icon: <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
...
```

### src\components\main\components\modules\components\hotels\listing\components\wrapper.tsx

```tsx
'use client'
import renderStars from '@src/utils/renderStars';
import { AnimatePresence, motion } from 'framer-motion';
import { BarChart3, ChevronDown, Grid, Heart, List, SlidersHorizontal, MapIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useHotelFilters } from '@src/context/hotelFilterContext';
import { HotelCardLoading } from '@components/core/components';
import { formatPrice } from '@src/utils/formatNumber';
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@components/drawer";
import { HotelsMap } from '@components/hotelMap';
import ImageBlur from '@src/utils/blurImage';
import { useUser } from '@hooks/use-user';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Select from '@components/core/select';
...
```

### src\components\main\components\modules\components\hotels\listing\index.ts

```tsx
export * from "./components";

...
```

### src\components\main\components\modules\components\hotels\mainSearch\index.ts

```tsx
export { default as HotelSearch } from "./mainSearch";

...
```

### src\components\main\components\modules\components\hotels\mainSearch\mainSearch.tsx

```tsx
'use client';
import React, { useState, useRef, useMemo, useEffect } from 'react'
import { DatePicker } from "@components/DatePicker";
import { GuestSelector } from "@components/GuestSelector";
import {
    ChevronDown,
    MapPin,
    Search,
    SearchX,
} from "lucide-react";
import { getDestinations } from '@src/actions';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { debounce } from 'lodash';
import { useForm, Controller } from 'react-hook-form';
...
```

### src\components\main\components\modules\components\index.ts

```tsx
export * from "./hotels";

...
```

### src\components\main\components\modules\components\tours\booking\index.ts

```tsx
export { default as TourBooking } from './tourBooking';
export { default as TourBookingComplete } from './tourBookingComplete';
...
```

### src\components\main\components\modules\components\tours\booking\tourBooking.tsx

```tsx
'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Calendar,
    Users,
    CreditCard,
    Shield,
    Clock,
    MapPin,
    Star,
    ChevronLeft,
    Check
} from 'lucide-react'
import { DatePicker } from '@components/DatePicker'
...
```

### src\components\main\components\modules\components\tours\booking\tourBookingComplete.tsx

```tsx
'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
    CheckCircle,
    Calendar,
    Users,
    MapPin,
    Clock,
    Download,
    Share2,
    Star,
    Mail,
    Phone
} from 'lucide-react'
...
```

### src\components\main\components\modules\components\tours\details\index.ts

```tsx
export { default as TourDetails } from './tourDetails';
...
```

### src\components\main\components\modules\components\tours\details\tourDetails.tsx

```tsx
'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Star,
    Clock,
    Users,
    MapPin,
    Calendar,
    Shield,
    Award,
    Heart,
    Share2,
    ChevronLeft,
    ChevronRight
...
```

### src\components\main\components\modules\components\tours\index.ts

```tsx
export * from './mainSearch';
export * from './listing';
export * from './details';
export * from './booking';
...
```

### src\components\main\components\modules\components\tours\listing\components\filter.tsx

```tsx
'use client'
import React, { useState, useEffect } from 'react'
import { ChevronDown, Filter, X, Star, Clock, Users, MapPin } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface FilterProps {
    onFilterChange?: (filters: any) => void;
}

const ToursFilter = ({ onFilterChange }: FilterProps): React.JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const [filters, setFilters] = useState({
        priceRange: [0, 500],
        rating: '',
...
```

### src\components\main\components\modules\components\tours\listing\components\index.ts

```tsx
export { default as ToursWrapper } from './wrapper';
export { default as ToursFilter } from './filter';
export { default as ToursMain } from './main';
...
```

### src\components\main\components\modules\components\tours\listing\components\main.tsx

```tsx
'use client'
import React from 'react'
import ToursFilter from './filter'
import Container from '@components/core/container';

interface ToursMainProps {
    children?: React.ReactNode;
}

const ToursMain = ({ children }: ToursMainProps): React.JSX.Element => {
    const handleFilterChange = (filters: any) => {
        console.log('Filters changed:', filters);
        // Handle filter changes here
    };

...
```

### src\components\main\components\modules\components\tours\listing\components\wrapper.tsx

```tsx
'use client'
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { BarChart3, ChevronDown, Grid, Heart, List, SlidersHorizontal, Star, Clock, Users } from 'lucide-react'
import { formatPrice } from '@src/utils/formatNumber';
import ImageBlur from '@src/utils/blurImage';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Select from '@components/core/select';

// Mock tour data
const mockTours = [
    {
        id: "1",
        name: "Paris City Walking Tour",
...
```

### src\components\main\components\modules\components\tours\listing\index.ts

```tsx
export * from './components';
...
```

### src\components\main\components\modules\components\tours\mainSearch\index.ts

```tsx
export { default as ToursMainSearch } from './mainSearch';
...
```

### src\components\main\components\modules\components\tours\mainSearch\mainSearch.tsx

```tsx
'use client';
import React, { useState, useRef, useMemo, useEffect } from 'react'
import { DatePicker } from "@components/DatePicker";
import { GuestSelector } from "@components/GuestSelector";
import {
    ChevronDown,
    MapPin,
    Search,
    SearchX,
} from "lucide-react";
import { getDestinations } from '@src/actions';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { debounce } from 'lodash';
import { useForm, Controller } from 'react-hook-form';
...
```

### src\components\main\components\modules\index.ts

```tsx
export * from "./components";

...
```

### src\components\main\components\newsLetter.tsx

```tsx
'use client'
import React, { useState, useEffect } from "react";
import { newsLetter } from "@src/actions";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Alert } from "@components/core/alert";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@components/core/container";


const newsletterSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
...
```

### src\components\main\footer.tsx

```tsx
'use client'
import Link from "next/link";
import {
    ChevronDown,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
} from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { z } from "zod";
...
```

### src\components\main\header.tsx

```tsx

'use client'
import Container from "@components/core/container";
import { useUser } from "@hooks/use-user";
import { Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import UserDropdown from "./userDropdown";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
export default function Header({ ...props }: { dictionary: any }): React.JSX.Element {
    const { dictionary } = props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const menuVariants = {
        hidden: { opacity: 0, y: -20 },
...
```

### src\components\main\index.ts

```tsx
export * from "./components";

...
```

### src\components\main\layout.tsx

```tsx
'use client'
import React from 'react'
import Header from './header'
import Footer from './footer'

const Main = ({ children, dictionary }: { children: React.ReactNode; dictionary: any }): React.JSX.Element => {
    return <>
        <Header dictionary={dictionary} />
        {children}
        <Footer />
    </>
}
export default Main
...
```

### src\components\main\userDropdown.tsx

```tsx
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
...
```

### src\components\toast.tsx

```tsx
import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import cn from "@src/utils/classNames";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
...
```

### src\config.ts

```tsx
import { getSiteURL } from "@src/utils/get-site-url";
export interface Config {
  site: { name: string; description: string; themeColor: string; url: string };
}

export const config: Config = {
  site: {
    name: "Fliptron",
    description: "",
    themeColor: "#090a0b",
    url: getSiteURL(),
  },
};

...
```

### src\constants\app.constant.ts

```tsx
export const APP_NAME = "iata";

...
```

### src\constants\theme.constant.ts

```tsx
export const MODE_LIGHT = "light";
export const MODE_DARK = "dark";
export const THEME_DIR = "ltr";
export const THEME_LOCALE = "en";
export const THEME_CURRENCY = "USD";
export const THEME_COUNTRY = "US";
export const SIDE_NAV_WIDTH = 290;
export const SIDE_NAV_COLLAPSED_WIDTH = 80;
export const SIDE_NAV_CONTENT_GUTTER = "px-2";
export const LOGO_X_GUTTER = "px-6";
export const HEADER_HEIGHT = 88;
export const PAGE_CONTAINER_GUTTER_X = "px-4 sm:px-6 md:px-8";
export const PAGE_CONTAINER_GUTTER_Y = "py-4 sm:py-6 md:px-8";

export const THEME_ENUM = {
...
```

### src\context\dashboardContext.tsx

```tsx
'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ModuleId, Module, User, MODULES } from '@src/types/dashboard';
import { useUser } from '@hooks/use-user';

interface DashboardContextType {
  modules: Record<ModuleId, Module>;
  user: User | null;
  toggleModule: (moduleId: ModuleId) => void;
  hasPermission: (moduleId: ModuleId, action: string) => boolean;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
...
```

### src\context\hotelFilterContext.tsx

```tsx
"use client";

import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useMemo,
    useEffect,
} from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { hotels_filter, hotels_search } from "@src/actions";

// ===== Types =====
export type PriceRange = { min: number; max: number };
...
```

### src\context\LoadingContext.tsx

```tsx
'use client';
import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@lib/redux/store";
import { setAppData } from "@lib/redux/appData";
import useCurrency from "@hooks/useCurrency";
import useLocale from "@hooks/useLocale";

interface LoadingContextType {
    loading: boolean;
    setLoading: (v: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
    loading: false,
...
```

### src\context\user-context.tsx

```tsx
'use client';

import * as React from 'react';


import { authClient } from '@lib/auth/client';
type User = Record<string, unknown>;

export interface UserContextValue {
  user: Record<string, unknown> | null;
  error: string | null;
  isLoading: boolean;
  checkSession?: () => Promise<void>;
  logout?: () => Promise<void>;
}
...
```

### src\get-dictionary.ts

```tsx
import "server-only";
import type { Locale } from "../next-intl";

const dictionaries = {
  en: () =>
    import("./dictionaries/en/en.json").then((module) => module.default),
  ar: () =>
    import("./dictionaries/ar/ar.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  const dictLoader = dictionaries[locale as keyof typeof dictionaries];
  if (dictLoader) {
    return await dictLoader();
  }
...
```

### src\hooks\use-mobile.tsx

```tsx
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
...
```

### src\hooks\use-toast.ts

```tsx
import * as React from "react";

import type { ToastActionElement, ToastProps } from "@components/toast";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const actionTypes = {
...
```

### src\hooks\use-user.ts

```tsx
import * as React from "react";

import type { UserContextValue } from "@src/context/user-context";
import { UserContext } from "@src/context/user-context";

export function useUser(): UserContextValue {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}

...
```

### src\hooks\useCallbackRef.ts

```tsx
"use client";
import { useRef, useEffect, useMemo } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
function useCallbackRef<T extends (...args: any[]) => any>(
  cb: T | undefined
): T {
  const cbRef = useRef(cb);

  useEffect(() => {
    cbRef.current = cb;
  });

  return useMemo(() => ((...args) => cbRef.current?.(...args)) as T, []);
}
...
```

### src\hooks\useControllableState.ts

```tsx
"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import useCallbackRef from "./useCallbackRef";

type UseControllableStateParams<T> = {
  prop?: T;
  defaultProp?: T;
  onChange?: (state: T) => void;
};

function useUncontrolledState<T>({
  defaultProp,
  onChange,
}: Omit<UseControllableStateParams<T>, "prop">) {
  const uncontrolledState = useState(defaultProp);
...
```

### src\hooks\useCountdownSeconds.ts

```tsx
"use client";

import { useEffect, useState } from "react";

const formatTime = (totalSeconds: number): string => {
  if (totalSeconds < 60) {
    return `${totalSeconds}`;
  }
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};
...
```

### src\hooks\useCountries.ts

```tsx
"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "@src/actions";
import { useAppDispatch, useAppSelector } from "@lib/redux/store";
import { setCountry } from "@lib/redux/base";
import { useEffect, useState } from "react";
type Country = {
  label: string;
  value: string;
  code: string;
};

type CountryApi = {
  id: number | string;
  name: string;
...
```

### src\hooks\useCurrency.ts

```tsx
"use client";
import { useAppSelector, useAppDispatch } from "@lib/redux/store";
import { setCurrency } from "@lib/redux/base";
import { useEffect } from "react";

const useCurrency = () => {
  const dispatch = useAppDispatch();
  const currencies =
    useAppSelector((state) => state?.appData?.data?.currencies) || [];
  const currentCurrency = useAppSelector(
    (state) => state?.root?.currency
  ) as string;
  const defaultCurrency = currencies?.find(
    (currency: any) => currency?.default === "1"
  );
...
```

### src\hooks\useDirection.ts

```tsx
"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type { Direction } from "@src/@types/theme";
import { useAppDispatch, useAppSelector } from "@lib/redux/store";
import { setDirection as setDirectionAction } from "@lib/redux/base";

function useDirection(): [
  direction: Direction,
  setDirection: (dir: Direction) => void
] {
  const direction = useAppSelector(
    (state) => state.root.direction as Direction
  );
  const dispatch = useAppDispatch();
...
```

### src\hooks\useLocale.ts

```tsx
"use client";
import { useAppSelector, useAppDispatch } from "@lib/redux/store";
import { usePathname } from "next/navigation";
import { setLocale } from "@lib/redux/base";
import { useEffect } from "react";

const useLocale = () => {
  const dispatch = useAppDispatch();
  const languages =
    useAppSelector((state) => state?.appData?.data?.languages) || [];
  const currentLang = useAppSelector((state) => state?.root?.locale) as string;
  const pathname = usePathname();

  // Get first segment from path
  const segments = pathname.split("/").filter(Boolean);
...
```

### src\hooks\useMediaQuery.ts

```tsx
import { useEffect, useState } from "react";

const breakpoints: Record<string, number> = {
  xs: 576,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export function useMediaQuery(bp: keyof typeof breakpoints): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
...
```

### src\hooks\useMergeRef.ts

```tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Dispatch, SetStateAction, ForwardedRef } from 'react'

type Ref<T> = Dispatch<SetStateAction<T>> | ForwardedRef<T>

const useMergeRef =
    <T = any>(...refs: Ref<T>[]) =>
    (element: T | null) => {
        refs.forEach((ref) => {
            if (typeof ref === 'function') {
                ref(element as SetStateAction<T> & (T | null))
            } else if (ref && typeof ref === 'object') {
                ref.current = element
            }
        })
...
```

### src\hooks\useTimeout.ts

```tsx
import { useEffect, useRef, useCallback } from "react";

export type UseTimeoutReturn = {
  clear: () => void;
  reset: () => void;
};

function useTimeout(
  fn: (() => void) | undefined,
  ms = 0,
  enabled = true
): UseTimeoutReturn {
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const callback = useRef(fn);

...
```

### src\hooks\useUncertainRef.ts

```tsx
import { useRef } from 'react'
import type { ForwardedRef } from 'react'

export default function useUncertainRef<T = unknown>(ref: ForwardedRef<T>) {
    const newRef = useRef<T>(null)

    if (ref) {
        return ref
    }

    return newRef
}

...
```

### src\hooks\useUniqueId.ts

```tsx
import { useRef } from "react";
import uniqueId from "lodash/uniqueId";
import createUID from "@src/utils/createUid";

export default function useUniqueId(prefix = "", len = 10) {
  const idRef = useRef<string>(undefined);

  if (!idRef.current) {
    idRef.current = `${uniqueId(prefix)}-${createUID(len)}`;
  }

  return idRef.current;
}

...
```

### src\lib\appProvider.tsx

```tsx
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
...
```

### src\lib\auth\auth-guard.tsx

```tsx
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import { useUser } from '@src/hooks/use-user';
import { Alert } from '@components/core/alert';


export interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps): React.JSX.Element | null {
  const router = useRouter();
...
```

### src\lib\auth\client.ts

```tsx
"use client";

import {
  getUser as userData,
  signIn,
  signOut,
  forget_password,
} from "@src/actions";
export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
...
```

### src\lib\auth\guest-guard.tsx

```tsx
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Alert } from '@src/components/core/alert';
import { useUser } from '@src/hooks/use-user';


export interface GuestGuardProps {
  children: React.ReactNode;
}

export function GuestGuard({ children }: GuestGuardProps): React.JSX.Element | null {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
...
```

### src\lib\auth\session.ts

```tsx
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.JWT_PASSWORD;
const key = new TextEncoder().encode(secret);

export async function encrypt(payload: Record<string, unknown>) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key);
}

...
```

### src\lib\buildProvidersTree.tsx

```tsx
export const buildProvidersTree = (componentsWithProps: any) => {
    const initialComponent = ({ children }: any) => <>{children}</>
    return componentsWithProps.reduce(
        (AccumulatedComponents: any, [Provider, props = {}]: any) => {
            // eslint-disable-next-line react/display-name
            return ({ children }: any) => {
                return (
                    <AccumulatedComponents>
                        <Provider {...props}>{children} </Provider>
                    </AccumulatedComponents>
                );
            };
        }, initialComponent);
};

...
```

### src\lib\configProvider.ts

```tsx
"use client";
import { createContext, useContext } from "react";

export type Config = {
  direction: "ltr" | "rtl";
  locale: string;
  currency: string;
};

export const defaultConfig: Config = {
  direction: "ltr",
  locale: "en",
  currency: "USD",
} as const;

...
```

### src\lib\icon.tsx

```tsx
'use client'
import React from "react";
import { ReactSVG } from "react-svg";
type IconProps = {
    path: string;
    className?: string;
    color?: string;
    height?: number;
    width?: number;
}

function Icon(props: IconProps) {
    const { path, className, color, height, width, ...rest } = props;
    const prefix = "/static/icons/";
    return path && <ReactSVG  {...rest}
...
```

### src\lib\react-query\getQueryClient.ts

```tsx
import {
  QueryClient,
  defaultShouldDehydrateQuery,
  isServer,
} from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: (query) =>
...
```

### src\lib\react-query\index.ts

```tsx
import { QueryClient } from "@tanstack/react-query";

// Create a single shared QueryClient instance
export const sharedQueryClient = new QueryClient();

export * from "./getQueryClient";
export { default as QueryClientProvider } from "./providers";

...
```

### src\lib\react-query\providers.tsx

```tsx
'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from './getQueryClient'
import type * as React from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

...
```

### src\lib\redux\appData\actions.ts

```tsx
import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { fetchAppData } from "@src/actions";

export const setAppData = createAsyncThunk(
  "websiteContent/fetchWebContent",
  async (payload: { language?: string; currency?: string } = {}) => {
    const { language = "en", currency = "usd" } = payload;

    const response = await fetchAppData({ language, currency });
    const { data } = response;
    return data;
  }
);

...
```

### src\lib\redux\appData\index.ts

```tsx
export * from "./reducer";
export * from "./actions";
export * from "./selectors";

...
```

### src\lib\redux\appData\reducer.ts

```tsx
import { createReducer } from "@reduxjs/toolkit";
import { setAppData } from "./actions";

interface state {
  data?: null | any;
}
const initialState: state = {
  data: null,
};

export const appDataReducer = createReducer(initialState, (builder) => {
  builder.addCase(setAppData.fulfilled, (state, action) => {
    state.data = action.payload;
  });
});
...
```

### src\lib\redux\appData\selectors.ts

```tsx
import { RootState } from "../store";

export const appData = (state: RootState) => state.appData;

...
```

### src\lib\redux\base\actions.ts

```tsx
import { createAction } from "@reduxjs/toolkit";

export const setDirection = createAction<"ltr" | "rtl">("SET_DIRECTION");
export const setLocale = createAction<string>("SET_LOCALE");
export const setCurrency = createAction<string>("SET_CURRENCY");
export const setCountry = createAction<string>("SET_COUNTRY");

...
```

### src\lib\redux\base\index.ts

```tsx
export * from "./actions";
export * from "./reducer";
export * from "./actions";
export * from "./selectors";

...
```

### src\lib\redux\base\reducer.ts

```tsx
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { setDirection, setLocale, setCurrency, setCountry } from "./actions";

// 2. Destination interface is used here to type the destination property in the State interface
interface State {
  direction: "ltr" | "rtl";
  locale: string;
  currency: string;
  country: string;
}

const initialState: State = {
  direction: "ltr",
  locale: "en",
  currency: "usd",
...
```

### src\lib\redux\base\selectors.ts

```tsx
import { RootState } from "../store";
export const direction = (state: RootState) => state.root.direction;
export const locale = (state: RootState) => state.root.locale;
export const currency = (state: RootState) => state.root.currency;

...
```

### src\lib\redux\providers\index.ts

```tsx
export { default as StoreProvider } from "./storeProvider";

...
```

### src\lib\redux\providers\persistGateProvider.tsx

```tsx
'use client'
import { Persistor } from "redux-persist/es/types";
import { PersistGate } from 'redux-persist/integration/react';
import { useRef } from "react";
import { persistStore } from "redux-persist";
import { AppStore } from "../store";

function PersistGateProvider({ children, store }: { children: React.ReactNode, store: AppStore }) {
    const persistor = useRef<Persistor | null>(null);

    if (!persistor.current) {
        // Create the persistor instance the first time this renders
        persistor.current = persistStore(store);
    }

...
```

### src\lib\redux\providers\storeProvider.tsx

```tsx
'use client'
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { AppStore, store } from "@lib/redux/store";
import PersistGateProvider from './persistGateProvider';


function StoreProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore>(store)

    if (!storeRef.current) {

        storeRef.current = store;
    }

...
```

### src\lib\redux\store.ts

```tsx
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { appReducer } from "@redux/base";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from "react-redux";
import { appDataReducer } from "@redux/appData";

const createNoopStorage = () => {
  return {
    getItem() {
...
```

### src\middleware.ts

```tsx
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "../next-intl";
import type { NextRequest } from "next/server";
import { updateSession } from "@lib/auth/session";

export default async function middleware(request: NextRequest) {
  const hostname = request.nextUrl.hostname;
  await updateSession(request);
  // Use next-intl's middleware to handle locales
  const intlMiddleware = createMiddleware({
    locales,
    defaultLocale,
    localePrefix: "as-needed",
  });

...
```

### src\theme\theme.config.ts

```tsx
import { THEME_ENUM } from "@src/constants/theme.constant";
import { Mode } from "@src/@types/theme";

export type ThemeConfig = {
  direction: "ltr" | "rtl";
  locale: string;
  currency: string;
  country: string;
};

/**
 * Since some configurations need to be match with specific themes,
 * we recommend to use the configuration that generated from demo.
 */
export const themeConfig: ThemeConfig = {
...
```

### src\theme\theme.tsx

```tsx
'use client'
import ConfigProvider from '@lib/configProvider'
import type { CommonProps } from '@src/@types/common'
import { useAppSelector } from '@lib/redux/store';

const Theme = (props: CommonProps) => {
    const direction = useAppSelector(state => state.root.direction);
    const locale = useAppSelector(state => state.root.locale);
    const currency = useAppSelector(state => state.root.currency);
    return (
        <ConfigProvider
            value={{
                direction,
                locale,
                currency,
...
```

### src\types\dashboard.ts

```tsx
export type UserRole = 'customer' | 'agent' | 'admin' | 'super-admin';

export type ModuleId = 'hotels' | 'tours' | 'flights' | 'users';

export interface Module {
  id: ModuleId;
  name: string;
  enabled: boolean;
  permissions: string[];
  icon: string;
}

export interface User {
  id: string;
  name: string;
...
```

### src\utils\blurImage.tsx

```tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ImageBlur({ src, alt, width = 40, height = 40, fill, onError, ...props }: any) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Image
        alt={alt}
        src={src}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
...
```

### src\utils\changeLocale.ts

```tsx
"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLoading } from "@src/context/LoadingContext";
import { useEffect, useState } from "react";
import { locales } from "../../next-intl";

export function useChangeLocale() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname);
  const { setLoading } = useLoading();

  // Keep currentPath updated
  useEffect(() => {
...
```

### src\utils\classNames.ts

```tsx
import cn from 'classnames'
import { twMerge } from 'tailwind-merge'

export default function classNames(...args: cn.ArgumentArray) {
    return twMerge(cn(args))
}

...
```

### src\utils\constants.ts

```tsx
export enum SIZES {
    XS = 'xs',
    SM = 'sm',
    MD = 'md',
    LG = 'lg',
}

export const CONTROL_SIZES: Record<
    SIZES,
    { h: string; w: string; minH: string; minW: string }
> = {
    [SIZES.XS]: {
        h: 'h-8',
        w: 'w-8',
        minH: 'min-h-8',
...
```

### src\utils\createAvatar.ts

```tsx
import { capitalize } from "lodash";

// ----------------------------------------------------------------------

const PRIMARY_NAME = ["A", "N", "H", "L", "Q", "9", "8"];
const INFO_NAME = ["F", "G", "T", "I", "J", "1", "2", "3"];
const SUCCESS_NAME = ["K", "D", "Y", "B", "O", "4", "5"];
const WARNING_NAME = ["P", "E", "R", "S", "C", "U", "6", "7"];
const ERROR_NAME = ["V", "W", "X", "M", "Z"];

function getFirstCharacter(name: string) {
  return capitalize(name && name.charAt(0));
}

function getAvatarColor(name: string) {
...
```

### src\utils\createSvgIcon.tsx

```tsx
import * as React from "react";

export default function createSvgIcon(
  path: React.ReactNode,
  displayName: string
) {
  const Component = React.forwardRef<
    SVGSVGElement,
    React.SVGProps<SVGSVGElement>
  >((props, ref) => (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
...
```

### src\utils\createUid.ts

```tsx
const createUID = (len = 10) => {
  const buf = [];
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charlen = chars.length;
  const length = len;

  for (let i = 0; i < length; i++) {
    buf[i] = chars.charAt(Math.floor(Math.random() * charlen));
  }
  return buf.join("");
};

export default createUID;

...
```

### src\utils\featureIcon.tsx

```tsx
import { Waves, Car, Utensils, Dumbbell, Wifi, Coffee } from "lucide-react";
import React from "react";

export function getFeatureIcon(feature: string, size: string = "w-4 h-4") {
    switch (feature.toLowerCase()) {
        case "private beach":
            return {
                icon: <Waves className={`${size} text-yellow-600`} />,
                bg: "bg-yellow-100",
            };
        case "valet parking":
        case "parking":
            return {
                icon: <Car className={`${size} text-blue-600`} />,
                bg: "bg-blue-100",
...
```

### src\utils\formatNumber.ts

```tsx
import { replace } from "lodash";
import numeral from "numeral";

// ----------------------------------------------------------------------

export function fCurrency(number: number) {
  return numeral(number).format(
    Number.isInteger(number) ? "PKR0,0" : "PKR0,0.00"
  );
}

export function fPercent(number: number) {
  return numeral(number / 100).format("0.0%");
}

...
```

### src\utils\generateReceipt.ts

```tsx
import jsPDF from "jspdf";
import QRCode from "qrcode";

interface ReceiptData {
  confirmationNumber: string;
  hotelName: string;
  hotelLocation: string;
  hotelAddress: string;
  guestName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
...
```

### src\utils\get-site-url.ts

```tsx
export function getSiteURL(): string {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process.env.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/";
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.endsWith("/") ? url : `${url}/`;
  return url;
}

...
```

### src\utils\renderStars.tsx

```tsx
import { Star } from "lucide-react";
import React from "react";

function renderStars(rating: number, size: number = 4) {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const sizeClass = `w-${size} h-${size}`;

    // full stars
    for (let i = 0; i < fullStars; i++) {
        stars.push(
            <Star
                key={`full-${i}`}
...
```
