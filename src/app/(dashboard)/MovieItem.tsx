import styles from "./MovieItem.module.scss"

import Image from "next/image"
import { FC, useCallback } from "react"
import { downloadMovie } from "src/utils/downloadMovie"

import { MovieResult } from "@typings/Movie"

export const MovieItem: FC<{ movie: MovieResult }> = ({ movie }) => {
	const download = useCallback(() => {
		downloadMovie(movie)
	}, [movie])

	return (
		<div className={styles.movieItem}>
			<div>
				<Image
					src={movie.remotePoster}
					width={200}
					height={300}
					unoptimized
					alt={movie.title}
				/>
			</div>
			<div>
				<h1>
					{movie.title} ({movie.year})
				</h1>
				{movie.overview}
				<button onClick={download}>Download</button>
			</div>
		</div>
	)
}
