import { DownloadSampleCsvButton } from "@/features/DownloadSampleCsv/components/DownloadSampleCsvButton";
import { CreateButton } from "@/features/UploadFile/components/CreateButton";
import { CsvFileUploader } from "@/features/UploadFile/components/CsvFileUploader";

import styles from "./index.module.scss";
export function UploadFilePage() {
	return (
		<div className={styles["upload-page-block"]}>
			<div className={styles["upload-element-block"]}>
				<div className={styles["download-element"]}>
					<DownloadSampleCsvButton />
				</div>
				<div className={styles["uploader-element"]}>
					<CsvFileUploader />
				</div>
			</div>
			<div>
				<CreateButton />
			</div>
		</div>
	);
}
