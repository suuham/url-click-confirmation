import type { Context } from "hono";
import type { z } from "zod";
import type { ErrorResponse } from "../schema/error";

export const validateRequestBody = async <T>(
	c: Context,
	schema: z.ZodSchema<T>,
): Promise<
	{ success: true; data: T } | { success: false; error: ErrorResponse }
> => {
	const body = await c.req.json();
	const result = schema.safeParse(body);

	if (!result.success) {
		return {
			success: false,
			error: {
				error: {
					message: "Invalid request body",
					details: result.error.errors.map((error) => error.message),
				},
			} satisfies ErrorResponse,
		};
	}

	return { success: true, data: result.data };
};
