import { http } from "@api/http"

import { MovieSearchResult } from "@schemas/MovieSearchResult"

export const search = async (term: string): Promise<MovieSearchResult[]> => {
	const data = await http
		.get("movie/lookup", {
			searchParams: {
				term,
			},
		})
		.json()

	const result = MovieSearchResult.array().safeParse(data)

	if (result.success) {
		return result.data
	}

	throw result.error
}
