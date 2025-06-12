export const ROUTES = {
	// biome-ignore lint/style/useNamingConvention:
	ACCESS_JUDGMENT_LIST_FILE_UPLOAD_PAGE: "/",
	// biome-ignore lint/style/useNamingConvention:
	ACCESS_JUDGMENT_LIST_FILE_COMPLETE_PAGE: "/complete",
	// biome-ignore lint/style/useNamingConvention:
	ACCESS_JUDGMENT_LIST: "/access-judgment-urls",
} as const;
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const TOAST_DURATION = 3000;
export const ITEMS_PER_PAGE = 50;

export type Routes = (typeof ROUTES)[keyof typeof ROUTES];
