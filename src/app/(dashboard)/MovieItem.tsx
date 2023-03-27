import styles from "./MovieItem.module.scss"

import { MovieSearchResult } from "@schemas/MovieSearchResult"
import { Duration } from "luxon"
import Image from "next/image"
import { FC } from "react"
import { DownloadButton } from "src/app/(dashboard)/DownloadButton"
import { MovieStatus } from "src/app/(dashboard)/MovieStatus"

import {
	AspectRatio,
	Card,
	CardContent,
	CardOverflow,
	Typography,
} from "@mui/joy"

export const MovieItem: FC<{ movie: MovieSearchResult }> = ({ movie }) => {
	return (
		<Card orientation="horizontal" className={styles.movieItem}>
			<CardOverflow>
				<AspectRatio ratio={2 / 3} className={styles.poster}>
					{movie.remotePoster && (
						<Image
							src={movie.remotePoster}
							unoptimized
							fill={true}
							alt={movie.title}
						/>
					)}
					<MovieStatus movie={movie} />
				</AspectRatio>
			</CardOverflow>
			<CardContent sx={{ px: 2 }}>
				<Typography level="h2">
					{movie.title} ({movie.year})
				</Typography>
				<Typography level="body4">
					{Duration.fromObject({ minutes: movie.runtime })
						.shiftTo("hours", "minutes")
						.toHuman()}
				</Typography>
				<Typography>{movie.overview}</Typography>
				<DownloadButton movie={movie} />
			</CardContent>
		</Card>
	)
}
