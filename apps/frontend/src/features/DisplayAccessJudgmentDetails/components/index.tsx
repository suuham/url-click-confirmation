import { Button } from "@/components/Button";
import { useState } from "react";
import { useDownloadCsv } from "../hooks/useDownloadCsv";
import { useSearchQuery } from "../hooks/useSearchQuery";
import { AccessJudgmentUrlDetailsTable } from "./AccessJudgmentUrlDetailsTable";
import { AccessJudgmentUrlSearchBar } from "./AccessJudgmentUrlSearchBar";
import { DownloadLimitInput } from "./DownloadLimitInput";
import { DownloadingDialog } from "./DownloadingDialog";
import { PaginationAction } from "./PaginationAction";
import styles from "./index.module.scss";

export function AccessJudgmentUrlSearchTable() {
	const [downloadLimit, setDownloadLimit] = useState(1000);
	const [limitError, setLimitError] = useState<string>("");

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

	/**
	 * 件数入力値変更処理
	 *
	 * @param value - 新しい件数値
	 */
	const handleLimitChange = (value: number) => {
		setDownloadLimit(value);

		// バリデーション
		if (value < 0) {
			setLimitError("0件以上を入力してください");
		} else if (value > 50000) {
			setLimitError("50000件以下で入力してください");
		} else {
			setLimitError("");
		}
	};

	/**
	 * CSVダウンロード実行処理
	 */
	const handleDownloadClick = async () => {
		if (limitError || downloadLimit < 0 || downloadLimit > 50000) {
			return;
		}
		await handleDownloadCsv(downloadLimit);
	};

	return (
		<div className={styles["access-judgment-url-search-table"]}>
			<div className={styles["access-judgment-url-actions"]}>
				<AccessJudgmentUrlSearchBar
					onClick={handleSearch}
					onChange={onChangeSearchQuery}
				/>
				<div className={styles["download-section"]}>
					<DownloadLimitInput
						value={downloadLimit}
						onChange={handleLimitChange}
						error={limitError}
					/>
					<Button
						text="CSV出力"
						onClick={handleDownloadClick}
						isDisable={!accessJudgmentUrlsDetails || !!limitError}
					/>
				</div>
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
