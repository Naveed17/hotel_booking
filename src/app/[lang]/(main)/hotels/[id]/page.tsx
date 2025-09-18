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
};

const Page = async ({ params }: Props): Promise<React.JSX.Element> => {
  const { id, lang } = await params;
  const dict = await getDictionary(lang);

  return <HotelDetails hotelId={id} dict={dict} />;
};

export default Page;