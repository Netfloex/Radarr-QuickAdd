import { QueueDetails } from "@schemas/QueueDetails"
import { z } from "zod"

export const MovieSearchResult = z.object({
	title: z.string(),
	year: z.number(),
	overview: z.string(),
	tmdbId: z.number(),
	remotePoster: z.string()?.optional(),
	runtime: z.number(),
	id: z.number().optional(),
	hasFile: z.boolean().optional(),

	queueStatus: QueueDetails.optional(),
})

export type MovieSearchResult = z.output<typeof MovieSearchResult>
