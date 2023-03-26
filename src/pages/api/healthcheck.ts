import { healthCheck } from "@api/healthCheck"
import { RequestError } from "got"
import { NextApiHandler } from "next"

import { hasOptions } from "@utils/getOptions"

const healthCheckHandler: NextApiHandler = async (req, res) => {
	if (!hasOptions()) {
		return res.status(500).json({ error: "Missing environment variables" })
	}

	try {
		const data = await healthCheck()

		if (data.statusCode !== 200) {
			return res
				.status(500)
				.json({ status: data.statusCode, body: data.body })
		}

		return res.json(data.body)
	} catch (error) {
		if (error instanceof RequestError) {
			return res
				.status(500)
				.json({ code: error.code, url: error.options.url })
		}

		res.status(500).json({ code: "Unknown Error" })

		throw error
	}
}

export default healthCheckHandler
