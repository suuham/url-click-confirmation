/**
 * アクセス判定URL作成ハンドラー
 * Node.js環境でPostgreSQLデータベースに対するアクセス判定URL作成処理
 *
 * 主な仕様:
 * - CSVデータからアクセス判定URLを一括作成
 * - 会社・ベースURL・アクセス判定URLの重複チェック
 * - 作成結果の返却（成功件数とURL情報）
 *
 * 制限事項:
 * - リクエストボディのバリデーション必須
 */
import type { RouteHandler } from "@hono/zod-openapi";
import type { Context } from "hono";
import type { z } from "zod";
import {
	getAccessJudgmentUrlsByCompanyIdsAndBaseUrlIds,
	insertAccessJudgmentUrls,
} from "~/models/accessJudgmentUrl";
import { getBaseUrlsByUrls, insertBaseUrls } from "~/models/baseUrl";
import { getCompaniesByNames, insertCompanies } from "~/models/company";
import type { createAccessJudgmentUrlsRoute } from "~/routers/accessJudgmentUrl";
import {
	createAccessJudgmentUrlsRequestBodySchema,
	type createAccessJudgmentUrlsResponseSchema,
} from "~/schema/accessJudgmentUrl";
import type { ErrorResponse } from "~/schema/error";
import { getAccessJudgmentUrl } from "~/utils/getRequestOrigin";
import { validateRequestBody } from "~/utils/validateRequestBody";

type CreateAccessJudgmentUrlsResponse = z.infer<
	typeof createAccessJudgmentUrlsResponseSchema
>;

/**
 * アクセス判定URL作成処理
 *
 * 処理フロー:
 * 1. リクエストボディのバリデーション
 * 2. 会社・ベースURLの存在確認と作成
 * 3. アクセス判定URLの重複確認と作成
 * 4. 作成結果の返却
 */
export const createAccessJudgmentUrlsHandler: RouteHandler<
	typeof createAccessJudgmentUrlsRoute
> = async (c: Context) => {
	try {
		// リクエストボディのバリデーション
		const validationResult = await validateRequestBody(
			c,
			createAccessJudgmentUrlsRequestBodySchema,
		);

		if (!validationResult.success) {
			return c.json(validationResult.error, 400);
		}

		const { accessJudgmentUrlInfo } = validationResult.data;

		if (accessJudgmentUrlInfo.length === 0) {
			return c.json(
				{
					error: {
						message: "Access judgment URL info is empty",
						details: ["アクセス判定URL情報が空です"],
					},
				} satisfies ErrorResponse,
				400,
			);
		}

		// 会社名とURLを抽出
		const companyNames = [
			...new Set(accessJudgmentUrlInfo.map((info) => info.companyName)),
		];
		const baseUrls = [
			...new Map(
				accessJudgmentUrlInfo.map((info) => [
					info.baseUrl.url,
					{ title: info.baseUrl.title, url: info.baseUrl.url },
				]),
			).values(),
		];

		// 会社とベースURLを挿入（重複は自動的にスキップ）
		await insertCompanies(companyNames);
		await insertBaseUrls(baseUrls);

		// 挿入後のデータを取得
		const companies = await getCompaniesByNames(companyNames);
		const insertedBaseUrls = await getBaseUrlsByUrls(
			baseUrls.map((baseUrl) => baseUrl.url),
		);

		// 会社名とベースURLからIDへのマッピングを作成
		const companyNameToId = new Map(
			companies.map((company) => [company.name, company.id]),
		);
		const urlToBaseUrlId = new Map(
			insertedBaseUrls.map((baseUrl) => [baseUrl.url, baseUrl.id]),
		);

		// アクセス判定URL用のマッピングを作成
		const companyIdBaseUrlIdMapping = accessJudgmentUrlInfo
			.map((info) => {
				const companyId = companyNameToId.get(info.companyName);
				const baseUrlId = urlToBaseUrlId.get(info.baseUrl.url);

				if (!companyId || !baseUrlId) {
					console.error(
						`Failed to find company or baseUrl for info: ${JSON.stringify(info)}, companyId: ${companyId}, baseUrlId: ${baseUrlId}`,
					);
					return null;
				}

				return { companyId, baseUrlId };
			})
			.filter(
				(item): item is { companyId: string; baseUrlId: string } =>
					item !== null,
			);

		if (companyIdBaseUrlIdMapping.length === 0) {
			return c.json(
				{
					error: {
						message: "Failed to create company and baseUrl mappings",
						details: ["会社とベースURLのマッピング作成に失敗しました"],
					},
				} satisfies ErrorResponse,
				500,
			);
		}

		// アクセス判定URLを挿入
		await insertAccessJudgmentUrls(companyIdBaseUrlIdMapping);

		// 作成されたアクセス判定URLを取得
		const createdAccessJudgmentUrls =
			await getAccessJudgmentUrlsByCompanyIdsAndBaseUrlIds(
				companies.map((company) => company.id),
				insertedBaseUrls.map((baseUrl) => baseUrl.id),
			);

		// レスポンスデータを作成
		const accessJudgmentUrls = createdAccessJudgmentUrls.map(
			(accessJudgmentUrl) => {
				const company = companies.find(
					(c) => c.id === accessJudgmentUrl.companyId,
				);
				const baseUrl = insertedBaseUrls.find(
					(b) => b.id === accessJudgmentUrl.baseUrlId,
				);

				if (!company || !baseUrl) {
					throw new Error(
						`Failed to find company or baseUrl for accessJudgmentUrl: ${accessJudgmentUrl.id}, companyId: ${accessJudgmentUrl.companyId}, baseUrlId: ${accessJudgmentUrl.baseUrlId}`,
					);
				}

				return {
					companyName: company.name,
					baseUrl: {
						title: baseUrl.title,
						url: baseUrl.url,
					},
					accessJudgmentUrl: getAccessJudgmentUrl(c, accessJudgmentUrl.id),
				};
			},
		);

		const response: CreateAccessJudgmentUrlsResponse = {
			accessJudgmentUrls,
		};

		return c.json(response, 201);
	} catch (error) {
		console.error(
			"Error in createAccessJudgmentUrlsHandler:",
			error instanceof Error ? error.message : "Unknown error",
			error instanceof Error ? error.stack : "",
		);

		return c.json(
			{
				error: {
					message: "Failed to create access judgment URLs",
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
