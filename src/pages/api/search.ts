import { search } from "@api/search"
import { NextApiHandler } from "next"

const searchHandler: NextApiHandler = async (req, res) => {
	const term = req.query["term"]

	if (!term || Array.isArray(term)) {
		return res.status(400).json({ error: "Please provide a search term" })
	}

	const results = await search(term)

	return res.json(results)
}

export default searchHandler
