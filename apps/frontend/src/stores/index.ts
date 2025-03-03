import { atom } from "jotai";

export const uploadedFileAtom = atom<File | null>(null);
export const downloadFileAtom = atom<File | null>(null);
