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

export const getAccessJudgmentUrlsByCompanyIdsAndBaseUrlIds = async (
	companyIdBaseUrlIdMapping: { companyId: string; baseUrlId: string }[],
): Promise<AccessJudgmentUrl[]> => {
	return await prismaClient.accessJudgmentUrl.findMany({
		where: {
			OR: companyIdBaseUrlIdMapping.map(({ companyId, baseUrlId }) => ({
				companyId,
				baseUrlId,
			})),
		},
	});
};

export const getAccessJudgmentUrlById = async (
	accessJudgmentUrlId: string,
): Promise<AccessJudgmentUrl | null> => {
	return await prismaClient.accessJudgmentUrl.findUnique({
		where: { id: accessJudgmentUrlId },
	});
};
