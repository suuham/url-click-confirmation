export type CreateAccessJudgmentUrlsRequest = {
	accessJudgmentUrlInfo: {
		companyName: string;
		baseUrl: {
			title: string;
			url: string;
		};
	}[];
};

export type CreateAccessJudgmentUrlsResponse = {
	accessJudgmentUrls: {
		companyName: string;
		baseUrl: {
			title: string;
			url: string;
		};
		accessJudgmentUrl: string;
	}[];
};
