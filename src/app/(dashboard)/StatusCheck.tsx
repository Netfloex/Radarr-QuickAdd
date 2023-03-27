import type { FC } from "react"
import { MdError } from "react-icons/md"

import { Alert, CircularProgress, SvgIcon, Typography } from "@mui/joy"

import { trpc } from "@utils/trpc"

export const StatusCheck: FC = () => {
	const { data, error, isLoading } = trpc.healthcheck.useQuery()

	if (isLoading) {
		return (
			<Alert variant="solid" startDecorator={<CircularProgress />}>
				Checking API
			</Alert>
		)
	}

	if (error) {
		console.error(error)

		return <>{error.message}</>
	}

	if (Array.isArray(data)) {
		return null
	}

	let errorMessage = "Unknown Error"

	if ("status" in data) {
		if (data.status == 401) {
			errorMessage = "Api key is incorrect"
		} else {
			errorMessage = `Request failed with status ${data.status}`
		}
	} else if ("code" in data) {
		errorMessage = `Request failed: ${data.code}`
	} else if (data.incorrectEnv) {
		errorMessage = `The environment variables are incorrect/missing`
	}

	return (
		<>
			<Alert
				startDecorator={<SvgIcon component={MdError} />}
				color="danger"
			>
				<Typography>{errorMessage}</Typography>
			</Alert>
			{"body" in data && <pre>{data.body}</pre>}
		</>
	)
}
