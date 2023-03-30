import { http } from "@api/http"

import { QualityProfile } from "@schemas/QualityProfile"

export const qualityProfiles = async (): Promise<QualityProfile[]> => {
	const data = await http.get("qualityprofile").json()

	const result = QualityProfile.array().safeParse(data)

	if (result.success) {
		return result.data
	}

	throw result.error
}
