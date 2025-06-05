import type { GetAccessJudgmentUrlsResponse } from "@/types/scheme";
import { escapeCsvValue } from "@/utils/escapeCsvValue";

export const useDownloadCsv = () => {
	const handleDownloadCsv = (
		accessJudgmentUrlsDetails: GetAccessJudgmentUrlsResponse | null,
	) => {
		if (!accessJudgmentUrlsDetails) return;

		const headers = [
			"企業名",
			"元URL",
			"アクセス判定URL",
			"状態",
			"アクセス数",
			"アクセス日時",
			"URL発行日",
		];

		const rows = accessJudgmentUrlsDetails.accessJudgmentUrls.map((url) => [
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
	};

	return handleDownloadCsv;
};
