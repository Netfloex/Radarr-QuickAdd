import { MdError } from "react-icons/md"
import { inspect } from "util"

import { Alert, SvgIcon, Typography } from "@mui/joy"

import type { FC } from "react"

export const ErrorAlert: FC<{ error: unknown }> = ({ error }) => {
	return (
		<>
			<Alert
				startDecorator={<SvgIcon component={MdError} />}
				color="danger"
			>
				<Typography>
					{error && typeof error == "object" && "message" in error
						? String(error.message)
						: inspect(error)}
				</Typography>
			</Alert>
		</>
	)
}
