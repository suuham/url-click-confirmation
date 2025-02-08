import type { AccessJudgementUrlLog } from "@prisma/client";
import { prismaClient } from "~/lib/prisma";

export const insertAccessJudgmentUrlLog = async (
	accessJudgementUrlId: string,
): Promise<AccessJudgementUrlLog> => {
	return await prismaClient.accessJudgementUrlLog.create({
		data: { accessJudgementUrlId },
	});
};
