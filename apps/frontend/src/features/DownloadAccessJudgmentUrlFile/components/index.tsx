import { Button } from "@/components/Button";

import { ROUTES } from "@/constants";
import colorStyles from "@/styles/colors.module.scss";
import { Link } from "react-router";
import { useDownloadFile } from "../hooks/useDownloadFile";
import styles from "./index.module.scss";

export function DownloadAccessJudgmentUrlFileBoard() {
	const { onClickDownload } = useDownloadFile();

	return (
		<div className={styles["container"]}>
			<>
				<div className={styles["title"]}>
					<h2>アクセス判定URLが作成されました！</h2>
				</div>
				<div>
					<Button
						text="CSVをダウンロード"
						onClick={onClickDownload}
						size="xl"
						backgroundColor={colorStyles.buttonColorOrange}
					/>
				</div>
				<div className={styles["link-block"]}>
					<Link to={ROUTES.ACCESS_JUDGMENT_LIST_FILE_UPLOAD_PAGE}>
						アクセス判定URL作成画面に戻る
					</Link>
				</div>
			</>
		</div>
	);
}
