import { http } from "@api/http"
import { QueueDetails } from "@schemas/QueueDetails"

export const queueDetails = async (): Promise<QueueDetails[]> => {
	const data = await http.get("queue/details").json()

	const result = QueueDetails.array().safeParse(data)

	if (result.success) {
		return result.data
	}

	throw result.error
}
