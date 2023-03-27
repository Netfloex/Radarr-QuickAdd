import styles from "./MovieStatus.module.scss"

import type { FC } from "react"

import { MovieSearchResult } from "@schemas/MovieSearchResult"

export const MovieStatus: FC<{ movie: MovieSearchResult }> = ({ movie }) => {
	if (!movie.hasFile) return <></>

	const status = "downloaded"

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
		>
			{status}
		</div>
	)
}
