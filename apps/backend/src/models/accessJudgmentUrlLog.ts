import type { AccessJudgmentUrlLog } from "@prisma/client";
import { createPrismaClientWithD1 } from "~/lib/prisma";

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

export const getIsExistAccessJudgmentUrlLog = async (
	db: D1Database,
	accessJudgmentUrlId: string,
): Promise<boolean> => {
	const prismaClient = createPrismaClientWithD1(db);

	const accessJudgmentUrlLog =
		await prismaClient.accessJudgmentUrlLog.findFirst({
			where: { accessJudgmentUrlId },
		});

	return accessJudgmentUrlLog !== null;
};
