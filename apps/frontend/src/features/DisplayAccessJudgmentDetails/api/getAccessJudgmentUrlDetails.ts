import { BACKEND_URL } from "@/constants";
import type { GetAccessJudgmentUrlsResponse } from "@/types/scheme";
import { GetAccessJudgmentUrlDetailsError } from "./errors";

export const getAccessJudgmentUrlDetails = async (
	companyName = "",
	baseUrlUrl = "",
	baseUrlTitle = "",
	limit = 50,
	offset = 0,
	sort = "createdAt",
	order = "desc",
): Promise<GetAccessJudgmentUrlsResponse> => {
	try {
		const params = new URLSearchParams({
			companyName,
			baseUrlUrl,
			baseUrlTitle,
			limit: limit.toString(),
			offset: offset.toString(),
			sort,
			order,
		});
		const response = await fetch(
			`${BACKEND_URL}/access-judgment-urls?${params}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			},
		);

		if (response.status === 400) {
			throw new GetAccessJudgmentUrlDetailsError("BadRequest", "不正なURLです");
		}
		if (response.status === 500) {
			throw new GetAccessJudgmentUrlDetailsError(
				"InternalServerError",
				"サーバーエラーです",
			);
		}

		return await response.json();
	} catch (err: unknown) {
		if (err instanceof Error) {
			throw new GetAccessJudgmentUrlDetailsError("FetchApiError", err.message);
		}
		throw new GetAccessJudgmentUrlDetailsError(
			"UnexpectedError",
			"予期しないエラーが発生しました",
		);
	}
};
