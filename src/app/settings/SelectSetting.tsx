import { CircularProgress, FormControl, FormLabel, Select } from "@mui/joy"

import { FCC } from "@typings/FCC"

export const SelectSetting: FCC<{
	title: string
	isLoading: boolean
	value: unknown
	onChange: (value: unknown) => void
}> = ({ title, isLoading, value, onChange, children }) => {
	return (
		<FormControl>
			<FormLabel>{title}</FormLabel>
			<Select
				placeholder={isLoading ? "Loading..." : title}
				value={value}
				onChange={(e, value): void => onChange(value)}
			>
				{isLoading ? (
					<CircularProgress sx={{ alignSelf: "center" }} />
				) : (
					children
				)}
			</Select>
		</FormControl>
	)
}
