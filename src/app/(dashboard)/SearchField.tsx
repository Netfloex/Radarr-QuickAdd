import { Input } from "@components/joy"

import type { FC } from "react"

export const SearchField: FC<{
	defaultValue: string
	onChange: (value: string) => void
	className?: string
}> = ({ defaultValue, onChange, className }) => {
	return (
		<div className={className}>
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
