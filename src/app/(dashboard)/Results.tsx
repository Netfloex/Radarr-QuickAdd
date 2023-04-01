import styles from "./Results.module.scss"

import { CircularProgress, List, ListItem } from "@mui/joy"

import { trpc } from "@utils/trpc"

import { ErrorAlert } from "@components/ErrorAlert"

import { MovieItem } from "./MovieItem"

import type { FC } from "react"

export const Results: FC<{ query: string }> = ({ query }) => {
	const { data, error, isInitialLoading, isLoading } = trpc.search.useQuery(
		{ query },
		{ enabled: query.length !== 0 },
	)

	// Error
	if (error) return <ErrorAlert error={error} />

	// Loading
	if (isInitialLoading)
		return (
			<div className={styles.loading}>
				<CircularProgress variant="soft" color="neutral" />
			</div>
		)

	// Not started
	if (isLoading) return null

	// No data
	if (!data.length) return <>No Items</>

	// data
	return (
		<List sx={{ paddingY: 0 }}>
			{data.map((movie) => (
				<ListItem sx={{ paddingX: 0 }} key={movie.tmdbId}>
					<MovieItem movie={movie} />
				</ListItem>
			))}
		</List>
	)
}
