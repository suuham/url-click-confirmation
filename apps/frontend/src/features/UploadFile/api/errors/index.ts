type CreateAccessJudgmentUrlErrorType =
	| "UnexpectedError"
	| "BadRequest"
	| "FetchApiError"
	| "InternalServerError";

const ERROR_MESSAGES: Record<CreateAccessJudgmentUrlErrorType, string> = {
	// biome-ignore lint/style/useNamingConvention:
	UnexpectedError: "予期せぬエラーが発生しました。",
	// biome-ignore lint/style/useNamingConvention:
	BadRequest: "CSVのフォーマットが不正です。サンプルCSVを確認してください。",
	// biome-ignore lint/style/useNamingConvention:
	FetchApiError:
		"通信エラーが発生しました。インターネット接続を確認してください。",
	// biome-ignore lint/style/useNamingConvention:
	InternalServerError:
		"サーバーでエラーが発生しました。時間をおいて再度お試しください。",
};

export class CreateAccessJudgmentUrlError extends Error {
	constructor(type: CreateAccessJudgmentUrlErrorType) {
		super(ERROR_MESSAGES[type]);
	}
}
