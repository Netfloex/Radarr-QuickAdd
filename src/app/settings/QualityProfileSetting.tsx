"use client"

import { CircularProgress, Option, Select } from "@mui/joy"
import FormControl from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"

import { trpc } from "@utils/trpc"

import { ErrorAlert } from "@components/ErrorAlert"

import type { FC } from "react"

export const QualityProfileSetting: FC = () => {
	const { data, error, isLoading } = trpc.qualityProfiles.useQuery()

	if (isLoading) {
		return <CircularProgress />
	}
	if (error) return <ErrorAlert error={error} />

	return (
		<FormControl>
			<FormLabel>Quality Profile</FormLabel>
			<Select placeholder="Quality Profile">
				{data.map((profile) => (
					<Option key={profile.id} value={profile.id}>
						{profile.name}
					</Option>
				))}
			</Select>
		</FormControl>
	)
}
