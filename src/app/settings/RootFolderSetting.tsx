import { Option } from "@mui/joy"

import { trpc } from "@utils/trpc"

import { ErrorAlert } from "@components/ErrorAlert"

import { SelectSetting } from "./SelectSetting"

import { Settings } from "@schemas/Settings"

import type { Dispatch, FC, SetStateAction } from "react"

export const RootFolderSetting: FC<{
	settings: Partial<Settings>
	setSettings: Dispatch<SetStateAction<Partial<Settings>>>
}> = ({ settings, setSettings }) => {
	const { data, error, isLoading } = trpc.rootFolder.useQuery()

	if (error) return <ErrorAlert error={error} />

	return (
		<SelectSetting
			isLoading={isLoading}
			title="Root Folder"
			value={settings.rootFolder}
			onChange={(value): void =>
				setSettings(
					(settings) =>
						({
							...settings,
							rootFolder: value as string,
						} satisfies Partial<Settings>),
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
