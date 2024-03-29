import { z } from "zod"

const UnaddedDownloadMovieBody = z.object({
	title: z.string(),
	tmdbId: z.number(),
})

export const DownloadMovieBody = z.union([
	UnaddedDownloadMovieBody.extend({
		id: z.number(),
		path: z.string(),
		qualityProfileId: z.number(),
		monitored: z.boolean(),
	}),
	UnaddedDownloadMovieBody,
])

export type DownloadMovieBody = z.output<typeof DownloadMovieBody>
