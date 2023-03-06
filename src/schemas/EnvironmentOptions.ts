import { z } from "zod"

export const EnvironmentOptions = z.object({
	serverUrl: z.string().url(),
	apiKey: z.string().length(32),
	rootFolder: z.string(),
	qualityProfile: z
		.string()
		.transform(Number)
		.refine((a) => !isNaN(a)),
})

export type EnvironmentOptions = z.output<typeof EnvironmentOptions>
export type EnvironmentOptionsInput = z.input<typeof EnvironmentOptions>
