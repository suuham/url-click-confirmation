import type { Company } from "@prisma/client";
import { prismaClient } from "~/lib/prisma";

export const insertCompanies = async (names: string[]): Promise<void> => {
	await prismaClient.company.createMany({
		data: names.map((name) => ({ name })),
		skipDuplicates: true,
	});
};

export const getCompaniesByNames = async (
	names: string[],
): Promise<Company[]> => {
	return await prismaClient.company.findMany({
		where: { name: { in: names } },
	});
};
