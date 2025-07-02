import type { ReactNode } from "react";
import styles from "./style.module.scss";

export const DownloadingDialog = (): ReactNode => {
	return (
		<>
			<div className={styles["overlay"]} />
			<div className={styles["downloading-dialog"]}>
				<p className={styles["downloading-dialog-text"]}>ダウンロード中...</p>
			</div>
		</>
	);
};
