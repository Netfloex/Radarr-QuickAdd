import { procedure, router } from "@server/trpc"
import { getStore } from "@server/utils/getStore"

import { Settings } from "@schemas/Settings"

export const settingsRouter = router({
	save: procedure.input(Settings).mutation(async ({ input }) => {
		const store = await getStore()

		store.data.qualityProfileId = input.qualityProfileId
	}),
	get: procedure.query(async () => {
		const store = await getStore()

		return {
			qualityProfileId: store.data.qualityProfileId,
			rootPath: store.data.rootPath,
		} satisfies Partial<Settings>
	}),
})
