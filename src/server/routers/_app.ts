import { downloadMovieRoute } from "@server/routers/downloadMovie"
import { searchRoute } from "@server/routers/search"
import { router } from "@server/trpc"

import { healthCheckRoute } from "./healthcheck"

export const appRouter = router({
	healthcheck: healthCheckRoute,
	search: searchRoute,
	downloadMovie: downloadMovieRoute,
})

export type AppRouter = typeof appRouter
