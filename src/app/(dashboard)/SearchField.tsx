import styles from "./SearchField.module.scss"

import { Input } from "@components/joy"

import type { FC } from "react"

export const SearchField: FC<{
	defaultValue: string
	onChange: (value: string) => void
}> = ({ defaultValue, onChange }) => {
	return (
		<div className={styles.searchField}>
			<Input
				type="text"
				autoFocus
				placeholder="Enter a movie"
				onChange={(ev): void => onChange(ev.target.value)}
				defaultValue={defaultValue}
			/>
		</div>
	)
}
