import got, { RequestError } from "got"

import { getOptions } from "@utils/getOptions"

const options = getOptions()

export const http = got.extend({
	prefixUrl: `${options.serverUrl}/api/v3`,
	headers: {
		"X-Api-Key": options.apiKey,
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
