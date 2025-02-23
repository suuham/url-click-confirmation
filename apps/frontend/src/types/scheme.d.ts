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

export type GetAccessJudgmentUrlsResponse = {
	accessJudgmentUrls: {
		company: {
			id: string;
			name: string;
		};
		baseUrl: {
			id: string;
			title: string;
			url: string;
		};
		accessJudgmentUrl: {
			id: string;
			url: string;
			viewCount: number;
			createdAt: number;
			lastViewedAt: number;
			viewedAts: number[];
		};
	}[];
};
