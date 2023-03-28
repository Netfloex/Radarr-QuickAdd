import styles from "./MovieStatus.module.scss"

import type { FC } from "react"

import { MovieSearchResult } from "@schemas/MovieSearchResult"

import { FoundQueueItem } from "@typings/FoundQueueItem"

export const MovieStatus: FC<{
	movie: MovieSearchResult
	queueItem: FoundQueueItem
}> = ({ movie, queueItem }) => {
	if (queueItem === null && !movie.hasFile) return null

	if (queueItem === false && !movie.hasFile) return null

	const status = queueItem ? queueItem.status : "downloaded"

	const color =
		status == "downloaded"
			? "#388E3C"
			: status == "downloading"
			? "#4A148C"
			: "#E53935"

	return (
		<div
			className={styles.movieStatus}
			style={{
				backgroundColor: color,
			}}
			title={
				queueItem && "errorMessage" in queueItem
					? queueItem.errorMessage
					: undefined
			}
		>
			{status}
		</div>
	)
}
