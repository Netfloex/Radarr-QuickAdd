import { useState } from "react"

export const useConstant = <T>(fun: () => T): T => {
	const [data] = useState(fun)

	return data
}
