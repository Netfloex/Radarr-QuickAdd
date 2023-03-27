import { Response } from "got"

import { http } from "./http"

export type HealthCheck = Array<Record<string, unknown>>

export const healthCheck = async (): Promise<Response<HealthCheck>> => {
	const resp = http.get<HealthCheck>("health", {
		throwHttpErrors: false,
		responseType: "json",
	})

	return resp
}
