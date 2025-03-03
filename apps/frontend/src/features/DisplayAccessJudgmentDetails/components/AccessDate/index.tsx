import { useState } from "react";
import styles from "./index.module.scss";

type Props = {
	lastViewedAt: number;
	viewedAts: number[];
};

export function AccessDate({ lastViewedAt, viewedAts }: Props) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = () => setIsOpen(!isOpen);

	return (
		<div className={styles.container}>
			<button
				className={styles.trigger}
				onClick={toggleOpen}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						toggleOpen();
					}
				}}
				onBlur={() => setIsOpen(false)}
				tabIndex={0}
				aria-expanded={isOpen}
				type="button"
			>
				{lastViewedAt === 0 ? "-" : new Date(lastViewedAt).toLocaleString()}
			</button>
			{isOpen && (
				<div className={styles.popover}>
					<ul>
						{viewedAts.length > 0 ? (
							viewedAts.map((viewedAt) => (
								<li key={viewedAt}>{new Date(viewedAt).toLocaleString()}</li>
							))
						) : (
							<li className={styles.empty}>履歴なし</li>
						)}
					</ul>
				</div>
			)}
		</div>
	);
}
