"use client";
import { createContext, useContext } from "react";
import type { TypeAttributes } from "@src/@types/common";

export type Config = {
  mode: "light" | "dark";
  controlSize?: TypeAttributes.ControlSize;
  ui?: {
    card?: {
      cardBordered?: boolean;
    };
    button?: {
      disableClickFeedback?: boolean;
    };
  };
};

export const defaultConfig: Config = {
  mode: "light",
  controlSize: "md",
} as const;

export const ConfigContext = createContext<Config>(defaultConfig);

const ConfigProvider = ConfigContext.Provider;

export const ConfigConsumer = ConfigContext.Consumer;

export function useConfig() {
  return useContext(ConfigContext);
}

export default ConfigProvider;
