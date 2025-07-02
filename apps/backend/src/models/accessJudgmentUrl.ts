import type { AccessJudgmentUrl } from "@prisma/client";
import { createPrismaClientWithD1 } from "~/lib/prisma";

export const insertAccessJudgmentUrls = async (
	db: D1Database,
	companyIdBaseUrlIdMapping: { companyId: string; baseUrlId: string }[],
	batchSize = 100,
): Promise<void> => {
	const prismaClient = createPrismaClientWithD1(db);
	const existingRecords = await prismaClient.accessJudgmentUrl.findMany({
		where: {
			// biome-ignore lint/style/useNamingConvention:
			OR: companyIdBaseUrlIdMapping.map(({ companyId, baseUrlId }) => ({
				// biome-ignore lint/style/useNamingConvention:
				AND: [{ companyId }, { baseUrlId }],
			})),
		},
		select: {
			companyId: true,
			baseUrlId: true,
		},
	});

	const existingCombinations = new Set(
		existingRecords.map((record) => `${record.companyId}-${record.baseUrlId}`),
	);

	const newRecords = companyIdBaseUrlIdMapping.filter(
		({ companyId, baseUrlId }) =>
			!existingCombinations.has(`${companyId}-${baseUrlId}`),
	);

	for (let i = 0; i < newRecords.length; i += batchSize) {
		const batch = newRecords.slice(i, i + batchSize);

		if (batch.length > 0) {
			await prismaClient.accessJudgmentUrl.createMany({
				data: batch,
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
): Promise<AccessJudgmentUrl[]> => {
	const prismaClient = createPrismaClientWithD1(db);

	return await prismaClient.accessJudgmentUrl.findMany({
		where: {
			// biome-ignore lint/style/useNamingConvention:
			OR: companyIdBaseUrlIdMapping.map(({ companyId, baseUrlId }) => ({
				companyId,
				baseUrlId,
			})),
		},
	});
};
