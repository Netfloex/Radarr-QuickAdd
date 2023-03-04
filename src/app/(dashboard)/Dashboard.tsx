"use client"

import { FC, useState } from "react"

import { Results } from "./Results"
import { SearchField } from "./SearchField"

export const Dashboard: FC = () => {
	const [query, setQuery] = useState("")

	return (
		<>
			<SearchField query={query} setQuery={setQuery} />
			<Results query={query} />
		</>
	)
}
