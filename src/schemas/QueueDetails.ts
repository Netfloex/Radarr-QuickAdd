import { z } from "zod"

export const QueueDetails = z.object({
	movieId: z.number(),
	size: z.number(),
	sizeleft: z.number(),
	status: z.string(),
	errorMessage: z.string().optional(),
})

export type QueueDetails = z.output<typeof QueueDetails>
