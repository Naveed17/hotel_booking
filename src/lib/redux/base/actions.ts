import { createAction } from "@reduxjs/toolkit";
import { Theme } from "@src/@types/theme";

type ModeType = Theme;
export const setMode = createAction<ModeType["mode"]>("SET_MODE");
