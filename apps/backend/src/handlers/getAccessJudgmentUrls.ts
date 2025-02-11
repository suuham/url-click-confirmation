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
	const { companyName, baseUrl, limit, offset, sort, order } =
		getAccessJudgmentUrlsQuerySchema.parse(c.req.query());

	const companyRecords = companyName
		? await getCompaniesByNameLike(companyName)
		: null;
	const baseUrlRecords = baseUrl ? await getBaseUrlsByUrlLike(baseUrl) : null;

	const accessJudgmentUrlRecords = companyRecords
		? await getAccessJudgmentUrlsByCompanyIds(
				limit,
				offset,
				sort,
				order,
				companyRecords.map((c) => c.id),
			)
		: baseUrlRecords
			? await getAccessJudgmentUrlsByBaseUrlIds(
					limit,
					offset,
					sort,
					order,
					baseUrlRecords.map((b) => b.id),
				)
			: await getAccessJudgmentUrls(limit, offset, sort, order);

	const response: GetAccessJudgmentUrlsResponse = {
		accessJudgmentUrls: await Promise.all(
			accessJudgmentUrlRecords.map(async (accessJudgmentUrlRecord) => {
				const accessJudgmentUrlLogRecords =
					await getAccessJudgmentUrlLogsByAccessJudgmentUrlId(
						accessJudgmentUrlRecord.id,
					);
				const companyRecord = (await getCompanyById(
					accessJudgmentUrlRecord.companyId,
				))!;
				const baseUrlRecord = (await getBaseUrlById(
					accessJudgmentUrlRecord.baseUrlId,
				))!;

				const lastViewedAt = accessJudgmentUrlLogRecords
					.map((log) => log.createdAt.getTime())
					.reduce((a, b) => Math.max(a, b), 0);
				const viewedAts = accessJudgmentUrlLogRecords
					.map((log) => log.createdAt.getTime())
					.sort((a, b) => b - a)
					.slice(1);

				return {
					company: {
						id: companyRecord.id,
						name: companyRecord.name,
					},
					baseUrl: {
						id: baseUrlRecord.id,
						title: baseUrlRecord.title,
						url: baseUrlRecord.url,
					},
					accessJudgmentUrl: {
						id: accessJudgmentUrlRecord.id,
						url: getAccessJudgmentUrl(c, accessJudgmentUrlRecord.id),
						viewCount: accessJudgmentUrlLogRecords.length,
						lastViewedAt: lastViewedAt,
						viewedAts: viewedAts,
					},
				};
			}),
		),
	};

	return c.json(response, 200);
};
