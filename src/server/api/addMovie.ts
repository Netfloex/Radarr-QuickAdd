import { ZodError } from "zod"

import { getSettings } from "@server/utils/getSettings"

import { http } from "@api/http"

interface AddMovieOptions {
	tmdbId: number
	title: string
}

export const addMovie = async (
	movie: AddMovieOptions,
): Promise<number | false> => {
	const settings = await getSettings()

	if (settings instanceof ZodError) {
		return false
	}

	const data: { id: number } = await http
		.post("movie", {
			json: {
				addOptions: {
					monitor: "none",
					searchForMovie: false,
				},
				qualityProfileId: settings.qualityProfileId,
				rootFolderPath: settings.rootFolder,
				monitored: false,
				...movie,
			},
		})
		.json()

	return data.id
}
