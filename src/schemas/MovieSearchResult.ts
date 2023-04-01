import { z } from "zod"

const UnaddedMovie = z.object({
	title: z.string(),
	year: z.number(),
	overview: z.string(),
	tmdbId: z.number(),
	remotePoster: z.string()?.optional(),
	runtime: z.number(),

	hasFile: z.boolean().optional().default(false),
})

export const MovieSearchResult = z.union([
	UnaddedMovie.extend({
		id: z.number(),
		hasFile: z.boolean(),
		qualityProfileId: z.number(),
		monitored: z.boolean(),
		path: z.string(),
	}),
	UnaddedMovie,
])

export type MovieSearchResult = z.output<typeof MovieSearchResult>
