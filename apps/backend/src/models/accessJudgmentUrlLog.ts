import type { AccessJudgmentUrlLog } from "@prisma/client";
import { prismaClient } from "~/lib/prisma";

export const insertAccessJudgmentUrlLog = async (
	accessJudgmentUrlId: string,
): Promise<AccessJudgmentUrlLog> => {
	return await prismaClient.accessJudgmentUrlLog.create({
		data: { accessJudgmentUrlId },
	});
};

export const getAccessJudgmentUrlLogsByAccessJudgmentUrlId = async (
	accessJudgmentUrlId: string,
): Promise<AccessJudgmentUrlLog[]> => {
	return await prismaClient.accessJudgmentUrlLog.findMany({
		where: { accessJudgmentUrlId },
	});
};
