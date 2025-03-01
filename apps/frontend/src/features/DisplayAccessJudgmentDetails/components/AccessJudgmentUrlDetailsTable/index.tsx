import type { GetAccessJudgmentUrlsResponse } from "@/types/scheme";

import { AccessCount } from "../AccessCount";
import { AccessDate } from "../AccessDate";
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
					{accessJudgmentUrlsDetails?.accessJudgmentUrls.map(
						({ accessJudgmentUrl, baseUrl, company }) => (
							<tr key={accessJudgmentUrl.id}>
								<td>{company.name}</td>
								<td>
									<AccessUrl url={baseUrl.url} />
								</td>
								<td>
									<AccessUrl url={`${accessJudgmentUrl.url}?isDemo=true`} />
								</td>
								<td>
									<AccessStatusIcon
										accessStatus={accessJudgmentUrl.viewCount > 0}
									/>
								</td>
								<td>
									<AccessCount accessCount={accessJudgmentUrl.viewCount} />
								</td>
								<td>
									<AccessDate
										lastViewedAt={accessJudgmentUrl.lastViewedAt}
										viewedAts={accessJudgmentUrl.viewedAts}
									/>
								</td>
								<td>
									{new Date(accessJudgmentUrl.createdAt).toLocaleDateString()}
								</td>
							</tr>
						),
					) || null}
				</tbody>
			</table>
		</div>
	);
}
