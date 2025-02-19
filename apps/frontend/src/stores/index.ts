import type { ROUTES } from "@/constants";
import { atom } from "jotai";

export const currentPageNameAtom = atom<ROUTES>("/");
