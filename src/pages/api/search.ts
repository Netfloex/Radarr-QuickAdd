import { queueDetails } from "@api/queueDetails"
import { search } from "@api/search"
import { NextApiHandler } from "next"

import { hasOptions } from "@utils/getOptions"

const searchHandler: NextApiHandler = async (req, res) => {
	const term = req.query["term"]

	if (!hasOptions()) {
		return res.status(500).json({ error: "Missing environment variables" })
	}

	if (!term || Array.isArray(term)) {
		return res.status(400).json({ error: "Please provide a search term" })
	}

	const [results, queue] = await Promise.all([search(term), queueDetails()])

	const resultsWithId = results.filter((r) => r.id)

	queue.forEach((queueItem) => {
		const found = resultsWithId.find((r) => r.id == queueItem.movieId)
		if (found) found.queueStatus = queueItem
	})

	return res.json(results)
}

export default searchHandler
