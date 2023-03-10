import { DownloadMovieBody } from "@schemas/DownloadMovieBody"
import { HTTPError } from "got"
import { NextApiHandler } from "next"
import { downloadMovie } from "src/utils/downloadMovie"

import { hasOptions } from "@utils/getOptions"

const downloadMovieHandler: NextApiHandler = async (req, res) => {
	if (!hasOptions()) {
		return res.status(500).json({ error: "Missing environment variables" })
	}

	if (req.method !== "POST") {
		return res.status(405).end("Method Not Allowed")
	}
	const parsed = DownloadMovieBody.safeParse(req.body)

	if (!parsed.success) {
		return res.status(400).json(parsed.error)
	}

	await downloadMovie(parsed.data).catch((err) => {
		if (err instanceof HTTPError) {
			if (err.response.statusCode == 400) {
				return res.status(400).json(err.response.body)
			}
		}
	})

	return res.json({})
}

export default downloadMovieHandler
