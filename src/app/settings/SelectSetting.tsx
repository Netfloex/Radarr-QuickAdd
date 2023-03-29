import { CircularProgress, FormControl, FormLabel, Select } from "@mui/joy"

import { FCC } from "@typings/FCC"

export const SelectSetting: FCC<{
	title: string
	isLoading: boolean
	setValue: (value: unknown) => void
}> = ({ title, isLoading, children, setValue }) => {
	return (
		<FormControl>
			<FormLabel>{title}</FormLabel>
			<Select
				placeholder={title}
				onChange={(e, value): void => setValue(value)}
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
