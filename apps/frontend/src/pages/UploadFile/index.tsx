import { DownloadSampleCsvButton } from "@/features/DownloadSampleCsv/components/DownloadSampleCsvButton";

import { UploadFile } from "@/features/UploadFile/components";
import styles from "./index.module.scss";

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
