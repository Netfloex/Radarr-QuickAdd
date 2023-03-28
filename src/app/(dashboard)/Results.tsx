import { MovieItem } from "src/app/(dashboard)/MovieItem"

import { CircularProgress, List, ListItem } from "@mui/joy"

import { trpc } from "@utils/trpc"

import { ErrorAlert } from "@components/ErrorAlert"

import type { FC } from "react"

export const Results: FC<{ query: string }> = ({ query }) => {
	const { data, error, isInitialLoading, isLoading } = trpc.search.useQuery(
		{ query },
		{ enabled: query.length !== 0 },
	)

	// Error
	if (error) return <ErrorAlert error={error} />

	// Loading
	if (isInitialLoading) return <CircularProgress />

	// Not started
	if (isLoading) return null

	// No data
	if (!data.length) return <>No Items</>

	// data
	return (
		<List>
			{data.map((movie) => (
				<ListItem key={movie.tmdbId}>
					<MovieItem movie={movie} />
				</ListItem>
			))}
		</List>
	)
}
