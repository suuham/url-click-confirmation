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

export const createAccessJudgmentUrlsHandler: RouteHandler<
	typeof createAccessJudgmentUrlsRoute
> = async (c: Context) => {
	const db = c.env.DB;
	const validationResult = await validateRequestBody(
		c,
		createAccessJudgmentUrlsRequestBodySchema,
	);

	if (!validationResult.success) {
		return c.json(validationResult.error, 400);
	}

	const requestData = validationResult.data;

	const companyNames = requestData.accessJudgmentUrlInfo.map(
		(info) => info.companyName,
	);
	const baseUrls = requestData.accessJudgmentUrlInfo.map(
		(info) => info.baseUrl,
	);
	const baseUrlUrlInfo = requestData.accessJudgmentUrlInfo.map((info) => ({
		title: info.baseUrl.title,
		url: info.baseUrl.url,
	}));

	try {
		await insertCompanies(db, companyNames);
		await insertBaseUrls(db, baseUrlUrlInfo);
	} catch (e: unknown) {
		const errorMessage =
			e instanceof Error ? e.message : "An unknown error occurred";
		const errorResponse: ErrorResponse = {
			error: {
				message: "Failed to create access judgment URLs or companies",
				details: [errorMessage],
			},
		};
		return c.json(errorResponse, 500);
	}

	const companyRecords = await getCompaniesByNames(db, companyNames);
	const baseUrlRecords = await getBaseUrlsByUrls(
		db,
		baseUrls.map((baseUrl) => baseUrl.url),
	);

	const companyIdBaseUrlIdMapping = requestData.accessJudgmentUrlInfo.map(
		(info) => {
			return {
				companyId: companyRecords.find((c) => c.name === info.companyName)!.id,
				baseUrlId: baseUrlRecords.find((b) => b.url === info.baseUrl.url)!.id,
			};
		},
	);

	try {
		await insertAccessJudgmentUrls(db, companyIdBaseUrlIdMapping);
	} catch (e: unknown) {
		const errorMessage =
			e instanceof Error ? e.message : "An unknown error occurred";

		const errorResponse: ErrorResponse = {
			error: {
				message: "Failed to create access judgment URLs",
				details: [errorMessage],
			},
		};
		return c.json(errorResponse, 500);
	}

	const accessJudgmentUrls =
		await getAccessJudgmentUrlsByCompanyIdsAndBaseUrlIds(
			db,
			companyIdBaseUrlIdMapping,
		);

	const response: CreateAccessJudgmentUrlsResponse = {
		accessJudgmentUrls: accessJudgmentUrls.map((url) => {
			const company = companyRecords.find((c) => c.id === url.companyId);
			const baseUrl = baseUrlRecords.find((b) => b.id === url.baseUrlId);
			if (!company || !baseUrl) {
				throw new Error("Failed to find company or base URL");
			}

			return {
				companyName: company.name,
				baseUrl: {
					title: baseUrl.title,
					url: baseUrl.url,
				},
				accessJudgmentUrl: getAccessJudgmentUrl(c, url.id),
			};
		}),
	};

	return c.json(response, 201);
};
