import type { RouteHandler } from "@hono/zod-openapi";
import type { z } from "zod";
import type { getAccessJudgmentUrlsRoute } from "~/routers/accessJudgmentUrl";
import type { getAccessJudgmentUrlsResponseSchema } from "~/schema/accessJudgmentUrl";

type GetAccessJudgmentUrlsResponse = z.infer<
	typeof getAccessJudgmentUrlsResponseSchema
>;

export const getAccessJudgmentUrlsHandler: RouteHandler<
	typeof getAccessJudgmentUrlsRoute
> = (c) => {
	const response: GetAccessJudgmentUrlsResponse = {
		accessJudgmentUrls: [
			{
				company: {
					id: "1",
					name: "Google",
				},
				baseUrl: {
					id: "1",
					url: "https://google.com",
				},
				accessJudgmentUrl: {
					id: "1",
					url: "https://google.com",
					viewCount: 1,
					lastViewedAt: 1560000000,
					viewedAts: [1560000000, 1560000000],
				},
			},
		],
	};

	return c.json(response);
};
