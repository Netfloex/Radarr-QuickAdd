import { z } from "zod"

export const DownloadMovieBody = z.object({
	title: z.string(),
	tmdbId: z.number(),
	id: z.number().optional(),
})

export type DownloadMovieBody = z.output<typeof DownloadMovieBody>
