/**
 * 会社関連のデータベース操作
 * Node.js環境でPostgreSQLデータベースに対する操作を提供
 *
 * 主な仕様:
 * - 会社の一括挿入（重複除去付き）
 * - 条件付き検索・取得
 * - 会社名による部分一致検索
 *
 * 制限事項:
 * - バッチサイズは既定値100件
 */
import type { Company } from "@prisma/client";
import { prismaClient } from "~/lib/prisma";

/**
 * 会社の一括挿入
 * @param names 会社名配列
 * @param batchSize バッチサイズ（既定値: 100）
 */
export const insertCompanies = async (
	names: string[],
	batchSize = 100,
): Promise<void> => {
	for (let i = 0; i < names.length; i += batchSize) {
		const batch = Array.from(new Set(names.slice(i, i + batchSize)));

		// 既存の会社名を取得
		const existingCompanies = await prismaClient.company.findMany({
			where: {
				name: {
					in: batch,
				},
			},
			select: {
				name: true,
			},
		});

		const existingNames = new Set(
			existingCompanies.map((company) => company.name),
		);
		const newNames = batch.filter((name) => !existingNames.has(name));

		if (newNames.length > 0) {
			await prismaClient.company.createMany({
				data: newNames.map((name) => ({ name })),
			});
		}
	}
};

/**
 * IDによる会社取得
 * @param id 会社ID
 * @returns 会社（存在しない場合はnull）
 */
export const getCompanyById = async (id: string): Promise<Company | null> => {
	return await prismaClient.company.findUnique({ where: { id } });
};

/**
 * ID配列による会社一括取得
 * @param ids 会社ID配列
 * @returns 会社配列
 */
export const getCompaniesByIds = async (ids: string[]): Promise<Company[]> => {
	return await prismaClient.company.findMany({ where: { id: { in: ids } } });
};

/**
 * 会社名部分一致による検索
 * @param name 検索する会社名
 * @returns 会社配列
 */
export const getCompaniesByNameLike = async (
	name: string,
): Promise<Company[]> => {
	return await prismaClient.company.findMany({
		where: { name: { contains: name } },
	});
};

/**
 * 会社名配列による検索
 * @param names 会社名配列
 * @returns 会社配列
 */
export const getCompaniesByNames = async (
	names: string[],
): Promise<Company[]> => {
	return await prismaClient.company.findMany({
		where: { name: { in: names } },
	});
};
