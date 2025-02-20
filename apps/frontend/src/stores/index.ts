import type { ROUTES } from "@/constants";
import { atom } from "jotai";

export const currentPageNameAtom = atom<ROUTES>("/");
export const uploadedFileAtom = atom<File | null>(null);
export const downloadFileAtom = atom<Blob | null>(null);
