import { http } from "./http"

import { MovieResult } from "@typings/Movie"

export const search = async (term: string): Promise<MovieResult[]> => {
	const data = http.get("movie/lookup", {
		searchParams: {
			term,
		},
	})

	return data.json()
}
