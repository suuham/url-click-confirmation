import { z } from "zod";

export const GetAccessJudgmentUrlsResponseSchema = z.object({
    accessJudgmentUrls: z.array(z.object({
        company: z.object({
            id: z.string(),
            name: z.string(),
            },
        ),
        baseUrl: z.object({
            id: z.string(),
            url: z.string(),
            }),
        accessJudgmentUrl: z.object({
            id: z.string(),
            url: z.string(),
            viewCount: z.number(),
            lastViewedAt: z.number(),
            viewedAts: z.array(z.number()),
        })
    })),
    })

export const ViewAccessJudgmentUrlParamsSchema = z.object({
    accessJudgmentUrlId: z.string(),
})


export const CreateAccessJudgmentUrlsRequestBodySchema = z.object({
    accessJudgmentUrlInfo: z.array(z.object({
        companyName: z.string(),
        baseUrlId: z.string(),
    }))
})

export const CreateAccessJudgmentUrlsResponseSchema = z.object({
    accessJudgmentUrls: z.array(z.object({
        id: z.string(),
        baseUrl: z.string(),
        accessJudgmentUrl: z.string(),
    })),
})