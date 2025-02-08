import type { RouteHandler } from "@hono/zod-openapi";
import type { z } from "zod";
import {
	getAccessJudgementUrlsByCompanyIdsAndBaseUrlIds,
	insertAccessJudgmentUrls,
} from "~/models/AccessJudgementUrl";
import { getBaseUrlsByUrls, insertBaseUrls } from "~/models/BaseUrl";
import { getCompaniesByNames, insertCompanies } from "~/models/Company";
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
> = async (c) => {
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
	const baseUrlUrls = requestData.accessJudgmentUrlInfo.map(
		(info) => info.baseUrl,
	);
	const baseUrlUrlInfo = requestData.accessJudgmentUrlInfo.map((info) => ({
		title: info.companyName,
		url: info.baseUrl,
	}));

	try {
		await insertCompanies(companyNames);
		await insertBaseUrls(baseUrlUrlInfo);
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

	const companies = await getCompaniesByNames(companyNames);
	const baseUrls = await getBaseUrlsByUrls(baseUrlUrls);

	const companyIdBaseUrlIdMapping = requestData.accessJudgmentUrlInfo.map(
		(info) => {
			const company = companies.find((c) => c.name === info.companyName)!;
			const baseUrl = baseUrls.find((b) => b.url === info.baseUrl)!;

			return {
				companyId: company.id,
				baseUrlId: baseUrl.id,
			};
		},
	);

	try {
		await insertAccessJudgmentUrls(companyIdBaseUrlIdMapping);
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

	const accessJudgementUrls =
		await getAccessJudgementUrlsByCompanyIdsAndBaseUrlIds(
			companyIdBaseUrlIdMapping,
		);

	const response: CreateAccessJudgmentUrlsResponse = {
		accessJudgmentUrls: accessJudgementUrls.map((url) => ({
			companyName: companies.find((c) => c.id === url.companyId)!.name,
			baseUrl: baseUrls.find((b) => b.id === url.baseUrlId)!.url,
			accessJudgmentUrl: getAccessJudgmentUrl(c, url.id),
		})),
	};

	return c.json(response, 201);
};
