import type { BaseUrl } from "@prisma/client";
import { prismaClient } from "~/lib/prisma";

export const insertBaseUrls = async (
	baseUrls: { title: string; url: string }[],
): Promise<void> => {
	await prismaClient.baseUrl.createMany({
		data: baseUrls,
		skipDuplicates: true,
	});
};

export const getBaseUrlsByUrlLike = async (url: string): Promise<BaseUrl[]> => {
	return await prismaClient.baseUrl.findMany({
		where: { url: { contains: url } },
	});
};

export const getBaseUrlsByUrls = async (urls: string[]): Promise<BaseUrl[]> => {
	return await prismaClient.baseUrl.findMany({
		where: { url: { in: urls } },
	});
};

export const getBaseUrlById = async (id: string): Promise<BaseUrl | null> => {
	return await prismaClient.baseUrl.findUnique({
		where: { id },
	});
};
