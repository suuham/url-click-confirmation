import { RouteHandler } from "@hono/zod-openapi";
import { z } from "zod";
import { createReadApprovedUrlsRoute, getReadApprovedUrlsRoute } from "~/routers/readApprovedUrl";
import { CreateReadApprovedUrlsRequestBodySchema, CreateReadApprovedUrlsResponseSchema } from "~/schema/readApprovedUrl";


type CreateRadApprovedUrlsResponse = z.infer<typeof CreateReadApprovedUrlsResponseSchema>;

export const createReadApprovedUrlsHandler: RouteHandler<typeof createReadApprovedUrlsRoute, {}> = async (c) => {
    const response: CreateRadApprovedUrlsResponse = {
        readApprovedUrls: [{
            id: "1",
            baseUrl: "https://google.com",
            readApprovedUrl: "https://google.com",
        }]
    }

    return c.json(response, 201);
    
};