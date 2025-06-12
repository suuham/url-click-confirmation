import type { RouteHandler } from "@hono/zod-openapi";
import type { Context } from "hono";
import type { z } from "zod";
import {
	getAccessJudgmentUrls,
	getAccessJudgmentUrlsByBaseUrlIds,
	getAccessJudgmentUrlsByCompanyIds,
	getAccessJudgmentUrlsCount,
} from "~/models/accessJudgmentUrl";
import { getAccessJudgmentUrlLogsByAccessJudgmentUrlId } from "~/models/accessJudgmentUrlLog";
import { getBaseUrlById, getBaseUrlsByUrlLike } from "~/models/baseUrl";
import { getCompaniesByNameLike, getCompanyById } from "~/models/company";
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
	const db = c.env.DB;
	const { companyName, baseUrl, limit, offset, sort, order } =
		getAccessJudgmentUrlsQuerySchema.parse(c.req.query());

	const companyRecords = companyName
		? await getCompaniesByNameLike(db, companyName)
		: null;
	const baseUrlRecords = baseUrl
		? await getBaseUrlsByUrlLike(db, baseUrl)
		: null;

	const accessJudgmentUrlRecords = companyRecords
		? await getAccessJudgmentUrlsByCompanyIds(
				db,
				limit,
				offset,
				sort,
				order,
				companyRecords.map((c) => c.id),
			)
		: baseUrlRecords
			? await getAccessJudgmentUrlsByBaseUrlIds(
					db,
					limit,
					offset,
					sort,
					order,
					baseUrlRecords.map((b) => b.id),
				)
			: await getAccessJudgmentUrls(db, limit, offset, sort, order);

	const totalCount = await getAccessJudgmentUrlsCount(db);

	const response: GetAccessJudgmentUrlsResponse = {
		accessJudgmentUrls: await Promise.all(
			accessJudgmentUrlRecords.map(async (accessJudgmentUrlRecord) => {
				const accessJudgmentUrlLogRecords =
					await getAccessJudgmentUrlLogsByAccessJudgmentUrlId(
						db,
						accessJudgmentUrlRecord.id,
					);
				const companyRecord = (await getCompanyById(
					db,
					accessJudgmentUrlRecord.companyId,
				))!;
				const baseUrlRecord = (await getBaseUrlById(
					db,
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
						createdAt: accessJudgmentUrlRecord.createdAt.getTime(),
						lastViewedAt: lastViewedAt,
						viewedAts: viewedAts,
					},
				};
			}),
		),
		totalCount,
	};

	return c.json(response, 200);
};
