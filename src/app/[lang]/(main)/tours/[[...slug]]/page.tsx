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
  };
};

const Page = async ({ params }: Props): Promise<React.JSX.Element> => {
  const { slug, lang } = await params;
  const dict = await getDictionary(lang);
  
  return (
    <ToursWrapper />
  );
};

export default Page;