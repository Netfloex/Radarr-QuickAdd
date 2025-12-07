import styles from "./Results.module.scss"

import { CircularProgress, List, ListItem } from "@mui/joy"

import { trpc } from "@utils/trpc"

import { ErrorAlert } from "@components/ErrorAlert"

import { MovieItem } from "./MovieItem"

import type { FC } from "react"

export const Results: FC<{ query: string }> = ({ query }) => {
	const { data, error, isFetching, isPending } = trpc.search.useQuery(
		{ query },
		{ enabled: query.length !== 0 },
	)

	// Error
	if (error) return <ErrorAlert error={error} what="results" />

	// Loading
	if (isFetching)
		return (
			<div className={styles.loading}>
				<CircularProgress color="neutral" variant="soft" />
			</div>
		)

	// Not started
	if (isPending) return null

	// No data
	if (!data.length) return <>No Items</>

	// data
	return (
		<List sx={{ paddingY: 0 }}>
			{data.map((movie) => (
				<ListItem key={movie.tmdbId} sx={{ paddingX: 0 }}>
					<MovieItem movie={movie} />
				</ListItem>
			))}
		</List>
	)
}
