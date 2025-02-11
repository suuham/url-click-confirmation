import { z } from "zod";

export const unixTimestampSchema = z
	.number()
	.refine((value) => value >= 0 && Number.isInteger(value), {
		message: "UNIXタイムスタンプは0以上の整数である必要があります",
	});
