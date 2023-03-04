import { search } from "@api/search"
import type { FC } from "react"
import { MovieItem } from "src/app/(dashboard)/MovieItem"
import useSWR from "swr"

import { List, ListItem } from "@mui/joy"

export const Results: FC<{ query: string }> = ({ query }) => {
	const { data, error, isLoading } = useSWR(query, search)

	if (error) return <div>failed to load</div>
	if (isLoading) return <div>loading...</div>
	if (!data || !data.length) return <div>no data</div>
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
