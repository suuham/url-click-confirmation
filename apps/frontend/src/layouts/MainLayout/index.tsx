import type { ReactNode } from "react";
import { Header } from "../../components/base/Header";

type MainLayoutProps = {
	children: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
	return (
		<div>
			<Header />
			<main>{children}</main>
		</div>
	);
}
