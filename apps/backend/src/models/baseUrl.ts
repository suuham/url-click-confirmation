import type { BaseUrl } from "@prisma/client";
import { createPrismaClientWithD1 } from "../lib/prisma";

export const insertBaseUrls = async (
	db: D1Database,
	baseUrls: { title: string; url: string }[],
): Promise<void> => {
	const prismaClient = createPrismaClientWithD1(db);
	await Promise.all(
		baseUrls.map(async ({ title, url }) => {
			const existingBaseUrl = await prismaClient.baseUrl.findFirst({
				where: { url },
			});

			if (!existingBaseUrl) {
				await prismaClient.baseUrl.create({
					data: { title, url },
				});
			}
		}),
	);
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
