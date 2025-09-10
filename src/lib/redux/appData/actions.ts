import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { fetchAppData } from "@src/actions";

export const setAppData = createAsyncThunk(
  "websiteContent/fetchWebContent",
  async (payload: { language?: string; currency?: string } = {}) => {
    const { language = "en", currency = "usd" } = payload;

    const response = await fetchAppData({ language, currency });
    const { data } = response;
    return data;
  }
);
