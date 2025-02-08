import type { RouteHandler } from "@hono/zod-openapi";
import type { Context } from "hono";
import type { viewAccessJudgmentUrlsRoute } from "~/routers/accessJudgmentUrl";

export const viewAccessJudgmentUrlHandler: RouteHandler<
	typeof viewAccessJudgmentUrlsRoute
> = (c: Context) => {
	return c.redirect("https://example.com", 302); // 302: Found (一時的なリダイレクト)
};
