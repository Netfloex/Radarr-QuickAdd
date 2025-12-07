import { TRPCClientErrorBase } from "@trpc/client"
import { TRPCDefaultErrorShape } from "@trpc/server"
import { MdError } from "react-icons/md"

import { Alert, SvgIcon, Typography } from "@mui/joy"

import type { FC } from "react"

export const ErrorAlert: FC<{
	error: TRPCClientErrorBase<TRPCDefaultErrorShape>
	what: string
}> = ({ error, what }) => (
	<Alert color="danger" startDecorator={<SvgIcon component={MdError} />}>
		<Typography>
			<Typography display="block">
				An error occured when fetching {what}
			</Typography>
			<Typography display="block" fontSize="sm">
				{error.data
					? `Status ${error.data.httpStatus} ${error.data.code}`
					: error.message}
			</Typography>
			<Typography level="body-md">
				<pre>
					{error?.data?.stack
						? error.data.stack
						: "stack" in error && String(error.stack)}
				</pre>
			</Typography>
		</Typography>
	</Alert>
)
