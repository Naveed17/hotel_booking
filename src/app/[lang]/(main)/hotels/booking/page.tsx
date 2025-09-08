import { getDictionary } from "@src/get-dictionary";




interface Props {
  params: Promise<{ slug: string; lang: 'en' | 'ar' }>;
}

//  Metadata: Fetch data here only for SEO (title, description)
// export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
//   const { slug } = await params;
//   const response = await offerDetails(slug);
//   const offerData = response?.data;

//   return {
//     title: offerData?.title
//       ? `${offerData.title} - offers Details`
//       : `offer: ${slug} - Details`,
//     description: offerData?.description?.substring(0, 160) || 'View offer details.',
//   };
// };

// Page: Fetch data here to pass to component
const Page = async ({ params }: Props): Promise<React.JSX.Element> => {
  const { slug, lang } = await params;

  const dict = await getDictionary(lang);

  return (
    <>
      fasf
    </>
  );
};

export default Page;