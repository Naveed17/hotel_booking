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
};

const Page = async ({ params }: Props): Promise<React.JSX.Element> => {
  const { id, lang } = await params;
  
  return (
    <TourDetails />
  );
};

export default Page;