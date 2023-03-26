"use client"

import { FC, useState } from "react"

import { Results } from "./Results"
import { SearchField } from "./SearchField"
import { StatusCheck } from "./StatusCheck"

export const Dashboard: FC = () => {
	const [query, setQuery] = useState("")

	return (
		<>
			<SearchField query={query} setQuery={setQuery} />
			<StatusCheck />
			<Results query={query} />
		</>
	)
}
