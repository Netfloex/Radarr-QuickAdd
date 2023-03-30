import got, { RequestError } from "got"

import { getOptions } from "@server/utils/getOptions"

const options = getOptions(true)

export const http = got.extend({
	prefixUrl: `${options.serverUrl}/api/v3`,
	headers: {
		"X-Api-Key": options.apiKey,
	},
	hooks: {
		beforeError: [
			(err): RequestError => {
				console.log("error in request to " + err.options.url)
				console.log(err.response?.body)

				return err
			},
		],
	},
})
