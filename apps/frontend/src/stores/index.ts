import type { Routes } from "@/constants";
import { atom } from "jotai";

export const currentPageNameAtom = atom<Routes>("/");
export const uploadedFileAtom = atom<File | null>(null);
export const downloadFileAtom = atom<File | null>(null);
