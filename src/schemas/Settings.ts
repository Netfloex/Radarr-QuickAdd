import { z } from "zod"

export const Settings = z.object({
	qualityProfileId: z.number().min(1),
	rootPath: z.string().nonempty(),
})

export type Settings = z.output<typeof Settings>
