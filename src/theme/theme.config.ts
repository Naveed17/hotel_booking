import { THEME_ENUM } from "@src/constants/theme.constant";
import { Mode } from "@src/@types/theme";

export type ThemeConfig = {
  direction: "ltr" | "rtl";
  locale: string;
  currency: string;
  country: string;
};

/**
 * Since some configurations need to be match with specific themes,
 * we recommend to use the configuration that generated from demo.
 */
export const themeConfig: ThemeConfig = {
  direction: THEME_ENUM.THEME_DIR,
  locale: THEME_ENUM.THEME_LOCALE,
  currency: THEME_ENUM.THEME_CURRENCY,
  country: THEME_ENUM.THEME_COUNTRY,
};
