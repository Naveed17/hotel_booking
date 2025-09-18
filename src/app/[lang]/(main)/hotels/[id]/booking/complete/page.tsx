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
};

const Page = async ({ params }: Props): Promise<React.JSX.Element> => {
  const { id, lang } = await params;
  const dict = await getDictionary(lang);

  return <BookingComplete hotelId={id} dict={dict} />;
};

export default Page;