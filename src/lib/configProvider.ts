"use client";
import { createContext, useContext } from "react";

export type Config = {
  direction: "ltr" | "rtl";
  locale: string;
  currency: string;
};

export const defaultConfig: Config = {
  direction: "ltr",
  locale: "en",
  currency: "USD",
} as const;

export const ConfigContext = createContext<Config>(defaultConfig);

const ConfigProvider = ConfigContext.Provider;

export const ConfigConsumer = ConfigContext.Consumer;

export function useConfig() {
  return useContext(ConfigContext);
}

export default ConfigProvider;
