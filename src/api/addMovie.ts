import { http } from "@api/http"

import { getOptions } from "@utils/getOptions"

interface AddMovieOptions {
	tmdbId: number
	title: string
}

export const addMovie = async (movie: AddMovieOptions): Promise<number> => {
	const options = getOptions()
	const data: { id: number } = await http
		.post("movie", {
			json: {
				addOptions: {
					monitor: "none",
					searchForMovie: false,
				},
				qualityProfileId: options.qualityProfile,
				rootFolderPath: options.rootFolder,
				monitored: false,
				...movie,
			},
		})
		.json()

	return data.id
}
