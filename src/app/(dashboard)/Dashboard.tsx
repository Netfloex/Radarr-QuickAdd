"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

import { Results } from "./Results"
import { SearchField } from "./SearchField"
import { StatusCheck } from "./StatusCheck"

import type { FC } from "react"

export const Dashboard: FC = () => {
	const params = useSearchParams()

	const queryParam = params?.get("query") || ""

	const [query, setQuery] = useState(queryParam)

	const onSearchChange = useCallback((value: string) => {
		const newUrl = !value ? location.href.split("?")[0] : `?query=${value}`
		history.pushState({ ...history.state, as: newUrl, newUrl }, "", newUrl)
		setQuery(value)
	}, [])

	const onSearchChangeDebounced = useDebouncedCallback(onSearchChange, 400)

	return (
		<div className="container">
			<SearchField
				defaultValue={queryParam}
				onChange={onSearchChangeDebounced}
			/>
			<Link href="/settings">Settings</Link>
			<StatusCheck />
			<Results query={query} />
		</div>
	)
}
