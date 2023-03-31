import { RequestError } from "got"

import { procedure } from "@server/trpc"
import { hasOptions } from "@server/utils/getOptions"

import { HealthCheck, healthCheck } from "@api/healthCheck"

interface ResponseError {
	status: number
	body: string
}

interface HttpError {
	code: string
	url?: string
}

interface UnknownError {
	code: "Unknown Error"
}

interface IncorrectEnvError {
	incorrectEnv: true
}

const healthcheckResolver = async (): Promise<
	HealthCheck | ResponseError | HttpError | UnknownError | IncorrectEnvError
> => {
	if (!hasOptions()) {
		return {
			incorrectEnv: true,
		}
	}

	try {
		const data = await healthCheck()

		if (data.statusCode !== 200) {
			const error: ResponseError = {
				status: data.statusCode,
				body: JSON.stringify(data.body),
			}

			return error
		}

		return data.body
	} catch (error) {
		if (error instanceof RequestError) {
			const response: HttpError = {
				code: error.code,
				url: error.options.url?.toString(),
			}

			return response
		}

		console.error(error)
		return { code: "Unknown Error" } as const
	}
}

export const healthCheckRoute = procedure.query(healthcheckResolver)
