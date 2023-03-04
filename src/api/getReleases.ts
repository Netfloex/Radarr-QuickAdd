import { http } from "@api/http"

import { Release } from "@typings/Release"

export const getReleases = async (movieId: number): Promise<Release[]> => {
	return http
		.get("release", {
			searchParams: {
				movieId,
			},
		})
		.json()
}
