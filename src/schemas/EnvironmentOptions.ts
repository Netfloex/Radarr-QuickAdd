import { join } from "path"
import { z } from "zod"

export const EnvironmentOptions = z.object({
	serverUrl: z.string().url(),
	apiKey: z.string().length(32),
	rootFolder: z.string(),
	qualityProfile: z
		.string()
		.transform(Number)
		.refine((a) => !isNaN(a)),
	storePath: z
		.string()
		.min(1)
		.optional()
		.default(join(process.cwd(), "data", "store.json")),
})

export type EnvironmentOptions = z.output<typeof EnvironmentOptions>
export type EnvironmentOptionsInput = z.input<typeof EnvironmentOptions>
