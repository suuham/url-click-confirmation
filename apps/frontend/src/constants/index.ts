export const ROUTES = {
	ACCESS_JUDGMENT_LIST_FILE_UPLOAD_PAGE: "/",

	ACCESS_JUDGMENT_LIST_FILE_COMPLETE_PAGE: "/complete",

	ACCESS_JUDGMENT_LIST: "/access-judgment-urls",
} as const;

export type Routes = (typeof ROUTES)[keyof typeof ROUTES];

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
