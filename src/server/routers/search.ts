import { z } from "zod"

import { procedure } from "@server/trpc"

import { search } from "@api/search"

export const searchRoute = procedure
	.input(z.object({ query: z.string().nonempty() }))
	.query(async ({ input: { query } }) => await search(query))
