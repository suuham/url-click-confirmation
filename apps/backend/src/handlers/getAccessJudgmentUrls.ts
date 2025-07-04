/**
 * アクセス判定URL一覧取得ハンドラー
 * Node.js環境でPostgreSQLデータベースに対するアクセス判定URL取得処理
 *
 * 主な仕様:
 * - 条件付きアクセス判定URL検索
 * - ページネーション対応
 * - ソート機能
 * - アクセスログ情報の付与
 *
 * 制限事項:
 * - 取得上限・オフセットの設定必須
 */
import type { RouteHandler } from "@hono/zod-openapi";
import type { AccessJudgmentUrl } from "@prisma/client";
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
import type { ErrorResponse } from "~/schema/error";
import { getAccessJudgmentUrl } from "~/utils/getRequestOrigin";

type GetAccessJudgmentUrlsResponse = z.infer<
	typeof getAccessJudgmentUrlsResponseSchema
>;

/**
 * アクセス判定URL一覧取得処理
 *
 * 処理フロー:
 * 1. クエリパラメータの解析
 * 2. 検索条件に基づくフィルタリング
 * 3. アクセス判定URL取得
 * 4. 関連データ（会社・ベースURL・アクセスログ）の取得
 * 5. レスポンス構築・返却
 */
export const getAccessJudgmentUrlsHandler: RouteHandler<
	typeof getAccessJudgmentUrlsRoute
> = async (c: Context) => {
	try {
		// クエリパラメータの解析
		const queryParams = getAccessJudgmentUrlsQuerySchema.parse(c.req.query());
		const { companyName, baseUrl, baseUrlTitle, limit, offset, sort, order } =
			queryParams;

		// Node.js環境では大量データ処理が可能だが、安全のため上限を設定
		// ユーザーが指定した件数を尊重しつつ、システム保護のため上限値を適用
		const safeLimit = Math.min(limit, 50000);

		let accessJudgmentUrls: AccessJudgmentUrl[];
		let totalCount: number;

		// 検索条件に基づくフィルタリング
		if (companyName) {
			// 会社名による検索
			const companies = await getCompaniesByNameLike(companyName);
			if (companies.length === 0) {
				return c.json(
					{
						accessJudgmentUrls: [],
						totalCount: 0,
					} satisfies GetAccessJudgmentUrlsResponse,
					200,
				);
			}

			const companyIds = companies.map((company) => company.id);
			accessJudgmentUrls = await getAccessJudgmentUrlsByCompanyIds(
				safeLimit,
				offset,
				sort,
				order,
				companyIds,
			);

			// 総件数取得（実装簡略化のため全件取得してカウント）
			const allAccessJudgmentUrls = await getAccessJudgmentUrlsByCompanyIds(
				Number.MAX_SAFE_INTEGER,
				0,
				sort,
				order,
				companyIds,
			);
			totalCount = allAccessJudgmentUrls.length;
		} else if (baseUrl || baseUrlTitle) {
			// ベースURLまたはタイトルによる検索
			const searchQuery = baseUrl || baseUrlTitle || "";
			const baseUrls = await getBaseUrlsByUrlLike(searchQuery);

			if (baseUrls.length === 0) {
				return c.json(
					{
						accessJudgmentUrls: [],
						totalCount: 0,
					} satisfies GetAccessJudgmentUrlsResponse,
					200,
				);
			}

			const baseUrlIds = baseUrls.map((baseUrl) => baseUrl.id);
			accessJudgmentUrls = await getAccessJudgmentUrlsByBaseUrlIds(
				safeLimit,
				offset,
				sort,
				order,
				baseUrlIds,
			);

			// 総件数取得（実装簡略化のため全件取得してカウント）
			const allAccessJudgmentUrls = await getAccessJudgmentUrlsByBaseUrlIds(
				Number.MAX_SAFE_INTEGER,
				0,
				sort,
				order,
				baseUrlIds,
			);
			totalCount = allAccessJudgmentUrls.length;
		} else {
			// 全件検索
			accessJudgmentUrls = await getAccessJudgmentUrls(
				safeLimit,
				offset,
				sort,
				order,
			);
			totalCount = await getAccessJudgmentUrlsCount();
		}

		if (accessJudgmentUrls.length === 0) {
			return c.json(
				{
					accessJudgmentUrls: [],
					totalCount,
				} satisfies GetAccessJudgmentUrlsResponse,
				200,
			);
		}

		// 関連データの取得
		const companyIds = [
			...new Set(accessJudgmentUrls.map((url) => url.companyId)),
		];
		const baseUrlIds = [
			...new Set(accessJudgmentUrls.map((url) => url.baseUrlId)),
		];
		const accessJudgmentUrlIds = accessJudgmentUrls.map((url) => url.id);

		const [companies, baseUrls, accessLogs] = await Promise.all([
			getCompaniesByIds(companyIds),
			getBaseUrlsByIds(baseUrlIds),
			getAccessJudgmentUrlLogsByAccessJudgmentUrlIds(accessJudgmentUrlIds),
		]);

		// レスポンス構築
		const responseData = accessJudgmentUrls.map((accessJudgmentUrl) => {
			const company = companies.find(
				(c) => c.id === accessJudgmentUrl.companyId,
			);
			const baseUrlRecord = baseUrls.find(
				(b) => b.id === accessJudgmentUrl.baseUrlId,
			);

			if (!company || !baseUrlRecord) {
				throw new Error(
					`Failed to find company or baseUrl for accessJudgmentUrl: ${accessJudgmentUrl.id}, companyId: ${accessJudgmentUrl.companyId}, baseUrlId: ${accessJudgmentUrl.baseUrlId}`,
				);
			}

			// このアクセス判定URLに関連するアクセスログを取得
			const relatedLogs = accessLogs.filter(
				(log) => log.accessJudgmentUrlId === accessJudgmentUrl.id,
			);

			const viewedAts = relatedLogs.map((log) => log.createdAt.getTime());
			const lastViewedAt =
				viewedAts.length > 0 ? Math.max(...viewedAts) : undefined;

			return {
				company: {
					id: company.id,
					name: company.name,
				},
				baseUrl: {
					id: baseUrlRecord.id,
					title: baseUrlRecord.title,
					url: baseUrlRecord.url,
				},
				accessJudgmentUrl: {
					id: accessJudgmentUrl.id,
					url: getAccessJudgmentUrl(c, accessJudgmentUrl.id),
					viewCount: relatedLogs.length,
					createdAt: accessJudgmentUrl.createdAt.getTime(),
					lastViewedAt,
					viewedAts: viewedAts.length > 0 ? viewedAts : undefined,
				},
			};
		});

		const response: GetAccessJudgmentUrlsResponse = {
			accessJudgmentUrls: responseData,
			totalCount,
		};

		return c.json(response, 200);
	} catch (error) {
		console.error(
			"Error in getAccessJudgmentUrlsHandler:",
			error instanceof Error ? error.message : "Unknown error",
			error instanceof Error ? error.stack : "",
		);

		return c.json(
			{
				error: {
					message: "Failed to get access judgment URLs",
					details: [
						error instanceof Error
							? error.message
							: "予期しないエラーが発生しました",
					],
				},
			} satisfies ErrorResponse,
			500,
		);
	}
};
