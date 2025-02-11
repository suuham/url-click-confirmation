import { z } from "zod";
import { unixTimestampSchema } from "./time";

export const getAccessJudgmentUrlsQuerySchema = z.object({
	companyName: z.string().optional().openapi({
		description: "企業名",
		example: "株式会社ホノ",
	}),
	baseUrlUrl: z.string().optional().openapi({
		description: "アクセス判定URL発行のベースURL",
		example: "https://super-hamster.com/",
	}),
	baseUrlTitle: z.string().optional().openapi({
		description: "アクセス判定URL発行のベースURLのタイトル",
		example: "スーパーハムスター",
	}),
	limit: z.number().default(50).openapi({
		description: "取得するアクセス判定URLの最大数",
		example: 50,
	}),
	offset: z.number().default(0).openapi({
		description: "取得するアクセス判定URLのオフセット",
		example: 0,
	}),
	sort: z.string().default("createdAt").openapi({
		description: "アクセス判定URLのソート順",
		example: "createdAt",
	}),
	order: z.string().default("desc").openapi({
		description: "アクセス判定URLのソート順",
		example: "desc",
	}),
});

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
				title: z.string().openapi({
					description: "アクセス判定URL発行のベースURLのタイトル",
					example: "スーパーハムスター紹介資料",
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
				lastViewedAt: unixTimestampSchema.optional().openapi({
					description: "アクセス判定URLの最終アクセス日時",
					example: 1633824000000,
				}),
				viewedAts: z
					.array(unixTimestampSchema)
					.optional()
					.openapi({
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
			baseUrl: z.object({
				title: z.string().openapi({
					description: "アクセス判定URL発行のベースURLのタイトル",
					example: "スーパーハムスター紹介資料",
				}),
				url: z.string().openapi({
					description: "アクセス判定URL発行のベースURL",
					example: "https://super-hamster.com/",
				}),
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
			baseUrl: z.object({
				title: z.string().openapi({
					description: "アクセス判定URL発行のベースURLのタイトル",
					example: "スーパーハムスター紹介資料",
				}),
				url: z.string().openapi({
					description: "アクセス判定URL発行のベースURL",
					example: "https://super-hamster.com/",
				}),
			}),
			accessJudgmentUrl: z.string().openapi({
				description: "アクセス判定URL",
				example: "https://example.com/kwi150eyd2e3yv373xct76r1",
			}),
		}),
	),
});
