"use client"

import styles from "./Dashboard.module.scss"

import { useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"
import { SettingsButton } from "src/app/(dashboard)/SettingsButtton"
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
			<div className={styles.topBar}>
				<SearchField
					defaultValue={queryParam}
					onChange={onSearchChangeDebounced}
					className={styles.searchBar}
				/>
				<SettingsButton />
			</div>
			<div className={styles.content}>
				<StatusCheck />
				<Results query={query} />
			</div>
		</div>
	)
}
