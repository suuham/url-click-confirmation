import { ITEMS_PER_PAGE } from "@/constants";
import type { GetAccessJudgmentUrlsResponse } from "@/types/scheme";
import { escapeCsvValue } from "@/utils/escapeCsvValue";
import { useCallback, useState } from "react";
import { GetAccessJudgmentUrlDetailsError } from "../api/errors";
import { getAccessJudgmentUrlDetails } from "../api/getAccessJudgmentUrlDetails";

export const useDownloadCsv = (searchQuery: string, totalPages: number) => {
	const [isDownloading, setIsDownloading] = useState(false);
	const fetchAllSearchAccessJudgementUrls = useCallback(async () => {
		const allUrls: GetAccessJudgmentUrlsResponse["accessJudgmentUrls"] = [];
		try {
			for (let i = 0; i < totalPages; i++) {
				const data = await getAccessJudgmentUrlDetails(
					searchQuery,
					"",
					"",
					ITEMS_PER_PAGE,
					i * ITEMS_PER_PAGE,
				);
				allUrls.push(...data.accessJudgmentUrls);
			}
		} catch (error: unknown) {
			if (error instanceof GetAccessJudgmentUrlDetailsError) {
				throw error;
			}
			throw new GetAccessJudgmentUrlDetailsError(
				"FetchApiError",
				"データの取得に失敗しました",
			);
		}

		return allUrls;
	}, [searchQuery, totalPages]);

	const handleDownloadCsv = useCallback(async () => {
		setIsDownloading(true);
		const allUrls = await fetchAllSearchAccessJudgementUrls();
		const headers = [
			"企業名",
			"元URL",
			"アクセス判定URL",
			"状態",
			"アクセス数",
			"アクセス日時",
			"URL発行日",
		];

		const rows = allUrls.map((url) => [
			escapeCsvValue(url.company?.name),
			escapeCsvValue(url.baseUrl?.url),
			escapeCsvValue(url.accessJudgmentUrl?.url),
			escapeCsvValue(
				url.accessJudgmentUrl.viewCount > 0 ? "アクセス済み" : "未アクセス",
			),
			escapeCsvValue(url.accessJudgmentUrl?.viewCount),
			escapeCsvValue(
				new Date(url.accessJudgmentUrl?.lastViewedAt ?? "").toLocaleString(),
			),
			escapeCsvValue(
				new Date(url.accessJudgmentUrl?.createdAt ?? "").toLocaleString(),
			),
		]);

		const csvContent = [
			headers.map(escapeCsvValue).join(","),
			...rows.map((row) => row.join(",")),
		].join("\n");

		const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
		const link = document.createElement("a");
		const url = URL.createObjectURL(blob);
		link.href = url;
		link.download = "access_judgment_urls.csv";
		link.click();
		URL.revokeObjectURL(url);
		setIsDownloading(false);
	}, [fetchAllSearchAccessJudgementUrls]);

	return { handleDownloadCsv, isDownloading };
};
