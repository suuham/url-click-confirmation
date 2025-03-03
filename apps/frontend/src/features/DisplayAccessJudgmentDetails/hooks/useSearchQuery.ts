import type { GetAccessJudgmentUrlsResponse } from "@/types/scheme";
import { type ChangeEvent, useEffect, useState } from "react";
import { getAccessJudgmentUrlDetails } from "../api/getAccessJudgmentUrlDetails";

export function useSearchQuery() {
	const [accessJudgmentUrlsDetails, setAccessJudgmentUrlsDetails] =
		useState<GetAccessJudgmentUrlsResponse | null>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const response = await getAccessJudgmentUrlDetails();
				setAccessJudgmentUrlsDetails(response);
			} catch (err) {
				setError(err instanceof Error ? err.message : "エラーが発生しました");
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	const onChangeSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const handleSearch = async () => {
		try {
			setIsLoading(true);
			const response = await getAccessJudgmentUrlDetails(searchQuery);
			setAccessJudgmentUrlsDetails(response);
			setSearchQuery("");
		} catch (err) {
			setError(err instanceof Error ? err.message : "エラーが発生しました");
		} finally {
			setIsLoading(false);
		}
	};

	return {
		error,
		isLoading,
		searchQuery,
		accessJudgmentUrlsDetails,
		handleSearch,
		onChangeSearchQuery,
	};
}
