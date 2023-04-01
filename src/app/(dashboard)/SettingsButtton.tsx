import Link from "next/link"
import { MdSettings } from "react-icons/md"

import { IconButton, SvgIcon } from "@mui/joy"

import type { FC } from "react"

export const SettingsButton: FC = () => {
	return (
		<Link href="/settings">
			<IconButton
				variant="solid"
				sx={{ bgcolor: "background.surface" }}
				color="neutral"
			>
				<SvgIcon component={MdSettings} />
			</IconButton>
		</Link>
	)
}
