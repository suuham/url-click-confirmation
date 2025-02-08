import type { AccessJudgementUrl } from "@prisma/client";
import { prismaClient } from "~/lib/prisma";

export const insertAccessJudgmentUrls = async (
	companyIdBaseUrlIdMapping: { companyId: string; baseUrlId: string }[],
): Promise<void> => {
	await prismaClient.accessJudgementUrl.createMany({
		data: companyIdBaseUrlIdMapping.map(({ companyId, baseUrlId }) => ({
			companyId,
			baseUrlId,
		})),
		skipDuplicates: true,
	});
};

export const getAccessJudgementUrlsByCompanyIdsAndBaseUrlIds = async (
	companyIdBaseUrlIdMapping: { companyId: string; baseUrlId: string }[],
): Promise<AccessJudgementUrl[]> => {
	return await prismaClient.accessJudgementUrl.findMany({
		where: {
			OR: companyIdBaseUrlIdMapping.map(({ companyId, baseUrlId }) => ({
				companyId,
				baseUrlId,
			})),
		},
	});
};

export const getAccessJudgementUrlById = async (
	accessJudgementUrlId: string,
): Promise<AccessJudgementUrl | null> => {
	return await prismaClient.accessJudgementUrl.findUnique({
		where: { id: accessJudgementUrlId },
	});
};
