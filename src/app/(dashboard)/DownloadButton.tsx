import { MovieSearchResult } from "@schemas/MovieSearchResult"
import { Release } from "@schemas/Release"
import { filesize } from "filesize"
import ky from "ky"
import type { FC } from "react"
import { MdWarning } from "react-icons/md"
import useSWRMutation from "swr/mutation"

import {
	Alert,
	Button,
	Chip,
	LinearProgress,
	SvgIcon,
	Typography,
} from "@mui/joy"

import { ErrorAlert } from "@components/ErrorAlert"

import { DownloadMovieOptions } from "@typings/DownloadMovieOptions"

const requestDownloadMovie = (
	options: DownloadMovieOptions,
): Promise<{ downloading: false | Release }> => {
	return ky
		.post("/api/downloadMovie", {
			json: options,
			timeout: 1000 * 60,
		})
		.json()
}
export const DownloadButton: FC<{ movie: MovieSearchResult }> = ({ movie }) => {
	const options: DownloadMovieOptions = {
		id: movie.id,
		title: movie.title,
		tmdbId: movie.tmdbId,
	}

	const { trigger, data, error, isMutating } = useSWRMutation(
		options,
		requestDownloadMovie,
	)

	if (error) {
		return <ErrorAlert error={error} />
	}

	if (data) {
		if (data.downloading == false) {
			return (
				<Alert
					color="warning"
					startDecorator={<SvgIcon component={MdWarning} />}
				>
					Only found rejected releases
				</Alert>
			)
		} else if (data.downloading?.title) {
			return (
				<Typography>
					<>
						{data.downloading.title}
						<Chip>{data.downloading.quality.quality.name}</Chip>
						<> </>
						<Chip color="info">
							<>{filesize(data.downloading.size)}</>
						</Chip>
						<> </>
						<Chip color="neutral">{data.downloading.seeders}</Chip>
					</>
				</Typography>
			)
		}
	}

	if (movie.queueStatus !== undefined) {
		const percentage =
			((movie.queueStatus.size - movie.queueStatus.sizeleft) /
				movie.queueStatus.size) *
			100

		return (
			<LinearProgress
				determinate
				color={
					movie.queueStatus.status !== "downloading"
						? "danger"
						: "info"
				}
				variant="plain"
				value={percentage}
			/>
		)
	}

	return (
		<>
			<Button
				disabled={movie.hasFile || data !== undefined}
				onClick={(): void => void trigger()}
				loading={isMutating}
				color={data !== undefined ? "success" : undefined}
			>
				Download
			</Button>
		</>
	)
}
