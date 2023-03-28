import styles from "./DownloadButton.module.scss"

import { filesize } from "filesize"
import type { FC } from "react"
import { MdCheck, MdWarning } from "react-icons/md"

import { Alert, Button, Chip, SvgIcon } from "@mui/joy"

import { trpc } from "@utils/trpc"

import { ErrorAlert } from "@components/ErrorAlert"

import { DownloadMovieBody } from "@schemas/DownloadMovieBody"
import { MovieSearchResult } from "@schemas/MovieSearchResult"

export const DownloadButton: FC<{
	movie: MovieSearchResult
}> = ({ movie }) => {
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
				onClick={(): void => void refetch()}
				loading={isInitialLoading}
				color={data !== undefined ? "success" : undefined}
				className={styles.downloadButton}
			>
				Download
			</Button>
		</>
	)
}
