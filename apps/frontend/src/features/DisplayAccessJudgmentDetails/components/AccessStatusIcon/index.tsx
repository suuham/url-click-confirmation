import styles from "./index.module.scss";

type Props = {
	accessStatus: boolean;
};

export function AccessStatusIcon({ accessStatus }: Props) {
	return (
		<div
			className={`${styles["access-status-icon"]} ${
				accessStatus ? styles["accessed"] : styles["not-accessed"]
			}`}
		>
			{accessStatus ? "アクセス済" : "未アクセス"}
		</div>
	);
}
