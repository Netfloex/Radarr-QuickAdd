import { filesize } from "filesize"
import type { FC } from "react"
import { MdWarning } from "react-icons/md"

import { Alert, Button, Chip, SvgIcon, Typography } from "@mui/joy"

import { trpc } from "@utils/trpc"

import { ErrorAlert } from "@components/ErrorAlert"

import { DownloadMovieBody } from "@schemas/DownloadMovieBody"
import { MovieSearchResult } from "@schemas/MovieSearchResult"

export const DownloadButton: FC<{ movie: MovieSearchResult }> = ({ movie }) => {
	const options: DownloadMovieBody = {
		id: movie.id,
		title: movie.title,
		tmdbId: movie.tmdbId,
	}

	const { isInitialLoading, isError, data, error, refetch } =
		trpc.downloadMovie.useQuery(options, { enabled: false })

	if (isError) {
		return <ErrorAlert error={error} />
	}

	if (data !== undefined) {
		if (data === false) {
			return (
				<Alert
					color="warning"
					startDecorator={<SvgIcon component={MdWarning} />}
				>
					Only found rejected releases
				</Alert>
			)
		} else {
			return (
				<Typography>
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
				</Typography>
			)
		}
	}

	return (
		<>
			<Button
				disabled={movie.hasFile || data !== undefined}
				onClick={(): void => void refetch()}
				loading={isInitialLoading}
				color={data !== undefined ? "success" : undefined}
			>
				Download
			</Button>
		</>
	)
}
