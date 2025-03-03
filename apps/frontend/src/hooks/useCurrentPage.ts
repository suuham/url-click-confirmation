import type { Routes } from "@/constants";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export function useCurrentPage() {
	const location = useLocation();
	const [currentPageName, setCurrentPage] = useState<Routes>(
		location.pathname as Routes,
	);

	const handleCurrentPage = (path: Routes) => setCurrentPage(path);

	useEffect(() => {
		setCurrentPage(location.pathname as Routes);
	}, [location.pathname]);

	return { currentPageName, handleCurrentPage };
}
