import { z } from "zod"

export const RootFolder = z.object({
	path: z.string(),
	freeSpace: z.number(),
	id: z.number(),
})

export type RootFolder = z.output<typeof RootFolder>
