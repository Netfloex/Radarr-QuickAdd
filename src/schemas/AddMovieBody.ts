import { z } from "zod"

export const AddMovieBody = z.object({
	id: z.number(),
})

export type AddMovieBody = z.output<typeof AddMovieBody>
