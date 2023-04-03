import { ZodError } from "zod"

import { getStore } from "@server/utils/getStore"

import { Settings, SettingsOutput } from "@schemas/Settings"

export const getSettings = async (): Promise<
	SettingsOutput | ZodError<SettingsOutput>
> => {
	const store = await getStore()
	await store.read()

	const parsed = Settings.safeParse(store.data)
	if (parsed.success) return parsed.data

	return parsed.error
}
