import { TOAST_DURATION } from "@/constants";
import { useEffect } from "react";
import styles from "./index.module.scss";

type Props = {
	message: string;
	onClose: () => void;
};

export function Toast({ message, onClose }: Props) {
	useEffect(() => {
		const timer = setTimeout(onClose, TOAST_DURATION);
		return () => clearTimeout(timer);
	}, [onClose]);

	return (
		<div className={styles["toast"]}>
			<span>{message}</span>
			<button
				type="button"
				className={styles["close-button"]}
				onClick={onClose}
			>
				&times;
			</button>
		</div>
	);
}
