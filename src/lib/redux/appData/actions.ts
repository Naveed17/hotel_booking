import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { fetchAppData } from "@src/actions";

export const setAppData = createAsyncThunk(
  "websiteContent/fetchWebContent",
  async () => {
    const response = await fetchAppData();
    const { data } = response;
    return data;
  }
);

