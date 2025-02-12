import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { MainLayout } from "./layouts/MainLayout";
import Routes from "./routes";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<MainLayout>
				<Routes />
			</MainLayout>
		</BrowserRouter>
	</StrictMode>,
);
