import type { Context } from "hono";

export const getAccessJudgmentUrl = (
	c: Context,
	accessJudgmentUrlId: string,
): string => {
	const proto = c.req.header("x-forwarded-proto") || "http";
	const host = c.req.header("host");
	return `${proto}://${host}/access-judgment-url/${accessJudgmentUrlId}`;
};
