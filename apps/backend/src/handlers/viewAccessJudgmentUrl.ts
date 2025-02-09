import type { RouteHandler } from "@hono/zod-openapi";
import type { Context } from "hono";
import { getAccessJudgmentUrlById } from "~/models/AccessJudgmentUrl";
import { insertAccessJudgmentUrlLog } from "~/models/AccessJudgmentUrlLog";
import { getBaseUrlById } from "~/models/BaseUrl";

import type { viewAccessJudgmentUrlsRoute } from "~/routers/accessJudgmentUrl";
import type { ErrorResponse } from "~/schema/error";

export const viewAccessJudgmentUrlHandler: RouteHandler<
	typeof viewAccessJudgmentUrlsRoute
> = async (c: Context) => {
	const accessJudgmentUrlId = c.req.param("accessJudgmentUrlId");
	console.log(accessJudgmentUrlId);

	const accessJudgmentUrl = await getAccessJudgmentUrlById(accessJudgmentUrlId);
	if (!accessJudgmentUrl) {
		const errorResponse: ErrorResponse = {
			error: {
				message: "Failed to find access judgment URL",
				details: ["Access judgment URL not found"],
			},
		};
		return c.json(errorResponse, 404);
	}

	try {
		await insertAccessJudgmentUrlLog(accessJudgmentUrl.id);
	} catch (e: unknown) {
		const errorMessage =
			e instanceof Error ? e.message : "An unknown error occurred";
		const errorResponse: ErrorResponse = {
			error: {
				message: "Failed to insert access judgment URL log",
				details: [errorMessage],
			},
		};
		return c.json(errorResponse, 500);
	}

	const baseUrl = await getBaseUrlById(accessJudgmentUrl.baseUrlId);
	if (!baseUrl) {
		const errorResponse: ErrorResponse = {
			error: {
				message: "Failed to find base URL",
				details: ["Base URL not found"],
			},
		};
		return c.json(errorResponse, 404);
	}

	return c.redirect(baseUrl.url, 302);
};
