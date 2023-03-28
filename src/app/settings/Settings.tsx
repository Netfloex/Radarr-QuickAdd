"use client"

import styles from "./Settings.module.scss"

import { FC, useState } from "react"
import { QualityProfileSetting } from "src/app/settings/QualityProfileSetting"

import { Button, Card, Typography } from "@mui/joy"

import { RootPathSetting } from "./RootPathSetting"

import type { DownloadSettings } from "@typings/DownloadSettings"

export const Settings: FC = () => {
	const [settings, setSettings] = useState<DownloadSettings>({})

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
						settings.rootPath === undefined
					}
				>
					Save
				</Button>
			</Card>
		</div>
	)
}
