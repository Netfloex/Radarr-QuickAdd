import { ZodError } from "zod"

export enum HealthCheckErrorType {
	incorrectEnv,
	incorrectSettings,
	unknownError,
	responseError,
	requestError,
}

interface BasicHealthCheckError {
	type: HealthCheckErrorType
	message: string
	error: true
}

interface IncorrectHealthCheckError extends BasicHealthCheckError {
	type:
		| HealthCheckErrorType.incorrectEnv
		| HealthCheckErrorType.incorrectSettings
	zodError: ZodError
	formatted: string[]
}

interface ResponseHealthCheckError extends BasicHealthCheckError {
	type: HealthCheckErrorType.responseError
	status: number
	body: unknown
}

interface SimpleHealthCheckError extends BasicHealthCheckError {
	type: HealthCheckErrorType.unknownError | HealthCheckErrorType.requestError
}

export type HealthCheckError =
	| IncorrectHealthCheckError
	| ResponseHealthCheckError
	| SimpleHealthCheckError
