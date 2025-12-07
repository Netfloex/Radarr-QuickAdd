import { FC } from "react"
import { MdError } from "react-icons/md"

import { Alert, CircularProgress, SvgIcon, Typography } from "@mui/joy"

import { trpc } from "@utils/trpc"

import { ErrorAlert } from "@components/ErrorAlert"

import { HealthCheckErrorType } from "@typings/HealthCheckErrors"

export const StatusCheck: FC = () => {
	const { data, error, isPending } = trpc.healthcheck.useQuery()

	if (isPending) {
		return (
			<Alert startDecorator={<CircularProgress />} variant="solid">
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
		<Alert color="danger" startDecorator={<SvgIcon component={MdError} />}>
			<Typography>
				<Typography display="block">
					{data.type === HealthCheckErrorType.requestError
						? "Could not contact SERVER_URL"
						: data.message}
				</Typography>
				{"zodError" in data &&
					data.formatted.map((error) => (
						<Typography display="block" key={error} level="body-md">
							{error}
						</Typography>
					))}
				{data.type === HealthCheckErrorType.responseError && (
					<Typography level="body-md">
						<pre>{data.body as string}</pre>
					</Typography>
				)}
				{data.type === HealthCheckErrorType.requestError && (
					<Typography level="body-md">{data.message}</Typography>
				)}
			</Typography>
		</Alert>
	)
}
