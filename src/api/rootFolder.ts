import { http } from "./http"

import { RootFolder } from "@schemas/RootFolder"

export const rootFolder = async (): Promise<RootFolder[]> => {
	const data = await http.get("rootFolder").json()

	const result = RootFolder.array().safeParse(data)

	if (result.success) {
		return result.data
	}

	throw result.error
}
