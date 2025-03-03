import type { GetAccessJudgmentUrlsResponse } from "@/types/scheme";

import { AccessCount } from "../AccessCount";
import { AccessStatusIcon } from "../AccessStatusIcon";
import { AccessUrl } from "../AccessUrl";
import styles from "./index.module.scss";

type Props = {
	accessJudgmentUrlsDetails: GetAccessJudgmentUrlsResponse | null;
};

export function AccessJudgmentUrlDetailsTable({
	accessJudgmentUrlsDetails,
}: Props) {
	return (
		<div className={styles["access-judgment-url-details-list"]}>
			<table>
				<thead>
					<tr>
						<th scope="col">企業名</th>
						<th scope="col">ベースURL</th>
						<th scope="col">アクセス判定URL</th>
						<th scope="col">状態</th>
						<th scope="col">アクセス数</th>
						<th scope="col">アクセス日時</th>
						<th scope="col">URL発行日</th>
					</tr>
				</thead>
				<tbody>
					{accessJudgmentUrlsDetails
						? accessJudgmentUrlsDetails.accessJudgmentUrls.map(
								(accessJudgmentUrl) => (
									<tr key={accessJudgmentUrl.accessJudgmentUrl.id}>
										<td>{accessJudgmentUrl.company.name}</td>
										<td>
											<AccessUrl url={accessJudgmentUrl.baseUrl.url} />
										</td>
										<td>
											<AccessUrl
												url={`${accessJudgmentUrl.accessJudgmentUrl.url}?isDemo=true`}
											/>
										</td>
										<td>
											<AccessStatusIcon
												accessStatus={
													accessJudgmentUrl.accessJudgmentUrl.viewCount > 0
												}
											/>
										</td>
										<td>
											<AccessCount
												accessCount={
													accessJudgmentUrl.accessJudgmentUrl.viewCount
												}
											/>
										</td>
										<td>
											{accessJudgmentUrl.accessJudgmentUrl.lastViewedAt === 0
												? "-"
												: new Date(
														accessJudgmentUrl.accessJudgmentUrl.createdAt,
													).toLocaleString("ja-JP", {
														year: "numeric",
														month: "2-digit",
														day: "2-digit",
														hour: "2-digit",
														minute: "2-digit",
														hour12: false,
													})}
										</td>
										<td>
											{new Date(
												accessJudgmentUrl.accessJudgmentUrl.createdAt,
											).toLocaleDateString()}
										</td>
									</tr>
								),
							)
						: null}
				</tbody>
			</table>
		</div>
	);
}
