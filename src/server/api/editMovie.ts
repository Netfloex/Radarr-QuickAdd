import { ZodError } from "zod"

import { http } from "@api/http"

import { MovieSearchResult } from "@schemas/MovieSearchResult"

interface EditMovieRequiredOptions {
	id: number
	path: string
}

type EditMovieOptions = EditMovieRequiredOptions & Partial<MovieSearchResult>

export const editMovie = async (
	movie: EditMovieOptions,
): Promise<MovieSearchResult | ZodError<MovieSearchResult>> => {
	const data = await http
		.put("movie", {
			json: movie,
		})
		.json()

	const result = MovieSearchResult.safeParse(data)

	if (result.success) {
		return result.data
	}

	throw result.error
}
