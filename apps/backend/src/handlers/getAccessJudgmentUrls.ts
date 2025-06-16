import type { RouteHandler } from "@hono/zod-openapi";
import type { Context } from "hono";
import type { z } from "zod";
import {
	getAccessJudgmentUrls,
	getAccessJudgmentUrlsByBaseUrlIds,
	getAccessJudgmentUrlsByCompanyIds,
	getAccessJudgmentUrlsCount,
} from "~/models/accessJudgmentUrl";
import { getAccessJudgmentUrlLogsByAccessJudgmentUrlIds } from "~/models/accessJudgmentUrlLog";
import { getBaseUrlsByIds, getBaseUrlsByUrlLike } from "~/models/baseUrl";
import { getCompaniesByIds, getCompaniesByNameLike } from "~/models/company";
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

	// 関連データを一括で取得
	const accessJudgmentUrlIds = accessJudgmentUrlRecords.map(
		(record) => record.id,
	);
	const companyIds = [
		...new Set(accessJudgmentUrlRecords.map((record) => record.companyId)),
	];
	const baseUrlIds = [
		...new Set(accessJudgmentUrlRecords.map((record) => record.baseUrlId)),
	];

	const [
		accessJudgmentUrlLogRecords,
		relatedCompanyRecords,
		relatedBaseUrlRecords,
	] = await Promise.all([
		getAccessJudgmentUrlLogsByAccessJudgmentUrlIds(db, accessJudgmentUrlIds),
		getCompaniesByIds(db, companyIds),
		getBaseUrlsByIds(db, baseUrlIds),
	]);

	// 会社レコードをマップ化
	const companiesById = new Map(
		relatedCompanyRecords.map((company) => [company.id, company]),
	);

	// ベースURLレコードをマップ化
	const baseUrlsById = new Map(
		relatedBaseUrlRecords.map((baseUrl) => [baseUrl?.id, baseUrl]),
	);

	const response: GetAccessJudgmentUrlsResponse = {
		accessJudgmentUrls: accessJudgmentUrlRecords.map(
			(accessJudgmentUrlRecord) => {
				const logs = accessJudgmentUrlLogRecords.filter(
					(log) => log.accessJudgmentUrlId === accessJudgmentUrlRecord.id,
				);
				const company = companiesById.get(accessJudgmentUrlRecord.companyId);
				const baseUrl = baseUrlsById.get(accessJudgmentUrlRecord.baseUrlId);

				if (!company || !baseUrl) {
					throw new Error("Company or BaseUrl not found");
				}

				const lastViewedAt = logs
					.map((log) => log.createdAt.getTime())
					.reduce((a, b) => Math.max(a, b), 0);
				const viewedAts = logs
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
						id: accessJudgmentUrlRecord.id,
						url: getAccessJudgmentUrl(c, accessJudgmentUrlRecord.id),
						viewCount: logs.length,
						createdAt: accessJudgmentUrlRecord.createdAt.getTime(),
						lastViewedAt: lastViewedAt,
						viewedAts: viewedAts,
					},
				};
			},
		),
		totalCount,
	};

	return c.json(response, 200);
};
