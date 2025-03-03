type GetAccessJudgmentUrlDetailsErrorType =
	| "UnexpectedError"
	| "BadRequest"
	| "FetchApiError"
	| "InternalServerError";

export class GetAccessJudgmentUrlDetailsError extends Error {
	private _type: GetAccessJudgmentUrlDetailsErrorType;

	constructor(type: GetAccessJudgmentUrlDetailsErrorType, message: string) {
		super(message);
		this._type = type;
	}

	get type(): GetAccessJudgmentUrlDetailsErrorType {
		return this._type;
	}
}
