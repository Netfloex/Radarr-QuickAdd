import { http } from "@api/http"

import { Release } from "@typings/Release"

export const downloadRelease = async (release: Release): Promise<void> => {
	await http.post("release", {
		json: {
			guid: release.guid,
			indexerId: release.indexerId,
		},
	})
}
