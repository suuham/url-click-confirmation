import type { AccessJudgmentUrl } from "@prisma/client";
import { createPrismaClientWithD1 } from "~/lib/prisma";

export const insertAccessJudgmentUrls = async (
	db: D1Database,
	companyIdBaseUrlIdMapping: { companyId: string; baseUrlId: string }[],
	batchSize = 20,
): Promise<void> => {
	const prismaClient = createPrismaClientWithD1(db);

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

export const getAccessJudgmentUrls = async (
	db: D1Database,
	limit: number,
	offset: number,
	sort: string,
	order: string,
): Promise<AccessJudgmentUrl[]> => {
	const prismaClient = createPrismaClientWithD1(db);
	return await prismaClient.accessJudgmentUrl.findMany({
		take: limit,
		skip: offset,
		orderBy: { [sort]: order },
	});
};

export const getAccessJudgmentUrlsByCompanyIds = async (
	db: D1Database,
	limit: number,
	offset: number,
	sort: string,
	order: string,
	companyIds: string[],
): Promise<AccessJudgmentUrl[]> => {
	const prismaClient = createPrismaClientWithD1(db);

	return await prismaClient.accessJudgmentUrl.findMany({
		take: limit,
		skip: offset,
		orderBy: { [sort]: order },
		where: { companyId: { in: companyIds } },
	});
};

export const getAccessJudgmentUrlsByBaseUrlIds = async (
	db: D1Database,
	limit: number,
	offset: number,
	sort: string,
	order: string,
	baseUrlIds: string[],
): Promise<AccessJudgmentUrl[]> => {
	const prismaClient = createPrismaClientWithD1(db);

	return await prismaClient.accessJudgmentUrl.findMany({
		take: limit,
		skip: offset,
		orderBy: { [sort]: order },
		where: { baseUrlId: { in: baseUrlIds } },
	});
};

export const getAccessJudgmentUrlById = async (
	db: D1Database,
	accessJudgmentUrlId: string,
): Promise<AccessJudgmentUrl | null> => {
	const prismaClient = createPrismaClientWithD1(db);

	return await prismaClient.accessJudgmentUrl.findUnique({
		where: { id: accessJudgmentUrlId },
	});
};

export const getAccessJudgmentUrlsByCompanyIdsAndBaseUrlIds = async (
	db: D1Database,
	companyIdBaseUrlIdMapping: { companyId: string; baseUrlId: string }[],
	batchSize = 20,
): Promise<AccessJudgmentUrl[]> => {
	const prismaClient = createPrismaClientWithD1(db);
	const results: AccessJudgmentUrl[] = [];

	// バッチ処理
	for (let i = 0; i < companyIdBaseUrlIdMapping.length; i += batchSize) {
		const batch = companyIdBaseUrlIdMapping.slice(i, i + batchSize);
		const batchResults = await prismaClient.accessJudgmentUrl.findMany({
			where: {
				OR: batch.map(({ companyId, baseUrlId }) => ({
					companyId,
					baseUrlId,
				})),
			},
		});
		results.push(...batchResults);
	}

	return results;
};
