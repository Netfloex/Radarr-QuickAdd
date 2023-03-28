import { z } from "zod"

export const QualityProfile = z.object({
	name: z.string(),
	id: z.number(),
})

export type QualityProfile = z.output<typeof QualityProfile>
