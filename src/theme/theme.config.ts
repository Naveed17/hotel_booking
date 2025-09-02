import { THEME_ENUM } from "@src/constants/theme.constant";
import { Mode } from "@src/@types/theme";

export type ThemeConfig = {
  mode: Mode;
};

/**
 * Since some configurations need to be match with specific themes,
 * we recommend to use the configuration that generated from demo.
 */
export const themeConfig: ThemeConfig = {
  mode: THEME_ENUM.MODE_LIGHT,
};
