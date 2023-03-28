import { downloadMovieRoute } from "@server/routers/downloadMovie"
import { qualityProfilesRoute } from "@server/routers/qualityProfiles"
import { queueDetailsRoute } from "@server/routers/queueDetails"
import { rootFolderRoute } from "@server/routers/rootFolder"
import { searchRoute } from "@server/routers/search"
import { router } from "@server/trpc"

import { healthCheckRoute } from "./healthcheck"

export const appRouter = router({
	healthcheck: healthCheckRoute,
	search: searchRoute,
	downloadMovie: downloadMovieRoute,
	queueDetails: queueDetailsRoute,
	rootFolder: rootFolderRoute,
	qualityProfiles: qualityProfilesRoute,
})

export type AppRouter = typeof appRouter
