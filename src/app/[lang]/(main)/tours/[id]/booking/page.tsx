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
};

const Page = async ({ params }: Props): Promise<React.JSX.Element> => {
  const { id, lang } = await params;
  
  return (
    <TourBooking />
  );
};

export default Page;