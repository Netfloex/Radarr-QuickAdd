import { z } from "zod"

export const Release = z.object({
	rejected: z.boolean(),
	seeders: z.number(),
	title: z.string(),
	size: z.number(),
	guid: z.string(),
	indexerId: z.number(),
	quality: z.object({
		quality: z.object({
			name: z.string(),
		}),
	}),
})

export type Release = z.output<typeof Release>
