import logoImage from "@/assets/logo.png";
import { Link } from "react-router";

import { useCurrentPage } from "@/hooks/useCurrentPage";
import { NAV_ITEMS } from "./constants";
import styles from "./index.module.scss";

export function Header() {
	const { currentPageName, handleCurrentPage } = useCurrentPage();

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
			<nav className={styles["nav-menu"]} aria-label="メインナビゲーション">
				<ul className={styles["nav-menu-list"]} role="menubar">
					{NAV_ITEMS.map(({ name, path }) => (
						<li
							key={path}
							className={currentPageName !== path ? styles["inactive"] : ""}
						>
							<Link to={path} onClick={() => handleCurrentPage(path)}>
								{name}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}
