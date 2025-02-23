import colorStyles from "@/styles/colors.module.scss";

import type { Size } from "@/types/size";
import type { CSSProperties } from "react";
import { BUTTON_FONT_SIZE_MAP, BUTTON_SIZE_MAP } from "./constants";
import styles from "./index.module.scss";

type Props = {
	text: string;
	type?: "button" | "submit" | "reset";
	size?: Size;
	backgroundColor?: string;
	isDisable?: boolean;
	isOutline?: boolean;
	onClick: () => void;
};

export function Button({
	text,
	type = "button",
	size = "md",
	backgroundColor = colorStyles.buttonColorBlue,
	isDisable = false,
	isOutline = false,
	onClick,
}: Props) {
	const buttonStyle: CSSProperties = {
		color: isOutline ? backgroundColor : colorStyles.buttonTextColor,
		backgroundColor: isOutline ? "transparent" : backgroundColor,
		border: isOutline ? `3px solid ${backgroundColor}` : "none",
		...BUTTON_SIZE_MAP[size],
		...BUTTON_FONT_SIZE_MAP[size],
	};

	return (
		<button
			disabled={isDisable}
			className={styles["button"]}
			style={buttonStyle}
			type={type}
			onClick={onClick}
		>
			{text}
		</button>
	);
}
