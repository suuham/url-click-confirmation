/**
 * Prismaクライアントの設定
 * Node.js環境でPostgreSQLデータベースに接続するための設定
 *
 * 主な仕様:
 * - グローバルなPrismaClientインスタンスを管理
 * - 開発環境では再利用によるホットリロード対応
 * - 本番環境では効率的な単一インスタンス使用
 *
 * 制限事項:
 * - DATABASE_URL環境変数が必要
 */
import { PrismaClient } from "@prisma/client";

/**
 * グローバルオブジェクトにPrismaClientインスタンスを格納するための型定義
 */
const globalForPrisma = globalThis as unknown as {
	prismaClient: PrismaClient | undefined;
};

/**
 * PrismaClientのシングルトンインスタンス
 * 既存のインスタンスがあればそれを使用し、なければ新規作成
 */
export const prismaClient = globalForPrisma.prismaClient ?? new PrismaClient();

/**
 * 開発環境では、ホットリロード時にインスタンスを再利用するため
 * グローバルオブジェクトにPrismaClientを保存
 */
if (process.env.NODE_ENV !== "production") {
	globalForPrisma.prismaClient = prismaClient;
}
