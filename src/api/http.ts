import got, { RequestError } from "got"

export const http = got.extend({
	prefixUrl: `${process.env.SERVER_URL}/api/v3`,
	headers: {
		"X-Api-Key": process.env.API_KEY,
	},
	hooks: {
		beforeError: [
			(err): RequestError => {
				console.log("error in request to" + err.options.url)
				console.log(err.response?.body)

				return err
			},
		],
	},
})
