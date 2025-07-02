import { Button } from "@/components/Button";
import { useDownloadCsv } from "../hooks/useDownloadCsv";
import { useSearchQuery } from "../hooks/useSearchQuery";
import { AccessJudgmentUrlDetailsTable } from "./AccessJudgmentUrlDetailsTable";
import { AccessJudgmentUrlSearchBar } from "./AccessJudgmentUrlSearchBar";
import { DownloadingDialog } from "./DownloadingDialog";
import { PaginationAction } from "./PaginationAction";
import styles from "./index.module.scss";

export function AccessJudgmentUrlSearchTable() {
	const {
		accessJudgmentUrlsDetails,
		searchQuery,
		onChangeSearchQuery,
		handleSearch,
		handlePageChange,
		currentPage,
		totalPages,
	} = useSearchQuery();

	const { handleDownloadCsv, isDownloading } = useDownloadCsv(
		searchQuery,
		totalPages,
	);

	return (
		<div className={styles["access-judgment-url-search-table"]}>
			<div className={styles["access-judgment-url-actions"]}>
				<AccessJudgmentUrlSearchBar
					onClick={handleSearch}
					onChange={onChangeSearchQuery}
				/>
				<Button
					text="CSV出力"
					onClick={async () => {
						await handleDownloadCsv();
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
			{isDownloading && <DownloadingDialog />}
		</div>
	);
}
