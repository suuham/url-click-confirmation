/**
 * アクセス判定URL表示ハンドラー
 * Node.js環境でPostgreSQLデータベースに対するアクセス判定URL表示処理
 *
 * 主な仕様:
 * - アクセス判定URLの存在確認
 * - アクセスログの記録
 * - 元URLへのリダイレクト
 * - メール通知機能（オプション）
 *
 * 制限事項:
 * - デモモード以外では実際のアクセスログを記録
 */
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
import type { ErrorResponse } from "~/schema/error";

/**
 * アクセス判定URL表示処理
 *
 * 処理フロー:
 * 1. アクセス判定URLの存在確認
 * 2. 関連データ（会社・ベースURL）の取得
 * 3. アクセスログの記録（デモモード以外）
 * 4. メール通知の送信（初回アクセス時）
 * 5. 元URLへのリダイレクト
 */
export const viewAccessJudgmentUrlHandler: RouteHandler<
	typeof viewAccessJudgmentUrlsRoute
> = async (c: Context) => {
	try {
		const resend = new Resend(c.env.RESEND_API_KEY);
		const accessJudgmentUrlId = c.req.param("accessJudgmentUrlId");
		const { isDemo } = viewAccessJudgmentUrlQuerySchema.parse(c.req.query());

		// 既存のアクセスログを確認
		const isExistAccess =
			await getIsExistAccessJudgmentUrlLog(accessJudgmentUrlId);

		// アクセス判定URLの取得
		const accessJudgmentUrlRecord =
			await getAccessJudgmentUrlById(accessJudgmentUrlId);
		if (!accessJudgmentUrlRecord) {
			return c.json(
				{
					error: {
						message: "Failed to find access judgment URL",
						details: ["Access judgment URL not found"],
					},
				} satisfies ErrorResponse,
				404,
			);
		}

		// 関連データの取得
		const company = await getCompanyById(accessJudgmentUrlRecord.companyId);
		const baseUrlRecord = await getBaseUrlById(
			accessJudgmentUrlRecord.baseUrlId,
		);

		if (!baseUrlRecord) {
			return c.json(
				{
					error: {
						message: "Failed to find base URL",
						details: ["Base URL not found"],
					},
				} satisfies ErrorResponse,
				404,
			);
		}

		// アクセスログの記録（デモモード以外）
		if (!isDemo) {
			await insertAccessJudgmentUrlLog(accessJudgmentUrlId);

			// 初回アクセス時のみメール通知を送信
			if (!isExistAccess && company) {
				try {
					await resend.emails.send({
						from: "noreply@honokarasu.workers.dev",
						to: ["andmohiko.vg@gmail.com"],
						subject: `【${company.name}】資料がアクセスされました`,
						html: `
						<div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px;">
							<div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
								<h1 style="color: #333; text-align: center; margin-bottom: 30px; font-size: 24px; border-bottom: 2px solid #e0e0e0; padding-bottom: 15px;">
									📊 資料アクセス通知
								</h1>
								
								<div style="background-color: #f0f8ff; border-left: 4px solid #0066cc; padding: 20px; margin: 20px 0; border-radius: 5px;">
									<h2 style="color: #0066cc; margin: 0 0 15px 0; font-size: 18px;">アクセスされた資料</h2>
									<p style="margin: 10px 0; font-size: 16px;"><strong>資料名:</strong> ${baseUrlRecord.title}</p>
									<p style="margin: 10px 0; font-size: 16px;"><strong>URL:</strong> <a href="${baseUrlRecord.url}" style="color: #0066cc; text-decoration: none;">${baseUrlRecord.url}</a></p>
								</div>
								
								<div style="background-color: #f9f9f9; border-left: 4px solid #28a745; padding: 20px; margin: 20px 0; border-radius: 5px;">
									<h2 style="color: #28a745; margin: 0 0 15px 0; font-size: 18px;">アクセス企業情報</h2>
									<p style="margin: 10px 0; font-size: 16px;"><strong>企業名:</strong> ${company.name}</p>
								</div>
								
								<div style="text-align: center; margin: 30px 0;">
									<p style="color: #666; font-size: 14px; margin: 0;">
										このメールは${company.name}が初回アクセスした際に自動送信されています。
									</p>
								</div>
							</div>
						</div>
						`,
					});
					console.log(
						`Email notification sent for ${company.name} accessing ${baseUrlRecord.title}`,
					);
				} catch (emailError) {
					console.error(
						"Error sending email notification:",
						emailError instanceof Error
							? emailError.message
							: "Unknown email error",
					);
					// メール送信エラーは処理を停止しない
				}
			}
		}

		// 元URLにリダイレクト
		return c.redirect(baseUrlRecord.url, 302);
	} catch (error) {
		console.error(
			"Error in viewAccessJudgmentUrlHandler:",
			error instanceof Error ? error.message : "Unknown error",
			error instanceof Error ? error.stack : "",
		);

		return c.json(
			{
				error: {
					message: "Failed to process access judgment URL",
					details: [
						error instanceof Error
							? error.message
							: "予期しないエラーが発生しました",
					],
				},
			} satisfies ErrorResponse,
			500,
		);
	}
};
