import { createAction } from "@reduxjs/toolkit";

export const setDirection = createAction<"ltr" | "rtl">("SET_DIRECTION");
export const setLocale = createAction<string>("SET_LOCALE");
export const setCurrency = createAction<string>("SET_CURRENCY");
export const setCountry = createAction<string>("SET_COUNTRY");
