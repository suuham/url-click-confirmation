/**
 * アプリケーション共通型定義
 * Node.js環境でのアプリケーションに必要な型を定義
 *
 * 主な仕様:
 * - Honoアプリケーションのバインディング型
 * - 環境変数の型定義
 *
 * 制限事項:
 * - なし
 */

/**
 * Honoアプリケーションで使用する環境変数のバインディング型
 */
type Bindings = {
	/** Resend APIキー（メール送信用） */
	RESEND_API_KEY: string;
	/** 送信者メールアドレス */
	FROM_MAIL_ADDRESS?: string;
	/** 受信者メールアドレス */
	TO_MAIL_ADDRESS?: string;
};
