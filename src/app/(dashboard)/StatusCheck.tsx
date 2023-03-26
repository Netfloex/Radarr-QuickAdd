import ky, { HTTPError } from "ky"
import type { FC } from "react"
import { MdError } from "react-icons/md"
import useSWR from "swr"

import { Alert, CircularProgress, SvgIcon, Typography } from "@mui/joy"

interface HealthCheckResponse {
	status?: number
	code?: string
	body?: string
}

const fetcher = (url: string): Promise<HealthCheckResponse> =>
	ky.get(url, { throwHttpErrors: false }).json()

export const StatusCheck: FC = () => {
	const { data, error, isLoading } = useSWR("/api/healthcheck", fetcher)

	if (isLoading) {
		return (
			<Alert variant="solid" startDecorator={<CircularProgress />}>
				Checking API
			</Alert>
		)
	}

	if (error) {
		console.log(error)
		if (error instanceof HTTPError) {
			return (
				<>
					<></>
					{error.message}
				</>
			)
		}

		return <></>
	}

	if (!data) {
		return <></>
	}

	if (data.status == 401) {
		return <Alert color="danger">Api Key is incorrect</Alert>
	}

	if (data?.status || data?.code)
		return (
			<>
				<Alert
					startDecorator={<SvgIcon component={MdError} />}
					color="danger"
				>
					<Typography>
						{data.status !== undefined && (
							<>Request failed with status {data.status}</>
						)}
						{data.code !== undefined && (
							<>
								Request failed: <b>{data.code}</b>
							</>
						)}
					</Typography>
				</Alert>
				{data.body !== undefined && <pre>{data.body}</pre>}
			</>
		)

	return null
	// return (
	// 	<IconButton variant="solid" color="success">
	// 		<SvgIcon component={MdCheck} />
	// 		{/* <MdCheck /> */}
	// 	</IconButton>
	// )
}
