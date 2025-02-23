import {
	CreateAccessJudgmentUrlsRequest,
	CreateAccessJudgmentUrlsResponse,
} from "@/types/scheme";

export function convertCsvToJson(csv: string): {
	createAccessJudgmentUrlsRequest: CreateAccessJudgmentUrlsRequest;
} {
	const lines = csv.trim().split("\n");

	const data = lines.slice(1).map((line) => {
		const [companyName, baseUrl] = line.split(",");

		return {
			companyName,
			baseUrl: {
				title: "",
				url: baseUrl,
			},
		};
	});

	return { createAccessJudgmentUrlsRequest: { accessJudgmentUrlInfo: data } };
}

export function convertJsonToCsv(
	json: CreateAccessJudgmentUrlsResponse,
): string {
	const lines = json.accessJudgmentUrls.map((accessJudgmentUrl) => {
		return `${accessJudgmentUrl.companyName},${accessJudgmentUrl.baseUrl.url},${accessJudgmentUrl.accessJudgmentUrl}`;
	});

	return ["company_name,base_url,access_judgment_url", ...lines].join("\n");
}
