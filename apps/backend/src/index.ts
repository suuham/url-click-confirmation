import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { swaggerUI } from "@hono/swagger-ui";
import type { CustomContext, CustomEnv } from "~/types/locals";
import { router } from "./routers";

const port = 4000;
const app = new Hono<CustomEnv>();

app.use(cors());

app.route("/", router);
app.get("/ui", swaggerUI({ url: "/doc" }));

app.onError((_, c: CustomContext) => {
	return c.text("Internal Server Error", 500);
});

serve({
	fetch: app.fetch,
	port,
});
