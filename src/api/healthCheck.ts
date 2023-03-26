import { Response } from "got"

import { http } from "./http"

export const healthCheck = async (): Promise<Response<string>> => {
	return http.get("health", { throwHttpErrors: false, responseType: "json" })
}
