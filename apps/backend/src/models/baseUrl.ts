/**
 * ベースURL関連のデータベース操作
 * Node.js環境でPostgreSQLデータベースに対する操作を提供
 *
 * 主な仕様:
 * - ベースURLの一括挿入（重複除去付き）
 * - 条件付き検索・取得
 * - URL文字列による部分一致検索
 *
 * 制限事項:
 * - バッチサイズは既定値100件
 */
import type { BaseUrl } from "@prisma/client";
import { prismaClient } from "~/lib/prisma";

/**
 * ベースURLの一括挿入
 * @param baseUrls ベースURL配列（タイトルとURL）
 * @param batchSize バッチサイズ（既定値: 100）
 */
export const insertBaseUrls = async (
	baseUrls: { title: string; url: string }[],
	batchSize = 100,
): Promise<void> => {
	for (let i = 0; i < baseUrls.length; i += batchSize) {
		// URLの重複を除去
		const batch = Array.from(
			new Map(
				baseUrls
					.slice(i, i + batchSize)
					.map((baseUrl) => [baseUrl.url, baseUrl]),
			).values(),
		);

		// 既存のURLを取得
		const existingBaseUrls = await prismaClient.baseUrl.findMany({
			where: {
				url: {
					in: batch.map((baseUrl) => baseUrl.url),
				},
			},
			select: {
				url: true,
			},
		});

		const existingUrls = new Set(
			existingBaseUrls.map((baseUrl) => baseUrl.url),
		);
		const newBaseUrls = batch.filter(
			(baseUrl) => !existingUrls.has(baseUrl.url),
		);

		if (newBaseUrls.length > 0) {
			await prismaClient.baseUrl.createMany({
				data: newBaseUrls,
			});
		}
	}
};

/**
 * URL部分一致によるベースURL検索
 * @param url 検索するURL文字列
 * @returns ベースURL配列
 */
export const getBaseUrlsByUrlLike = async (url: string): Promise<BaseUrl[]> => {
	return await prismaClient.baseUrl.findMany({
		where: { url: { contains: url } },
	});
};

/**
 * URL配列によるベースURL検索
 * @param urls URL文字列配列
 * @returns ベースURL配列
 */
export const getBaseUrlsByUrls = async (urls: string[]): Promise<BaseUrl[]> => {
	return await prismaClient.baseUrl.findMany({
		where: { url: { in: urls } },
	});
};

/**
 * IDによるベースURL取得
 * @param id ベースURL ID
 * @returns ベースURL（存在しない場合はnull）
 */
export const getBaseUrlById = async (id: string): Promise<BaseUrl | null> => {
	return await prismaClient.baseUrl.findUnique({
		where: { id },
	});
};

/**
 * ID配列によるベースURL一括取得
 * @param ids ベースURL ID配列
 * @returns ベースURL配列
 */
export const getBaseUrlsByIds = async (ids: string[]): Promise<BaseUrl[]> => {
	return await prismaClient.baseUrl.findMany({
		where: { id: { in: ids } },
	});
};
