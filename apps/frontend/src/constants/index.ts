export const ROUTES = {
	// biome-ignore lint/style/useNamingConvention:
	HOME: "/",
	// biome-ignore lint/style/useNamingConvention:
	ACCESS_JUDGMENT_LIST: "/access-judgment-urls",
} as const;

// biome-ignore lint/style/useNamingConvention:
export type ROUTES = (typeof ROUTES)[keyof typeof ROUTES];

// biome-ignore lint/style/useNamingConvention:
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
