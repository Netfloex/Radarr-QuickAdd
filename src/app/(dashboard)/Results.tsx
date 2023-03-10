import ky, { HTTPError } from "ky"
import type { FC } from "react"
import { MovieItem } from "src/app/(dashboard)/MovieItem"
import useSWR from "swr"

import { List, ListItem } from "@mui/joy"

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

	if (error instanceof HTTPError) {
		console.log(error.response.body)

		return (
			<>
				Error when making request to <pre>{error.request.url}</pre>
			</>
		)
	}
	if (error) return <div>failed to load</div>
	if (isLoading) return <div>loading...</div>

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
