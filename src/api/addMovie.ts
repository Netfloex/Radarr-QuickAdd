import { http } from "@api/http"

interface AddMovieOptions {
	tmdbId: number
	title: string
}

export const addMovie = async (movie: AddMovieOptions): Promise<number> => {
	const data: { id: number } = await http
		.post("movie", {
			json: {
				addOptions: {
					monitor: "none",
					searchForMovie: false,
				},
				qualityProfileId: process.env.QUALITY_PROFILE_ID,
				rootFolderPath: process.env.ROOT_FOLDER,
				monitored: false,
				...movie,
			},
		})
		.json()

	return data.id
}
