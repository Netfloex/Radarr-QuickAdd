import Link from "next/link"
import { MdSettings } from "react-icons/md"

import { IconButton, SvgIcon } from "@mui/joy"

import type { FC } from "react"

export const SettingsButton: FC = () => (
		<Link href="/settings">
			<IconButton
				color="neutral"
				sx={{ bgcolor: "background.surface" }}
				variant="solid"
			>
				<SvgIcon component={MdSettings} />
			</IconButton>
		</Link>
	)
