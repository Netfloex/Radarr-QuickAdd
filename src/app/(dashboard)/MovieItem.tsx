import styles from "./MovieItem.module.scss"

import { Duration } from "luxon"
import Image from "next/image"
import { MovieProgress } from "src/app/(dashboard)/MovieProgress"

import {
	AspectRatio,
	Card,
	CardContent,
	CardOverflow,
	Typography,
} from "@mui/joy"

import { trpc } from "@utils/trpc"

import { ErrorAlert } from "@components/ErrorAlert"

import { DownloadButton } from "./DownloadButton"
import { MovieStatus } from "./MovieStatus"

import { MovieSearchResult } from "@schemas/MovieSearchResult"

import type { FC } from "react"

import { FoundQueueItem } from "@typings/FoundQueueItem"

export const MovieItem: FC<{ movie: MovieSearchResult }> = ({ movie }) => {
	const { data, isError, error } = trpc.queueDetails.useQuery(undefined, {
		refetchOnWindowFocus: true,
		enabled: "id" in movie,
	})

	const queueItem: FoundQueueItem = !("id" in movie)
		? false
		: (data?.find((item) => item.movieId == movie.id) ?? false)

	return (
		<Card className={styles.movieItem} orientation="horizontal">
			<CardOverflow className={styles.overflow}>
				<AspectRatio className={styles.poster} ratio={2 / 3}>
					{movie.remotePoster && (
						<Image
							alt={movie.title}
							fill={true}
							src={movie.remotePoster}
							unoptimized
						/>
					)}
					<MovieStatus movie={movie} queueItem={queueItem} />
				</AspectRatio>
			</CardOverflow>
			<CardContent sx={{ px: 2, justifyContent: "space-between" }}>
				<Typography>
					<Typography display="block" level="h2">
						{movie.title} ({movie.year})
					</Typography>
					<Typography display="block" level="body-md">
						{Duration.fromObject({ minutes: movie.runtime })
							.shiftTo("hours", "minutes")
							.toHuman()}
					</Typography>
					<Typography>{movie.overview}</Typography>
				</Typography>
				{queueItem !== false ? (
					<MovieProgress queueStatus={queueItem} />
				) : (
					<DownloadButton movie={movie} />
				)}
				{isError && <ErrorAlert error={error} what="queue details" />}
			</CardContent>
		</Card>
	)
}
