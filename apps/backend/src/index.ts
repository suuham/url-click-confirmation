import { Hono } from "hono";
import { cors } from "hono/cors";

import { swaggerUI } from "@hono/swagger-ui";
import { router } from "./routers";

const app = new Hono();

app.use("*", cors());

app.route("/", router);
app.get("/ui", swaggerUI({ url: "/doc" }));

// biome-ignore lint/style/noDefaultExport:
export default app;
