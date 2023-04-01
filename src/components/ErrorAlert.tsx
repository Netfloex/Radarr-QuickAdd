import { TRPCClientErrorBase } from "@trpc/client"
import { DefaultErrorShape } from "@trpc/server"
import { MdError } from "react-icons/md"

import { Alert, SvgIcon, Typography } from "@mui/joy"

import type { FC } from "react"

export const ErrorAlert: FC<{
	error: TRPCClientErrorBase<DefaultErrorShape>
	what: string
}> = ({ error, what }) => {
	return (
		<Alert startDecorator={<SvgIcon component={MdError} />} color="danger">
			<Typography>
				<Typography display="block">
					An error occured when fetching {what}
				</Typography>
				<Typography display="block" fontSize="sm">
					{error.data
						? `Status ${error.data.httpStatus} ${error.data.code}`
						: error.message}
				</Typography>
				<Typography level="body3">
					<pre>
						{error?.data?.stack
							? error.data.stack
							: "stack" in error && String(error.stack)}
					</pre>
				</Typography>
			</Typography>
		</Alert>
	)
}
