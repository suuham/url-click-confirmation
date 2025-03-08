import { OpenAPIHono } from "@hono/zod-openapi";

import { createAccessJudgmentUrlsHandler } from "../handlers/createAccessJudgmentUrls";
import { getAccessJudgmentUrlsHandler } from "../handlers/getAccessJudgmentUrls";
import { viewAccessJudgmentUrlHandler } from "../handlers/viewAccessJudgmentUrl";
import {
	createAccessJudgmentUrlsRoute,
	getAccessJudgmentUrlsRoute,
	viewAccessJudgmentUrlsRoute,
} from "./accessJudgmentUrl";

export const router = new OpenAPIHono();

router
	.openapi(getAccessJudgmentUrlsRoute, getAccessJudgmentUrlsHandler)
	.openapi(viewAccessJudgmentUrlsRoute, viewAccessJudgmentUrlHandler)
	.openapi(createAccessJudgmentUrlsRoute, createAccessJudgmentUrlsHandler);

router.doc("/doc", {
	openapi: "3.0.0",
	info: {
		version: "1.0.0",
		title: "アクセス判定URL発行・閲覧アプリAPI",
	},
});
