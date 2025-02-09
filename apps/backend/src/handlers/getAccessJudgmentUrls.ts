import type { RouteHandler } from "@hono/zod-openapi";
import type { Context } from "hono";
import type { z } from "zod";
import {
	getAccessJudgmentUrls,
	getAccessJudgmentUrlsByBaseUrlIds,
	getAccessJudgmentUrlsByCompanyIds,
} from "~/models/AccessJudgmentUrl";
import { getAccessJudgmentUrlLogsByAccessJudgmentUrlId } from "~/models/AccessJudgmentUrlLog";
import { getBaseUrlById, getBaseUrlsByUrlLike } from "~/models/BaseUrl";
import { getCompaniesByNameLike, getCompanyById } from "~/models/Company";
import type { getAccessJudgmentUrlsRoute } from "~/routers/accessJudgmentUrl";
import {
	getAccessJudgmentUrlsQuerySchema,
	type getAccessJudgmentUrlsResponseSchema,
} from "~/schema/accessJudgmentUrl";
import { getAccessJudgmentUrl } from "~/utils/getRequestOrigin";

type GetAccessJudgmentUrlsResponse = z.infer<
	typeof getAccessJudgmentUrlsResponseSchema
>;

export const getAccessJudgmentUrlsHandler: RouteHandler<
	typeof getAccessJudgmentUrlsRoute
> = async (c: Context) => {
	const { companyName, baseUrlUrl, limit, offset, sort, order } =
		getAccessJudgmentUrlsQuerySchema.parse(c.req.query());

	const company = companyName
		? await getCompaniesByNameLike(companyName)
		: null;
	const baseUrl = baseUrlUrl ? await getBaseUrlsByUrlLike(baseUrlUrl) : null;

	const accessJudgmentUrls = company
		? await getAccessJudgmentUrlsByCompanyIds(
				limit,
				offset,
				sort,
				order,
				company.map((c) => c.id),
			)
		: baseUrl
			? await getAccessJudgmentUrlsByBaseUrlIds(
					limit,
					offset,
					sort,
					order,
					baseUrl.map((b) => b.id),
				)
			: await getAccessJudgmentUrls(limit, offset, sort, order);

	const response: GetAccessJudgmentUrlsResponse = {
		accessJudgmentUrls: await Promise.all(
			accessJudgmentUrls.map(async (accessJudgmentUrl) => {
				const accessJudgmentUrlLogs =
					await getAccessJudgmentUrlLogsByAccessJudgmentUrlId(
						accessJudgmentUrl.id,
					);
				const company = (await getCompanyById(accessJudgmentUrl.companyId))!;
				const baseUrl = (await getBaseUrlById(accessJudgmentUrl.baseUrlId))!;
				const lastViewedAt = accessJudgmentUrlLogs
					.map((log) => log.createdAt.getTime())
					.reduce((a, b) => Math.max(a, b), 0);
				const viewedAts = accessJudgmentUrlLogs
					.map((log) => log.createdAt.getTime())
					.sort((a, b) => b - a)
					.slice(1);

				return {
					company: {
						id: company.id,
						name: company.name,
					},
					baseUrl: {
						id: baseUrl.id,
						title: baseUrl.title,
						url: baseUrl.url,
					},
					accessJudgmentUrl: {
						id: accessJudgmentUrl.id,
						url: getAccessJudgmentUrl(c, accessJudgmentUrl.id),
						viewCount: accessJudgmentUrlLogs.length,
						lastViewedAt: lastViewedAt,
						viewedAts: viewedAts,
					},
				};
			}),
		),
	};

	return c.json(response, 200);
};
