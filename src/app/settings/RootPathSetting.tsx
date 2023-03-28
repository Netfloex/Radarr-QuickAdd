import { Option } from "@mui/joy"

import { trpc } from "@utils/trpc"

import { ErrorAlert } from "@components/ErrorAlert"

import { SelectSetting } from "./SelectSetting"

import type { Dispatch, FC, SetStateAction } from "react"

import { DownloadSettings } from "@typings/DownloadSettings"

export const RootPathSetting: FC<{
	setSettings: Dispatch<SetStateAction<DownloadSettings>>
}> = ({ setSettings }) => {
	const { data, error, isLoading } = trpc.rootFolder.useQuery()

	if (error) return <ErrorAlert error={error} />

	return (
		<SelectSetting
			isLoading={isLoading}
			title="Root Path"
			setValue={(value): void =>
				setSettings(
					(settings) =>
						({
							...settings,
							rootPath: value as string,
						} satisfies DownloadSettings),
				)
			}
		>
			{data?.map((folder) => (
				<Option key={folder.id} value={folder.path}>
					{folder.path}
				</Option>
			))}
		</SelectSetting>
	)
}
