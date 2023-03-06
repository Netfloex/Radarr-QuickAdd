import styles from "./MovieStatus.module.scss"

import { MovieSearchResult } from "@schemas/MovieSearchResult"
import type { FC } from "react"

export const MovieStatus: FC<{ movie: MovieSearchResult }> = ({ movie }) => {
	if (movie.queueStatus == undefined && !movie.hasFile) return <></>

	const status = movie.hasFile ? "downloaded" : movie.queueStatus!.status

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
			title={movie.queueStatus?.errorMessage}
		>
			{status}
		</div>
	)
}
