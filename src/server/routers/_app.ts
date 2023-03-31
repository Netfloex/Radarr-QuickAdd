import { downloadMovieRoute } from "@server/routers/downloadMovie"
import { healthCheckRoute } from "@server/routers/healthcheck"
import { qualityProfilesRoute } from "@server/routers/qualityProfiles"
import { queueDetailsRoute } from "@server/routers/queueDetails"
import { rootFolderRoute } from "@server/routers/rootFolder"
import { searchRoute } from "@server/routers/search"
import { settingsRouter } from "@server/routers/settings"
import { router } from "@server/trpc"

export const appRouter = router({
	healthcheck: healthCheckRoute,
	search: searchRoute,
	downloadMovie: downloadMovieRoute,
	queueDetails: queueDetailsRoute,
	rootFolder: rootFolderRoute,
	qualityProfiles: qualityProfilesRoute,
	settings: settingsRouter,
})

export type AppRouter = typeof appRouter
