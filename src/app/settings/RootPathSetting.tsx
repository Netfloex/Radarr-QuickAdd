"use client"

import { CircularProgress, Option, Select } from "@mui/joy"
import FormControl from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"

import { trpc } from "@utils/trpc"

import { ErrorAlert } from "@components/ErrorAlert"

import type { FC } from "react"

export const RootPathSetting: FC = () => {
	const { data, error, isLoading } = trpc.rootFolder.useQuery()

	if (isLoading) {
		return <CircularProgress />
	}
	if (error) return <ErrorAlert error={error} />

	return (
		<FormControl>
			<FormLabel>Root Path</FormLabel>
			<Select placeholder="Root Path">
				{data.map((folder) => (
					<Option key={folder.id} value={folder.path}>
						{folder.path}
					</Option>
				))}
			</Select>
		</FormControl>
	)
}
