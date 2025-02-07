import { RouteHandler } from "@hono/zod-openapi";
import { z } from "zod";
import { getReadApprovedUrlsRoute } from "~/routers/readApprovedUrl";
import { GetRadApprovedUrlsResponseSchema } from "~/schema/readApprovedUrl";

type GetRadApprovedUrlsResponse = z.infer<typeof GetRadApprovedUrlsResponseSchema>;

export const getReadApprovedUrlsHandler: RouteHandler<typeof getReadApprovedUrlsRoute, {}> = async (c) => {
    const response: GetRadApprovedUrlsResponse = {
        readApprovedUrls: [
            {
                company: {
                    id: "1",
                    name: "Google",
                },
                baseUrl: {
                    id: "1",
                    url: "https://google.com",
                },
                readApprovedUrl: {
                    id: "1",
                    url: "https://google.com",
                    viewCount: 1,
                    lastViewedAt: 1560000000,
                    viewedAts: [1560000000, 1560000000],
                },
            },
        ],
    };

    return c.json(response);
};