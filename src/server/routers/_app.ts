import { searchRoute } from "@server/routers/search"
import { router } from "@server/trpc"

import { healthCheckRoute } from "./healthcheck"

export const appRouter = router({
	healthcheck: healthCheckRoute,
	search: searchRoute,
})

export type AppRouter = typeof appRouter
