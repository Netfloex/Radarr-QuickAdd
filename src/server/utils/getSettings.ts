import { ZodError } from "zod"

import { getStore } from "@server/utils/getStore"

import { Settings } from "@schemas/Settings"

export const getSettings = async (): Promise<Settings | ZodError<Settings>> => {
	const store = await getStore()

	const parsed = Settings.safeParse(store.data)
	if (parsed.success) return parsed.data

	return parsed.error
}
