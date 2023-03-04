import styles from "./SearchField.module.scss"

import type { Dispatch, FC, SetStateAction } from "react"

import { Input } from "@components/joy"

export const SearchField: FC<{
	query: string
	setQuery: Dispatch<SetStateAction<string>>
}> = ({ query, setQuery }) => {
	return (
		<div className={styles.searchField}>
			<Input
				type="text"
				value={query}
				autoFocus
				placeholder="Enter a movie"
				onChange={(ev): void => setQuery(ev.target.value)}
			/>
		</div>
	)
}
