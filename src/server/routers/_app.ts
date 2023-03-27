import { router } from "@server/trpc"

import { healthCheckRoute } from "./healthcheck"

export const appRouter = router({
	healthcheck: healthCheckRoute,
})

export type AppRouter = typeof appRouter
