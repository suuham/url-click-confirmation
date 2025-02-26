import type { RouteHandler } from "@hono/zod-openapi";
import type { Context } from "hono";
import { getAccessJudgmentUrlById } from "~/models/accessJudgmentUrl";
import { insertAccessJudgmentUrlLog } from "~/models/accessJudgmentUrlLog";
import { getBaseUrlById } from "~/models/baseUrl";

import type { viewAccessJudgmentUrlsRoute } from "~/routers/accessJudgmentUrl";
import { viewAccessJudgmentUrlQuerySchema } from "~/schema/accessJudgmentUrl";

export const viewAccessJudgmentUrlHandler: RouteHandler<
	typeof viewAccessJudgmentUrlsRoute
> = async (c: Context) => {
	const accessJudgmentUrlId = c.req.param("accessJudgmentUrlId");
	const { isDemo } = viewAccessJudgmentUrlQuerySchema.parse(c.req.query());

	const accessJudgmentUrlRecord =
		await getAccessJudgmentUrlById(accessJudgmentUrlId);
	if (!accessJudgmentUrlRecord) {
		return c.json(
			{
				error: {
					message: "Failed to find access judgment URL",
					details: ["Access judgment URL not found"],
				},
			},
			404,
		);
	}

	const baseUrlRecord = await getBaseUrlById(accessJudgmentUrlRecord.baseUrlId);
	if (!baseUrlRecord) {
		return c.json(
			{
				error: {
					message: "Failed to find base URL",
					details: ["Base URL not found"],
				},
			},
			404,
		);
	}

	if (!isDemo) {
		try {
			await insertAccessJudgmentUrlLog(accessJudgmentUrlRecord.id);
		} catch (e: unknown) {
			const errorMessage =
				e instanceof Error ? e.message : "An unknown error occurred";
			return c.json(
				{
					error: {
						message: "Failed to insert access judgment URL log",
						details: [errorMessage],
					},
				},
				500,
			);
		}
	}

	return c.redirect(baseUrlRecord.url, 302);
};
