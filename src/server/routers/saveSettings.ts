import { procedure } from "@server/trpc"
import { getStore } from "@server/utils/getStore"

import { Settings } from "@schemas/Settings"

export const saveSettingsRoute = procedure
	.input(Settings)
	.mutation(async ({ input }) => {
		const store = await getStore()

		store.data.qualityProfileId = input.qualityProfileId
		store.data.rootPath = input.rootPath

		await store.write()

		return true
	})
