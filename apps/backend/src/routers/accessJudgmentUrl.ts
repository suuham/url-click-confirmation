import { createRoute } from "@hono/zod-openapi";
import {
	createAccessJudgmentUrlsRequestBodySchema,
	createAccessJudgmentUrlsResponseSchema,
	getAccessJudgmentUrlsResponseSchema,
	viewAccessJudgmentUrlParamsSchema,
} from "~/schema/accessJudgmentUrl";
import { errorResponseSchema } from "~/schema/error";

export const getAccessJudgmentUrlsRoute = createRoute({
	path: "/access-judgment-urls",
	method: "get",
	description: "アクセス判定URLの情報一覧を返却",
	responses: {
		200: {
			description: "OK",
			content: {
				"application/json": {
					schema: getAccessJudgmentUrlsResponseSchema,
				},
			},
		},
	},
});

export const viewAccessJudgmentUrlsRoute = createRoute({
	path: "/access-judgment-urls/{accessJudgmentUrlId}/view",
	method: "get",
	description:
		"アクセス判定URLの状態をアクセス済みにし、ベースURLにリダイレクト",
	request: {
		params: viewAccessJudgmentUrlParamsSchema,
	},
	responses: {
		302: {
			description: "Found",
			headers: {
				Location: {
					type: "string",
					description: "リダイレクト先のURL",
				},
			},
		},
		404: {
			description: "Not Found",
			content: {
				"application/json": {
					schema: errorResponseSchema,
				},
			},
		},
		500: {
			description: "Internal Server Error",
			content: {
				"application/json": {
					schema: errorResponseSchema,
				},
			},
		},
	},
});

export const createAccessJudgmentUrlsRoute = createRoute({
	path: "/access-judgment-urls",
	method: "post",
	description: "アクセス判定URLを発行",
	request: {
		body: {
			required: true,
			content: {
				"application/json": {
					schema: createAccessJudgmentUrlsRequestBodySchema,
				},
			},
		},
	},
	responses: {
		201: {
			description: "Created",
			content: {
				"application/json": {
					schema: createAccessJudgmentUrlsResponseSchema,
				},
			},
		},
		400: {
			description: "Bad Request",
			content: {
				"application/json": {
					schema: errorResponseSchema,
				},
			},
		},
		500: {
			description: "Internal Server Error",
			content: {
				"application/json": {
					schema: errorResponseSchema,
				},
			},
		},
	},
});
