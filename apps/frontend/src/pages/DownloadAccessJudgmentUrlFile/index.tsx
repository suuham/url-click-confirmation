import { DownloadAccessJudgmentUrlFileBoard } from "@/features/DownloadAccessJudgmentUrlFile/components";
import { ComponentLayout } from "@/layouts/ComponentLayout";
import styles from "./index.module.scss";

export function DownloadAccessJudgmentUrlFilePage() {
	return (
		<div className={styles["main"]}>
			<div className={styles["element-container"]}>
				<ComponentLayout>
					<DownloadAccessJudgmentUrlFileBoard />
				</ComponentLayout>
			</div>
		</div>
	);
}
