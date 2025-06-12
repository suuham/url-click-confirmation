import { Button } from "@/components/Button";
import { useDownloadCsv } from "../hooks/useDownloadCsv";
import { useSearchQuery } from "../hooks/useSearchQuery";
import { AccessJudgmentUrlDetailsTable } from "./AccessJudgmentUrlDetailsTable";
import { AccessJudgmentUrlSearchBar } from "./AccessJudgmentUrlSearchBar";
import { PaginationAction } from "./PaginationAction";
import styles from "./index.module.scss";

export function AccessJudgmentUrlSearchTable() {
	const {
		accessJudgmentUrlsDetails,
		onChangeSearchQuery,
		handleSearch,
		handlePageChange,
		currentPage,
		totalPages,
	} = useSearchQuery();

	const handleDownloadCsv = useDownloadCsv();

	return (
		<div className={styles["access-judgment-url-search-table"]}>
			<div className={styles["access-judgment-url-actions"]}>
				<AccessJudgmentUrlSearchBar
					onClick={handleSearch}
					onChange={onChangeSearchQuery}
				/>
				<Button
					text="CSV出力"
					onClick={() => {
						handleDownloadCsv(accessJudgmentUrlsDetails);
					}}
					isDisable={!accessJudgmentUrlsDetails}
				/>
			</div>
			<div className={styles["access-judgment-url-details-list"]}>
				<AccessJudgmentUrlDetailsTable
					accessJudgmentUrlsDetails={accessJudgmentUrlsDetails}
				/>
			</div>
			<div className={styles["pagination-container"]}>
				<PaginationAction
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			</div>
		</div>
	);
}
