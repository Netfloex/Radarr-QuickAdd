import ky from "ky"

export const http = ky.extend({
	prefixUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v3`,

	headers: {
		"X-Api-Key": process.env.NEXT_PUBLIC_API_KEY,
	},
	cache: "force-cache",
})
