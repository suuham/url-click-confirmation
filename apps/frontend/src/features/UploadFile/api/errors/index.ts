type PostSalesFileErrorType =
	| "UnexpectedError"
	| "BadRequest"
	| "FetchApiError"
	| "InternalServerError";

export class PostSalesFileError extends Error {
	private _type: PostSalesFileErrorType;

	constructor(type: PostSalesFileErrorType, message: string) {
		super(message);
		this._type = type;
	}

	get type(): PostSalesFileErrorType {
		return this._type;
	}
}
