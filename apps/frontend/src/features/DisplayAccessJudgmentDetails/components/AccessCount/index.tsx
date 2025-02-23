import styles from "./index.module.scss";

type Props = {
	accessCount: number;
};

export function AccessCount({ accessCount }: Props) {
	return (
		<div className={styles["access-count"]}>
			{accessCount > 0 ? accessCount : "-"}
		</div>
	);
}
