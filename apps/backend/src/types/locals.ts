import type { Context, Env } from "hono";

export type CustomEnv = Env & {
	variables: {
		email?: string;
	};
};

export type CustomContext = Context<CustomEnv>;
