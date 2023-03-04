import type { Dispatch, FC, SetStateAction } from "react"

export const SearchField: FC<{
	query: string
	setQuery: Dispatch<SetStateAction<string>>
}> = ({ query, setQuery }) => {
	return (
		<>
			<input
				type="text"
				value={query}
				autoFocus
				onChange={(ev): void => setQuery(ev.target.value)}
			/>
		</>
	)
}
