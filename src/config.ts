import { getSiteURL } from "@src/utils/get-site-url";
export interface Config {
  site: { name: string; description: string; themeColor: string; url: string };
}

export const config: Config = {
  site: {
    name: "Fliptron",
    description: "",
    themeColor: "#090a0b",
    url: getSiteURL(),
  },
};
