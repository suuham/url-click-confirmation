import { RouteHandler } from "@hono/zod-openapi";
import { z } from "zod";
import { createAccessJudgmentUrlsRoute } from "~/routers/accessJudgmentUrl";
import { CreateAccessJudgmentUrlsResponseSchema } from "~/schema/accessJudgmentUrl";




type CreateAccessJudgmentUrlsResponse = z.infer<typeof CreateAccessJudgmentUrlsResponseSchema>;

export const createAccessJudgmentUrlsHandler: RouteHandler<typeof createAccessJudgmentUrlsRoute, {}> = async (c) => {
    const response: CreateAccessJudgmentUrlsResponse = {
        accessJudgmentUrls: [{
            id: "1",
            baseUrl: "https://google.com",
            accessJudgmentUrl: "https://google.com",
        }]
    }

    return c.json(response, 201);
    
};