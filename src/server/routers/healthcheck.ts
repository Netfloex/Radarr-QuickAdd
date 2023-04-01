import { RequestError } from "got"
import { ZodError } from "zod"

import { procedure } from "@server/trpc"
import { formatZodError } from "@server/utils/formatZodError"
import { parsedOptions } from "@server/utils/getOptions"
import { getSettings } from "@server/utils/getSettings"

import { HealthCheck, healthCheck } from "@api/healthCheck"

import {
	HealthCheckError,
	HealthCheckErrorType,
} from "@typings/HealthCheckErrors"

const healthcheckResolver = async (): Promise<
	| {
			data: HealthCheck
			error: false
	  }
	| HealthCheckError
> => {
	const options = parsedOptions()

	if (!options.success) {
		return {
			type: HealthCheckErrorType.incorrectEnv,
			zodError: options.error,
			message: "Incorrect/Missing environment variables",
			formatted: formatZodError(options.error),
			error: true,
		}
	}

	const settings = await getSettings()

	if (settings instanceof ZodError) {
		return {
			type: HealthCheckErrorType.incorrectSettings,
			zodError: settings,
			message: "Incorrect/Missing settings",
			formatted: formatZodError(settings),
			error: true,
		}
	}

	try {
		const data = await healthCheck()

		if (data.statusCode !== 200) {
			if (data.statusCode === 401) {
				return {
					type: HealthCheckErrorType.responseError,
					message: `Incorrect API key`,
					status: data.statusCode,
					body: data.body,
					error: true,
				}
			}

			return {
				type: HealthCheckErrorType.responseError,
				message: `Request to Radarr failed with status ${data.statusCode}`,
				status: data.statusCode,
				body: data.body,
				error: true,
			}
		}

		return { data: data.body, error: false }
	} catch (error) {
		if (error instanceof RequestError) {
			return {
				type: HealthCheckErrorType.requestError,
				message: error.message,
				error: true,
			}
		}

		console.error(error)
		return {
			type: HealthCheckErrorType.unknownError,
			message: String(error),
			error: true,
		}
	}
}

export const healthCheckRoute = procedure.query(healthcheckResolver)
