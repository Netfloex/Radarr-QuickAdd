import styles from "./MovieProgress.module.scss"

import type { FC } from "react"

import { Box, Divider } from "@mui/joy"
import LinearProgress from "@mui/joy/LinearProgress"

import { QueueDetails } from "@schemas/QueueDetails"

export const MovieProgress: FC<{ queueStatus: QueueDetails }> = ({
	queueStatus,
}) => {
	const percentage =
		((queueStatus.size - queueStatus.sizeleft) / queueStatus.size) * 100

	return (
		<Box className={styles.movieProgress}>
			{percentage.toFixed(1)}%
			<Divider orientation="vertical" />
			<LinearProgress
				determinate
				color={queueStatus.status !== "downloading" ? "danger" : "info"}
				variant="soft"
				value={percentage}
				className={styles.progress}
			/>
		</Box>
	)
}
