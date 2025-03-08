import type { AccessJudgmentUrlLog } from "@prisma/client";
import { createPrismaClientWithD1 } from "../lib/prisma";

export const insertAccessJudgmentUrlLog = async (
	db: D1Database,
	accessJudgmentUrlId: string,
): Promise<AccessJudgmentUrlLog> => {
	const prismaClient = createPrismaClientWithD1(db);
	return await prismaClient.accessJudgmentUrlLog.create({
		data: { accessJudgmentUrlId },
	});
};

export const getAccessJudgmentUrlLogsByAccessJudgmentUrlId = async (
	db: D1Database,
	accessJudgmentUrlId: string,
): Promise<AccessJudgmentUrlLog[]> => {
	const prismaClient = createPrismaClientWithD1(db);
	return await prismaClient.accessJudgmentUrlLog.findMany({
		where: { accessJudgmentUrlId },
	});
};
