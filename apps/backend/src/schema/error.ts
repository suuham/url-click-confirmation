import { z } from "zod";

export const errorResponseSchema = z.object({
	error: z.object({
		message: z.string().openapi({
			description: "エラーメッセージ",
			example: "Invalid request body",
		}),
		details: z.array(z.string()).openapi({
			description: "エラー詳細",
			example: ["Failed to create access judgment URLs"],
		}),
	}),
});

export type ErrorResponse = z.infer<typeof errorResponseSchema>;
