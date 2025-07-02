import { Button } from "@/components/Button";
import type { ReactNode } from "react";
import styles from "./style.module.scss";

type Props = {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
};

export const PaginationAction = ({
	currentPage,
	totalPages,
	onPageChange,
}: Props): ReactNode => {
	return (
		<div className={styles["pagination-container"]}>
			<Button
				text="前へ"
				onClick={() => onPageChange(currentPage - 1)}
				size="xs"
				isOutline={true}
				isDisable={currentPage === 1}
			/>
			<p className={styles["page-number"]}>
				{currentPage}/{totalPages}
			</p>
			<Button
				text="次へ"
				onClick={() => onPageChange(currentPage + 1)}
				size="xs"
				isOutline={true}
				isDisable={currentPage === totalPages}
			/>
		</div>
	);
};
