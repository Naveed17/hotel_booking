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
  phonecode: string;
  country_status: string;
};
const useCountries = () => {
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const defaultCountry =
    useAppSelector((state) => state?.appData?.data?.app?.country_name) ||
    "pakistan";

  const { data: countries, isLoading } = useQuery<Country[] | any>({
    queryKey: ["countries"],
    queryFn: fetchCountries,
    staleTime: Infinity,
    select: (data: []) =>
      data
        .filter(
          (country: { country_status: string }) =>
            country.country_status === "1"
        )
        .map((country: { name: any; id: any; phonecode: any }) => ({
          label: country?.name.toLocaleLowerCase(),
          value: country?.id.toString(),
          code: country?.phonecode,
        })),
  });

  const dispatch = useAppDispatch();
  const currentCountry = useAppSelector(
    (state) => state?.root?.country
  ) as string;
  const country = currentCountry || defaultCountry;
  useEffect(() => {
    const select = countries?.find((con: { label: string; value: string }) => {
      return con.label === defaultCountry || con.value === country.value;
    });
    if (select) {
      setSelectedCountry(select);
    }
  }, [country, countries, isLoading]);
  useEffect(() => {
    if (country) {
      dispatch(setCountry(country));
    }
  }, [country, dispatch]);

  return { countries, isLoading, selectedCountry };
};

export default useCountries;
