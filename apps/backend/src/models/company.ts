import type { Company } from "@prisma/client";
import { createPrismaClientWithD1 } from "~/lib/prisma";

export const insertCompanies = async (
	db: D1Database,
	names: string[],
	batchSize = 100,
): Promise<void> => {
	const prismaClient = createPrismaClientWithD1(db);

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

export const getCompanyById = async (
	db: D1Database,
	id: string,
): Promise<Company | null> => {
	const prismaClient = createPrismaClientWithD1(db);
	return await prismaClient.company.findUnique({ where: { id } });
};

export const getCompaniesByIds = async (
	db: D1Database,
	ids: string[],
): Promise<Company[]> => {
	const prismaClient = createPrismaClientWithD1(db);
	return await prismaClient.company.findMany({ where: { id: { in: ids } } });
};

export const getCompaniesByNameLike = async (
	db: D1Database,
	name: string,
): Promise<Company[]> => {
	const prismaClient = createPrismaClientWithD1(db);
	return await prismaClient.company.findMany({
		where: { name: { contains: name } },
	});
};

export const getCompaniesByNames = async (
	db: D1Database,
	names: string[],
): Promise<Company[]> => {
	const prismaClient = createPrismaClientWithD1(db);
	return await prismaClient.company.findMany({
		where: { name: { in: names } },
	});
};
