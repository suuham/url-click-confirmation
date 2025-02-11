import type { AccessJudgmentUrl } from "@prisma/client";
import { prismaClient } from "~/lib/prisma";

export const insertAccessJudgmentUrls = async (
	companyIdBaseUrlIdMapping: { companyId: string; baseUrlId: string }[],
): Promise<void> => {
	await prismaClient.accessJudgmentUrl.createMany({
		data: companyIdBaseUrlIdMapping.map(({ companyId, baseUrlId }) => ({
			companyId,
			baseUrlId,
		})),
		skipDuplicates: true,
	});
};

export const getAccessJudgmentUrls = async (
	limit: number,
	offset: number,
	sort: string,
	order: string,
): Promise<AccessJudgmentUrl[]> => {
	return await prismaClient.accessJudgmentUrl.findMany({
		take: limit,
		skip: offset,
		orderBy: { [sort]: order },
	});
};

export const getAccessJudgmentUrlsByCompanyIds = async (
	limit: number,
	offset: number,
	sort: string,
	order: string,
	companyIds: string[],
): Promise<AccessJudgmentUrl[]> => {
	return await prismaClient.accessJudgmentUrl.findMany({
		take: limit,
		skip: offset,
		orderBy: { [sort]: order },
		where: { companyId: { in: companyIds } },
	});
};

export const getAccessJudgmentUrlsByBaseUrlIds = async (
	limit: number,
	offset: number,
	sort: string,
	order: string,
	baseUrlIds: string[],
): Promise<AccessJudgmentUrl[]> => {
	return await prismaClient.accessJudgmentUrl.findMany({
		take: limit,
		skip: offset,
		orderBy: { [sort]: order },
		where: { baseUrlId: { in: baseUrlIds } },
	});
};

export const getAccessJudgmentUrlById = async (
	accessJudgmentUrlId: string,
): Promise<AccessJudgmentUrl | null> => {
	return await prismaClient.accessJudgmentUrl.findUnique({
		where: { id: accessJudgmentUrlId },
	});
};

export const getAccessJudgmentUrlsByCompanyIdsAndBaseUrlIds = async (
	companyIdBaseUrlIdMapping: { companyId: string; baseUrlId: string }[],
): Promise<AccessJudgmentUrl[]> => {
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
