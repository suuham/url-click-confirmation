import { BACKEND_URL } from "@/constants";

import type {
	CreateAccessJudgmentUrlsRequest,
	CreateAccessJudgmentUrlsResponse,
} from "@/types/scheme";
import { CreateAccessJudgmentUrlError } from "./errors";

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
			throw new CreateAccessJudgmentUrlError("BadRequest");
		}
		if (response.status === 500) {
			throw new CreateAccessJudgmentUrlError("InternalServerError");
		}

		return await response.json();
	} catch (err: unknown) {
		if (err instanceof Error) {
			throw new CreateAccessJudgmentUrlError("FetchApiError");
		}
		throw new CreateAccessJudgmentUrlError("UnexpectedError");
	}
};
