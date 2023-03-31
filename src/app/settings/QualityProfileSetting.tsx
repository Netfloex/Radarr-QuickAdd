import { Option } from "@mui/joy"

import { trpc } from "@utils/trpc"

import { ErrorAlert } from "@components/ErrorAlert"

import { SelectSetting } from "./SelectSetting"

import { Settings } from "@schemas/Settings"

import type { Dispatch, FC, SetStateAction } from "react"

export const QualityProfileSetting: FC<{
	settings: Partial<Settings>
	setSettings: Dispatch<SetStateAction<Partial<Settings>>>
}> = ({ settings, setSettings }) => {
	const { data, error, isLoading } = trpc.qualityProfiles.useQuery()

	if (error) return <ErrorAlert error={error} />

	return (
		<SelectSetting
			isLoading={isLoading}
			title="Quality Profile"
			value={settings.qualityProfileId}
			onChange={(value): void =>
				setSettings(
					(settings) =>
						({
							...settings,
							qualityProfileId: value as number,
						} satisfies Partial<Settings>),
				)
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
