import { Button } from "@/components/Button";
import type { ChangeEvent } from "react";
import styles from "./index.module.scss";

type Props = {
	onClick: () => void;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function AccessJudgmentUrlSearchBar({ onClick, onChange }: Props) {
	return (
		<div className={styles["search-bar-container"]}>
			<div className={styles["search-bar-wrapper"]}>
				<input
					type="text"
					className={styles["search-bar"]}
					placeholder="キーワードを入力"
					onChange={onChange}
				/>
			</div>
			<div>
				<Button text="検索" size="xs" onClick={onClick} />
			</div>
		</div>
	);
}
