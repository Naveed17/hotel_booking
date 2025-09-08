import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { setDirection, setLocale, setCurrency } from "./actions";

// 2. Destination interface is used here to type the destination property in the State interface
interface State {
  direction: "ltr" | "rtl";
  locale: string;
  currency: string;
}

const initialState: State = {
  direction: "ltr",
  locale: "en",
  currency: "USD",
};

export const appReducer = createReducer(initialState, (builder) => {
  builder

    .addCase(setDirection, (state, action: PayloadAction<"rtl" | "ltr">) => {
      state.direction = action.payload;
    })
    .addCase(setLocale, (state, action: PayloadAction<string>) => {
      state.locale = action.payload;
    })

    .addCase(setCurrency, (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    });
});
