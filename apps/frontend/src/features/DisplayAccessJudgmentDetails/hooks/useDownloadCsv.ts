import type { GetAccessJudgmentUrlsResponse } from "@/types/scheme";
import { escapeCsvValue } from "@/utils/escapeCsvValue";
import { useCallback, useState } from "react";
import { GetAccessJudgmentUrlDetailsError } from "../api/errors";
import { getAccessJudgmentUrlDetails } from "../api/getAccessJudgmentUrlDetails";

export const useDownloadCsv = (searchQuery: string) => {
	const [isDownloading, setIsDownloading] = useState(false);

	/**
	 * 検索条件に一致するデータを指定件数分取得
	 *
	 * @param limit - 取得件数（最新から）
	 */
	const fetchSearchAccessJudgementUrls = useCallback(
		async (limit: number) => {
			try {
				// 指定件数分のデータを1回のリクエストで取得
				const data = await getAccessJudgmentUrlDetails(
					searchQuery,
					"",
					"",
					limit, // ユーザー指定の件数
					0, // offset = 0（最新から取得）
				);
				return data.accessJudgmentUrls;
			} catch (error: unknown) {
				if (error instanceof GetAccessJudgmentUrlDetailsError) {
					throw error;
				}
				throw new GetAccessJudgmentUrlDetailsError(
					"FetchApiError",
					"データの取得に失敗しました",
				);
			}
		},
		[searchQuery],
	);

	/**
	 * CSVダウンロード処理
	 *
	 * @param limit - 取得件数
	 */
	const handleDownloadCsv = useCallback(
		async (limit: number) => {
			setIsDownloading(true);
			try {
				const allUrls = await fetchSearchAccessJudgementUrls(limit);
				const headers = [
					"企業名",
					"元URL",
					"アクセス判定URL",
					"状態",
					"アクセス数",
					"アクセス日時",
					"URL発行日",
				];

				const rows = allUrls.map(
					(url: GetAccessJudgmentUrlsResponse["accessJudgmentUrls"][0]) => [
						escapeCsvValue(url.company?.name),
						escapeCsvValue(url.baseUrl?.url),
						escapeCsvValue(url.accessJudgmentUrl?.url),
						escapeCsvValue(
							url.accessJudgmentUrl.viewCount > 0
								? "アクセス済み"
								: "未アクセス",
						),
						escapeCsvValue(url.accessJudgmentUrl?.viewCount),
						escapeCsvValue(
							new Date(
								url.accessJudgmentUrl?.lastViewedAt ?? "",
							).toLocaleString(),
						),
						escapeCsvValue(
							new Date(url.accessJudgmentUrl?.createdAt ?? "").toLocaleString(),
						),
					],
				);

				const csvContent = [
					headers.map(escapeCsvValue).join(","),
					...rows.map((row: string[]) => row.join(",")),
				].join("\n");

				const blob = new Blob([csvContent], {
					type: "text/csv;charset=utf-8;",
				});
				const link = document.createElement("a");
				const url = URL.createObjectURL(blob);
				link.href = url;
				link.download = "access_judgment_urls.csv";
				link.click();
				URL.revokeObjectURL(url);
			} finally {
				setIsDownloading(false);
			}
		},
		[fetchSearchAccessJudgementUrls],
	);

	return { handleDownloadCsv, isDownloading };
};
