import { Routes as ReactRouterRoutes, Route } from "react-router";
import { ROUTES } from "./constants";
import { AccessJudgmentListPage } from "./pages/AccessJudgmentList";
import { UploadFilePage } from "./pages/UploadFile";

export default function Routes() {
	return (
		<ReactRouterRoutes>
			<Route element={<UploadFilePage />} path={ROUTES.HOME} />
			<Route
				element={<AccessJudgmentListPage />}
				path={ROUTES.ACCESS_JUDGMENT_LIST}
			/>
		</ReactRouterRoutes>
	);
}
