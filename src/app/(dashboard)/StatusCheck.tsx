import { FC } from "react"
import { MdError } from "react-icons/md"

import { Alert, CircularProgress, SvgIcon, Typography } from "@mui/joy"

import { trpc } from "@utils/trpc"

import { ErrorAlert } from "@components/ErrorAlert"

import { HealthCheckErrorType } from "@typings/HealthCheckErrors"

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
		return <ErrorAlert error={error} what="healthcheck" />
	}

	if (!data.error) {
		return null
	}

	return (
		<>
			<Alert
				startDecorator={<SvgIcon component={MdError} />}
				color="danger"
			>
				<Typography>
					<Typography display="block">
						{data.type === HealthCheckErrorType.requestError
							? "Could not contact SERVER_URL"
							: data.message}
					</Typography>
					{"zodError" in data &&
						data.formatted.map((error) => (
							<Typography
								key={error}
								level="body2"
								display="block"
							>
								{error}
							</Typography>
						))}
					{data.type === HealthCheckErrorType.responseError && (
						<Typography level="body2">
							<pre>{data.body}</pre>
						</Typography>
					)}
					{data.type === HealthCheckErrorType.requestError && (
						<Typography level="body2">{data.message}</Typography>
					)}
				</Typography>
			</Alert>
		</>
	)
}
