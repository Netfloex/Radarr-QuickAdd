import { z } from "zod"

export const Settings = z.object({
	qualityProfileId: z.number().min(1),
	rootFolder: z.string().nonempty(),
	monitor: z.boolean().default(false),
})

export type SettingsInput = z.input<typeof Settings>
export type SettingsOutput = z.output<typeof Settings>
