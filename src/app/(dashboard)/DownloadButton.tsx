import styles from "./DownloadButton.module.scss"

import { filesize } from "filesize"
import { FC, useCallback } from "react"
import { MdCheck, MdWarning } from "react-icons/md"

import { Alert, Button, Chip, SvgIcon } from "@mui/joy"

import { trpc } from "@utils/trpc"

import { ErrorAlert } from "@components/ErrorAlert"

import { MovieSearchResult } from "@schemas/MovieSearchResult"

import "@typings/DownloadMovieError"

import { DownloadMovieErrorType } from "@typings/DownloadMovieError"

export const DownloadButton: FC<{
	movie: MovieSearchResult
}> = ({ movie }) => {
	const { mutate, isError, data, error, isLoading } =
		trpc.downloadMovie.useMutation()

	const download = useCallback(() => {
		mutate({
			title: movie.title,
			tmdbId: movie.tmdbId,
			id: "id" in movie ? movie.id : undefined,
			path: "path" in movie ? movie.path : undefined,
			monitored: "monitored" in movie ? movie.monitored : undefined,
			qualityProfileId:
				"qualityProfileId" in movie
					? movie.qualityProfileId
					: undefined,
		})
	}, [movie, mutate])

	if (isError) {
		return <ErrorAlert error={error} what={"the download"} />
	}

	console.log(data)

	if (data !== undefined) {
		if ("error" in data) {
			return (
				<Alert
					color="warning"
					startDecorator={<SvgIcon component={MdWarning} />}
				>
					{data.type === DownloadMovieErrorType.invalidSettings
						? "Please check your settings"
						: data.type === DownloadMovieErrorType.rejectedOnly
						? data.releaseCount
							? "Found " +
							  data.releaseCount +
							  " rejected releases, but no accepted ones."
							: "No releases found"
						: "Unknown Error"}
				</Alert>
			)
		} else {
			return (
				<Alert
					color="success"
					startDecorator={<SvgIcon component={MdCheck} />}
				>
					<>
						{data.title}
						<Chip>{data.quality.quality.name}</Chip>
						<> </>
						<Chip color="info">
							<>{filesize(data.size)}</>
						</Chip>
						<> </>
						<Chip color="neutral">{data.seeders}</Chip>
					</>
				</Alert>
			)
		}
	}

	return (
		<>
			<Button
				disabled={movie.hasFile || data !== undefined}
				onClick={download}
				loading={isLoading}
				color={data !== undefined ? "success" : undefined}
				className={styles.downloadButton}
			>
				Download
			</Button>
		</>
	)
}
