import { http } from "@api/http"

import { AddMovieBody } from "@schemas/AddMovieBody"

interface AddMovieOptions {
	tmdbId: number
	title: string
	monitored: boolean
	rootFolderPath: string
	qualityProfileId: number
}

export const addMovie = async (movie: AddMovieOptions): Promise<number> => {
	const data = await http
		.post("movie", {
			json: {
				addOptions: {
					monitor: movie.monitored ? "movieOnly" : "none",
					searchForMovie: false,
				},
				...movie,
			},
		})
		.json()

	const result = AddMovieBody.safeParse(data)

	if (result.success) {
		return result.data.id
	}

	throw result.error
}
