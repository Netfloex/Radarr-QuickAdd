"use client"

import styles from "./Dashboard.module.scss"

import { FC, useState } from "react"

import { Results } from "./Results"
import { SearchField } from "./SearchField"

export const Dashboard: FC = () => {
	const [query, setQuery] = useState("")

	return (
		<div className={styles.dashboard}>
			<SearchField query={query} setQuery={setQuery} />
			<Results query={query} />
		</div>
	)
}
