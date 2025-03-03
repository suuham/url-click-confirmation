import { Routes as ReactRouterRoutes, Route } from "react-router";
import { ROUTES } from "./constants";

import { AccessJudgmentUrlDetailsListPage } from "./pages/AccessJudgmentUrlDetailsList";
import { DownloadAccessJudgmentUrlFilePage } from "./pages/DownloadAccessJudgmentUrlFile";
import { UploadFilePage } from "./pages/UploadFile";

export function Routes() {
	return (
		<ReactRouterRoutes>
			<Route
				element={<UploadFilePage />}
				path={ROUTES.ACCESS_JUDGMENT_LIST_FILE_UPLOAD_PAGE}
			/>
			<Route
				element={<DownloadAccessJudgmentUrlFilePage />}
				path={ROUTES.ACCESS_JUDGMENT_LIST_FILE_COMPLETE_PAGE}
			/>
			<Route
				element={<AccessJudgmentUrlDetailsListPage />}
				path={ROUTES.ACCESS_JUDGMENT_LIST}
			/>
		</ReactRouterRoutes>
	);
}
