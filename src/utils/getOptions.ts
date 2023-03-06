import {
	EnvironmentOptions,
	EnvironmentOptionsInput,
} from "@schemas/EnvironmentOptions"

export const getOptions = (): EnvironmentOptions => {
	const options: Partial<EnvironmentOptionsInput> = {
		apiKey: process.env.API_KEY,
		qualityProfile: process.env.QUALITY_PROFILE_ID,
		rootFolder: process.env.ROOT_FOLDER,
		serverUrl: process.env.SERVER_URL,
	}

	const parsed = EnvironmentOptions.safeParse(options)

	if (!parsed.success) {
		console.log(parsed.error)
		throw new Error("Environment Variables are missing")
	}

	return parsed.data
}
