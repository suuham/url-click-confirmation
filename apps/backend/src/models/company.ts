import type { Company } from "@prisma/client";
import { createPrismaClientWithD1 } from "~/lib/prisma";

export const insertCompanies = async (
	db: D1Database,
	names: string[],
): Promise<void> => {
	const prismaClient = createPrismaClientWithD1(db);
	for (const name of names) {
		await prismaClient.company.upsert({
			where: { name },
			update: {},
			create: { name },
		});
	}
};

export const getCompanyById = async (
	db: D1Database,
	id: string,
): Promise<Company | null> => {
	const prismaClient = createPrismaClientWithD1(db);
	return await prismaClient.company.findUnique({ where: { id } });
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
