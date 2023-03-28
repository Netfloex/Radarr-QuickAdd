import { SelectSetting } from "src/app/settings/SelectSetting"

import { Option } from "@mui/joy"

import { trpc } from "@utils/trpc"

import { ErrorAlert } from "@components/ErrorAlert"

import type { Dispatch, FC, SetStateAction } from "react"

import { DownloadSettings } from "@typings/DownloadSettings"

export const QualityProfileSetting: FC<{
	setSettings: Dispatch<SetStateAction<DownloadSettings>>
}> = ({ setSettings }) => {
	const { data, error, isLoading } = trpc.qualityProfiles.useQuery()

	if (error) return <ErrorAlert error={error} />

	return (
		<SelectSetting
			isLoading={isLoading}
			title="Quality Profile"
			setValue={(value): void =>
				setSettings(
					(settings) =>
						({
							...settings,
							qualityProfileId: value as number,
						} satisfies DownloadSettings),
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
