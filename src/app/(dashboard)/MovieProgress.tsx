import styles from "./MovieProgress.module.scss"

import { Box, Divider, LinearProgress } from "@mui/joy"

import { QueueDetails } from "@schemas/QueueDetails"

import type { FC } from "react"

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
				className={styles.progress}
				color={
					queueStatus.status !== "downloading" ? "danger" : "primary"
				}
				determinate
				value={percentage}
				variant="soft"
			/>
		</Box>
	)
}
