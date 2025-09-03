import { createReducer } from "@reduxjs/toolkit";
import { setAppData } from "./actions";

interface state {
  data?: null | any;
}
const initialState: state = {
  data: null,
};

export const appDataReducer = createReducer(initialState, (builder) => {
  builder.addCase(setAppData.fulfilled, (state, action) => {
    state.data = action.payload;
  });
});
