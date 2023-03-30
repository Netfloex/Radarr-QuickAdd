import {
	EnvironmentOptions,
	EnvironmentOptionsInput,
} from "@schemas/EnvironmentOptions"

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const parsedOptions = () => {
	const options: Partial<EnvironmentOptionsInput> = {
		apiKey: process.env.API_KEY,
		qualityProfile: process.env.QUALITY_PROFILE_ID,
		rootFolder: process.env.ROOT_FOLDER,
		serverUrl: process.env.SERVER_URL,
		storePath: process.env.STORE_PATH,
	}

	const parsed = EnvironmentOptions.safeParse(options)

	return parsed
}

export const getOptions = (
	safe?: boolean,
): EnvironmentOptions | Record<string, never> => {
	const parsed = parsedOptions()

	if (!parsed.success) {
		if (safe) {
			return {}
		}
		throw new Error("Environment Variables are incorrect/missing!")
	}

	return parsed.data
}

export const hasOptions = (): boolean => {
	const parsed = parsedOptions()

	return parsed.success
}
