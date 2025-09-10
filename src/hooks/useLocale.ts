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
  const urlLocale = segments[0] || "en";

  // Find language by code
  const foundLang = languages?.find(
    (lang: any) => lang.language_code === urlLocale
  );

  const locale = foundLang ? foundLang.language_code : currentLang;
  useEffect(() => {
    if (locale && locale !== currentLang) {
      dispatch(setLocale(locale));
    }
  }, [locale, currentLang, dispatch]);

  return {
    locale,
  };
};

export default useLocale;
