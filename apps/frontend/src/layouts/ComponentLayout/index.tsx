import type { ReactNode } from "react";
import styles from "./index.module.scss";

type Props = {
	children: ReactNode;
};

export function ComponentLayout({ children }: Props) {
	return <section className={styles["section"]}>{children}</section>;
}
