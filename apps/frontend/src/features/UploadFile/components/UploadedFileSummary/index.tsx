import styles from "./index.module.scss";

type Props = {
	name: string;
	size: number;
};

export function UploadedFileSummary({ name, size }: Props) {
	return (
		<div className={styles["file-summary-block"]}>
			<div>{name}</div>
			<div>{Math.floor(size / 1024)} KB</div>
		</div>
	);
}
