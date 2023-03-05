import { http } from "@api/http"
import { Release } from "@schemas/Release"

export const getReleases = async (movieId: number): Promise<Release[]> => {
	const data = await http
		.get("release", {
			searchParams: {
				movieId,
			},
		})
		.json()

	const result = Release.array().safeParse(data)

	if (result.success) {
		return result.data
	}

	throw result.error
}
