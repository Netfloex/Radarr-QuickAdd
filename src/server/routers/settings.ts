import { procedure, router } from "@server/trpc"
import { getStore } from "@server/utils/getStore"

import { Settings } from "@schemas/Settings"

export const settingsRouter = router({
	save: procedure.input(Settings).mutation(async ({ input }) => {
		const store = await getStore()

		store.data.qualityProfileId = input.qualityProfileId

		store.data.rootFolder = input.rootFolder

		await store.write()

		return true
	}),
	get: procedure.query(async () => {
		const store = await getStore()

		return {
			qualityProfileId: store.data.qualityProfileId,
			rootFolder: store.data.rootFolder,
		} satisfies Partial<Settings>
	}),
})
