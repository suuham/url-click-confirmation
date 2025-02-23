import { DownloadSampleCsvButton } from "@/features/DownloadSampleCsv/components/DownloadSampleCsvButton";

import styles from "./index.module.scss";
import { UploadFile } from "@/features/UploadFile/components";

export function UploadFilePage() {
	return (
		<div className={styles["upload-page-block"]}>
			<div className={styles["upload-element-block"]}>
				<div className={styles["download-element"]}>
					<DownloadSampleCsvButton />
				</div>
				<div>
					<UploadFile />
				</div>
			</div>
		</div>
	);
}
