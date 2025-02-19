import logoImage from "@/assets/logo.png";
import { Link } from "react-router";

import { ROUTES } from "@/constants";
import { currentPageNameAtom } from "@/stores";
import { useAtom } from "jotai";

import styles from "./index.module.scss";
import { NAV_ITEMS } from "./const";

export function Header() {
	const [currentPageName, setCurrentPageName] = useAtom(currentPageNameAtom);

	const onClickLink = (path: ROUTES) => {
		setCurrentPageName(path);
	};

	return (
		<header className={styles.header}>
			<div className={styles["title-logo-container"]}>
				<div className={styles["logo-container"]}>
					<img src={logoImage} alt="logo" />
				</div>
				<div className={styles["app-title-container"]}>
					<h1>アクセス判定URL生成・閲覧アプリ</h1>
				</div>
			</div>
			<nav
				className={styles["nav-menu"]}
				role="navigation"
				aria-label="メインナビゲーション"
			>
				<ul className={styles["nav-menu-list"]} role="menubar">
					{NAV_ITEMS.map(({ name, path }) => (
						<li
							key={path}
							className={currentPageName !== path ? styles["inactive"] : ""}
							role="menuitem"
						>
							<Link to={path} onClick={() => onClickLink(path)}>
								{name}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}
