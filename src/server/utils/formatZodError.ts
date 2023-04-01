import { ZodError } from "zod"

export const formatZodError = (error: ZodError): string[] => {
	return error.issues.map((err) => `${err.path.join(".")}: ${err.message}`)
}
