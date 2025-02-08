import { z } from "zod";

export const getAccessJudgmentUrlsResponseSchema = z.object({
	accessJudgmentUrls: z.array(
		z.object({
			company: z.object({
				id: z.string().openapi({
					description: "企業ID",
					example: "twe07rynom3fix89ub0aknnz",
				}),
				name: z.string().openapi({
					description: "企業名",
					example: "株式会社ホノ",
				}),
			}),
			baseUrl: z.object({
				id: z.string().openapi({
					description: "アクセス判定URL発行のベースURLのID",
					example: "twe07rynom3fix89ub0aknnz",
				}),
				url: z.string().openapi({
					description: "アクセス判定URL発行のベースURL",
					example: "https://super-hamster.com/",
				}),
			}),
			accessJudgmentUrl: z.object({
				id: z.string().openapi({
					description: "アクセス判定URLのID",
					example: "utcy675twgkw7dl4hhfd6myh",
				}),
				url: z.string().openapi({
					description: "アクセス判定URL",
					example: "https://example.com/kwi150eyd2e3yv373xct76r1",
				}),
				viewCount: z.number().openapi({
					description: "アクセス判定URLの閲覧回数",
					example: 3,
				}),
				lastViewedAt: z.number().openapi({
					description: "アクセス判定URLの最終アクセス日時",
					example: 1633824000000,
				}),
				viewedAts: z.array(z.number()).openapi({
					description: "アクセス判定URLのアクセス日時のリスト",
					example: [1633824000000, 1633824000000],
				}),
			}),
		}),
	),
});

export const viewAccessJudgmentUrlParamsSchema = z.object({
	accessJudgmentUrlId: z.string().openapi({
		description: "アクセス判定URLのID",
		example: "wai6xa8eycca8s3ys0dinit6",
	}),
});

export const createAccessJudgmentUrlsRequestBodySchema = z.object({
	accessJudgmentUrlInfo: z.array(
		z.object({
			companyName: z.string().openapi({
				description: "企業名",
				example: "株式会社ホノ",
			}),
			baseUrl: z.string().openapi({
				description: "アクセス判定URL発行のベースURLのID",
				example: "https://super-hamster.com/",
			}),
		}),
	),
});

export const createAccessJudgmentUrlsResponseSchema = z.object({
	accessJudgmentUrls: z.array(
		z.object({
			companyName: z.string().openapi({
				description: "企業名",
				example: "株式会社ホノ",
			}),
			baseUrl: z.string().openapi({
				description: "アクセス判定URL発行のベースURL",
				example: "https://super-hamster.com/",
			}),
			accessJudgmentUrl: z.string().openapi({
				description: "アクセス判定URL",
				example: "https://example.com/kwi150eyd2e3yv373xct76r1",
			}),
		}),
	),
});
