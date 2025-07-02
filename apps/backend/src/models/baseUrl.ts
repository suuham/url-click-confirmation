import type { BaseUrl } from "@prisma/client";
import { createPrismaClientWithD1 } from "~/lib/prisma";

export const insertBaseUrls = async (
	db: D1Database,
	baseUrls: { title: string; url: string }[],
	batchSize = 100,
): Promise<void> => {
	const prismaClient = createPrismaClientWithD1(db);

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

export const getBaseUrlsByUrlLike = async (
	db: D1Database,
	url: string,
): Promise<BaseUrl[]> => {
	const prismaClient = createPrismaClientWithD1(db);
	return await prismaClient.baseUrl.findMany({
		where: { url: { contains: url } },
	});
};

export const getBaseUrlsByUrls = async (
	db: D1Database,
	urls: string[],
): Promise<BaseUrl[]> => {
	const prismaClient = createPrismaClientWithD1(db);
	return await prismaClient.baseUrl.findMany({
		where: { url: { in: urls } },
	});
};

export const getBaseUrlById = async (
	db: D1Database,
	id: string,
): Promise<BaseUrl | null> => {
	const prismaClient = createPrismaClientWithD1(db);
	return await prismaClient.baseUrl.findUnique({
		where: { id },
	});
};

export const getBaseUrlsByIds = async (
	db: D1Database,
	ids: string[],
): Promise<Array<BaseUrl | null>> => {
	const prismaClient = createPrismaClientWithD1(db);
	return await prismaClient.baseUrl.findMany({
		where: { id: { in: ids } },
	});
};
