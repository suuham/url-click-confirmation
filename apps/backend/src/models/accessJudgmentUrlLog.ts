/**
 * アクセス判定URLログ関連のデータベース操作
 * Node.js環境でPostgreSQLデータベースに対する操作を提供
 *
 * 主な仕様:
 * - アクセスログの記録・取得
 * - アクセス有無の確認
 *
 * 制限事項:
 * - なし
 */
import type { AccessJudgmentUrlLog } from "@prisma/client";
import { prismaClient } from "~/lib/prisma";

/**
 * アクセス判定URLログの挿入
 * @param accessJudgmentUrlId アクセス判定URL ID
 * @returns 作成されたアクセス判定URLログ
 */
export const insertAccessJudgmentUrlLog = async (
	accessJudgmentUrlId: string,
): Promise<AccessJudgmentUrlLog> => {
	return await prismaClient.accessJudgmentUrlLog.create({
		data: { accessJudgmentUrlId },
	});
};

/**
 * アクセス判定URLIDによるログ一覧取得
 * @param accessJudgmentUrlIds アクセス判定URL ID配列
 * @returns アクセス判定URLログ配列
 */
export const getAccessJudgmentUrlLogsByAccessJudgmentUrlIds = async (
	accessJudgmentUrlIds: string[],
): Promise<AccessJudgmentUrlLog[]> => {
	return await prismaClient.accessJudgmentUrlLog.findMany({
		where: { accessJudgmentUrlId: { in: accessJudgmentUrlIds } },
	});
};

/**
 * アクセス判定URLログの存在確認
 * @param accessJudgmentUrlId アクセス判定URL ID
 * @returns アクセスログが存在するかどうか
 */
export const getIsExistAccessJudgmentUrlLog = async (
	accessJudgmentUrlId: string,
): Promise<boolean> => {
	const accessJudgmentUrlLog =
		await prismaClient.accessJudgmentUrlLog.findFirst({
			where: { accessJudgmentUrlId },
		});

	return accessJudgmentUrlLog !== null;
};
