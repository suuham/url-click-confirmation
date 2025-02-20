import logoImage from "@/assets/logo.png";
import { Link } from "react-router";

import { ROUTES } from "@/constants";
import { currentPageNameAtom } from "@/stores";
import { useAtom } from "jotai";
import type { CSSProperties } from "react";
import styles from "./index.module.scss";

export function Header() {
	const [currentPageName, setCurrentPageName] = useAtom(currentPageNameAtom);

	const navItems = [
		{ name: "URL作成", path: ROUTES.ACCESS_JUDGMENT_LIST_FILE_UPLOAD_PAGE },
		{ name: "URL閲覧", path: ROUTES.ACCESS_JUDGMENT_LIST },
	];

	const liStyle: CSSProperties = {
		opacity: 0.8,
	};

	return (
		<header className={styles.header}>
			<div className={styles["title-logo-container"]}>
				<div className={styles["logo-container"]}>
					<img src={logoImage} alt="logo" />
				</div>
				<div className={styles["app-title-container"]}>
					<h1>アクセス判定URL作成・閲覧アプリ</h1>
				</div>
			</div>
			<nav className={styles["nav-menu"]}>
				<ul className={styles["nav-menu-list"]}>
					{navItems.map(({ name, path }) => (
						<li key={path} style={currentPageName === path ? liStyle : {}}>
							<Link to={path} onClick={() => setCurrentPageName(path)}>
								{name}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}
