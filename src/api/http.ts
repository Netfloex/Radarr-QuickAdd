import got, { RequestError } from "got"

export const http = got.extend({
	prefixUrl: `${process.env.SERVER_URL}/api/v3`,

	headers: {
		"X-Api-Key": process.env.API_KEY,
	},
	cache: "force-cache",
})
