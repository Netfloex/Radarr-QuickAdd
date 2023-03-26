import ky from "ky"
import type { FC } from "react"
import { MovieItem } from "src/app/(dashboard)/MovieItem"
import useSWR from "swr"

import { CircularProgress, List, ListItem } from "@mui/joy"

import { ErrorAlert } from "@components/ErrorAlert"

import { MovieResult } from "@typings/Movie"

const search = (query: string): Promise<MovieResult[]> => {
	return ky("/api/search", {
		searchParams: {
			term: query,
		},
		cache: "force-cache",
	}).json()
}

export const Results: FC<{ query: string }> = ({ query }) => {
	const { data, error, isLoading } = useSWR(query, search)

	if (error) return <ErrorAlert error={error} />
	if (isLoading) return <CircularProgress />

	if (!data || !data.length) return null

	return (
		<List>
			{data?.map((movie) => (
				<ListItem key={movie.tmdbId}>
					<MovieItem movie={movie} />
				</ListItem>
			))}
		</List>
	)
}
