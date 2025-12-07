import { join } from "path"
import { z } from "zod"

export const EnvironmentOptions = z.object({
	serverUrl: z
		.string({ error: "SERVER_URL is required" })
		.url("SERVER_URL is not a valid Url"),
	apiKey: z
		.string({ error: "API_KEY is required" })
		.length(32, "API_KEY must be 32 characters"),
	storePath: z
		.string()
		.min(1, "STORE_PATH must not be empty")
		.optional()
		.default(join(process.cwd(), "data", "store.json")),
})

export type EnvironmentOptions = z.output<typeof EnvironmentOptions>
export type EnvironmentOptionsInput = z.input<typeof EnvironmentOptions>
