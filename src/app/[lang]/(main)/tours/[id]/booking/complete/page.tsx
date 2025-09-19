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
};

const Page = async ({ params }: Props): Promise<React.JSX.Element> => {
  const { id, lang } = await params;
  
  return (
    <TourBookingComplete />
  );
};

export default Page;