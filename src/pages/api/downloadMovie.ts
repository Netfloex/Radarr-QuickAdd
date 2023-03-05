import { HTTPError } from "got"
import { NextApiHandler } from "next"
import { downloadMovie } from "src/utils/downloadMovie"

const downloadMovieHandler: NextApiHandler = async (req, res) => {
	if (req.method !== "POST") {
		return res.status(405).end("Method Not Allowed")
	}
	if (!req.body || typeof req.body !== "object") {
		return res.status(400).json({ error: "Please provide a request body" })
	}
	console.log(req.body)

	if (!("title" in req.body) || !("tmdbId" in req.body))
		return res
			.status(400)
			.json({ error: "Please add the title and the tmdbId" })

	await downloadMovie(req.body).catch((err) => {
		if (err instanceof HTTPError) {
			if (err.response.statusCode == 400) {
				return res.status(400).json(err.response.body)
			}
		}
	})

	return res.json({})
}

export default downloadMovieHandler
