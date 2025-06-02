import type { RouteHandler } from "@hono/zod-openapi";
import type { Context } from "hono";
import { Resend } from "resend";
import { getAccessJudgmentUrlById } from "~/models/accessJudgmentUrl";
import { insertAccessJudgmentUrlLog } from "~/models/accessJudgmentUrlLog";
import { getIsExistAccessJudgmentUrlLog } from "~/models/accessJudgmentUrlLog";
import { getBaseUrlById } from "~/models/baseUrl";
import { getCompanyById } from "~/models/company";
import type { viewAccessJudgmentUrlsRoute } from "~/routers/accessJudgmentUrl";
import { viewAccessJudgmentUrlQuerySchema } from "~/schema/accessJudgmentUrl";

export const viewAccessJudgmentUrlHandler: RouteHandler<
	typeof viewAccessJudgmentUrlsRoute
> = async (c: Context) => {
	const db = c.env.DB;
	const resend = new Resend(c.env.RESEND_API_KEY);
	const accessJudgmentUrlId = c.req.param("accessJudgmentUrlId");
	const { isDemo } = viewAccessJudgmentUrlQuerySchema.parse(c.req.query());

	const isExistAccess = await getIsExistAccessJudgmentUrlLog(
		db,
		accessJudgmentUrlId,
	);

	const accessJudgmentUrlRecord = await getAccessJudgmentUrlById(
		db,
		accessJudgmentUrlId,
	);
	if (!accessJudgmentUrlRecord) {
		return c.json(
			{
				error: {
					message: "Failed to find access judgment URL",
					details: ["Access judgment URL not found"],
				},
			},
			404,
		);
	}

	const company = await getCompanyById(db, accessJudgmentUrlRecord.companyId);

	const baseUrlRecord = await getBaseUrlById(
		db,
		accessJudgmentUrlRecord.baseUrlId,
	);
	if (!baseUrlRecord) {
		return c.json(
			{
				error: {
					message: "Failed to find base URL",
					details: ["Base URL not found"],
				},
			},
			404,
		);
	}

	if (!isDemo) {
		try {
			await insertAccessJudgmentUrlLog(db, accessJudgmentUrlRecord.id);

			if (!isExistAccess) {
				await resend.emails.send({
					from: c.env.FROM_MAIL_ADDRESS,
					to: c.env.TO_MAIL_ADDRESS,
					subject: `[初回アクセス] ${company?.name}がアクセス判定URLにアクセスしました`,
					text: `${company?.name}がアクセス判定URLにアクセスしました

		  アクセスされたURL: ${baseUrlRecord.url}
		  `,
				});
			}
		} catch (e: unknown) {
			const errorMessage =
				e instanceof Error ? e.message : "An unknown error occurred";
			return c.json(
				{
					error: {
						message: "Failed to insert access judgment URL log",
						details: [errorMessage],
					},
				},
				500,
			);
		}
	}

	return c.redirect(baseUrlRecord.url, 302);
};
