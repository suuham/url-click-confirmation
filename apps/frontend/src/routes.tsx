import { Routes as ReactRouterRoutes, Route } from "react-router";
import { ROUTES } from "./constants";
import { AccessJudgmentListPage } from "./pages/AccessJudgmentList";
import { UploadFilePage } from "./pages/UploadFile";
import { DownloadAccessJudgmentUrlFilePage } from "./pages/DownloadAccessJudgmentUrlFile";

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
				element={<AccessJudgmentListPage />}
				path={ROUTES.ACCESS_JUDGMENT_LIST}
			/>
		</ReactRouterRoutes>
	);
}
