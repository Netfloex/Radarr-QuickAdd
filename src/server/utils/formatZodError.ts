import { ZodError } from "zod"

export const formatZodError = (error: ZodError): string[] => error.issues.map((err) => `${err.path.join(".")}: ${err.message}`)
