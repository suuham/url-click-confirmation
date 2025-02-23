import { BACKEND_URL } from "@/constants";

import type {
	CreateAccessJudgmentUrlsRequest,
	CreateAccessJudgmentUrlsResponse,
} from "@/types/scheme";
import { PostSalesFileError } from "./errors";

export const postAccessJudgmentUrl = async (
	request: CreateAccessJudgmentUrlsRequest,
): Promise<CreateAccessJudgmentUrlsResponse> => {
	try {
		const response = await fetch(`${BACKEND_URL}/access-judgment-urls`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(request),
		});

		if (response.status === 400) {
			throw new PostSalesFileError("BadRequest", "不正なURLです");
		}
		if (response.status === 500) {
			throw new PostSalesFileError("InternalServerError", "サーバーエラーです");
		}

		return await response.json();
	} catch (err: unknown) {
		if (err instanceof Error) {
			throw new PostSalesFileError("FetchApiError", err.message);
		}
		throw new PostSalesFileError(
			"UnexpectedError",
			"予期しないエラーが発生しました",
		);
	}
};
