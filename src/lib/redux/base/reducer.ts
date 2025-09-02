import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { setMode } from "./actions";
interface state {
  mode: string;
}
const initialState: state = {
  mode: "light",
};

export const appReducer = createReducer(initialState, (builder) => {
  builder.addCase(setMode, (state, action: PayloadAction<string>) => {
    state.mode = action.payload;
  });
});
