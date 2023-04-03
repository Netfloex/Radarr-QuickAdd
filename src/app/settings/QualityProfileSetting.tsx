import { Option } from "@mui/joy"

import { trpc } from "@utils/trpc"

import { ErrorAlert } from "@components/ErrorAlert"

import { SelectSetting } from "./SelectSetting"

import { SettingsInput } from "@schemas/Settings"

import type { Dispatch, FC, SetStateAction } from "react"

export const QualityProfileSetting: FC<{
	settings: Partial<SettingsInput>
	setSettings: Dispatch<SetStateAction<Partial<SettingsInput>>>
}> = ({ settings, setSettings }) => {
	const { data, error, isLoading } = trpc.qualityProfiles.useQuery()

	if (error) return <ErrorAlert error={error} what="quality profiles" />

	return (
		<SelectSetting
			isLoading={isLoading}
			title="Quality Profile"
			value={settings.qualityProfileId}
			onChange={(value): void =>
				setSettings((settings) => ({
					...settings,
					qualityProfileId: value as number,
				}))
			}
		>
			{data?.map((profile) => (
				<Option key={profile.id} value={profile.id}>
					{profile.name}
				</Option>
			))}
		</SelectSetting>
	)
}
