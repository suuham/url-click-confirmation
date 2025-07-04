import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { swaggerUI } from "@hono/swagger-ui";
import { router } from "./routers";

const port = Number(process.env.PORT) || 8080;
const app = new Hono();

app.use("*", cors());

app.route("/", router);
app.get("/ui", swaggerUI({ url: "/doc" }));

app.onError((e, c) => {
	// biome-ignore lint/suspicious/noConsole: <explanation>
	console.error("Error:", e);
	return c.text("Internal Server Error", 500);
});

serve({
	fetch: app.fetch,
	port,
});
