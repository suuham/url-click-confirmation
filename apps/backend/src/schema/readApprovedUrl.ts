import { z } from "zod";

export const GetRadApprovedUrlsResponseSchema = z.object({
    readApprovedUrls: z.array(z.object({
        company: z.object({
            id: z.string(),
            name: z.string(),
            },
        ),
        baseUrl: z.object({
            id: z.string(),
            url: z.string(),
            }),
        readApprovedUrl: z.object({
            id: z.string(),
            url: z.string(),
            viewCount: z.number(),
            lastViewedAt: z.number(),
            viewedAts: z.array(z.number()),
        })
    })),
    })

export const ViewReadApprovedUrlParamsSchema = z.object({
    readApprovedUrlId: z.string(),
})


export const CreateReadApprovedUrlsRequestBodySchema = z.object({
    readApprovedUrlInfo: z.array(z.object({
        companyName: z.string(),
        baseUrlId: z.string(),
    }))
})

export const CreateReadApprovedUrlsResponseSchema = z.object({
    readApprovedUrls: z.array(z.object({
        id: z.string(),
        baseUrl: z.string(),
        readApprovedUrl: z.string(),
    })),
})