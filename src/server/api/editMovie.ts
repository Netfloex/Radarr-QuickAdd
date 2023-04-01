import { ZodError } from "zod"

import { getSettings } from "@server/utils/getSettings"

import { http } from "@api/http"

import { MovieSearchResult } from "@schemas/MovieSearchResult"

interface EditMovieOptions {
	id: number
	path: string
}

export const editMovie = async (movie: EditMovieOptions): Promise<unknown> => {
	const settings = await getSettings()

	if (settings instanceof ZodError) {
		return false
	}

	const data = await http
		.put("movie", {
			json: {
				id: movie.id,
				path: movie.path,
				qualityProfileId: settings.qualityProfileId,
				monitored: false,
			} satisfies Partial<MovieSearchResult>,
		})
		.json()

	const result = MovieSearchResult.safeParse(data)

	if (result.success) {
		return result.data
	}

	throw result.error
}
