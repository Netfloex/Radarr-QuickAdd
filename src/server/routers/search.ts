import { search } from "@api/search"
import { z } from "zod"

import { procedure } from "@server/trpc"

export const searchRoute = procedure
	.input(z.object({ query: z.string().nonempty() }))
	.query(async ({ input: { query } }) => {
		return await search(query)
	})
