import { Input } from "@components/joy"

import type { FC } from "react"

export const SearchField: FC<{
	defaultValue: string
	onChange: (value: string) => void
	className?: string
}> = ({ defaultValue, onChange, className }) => (
		<div className={className}>
			<Input
				autoFocus
				defaultValue={defaultValue}
				onChange={(ev): void => onChange(ev.target.value)}
				placeholder="Enter a movie"
				type="text"
			/>
		</div>
	)
