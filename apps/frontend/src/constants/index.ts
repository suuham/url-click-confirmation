export const ROUTES = {
	HOME: "/",
	ACCESS_JUDGMENT_LIST: "/access-judgment-urls",
} as const;

export type ROUTES = (typeof ROUTES)[keyof typeof ROUTES];
