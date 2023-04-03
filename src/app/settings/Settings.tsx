"use client"

import styles from "./Settings.module.scss"

import equal from "fast-deep-equal"
import { FC, useCallback, useEffect, useState } from "react"
import { MonitorSetting } from "src/app/settings/MonitorSettings"

import { Button, Card, Typography } from "@mui/joy"

import { trpc } from "@utils/trpc"

import { ErrorAlert } from "@components/ErrorAlert"

import { QualityProfileSetting } from "./QualityProfileSetting"
import { RootFolderSetting } from "./RootFolderSetting"

import type { SettingsInput } from "@schemas/Settings"

type PartialSettings = Partial<SettingsInput>

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useSaveSettings = () => {
	const trpcUtils = trpc.useContext()

	const [settings, setSettings] = useState<PartialSettings>({})
	const [savedSettings, setSavedSettings] = useState<PartialSettings | false>(
		false,
	)

	const { mutateAsync, isError, isLoading, error } =
		trpc.settings.save.useMutation()

	const saveSettings = useCallback(() => {
		mutateAsync(settings as SettingsInput).then(() => {
			setSavedSettings(settings)
		})
	}, [mutateAsync, settings])

	const savedSuccess =
		isError === false &&
		savedSettings !== false &&
		Object.keys(savedSettings).length !== 0 &&
		equal(savedSettings, settings)

	// Fetch saved settings
	useEffect(() => {
		const ac = new AbortController()

		trpcUtils.settings.get
			.fetch(undefined, {
				signal: ac.signal,
			})
			.then((savedSettings) => {
				setSettings(savedSettings)
				setSavedSettings(savedSettings)
			})
			.catch((error) => {
				console.error(error)
			})

		return (): void => {
			ac.abort()
		}
	}, [setSavedSettings, trpcUtils])

	return {
		isSaving: isLoading,
		savedSuccess,
		saveError: error,
		saveSettings,
		setSettings,
		settings,
	}
}

export const Settings: FC = () => {
	const {
		isSaving,
		savedSuccess,
		saveError,
		saveSettings,
		setSettings,
		settings,
	} = useSaveSettings()

	return (
		<div className={`container ${styles.settings}`}>
			<Card className={styles.card}>
				<Typography level="h2" fontSize="md">
					Settings
				</Typography>
				<RootFolderSetting
					settings={settings}
					setSettings={setSettings}
				/>
				<QualityProfileSetting
					settings={settings}
					setSettings={setSettings}
				/>
				<MonitorSetting settings={settings} setSettings={setSettings} />
				<Button
					disabled={
						settings.qualityProfileId === undefined ||
						settings.rootFolder === undefined ||
						savedSuccess
					}
					color={savedSuccess ? "success" : undefined}
					loading={isSaving}
					onClick={saveSettings}
				>
					{savedSuccess ? "Saved Successfully " : "Save"}
				</Button>
				{saveError && (
					<ErrorAlert error={saveError} what="save settings" />
				)}
			</Card>
		</div>
	)
}
