import { procedure } from "@server/trpc"

import { Settings } from "@schemas/Settings"

export const saveSettingsRoute = procedure
	.input(Settings)
	.query(async ({ input }) => {
		console.log(input)

		return true
	})
