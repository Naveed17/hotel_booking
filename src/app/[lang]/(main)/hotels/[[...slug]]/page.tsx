import * as React from 'react';
import type { Metadata } from 'next';
import { getDictionary } from '@src/get-dictionary';
import { HotelsList } from '@components/main/components/modules';


interface Props {
  params: Promise<{ slug: string[]; lang: 'en' | 'ar' }>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params;

  return {
    title: `Flight Details: ${slug?.[1]} - ${slug?.[2]}`,
    description: `Details for: ${slug?.[1]} to ${slug?.[2]}`,
  };
};

const Page = async ({ params }: Props): Promise<React.JSX.Element> => {
  const { slug, lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <HotelsList />
  );
};

export default Page;