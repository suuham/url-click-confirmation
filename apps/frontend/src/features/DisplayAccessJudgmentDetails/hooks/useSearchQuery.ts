import { ITEMS_PER_PAGE } from "@/constants";
import type { GetAccessJudgmentUrlsResponse } from "@/types/scheme";
import { type ChangeEvent, useEffect, useState } from "react";
import { getAccessJudgmentUrlDetails } from "../api/getAccessJudgmentUrlDetails";

export function useSearchQuery() {
	const [accessJudgmentUrlsDetails, setAccessJudgmentUrlsDetails] =
		useState<GetAccessJudgmentUrlsResponse | null>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const response = await getAccessJudgmentUrlDetails(
					searchQuery,
					"",
					"",
					ITEMS_PER_PAGE,
					(currentPage - 1) * ITEMS_PER_PAGE,
				);
				setAccessJudgmentUrlsDetails(response);
				setTotalPages(Math.ceil(response.totalCount / ITEMS_PER_PAGE));
			} catch (err) {
				setError(err instanceof Error ? err.message : "エラーが発生しました");
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [currentPage, searchQuery]);

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

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
	};

	return {
		error,
		isLoading,
		searchQuery,
		accessJudgmentUrlsDetails,
		handleSearch,
		onChangeSearchQuery,
		handlePageChange,
		currentPage,
		totalPages,
	};
}
