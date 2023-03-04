import { Duration } from "luxon"
import Image from "next/image"
import { FC, useCallback } from "react"
import { downloadMovie } from "src/utils/downloadMovie"

import {
	AspectRatio,
	Button,
	Card,
	CardContent,
	CardOverflow,
	Typography,
} from "@mui/joy"

import { MovieResult } from "@typings/Movie"

export const MovieItem: FC<{ movie: MovieResult }> = ({ movie }) => {
	const download = useCallback(() => {
		downloadMovie(movie)
	}, [movie])

	return (
		<Card orientation="horizontal">
			<CardOverflow>
				<AspectRatio ratio={2 / 3} sx={{ width: "15rem" }}>
					{movie.remotePoster && (
						<Image
							src={movie.remotePoster}
							unoptimized
							fill={true}
							alt={movie.title}
						/>
					)}
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
				<Button disabled={movie.hasFile} onClick={download}>
					Download
				</Button>
			</CardContent>
		</Card>
	)
}
