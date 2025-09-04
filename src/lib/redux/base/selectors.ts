import { RootState } from "../store";
export const direction = (state: RootState) => state.root.direction;
export const locale = (state: RootState) => state.root.locale;
export const currency = (state: RootState) => state.root.currency;
