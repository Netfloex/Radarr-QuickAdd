"use client"

import styles from "./Dashboard.module.scss"

import Link from "next/link"
import { useState } from "react"

import { Results } from "./Results"
import { SearchField } from "./SearchField"
import { StatusCheck } from "./StatusCheck"

import type { FC } from "react"

export const Dashboard: FC = () => {
	const [query, setQuery] = useState("")

	return (
		<div className={styles.dashboard}>
			<SearchField query={query} setQuery={setQuery} />
			<Link href="/settings">Settings</Link>
			<StatusCheck />
			<Results query={query} />
		</div>
	)
}
