import type { RouteHandler } from "@hono/zod-openapi";
import type { z } from "zod";
import type { createAccessJudgmentUrlsRoute } from "~/routers/accessJudgmentUrl";
import type { createAccessJudgmentUrlsResponseSchema } from "~/schema/accessJudgmentUrl";

type CreateAccessJudgmentUrlsResponse = z.infer<
	typeof createAccessJudgmentUrlsResponseSchema
>;

export const createAccessJudgmentUrlsHandler: RouteHandler<
	typeof createAccessJudgmentUrlsRoute
> = (c) => {
	const response: CreateAccessJudgmentUrlsResponse = {
		accessJudgmentUrls: [
			{
				id: "1",
				baseUrl: "https://google.com",
				accessJudgmentUrl: "https://google.com",
			},
		],
	};

	return c.json(response, 201);
};
