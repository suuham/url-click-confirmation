import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "@prisma/client";

export const createPrismaClientWithD1 = (db: D1Database): PrismaClient => {
	const adapter = new PrismaD1(db);
	return new PrismaClient({ adapter });
};
