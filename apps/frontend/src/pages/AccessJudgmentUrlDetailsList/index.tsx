import { AccessJudgmentUrlSearchTable } from "@/features/DisplayAccessJudgmentDetails/components";
import styles from "./index.module.scss";

export function AccessJudgmentUrlDetailsListPage() {
	return (
		<div className={styles["main"]}>
			<div className={styles["container"]}>
				<AccessJudgmentUrlSearchTable />
			</div>
		</div>
	);
}
