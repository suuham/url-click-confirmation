import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

import type { CustomContext, CustomEnv } from "~/types/locals";

const port = 4000;
const app = new Hono<CustomEnv>();

app.use(cors());

app.get("/", (c) => {
	return c.text("Hello!");
});

// if (process.env.NODE_ENV === "localhost") {
// }

app.onError((_, c: CustomContext) => {
	return c.text("Internal Server Error", 500);
});

serve({
	fetch: app.fetch,
	port,
});
