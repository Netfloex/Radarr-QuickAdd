"use client"

import styles from "./Settings.module.scss"

import { FC, useCallback, useState } from "react"

import { Button, Card, Typography } from "@mui/joy"

import { trpc } from "@utils/trpc"

import { QualityProfileSetting } from "./QualityProfileSetting"
import { RootPathSetting } from "./RootPathSetting"

import type { Settings as DownloadSettings } from "@schemas/Settings"

export const Settings: FC = () => {
	const [settings, setSettings] = useState<Partial<DownloadSettings>>({})
	const [savedSettings, setSavedSettings] = useState<
		Partial<DownloadSettings> | false
	>(false)
	const { data, refetch, isInitialLoading } = trpc.saveSettings.useQuery(
		settings as Required<DownloadSettings>,
		{
			enabled: false,
		},
	)

	const save = useCallback(() => {
		refetch({}).then(() => {
			setSavedSettings(settings)
		})
	}, [refetch, settings])

	const success =
		data === true &&
		savedSettings !== false &&
		savedSettings.qualityProfileId === settings.qualityProfileId &&
		savedSettings.rootPath === settings.rootPath

	return (
		<div className={`container ${styles.settings}`}>
			<Card>
				<Typography level="h2" fontSize="md">
					Settings
				</Typography>
				<RootPathSetting setSettings={setSettings} />
				<QualityProfileSetting setSettings={setSettings} />
				<Button
					disabled={
						settings.qualityProfileId === undefined ||
						settings.rootPath === undefined ||
						success
					}
					color={success ? "success" : undefined}
					loading={isInitialLoading}
					onClick={save}
				>
					{success ? "Saved Successfully " : "Save"}
				</Button>
			</Card>
		</div>
	)
}
