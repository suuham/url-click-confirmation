import { ROUTES } from "@/constants";

export const NAV_ITEMS = [
	{ name: "URL作成", path: ROUTES.ACCESS_JUDGMENT_LIST_FILE_UPLOAD_PAGE },
	{ name: "URL閲覧", path: ROUTES.ACCESS_JUDGMENT_LIST },
] as const;
