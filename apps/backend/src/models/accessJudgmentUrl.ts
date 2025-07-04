/**
 * アクセス判定URL関連のデータベース操作
 * Node.js環境でPostgreSQLデータベースに対する操作を提供
 *
 * 主な仕様:
 * - アクセス判定URLの一括挿入
 * - 条件付き検索・取得
 * - ページネーション対応
 *
 * 制限事項:
 * - バッチサイズは既定値20件
 */
import type { AccessJudgmentUrl } from "@prisma/client";
import { prismaClient } from "~/lib/prisma";

/**
 * アクセス判定URLの一括挿入
 * @param companyIdBaseUrlIdMapping 会社IDとベースURLIDのマッピング配列
 * @param batchSize バッチサイズ（既定値: 20）
 */
export const insertAccessJudgmentUrls = async (
	companyIdBaseUrlIdMapping: { companyId: string; baseUrlId: string }[],
	batchSize = 20,
): Promise<void> => {
	for (let i = 0; i < companyIdBaseUrlIdMapping.length; i += batchSize) {
		const batch = Array.from(
			new Map(
				companyIdBaseUrlIdMapping
					.slice(i, i + batchSize)
					.map((item) => [`${item.companyId}-${item.baseUrlId}`, item]),
			).values(),
		);

		// バッチごとに既存レコードを確認
		const existingRecords = await prismaClient.accessJudgmentUrl.findMany({
			where: {
				OR: batch.map(({ companyId, baseUrlId }) => ({
					AND: [{ companyId }, { baseUrlId }],
				})),
			},
			select: {
				companyId: true,
				baseUrlId: true,
			},
		});

		// 既存レコードの組み合わせをSetで管理
		const existingSet = new Set(
			existingRecords.map(
				(record) => `${record.companyId}-${record.baseUrlId}`,
			),
		);

		// 新規レコードをフィルタリング
		const newRecords = batch.filter(
			({ companyId, baseUrlId }) =>
				!existingSet.has(`${companyId}-${baseUrlId}`),
		);

		if (newRecords.length > 0) {
			await prismaClient.accessJudgmentUrl.createMany({
				data: newRecords,
			});
		}
	}
};

/**
 * アクセス判定URL一覧の取得
 * @param limit 取得件数上限
 * @param offset オフセット
 * @param sort ソート対象カラム
 * @param order ソート順序
 * @returns アクセス判定URL配列
 */
export const getAccessJudgmentUrls = async (
	limit: number,
	offset: number,
	sort: string,
	order: string,
): Promise<AccessJudgmentUrl[]> => {
	return await prismaClient.accessJudgmentUrl.findMany({
		take: limit,
		skip: offset,
		orderBy: { [sort]: order },
	});
};

/**
 * アクセス判定URLの総件数を取得
 * @returns 総件数
 */
export const getAccessJudgmentUrlsCount = async (): Promise<number> => {
	return await prismaClient.accessJudgmentUrl.count();
};

/**
 * 会社IDによるアクセス判定URL検索
 * @param limit 取得件数上限
 * @param offset オフセット
 * @param sort ソート対象カラム
 * @param order ソート順序
 * @param companyIds 会社ID配列
 * @returns アクセス判定URL配列
 */
export const getAccessJudgmentUrlsByCompanyIds = async (
	limit: number,
	offset: number,
	sort: string,
	order: string,
	companyIds: string[],
): Promise<AccessJudgmentUrl[]> => {
	return await prismaClient.accessJudgmentUrl.findMany({
		take: limit,
		skip: offset,
		orderBy: { [sort]: order },
		where: { companyId: { in: companyIds } },
	});
};

/**
 * ベースURLIDによるアクセス判定URL検索
 * @param limit 取得件数上限
 * @param offset オフセット
 * @param sort ソート対象カラム
 * @param order ソート順序
 * @param baseUrlIds ベースURLID配列
 * @returns アクセス判定URL配列
 */
export const getAccessJudgmentUrlsByBaseUrlIds = async (
	limit: number,
	offset: number,
	sort: string,
	order: string,
	baseUrlIds: string[],
): Promise<AccessJudgmentUrl[]> => {
	return await prismaClient.accessJudgmentUrl.findMany({
		take: limit,
		skip: offset,
		orderBy: { [sort]: order },
		where: { baseUrlId: { in: baseUrlIds } },
	});
};

/**
 * IDによるアクセス判定URL取得
 * @param accessJudgmentUrlId アクセス判定URL ID
 * @returns アクセス判定URL（存在しない場合はnull）
 */
export const getAccessJudgmentUrlById = async (
	accessJudgmentUrlId: string,
): Promise<AccessJudgmentUrl | null> => {
	return await prismaClient.accessJudgmentUrl.findUnique({
		where: { id: accessJudgmentUrlId },
	});
};

/**
 * 会社IDとベースURLIDによるアクセス判定URL検索
 * @param companyIds 会社ID配列
 * @param baseUrlIds ベースURLID配列
 * @returns アクセス判定URL配列
 */
export const getAccessJudgmentUrlsByCompanyIdsAndBaseUrlIds = async (
	companyIds: string[],
	baseUrlIds: string[],
): Promise<AccessJudgmentUrl[]> => {
	return await prismaClient.accessJudgmentUrl.findMany({
		where: {
			companyId: { in: companyIds },
			baseUrlId: { in: baseUrlIds },
		},
	});
};
