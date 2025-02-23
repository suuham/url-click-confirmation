import { useSearchQuery } from "../hooks/useSearchQuery";
import { AccessJudgmentUrlDetailsTable } from "./AccessJudgmentUrlDetailsTable";
import { AccessJudgmentUrlSearchBar } from "./AccessJudgmentUrlSearchBar";

import styles from "./index.module.scss";

export function AccessJudgmentUrlSearchTable() {
	const { accessJudgmentUrlsDetails, onChangeSearchQuery, handleSearch } =
		useSearchQuery();

	return (
		<div className={styles["access-judgment-url-search-table"]}>
			<div className={styles["access-judgment-url-search-bar"]}>
				<AccessJudgmentUrlSearchBar
					onClick={handleSearch}
					onChange={onChangeSearchQuery}
				/>
			</div>
			<div className={styles["access-judgment-url-details-list"]}>
				<AccessJudgmentUrlDetailsTable
					accessJudgmentUrlsDetails={accessJudgmentUrlsDetails}
				/>
			</div>
		</div>
	);
}
